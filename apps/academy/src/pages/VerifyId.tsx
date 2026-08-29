import { useParams, useSearchParams } from "react-router-dom";
import { verifyToken } from "@/lib/academy/certificate";
import { useProgress } from "@/lib/academy/progress";
import { ROLE_LABEL } from "@/lib/academy/labels";
import { Badge } from "@/components/ui/badge";

function VerifyId() {
  const { id = "" } = useParams();
  const [search] = useSearchParams();
  const t = search.get("t") ?? undefined;
  const local = useProgress((s) => s.certificate);
  const fromToken = t ? verifyToken(id, t) : null;
  const fromLocal = local && local.id === id ? local : null;

  if (fromToken && fromToken.ok) {
    return (
      <Result
        id={fromToken.id}
        name={fromToken.name}
        role={fromToken.roleLabel}
        issued={fromToken.issued}
        sim={fromToken.simScore}
      />
    );
  }
  if (fromLocal) {
    return (
      <Result
        id={fromLocal.id}
        name={fromLocal.name}
        role={ROLE_LABEL[fromLocal.role]}
        issued={fromLocal.issued.slice(0, 10)}
        sim={fromLocal.simScore}
      />
    );
  }
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Badge variant="critical">Not found</Badge>
      <h1 className="mt-3 font-display text-2xl font-semibold">{id}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This pilot registry lives on the device that issued the certificate, plus the signed token in the QR link. Without that token, a different browser cannot confirm the record. No live partnership database is implied.
      </p>
      {fromToken?.ok === false ? <p className="mt-3 text-sm text-critical">{fromToken.reason}</p> : null}
    </div>
  );
}

function Result({
  id,
  name,
  role,
  issued,
  sim,
}: {
  id: string;
  name: string;
  role: string;
  issued: string;
  sim: number;
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <Badge variant="success">Valid credential</Badge>
      <h1 className="mt-3 font-display text-3xl font-semibold">{name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{role}</p>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">ID</dt>
          <dd className="font-mono text-xs">{id}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">Issued</dt>
          <dd>{issued}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-border py-2">
          <dt className="text-muted-foreground">Simulation</dt>
          <dd className="tabular-nums">{sim}/100</dd>
        </div>
      </dl>
    </div>
  );
}

export default VerifyId;
