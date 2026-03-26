import { AppShell } from "@/components/app-shell";
import { ClientChat } from "@/components/client-chat";
import { startSession } from "@/src/lib/session/session-service";

export default async function ChatPage() {
  const session = await startSession();

  return (
    <AppShell eyebrow="Premium reflection workspace">
      <main className="mt-8 space-y-5 lg:mt-10">
        <ClientChat initialMessages={[]} initialSession={session} />
      </main>
    </AppShell>
  );
}
