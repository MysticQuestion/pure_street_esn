import unittest
from datetime import datetime, timezone
import os
import sys

# Ensure the `esn_sensor_intelligence` package can be imported from src
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'src')))

from esn_sensor_intelligence.sentinel_network import (
    EnvironmentalSentinelNetwork,
    Telemetry,
    bootstrap_network,
)


class SentinelNetworkTests(unittest.TestCase):
    def test_normal_sample_emits_no_alert(self) -> None:
        network = EnvironmentalSentinelNetwork()
        alert = network.ingest(
            Telemetry(
                node_id="A1",
                temperature_c=22,
                pm25_ug_m3=10,
                no2_ppb=15,
                noise_db=48,
                humidity_pct=45,
                captured_at=datetime.now(timezone.utc),
            )
        )
        self.assertIsNone(alert)

    def test_high_risk_sample_emits_alert(self) -> None:
        network = EnvironmentalSentinelNetwork()
        alert = network.ingest(
            Telemetry(
                node_id="A1",
                temperature_c=38,
                pm25_ug_m3=80,
                no2_ppb=70,
                noise_db=85,
                humidity_pct=90,
                captured_at=datetime.now(timezone.utc),
            )
        )
        self.assertIsNotNone(alert)
        assert alert is not None
        self.assertIn(alert.severity, {"critical", "emergency"})

    def test_neighbor_risk_is_propagated(self) -> None:
        network = bootstrap_network([("A1", "B1")])
        network.ingest(
            Telemetry(
                node_id="B1",
                temperature_c=42,
                pm25_ug_m3=90,
                no2_ppb=80,
                noise_db=85,
                humidity_pct=92,
                captured_at=datetime.now(timezone.utc),
            )
        )
        alert = network.ingest(
            Telemetry(
                node_id="A1",
                temperature_c=35,
                pm25_ug_m3=45,
                no2_ppb=35,
                noise_db=68,
                humidity_pct=72,
                captured_at=datetime.now(timezone.utc),
            )
        )
        self.assertIsNotNone(alert)
        assert alert is not None
        self.assertGreater(alert.risk_score, 40)

    def test_hotspot_filtering(self) -> None:
        network = EnvironmentalSentinelNetwork()
        network.ingest(
            Telemetry(
                node_id="SAFE",
                temperature_c=20,
                pm25_ug_m3=8,
                no2_ppb=10,
                noise_db=50,
                humidity_pct=40,
                captured_at=datetime.now(timezone.utc),
            )
        )
        network.ingest(
            Telemetry(
                node_id="RISKY",
                temperature_c=33,
                pm25_ug_m3=50,
                no2_ppb=45,
                noise_db=75,
                humidity_pct=78,
                captured_at=datetime.now(timezone.utc),
            )
        )
        hotspots = network.network_hotspots(minimum_severity="warning")
        hotspot_ids = [item.node_id for item in hotspots]
        self.assertEqual(hotspot_ids, ["RISKY"])