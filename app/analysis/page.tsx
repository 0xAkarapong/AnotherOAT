import { AnalysisDashboardClient } from "@/components/analysis-dashboard-client";
import { AppShell } from "@/components/app-shell";
import { siteConfig } from "@/src/config/site";
import { startSession } from "@/src/lib/session/session-service";

export default async function AnalysisPage() {
  const currentYear = new Date().getUTCFullYear();
  const birthYear = new Date(siteConfig.birthDate).getUTCFullYear();
  const session = await startSession(false, undefined, {
    maxItems: 40,
    startYear: Math.max(birthYear, currentYear - 6),
    endYear: currentYear,
  });

  return (
    <AppShell eyebrow="Internet data analysis">
      <main className="mt-8 space-y-5 lg:mt-10">
        <AnalysisDashboardClient initialSession={session} />
      </main>
    </AppShell>
  );
}
