from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from statistics import fmean
from typing import Dict, Iterable, List, Optional, Set


@dataclass(frozen=True)
class Telemetry:
    """A single environmental observation captured by a field node."""

    node_id: str
    temperature_c: float
    pm25_ug_m3: float
    no2_ppb: float
    noise_db: float
    humidity_pct: float
    captured_at: datetime


@dataclass(frozen=True)
class Alert:
    """A network alert emitted when a node crosses risk boundaries."""

    node_id: str
    risk_score: float
    severity: str
    message: str
    created_at: datetime


@dataclass(frozen=True)
class NodeStatus:
    """Current status for a node, derived from the latest telemetry."""

    node_id: str
    risk_score: float
    severity: str
    last_sample_at: datetime


class EnvironmentalSentinelNetwork:
    """Distributed environmental sentinel network used by Pure Street.

    The network ingests per-node telemetry, computes a normalized risk score,
    and propagates elevated alerts to neighboring nodes to support proactive
    routing and remediation decisions.
    """

    def __init__(self) -> None:
        self._adjacency: Dict[str, Set[str]] = defaultdict(set)
        self._telemetry_buffer: Dict[str, List[Telemetry]] = defaultdict(list)

    def link_nodes(self, node_a: str, node_b: str) -> None:
        """Create an undirected link between two sentinel nodes."""
        if node_a == node_b:
            return
        self._adjacency[node_a].add(node_b)
        self._adjacency[node_b].add(node_a)

    def ingest(self, sample: Telemetry) -> Optional[Alert]:
        """Ingest a single sample and return an alert if thresholds are crossed."""
        self._telemetry_buffer[sample.node_id].append(sample)
        score = self._risk_score(sample)
        severity = self._severity_for(score)

        if severity == "normal":
            return None

        neighbor_impact = self._neighbor_impact(sample.node_id)
        effective_score = round(min(100.0, score + neighbor_impact), 2)
        message = (
            f"Environmental risk elevated at node {sample.node_id}: "
            f"base={score:.2f}, propagated={neighbor_impact:.2f}, total={effective_score:.2f}."
        )
        return Alert(
            node_id=sample.node_id,
            risk_score=effective_score,
            severity=self._severity_for(effective_score),
            message=message,
            created_at=datetime.now(timezone.utc),
        )

    def node_status(self, node_id: str) -> Optional[NodeStatus]:
        """Return status for a node based on its latest observation."""
        samples = self._telemetry_buffer.get(node_id)
        if not samples:
            return None

        latest = samples[-1]
        score = self._risk_score(latest)
        return NodeStatus(
            node_id=node_id,
            risk_score=round(score, 2),
            severity=self._severity_for(score),
            last_sample_at=latest.captured_at,
        )

    def network_hotspots(self, minimum_severity: str = "warning") -> List[NodeStatus]:
        """Return nodes currently over the requested severity threshold."""
        ordered = ["normal", "warning", "critical", "emergency"]
        threshold_index = ordered.index(minimum_severity)

        hotspots: List[NodeStatus] = []
        for node_id in self._telemetry_buffer:
            status = self.node_status(node_id)
            if status is None:
                continue
            if ordered.index(status.severity) >= threshold_index:
                hotspots.append(status)
        return sorted(hotspots, key=lambda item: item.risk_score, reverse=True)

    def _neighbor_impact(self, node_id: str) -> float:
        """Calculate spillover risk from neighboring nodes."""
        neighbor_scores: List[float] = []
        for neighbor_id in self._adjacency.get(node_id, set()):
            samples = self._telemetry_buffer.get(neighbor_id)
            if not samples:
                continue
            neighbor_scores.append(self._risk_score(samples[-1]))
        if not neighbor_scores:
            return 0.0
        return 0.15 * fmean(neighbor_scores)

    @staticmethod
    def _risk_score(sample: Telemetry) -> float:
        """Compute a 0–100 composite environmental risk score."""
        score = 0.0
        # Temperature risk (ideal range: 12–30 °C)
        if sample.temperature_c < 12:
            score += (12 - sample.temperature_c) * 1.6
        elif sample.temperature_c > 30:
            score += (sample.temperature_c - 30) * 1.8
        # Fine particulate matter risk
        score += min(35.0, sample.pm25_ug_m3 * 0.65)
        # Nitrogen dioxide risk
        score += min(25.0, sample.no2_ppb * 0.5)
        # Noise and humidity are secondary multipliers.
        score += max(0.0, sample.noise_db - 55) * 0.4
        score += max(0.0, sample.humidity_pct - 70) * 0.25
        return min(100.0, score)

    @staticmethod
    def _severity_for(score: float) -> str:
        if score < 25:
            return "normal"
        if score < 50:
            return "warning"
        if score < 75:
            return "critical"
        return "emergency"


def bootstrap_network(links: Iterable[tuple[str, str]]) -> EnvironmentalSentinelNetwork:
    """Convenience builder for a sentinel network and edge list."""
    network = EnvironmentalSentinelNetwork()
    for node_a, node_b in links:
        network.link_nodes(node_a, node_b)
    return network