import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CertificateView } from "@/components/academy/certificate-view";
import { useProgress } from "@/lib/academy/progress";

function CertificatePage() {
  const cert = useProgress((s) => s.certificate);
  if (!cert) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">No certificate on this device yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Complete all twelve modules and pass the 98th Avenue simulation at 80/100.
        </p>
        <Button asChild className="mt-6">
          <Link to="/academy/course">Course map</Link>
        </Button>
      </div>
    );
  }
  const verifyPath = `/academy/verify/${cert.id}?t=${encodeURIComponent(cert.token)}`;
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Credential</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">OaklandSTREETS Waste & Recycling Literacy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Two-year validity. Annual update modules recommended.</p>
      <div className="mt-8">
        <CertificateView cert={cert} verifyPath={verifyPath} />
      </div>
    </div>
  );
}

export default CertificatePage;
