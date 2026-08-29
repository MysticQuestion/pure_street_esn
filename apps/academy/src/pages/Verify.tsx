import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function VerifyIndex() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [token, setToken] = useState("");
  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <p className="eyebrow">Public validation</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Verify a certificate</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enter a STREETS-WR-2026 identifier. If you have the validation token from the QR link, include it so the record can be reconstructed without a central registry.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const clean = id.trim().toUpperCase();
          if (!clean) return;
          navigate(`/academy/verify/${clean}${token.trim() ? `?t=${encodeURIComponent(token.trim())}` : ""}`);
        }}
      >
        <div>
          <Label htmlFor="cid">Certificate ID</Label>
          <Input
            id="cid"
            className="mt-1.5 font-mono"
            placeholder="STREETS-WR-2026-XXXXX"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tok">Validation token (optional)</Label>
          <Input id="tok" className="mt-1.5 font-mono text-xs" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <Button type="submit">Look up</Button>
      </form>
    </div>
  );
}

export default VerifyIndex;
