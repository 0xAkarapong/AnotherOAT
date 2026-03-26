import { AppShell } from "@/components/app-shell";
import { HeroCard } from "@/components/hero-card";
import { LandingEvidenceStrip } from "@/components/landing-evidence-strip";
import { getResolvedAssets } from "@/src/lib/assets";
import { getPreviewSession } from "@/src/lib/preview-session";

export default async function HomePage() {
  const session = getPreviewSession();
  const assets = getResolvedAssets();

  return (
    <AppShell eyebrow="Minimal home with live research framing">
      <main className="mt-8 space-y-5 lg:mt-10">
        <HeroCard avatar={assets.avatar} />
        <LandingEvidenceStrip session={session} />
      </main>
    </AppShell>
  );
}
