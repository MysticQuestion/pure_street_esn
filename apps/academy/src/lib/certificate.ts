import type { CertificateRecord, Role } from "./types";
import { ROLE_LABEL } from "./labels";

const COMPETENCIES = [
  "Waste Sorting",
  "Compost Literacy",
  "Contamination Recognition",
  "Illegal Dumping Literacy",
  "Service Navigation",
  "Field Observation",
  "Environmental Safety",
  "Waste Prevention",
];

function checksum(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

function toBase64Url(s: string) {
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(s: string) {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  return atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
}

export function issueCertificate(args: {
  name: string;
  role: Role;
  simScore: number;
  moduleAvg: number;
}): CertificateRecord {
  const issued = new Date();
  const valid = new Date(issued);
  valid.setFullYear(valid.getFullYear() + 2);
  const idNum = checksum(args.name + issued.toISOString()).slice(0, 5).toUpperCase();
  const id = `STREETS-WR-2026-${idNum}`;
  const payload = {
    id,
    n: args.name,
    r: args.role,
    s: args.simScore,
    q: args.moduleAvg,
    d: issued.toISOString().slice(0, 10),
  };
  const raw = JSON.stringify(payload);
  const token = `${toBase64Url(raw)}.${checksum(raw).slice(0, 6)}`;
  return {
    id,
    token,
    name: args.name,
    role: args.role,
    score: Math.round((args.simScore + args.moduleAvg) / 2),
    simScore: args.simScore,
    issued: issued.toISOString(),
    competencies: COMPETENCIES,
    validUntil: valid.toISOString(),
  };
}

export interface VerifiedCert {
  ok: true;
  id: string;
  name: string;
  roleLabel: string;
  simScore: number;
  moduleAvg: number;
  issued: string;
}

export function verifyToken(id: string, token: string): VerifiedCert | { ok: false; reason: string } {
  const [b64, sum] = token.split(".");
  if (!b64 || !sum) return { ok: false, reason: "Malformed token." };
  try {
    const raw = fromBase64Url(b64);
    if (checksum(raw).slice(0, 6) !== sum) return { ok: false, reason: "Checksum failed." };
    const payload = JSON.parse(raw) as {
      id: string;
      n: string;
      r: Role;
      s: number;
      q: number;
      d: string;
    };
    if (payload.id !== id) return { ok: false, reason: "ID does not match token." };
    return {
      ok: true,
      id: payload.id,
      name: payload.n,
      roleLabel: ROLE_LABEL[payload.r] ?? payload.r,
      simScore: payload.s,
      moduleAvg: payload.q,
      issued: payload.d,
    };
  } catch {
    return { ok: false, reason: "Token could not be read." };
  }
}

export { COMPETENCIES };
