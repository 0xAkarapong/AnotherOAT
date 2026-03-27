import { featureFlags, env } from "@/src/lib/env";
import { createMockReply } from "@/src/lib/chat/mock-engine";
import { createOpenAiReply } from "@/src/lib/chat/openai-engine";
import { createClaudeReply } from "@/src/lib/chat/claude-engine";
import type { ChatMessage, MindState } from "@/src/lib/types";

export async function generateChatReply(
  input: string,
  mindState: MindState,
  history: ChatMessage[],
  personaContext = "",
) {
  if (env.claudeApiKey) {
    return createClaudeReply(input, mindState, history, personaContext);
  }

  if (featureFlags.hasAiProvider) {
    return createOpenAiReply(input, mindState, history, personaContext);
  }

  return createMockReply(input, mindState, history);
}
