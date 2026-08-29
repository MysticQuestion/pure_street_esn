import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SortStation } from "@/components/academy/sort-station";
import { PRETEST_IDS } from "@/lib/academy/sort-items";
import { ROLE_LABEL } from "@/lib/academy/labels";
import type { Role } from "@/lib/academy/types";
import { useProgress } from "@/lib/academy/progress";
import { cn } from "@/lib/utils";

const ROLES = Object.keys(ROLE_LABEL) as Role[];

function Start() {
  const navigate = useNavigate();
  const { name, role, setProfile, setPlain, plainLanguage, pretest, setPretest } = useProgress();
  const [localName, setLocalName] = useState(name);
  const [localRole, setLocalRole] = useState<Role | null>(role);
  const [showTest, setShowTest] = useState(false);

  function continueProfile() {
    if (!localName.trim() || !localRole) return;
    setProfile(localName.trim(), localRole);
    setShowTest(true);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="eyebrow">Enroll</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Before the first cart</h1>
      <p className="mt-2 text-asphalt-soft">
        Progress saves on this device. No account required for the pilot. Choose the track that matches how you actually
        meet the system. The course then adapts Module 9 (ORRO / SB 1383) to that role.
      </p>

      {!showTest && (
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            continueProfile();
          }}
        >
          <div>
            <Label htmlFor="name">Name on the certificate</Label>
            <Input
              id="name"
              className="mt-1.5"
              value={localName}
              autoComplete="name"
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>
          <fieldset>
            <legend className="text-sm font-medium">Account type</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setLocalRole(r)}
                  className={cn(
                    "rounded-md border px-3 py-3 text-left text-sm",
                    localRole === r ? "border-primary bg-primary/10" : "border-border hover:bg-muted",
                  )}
                >
                  {ROLE_LABEL[r]}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              className="mt-1 size-4"
              checked={plainLanguage}
              onChange={(e) => setPlain(e.target.checked)}
            />
            <span>Plain-language mode — shorter sentences, same Oakland rules.</span>
          </label>
          <Button type="submit" disabled={!localName.trim() || !localRole}>
            Continue to pre-test
          </Button>
        </form>
      )}

      {showTest && !pretest && (
        <div className="mt-8">
          <SortStation
            itemIds={PRETEST_IDS}
            title="Baseline sort"
            intro="Ten objects. We will compare this to your post-course accuracy. Oakland rules."
            onComplete={(score, max) => {
              setPretest(max, score);
              navigate("/academy/course");
            }}
          />
        </div>
      )}

      {showTest && pretest && (
        <div className="mt-8 rounded-lg bg-card p-6 shadow-card">
          <p className="font-display text-xl font-semibold">Baseline recorded</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {pretest.correct} of {pretest.attempted} ({Math.round((pretest.correct / pretest.attempted) * 100)}%).
          </p>
          <Button className="mt-4" onClick={() => void navigate("/academy/course")}>
            Open course map
          </Button>
        </div>
      )}
    </div>
  );
}

export default Start;
