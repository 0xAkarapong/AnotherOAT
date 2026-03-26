import { createMockReply } from "@/src/lib/chat/mock-engine";
import { generateChatReply } from "@/src/lib/chat";
import { getCurrentSession, startSession } from "@/src/lib/session/session-service";
import type { ChatMessage } from "@/src/lib/types";

function chunkText(value: string) {
  return value.split(/(\s+)/).filter(Boolean);
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    input: string;
    history: ChatMessage[];
  };

  const encoder = new TextEncoder();
  const session = (await getCurrentSession()) ?? (await startSession());

  const stream = new ReadableStream({
    async start(controller) {
      let text = "";
      let mode = "openai";

      try {
        text = await generateChatReply(body.input, session.mindState, body.history ?? []);
      } catch (error) {
        console.error("api/chat/stream error", error);
        text = `${createMockReply(body.input, session.mindState, body.history ?? [])}\n\n[ระบบใช้คำตอบสำรองชั่วคราว เพราะบริการ AI ภายนอกยังไม่พร้อม]`;
        mode = "mock-fallback";
      }

      for (const piece of chunkText(text)) {
        controller.enqueue(
          encoder.encode(`${JSON.stringify({ type: "chunk", text: piece })}\n`),
        );
        await new Promise((resolve) => setTimeout(resolve, 35));
      }

      controller.enqueue(encoder.encode(`${JSON.stringify({ type: "done", mode })}\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
