import { Bot, User2 } from "lucide-react";

import { cn } from "@/src/lib/utils";
import type { ChatMessage } from "@/src/lib/types";

export function ChatMessageItem({
  message,
  streaming = false,
}: {
  message: ChatMessage;
  streaming?: boolean;
}) {
  const isAssistant = message.role === "assistant";

  return (
    <article
      className={cn("flex gap-3", isAssistant ? "justify-start" : "justify-end")}
      data-role={message.role}
    >
      {isAssistant ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/10 text-white/78">
          <Bot className="h-4 w-4" />
        </div>
      ) : null}

      <div
        className={cn(
          "max-w-[88%] rounded-[1.5rem] px-4 py-3 sm:max-w-[80%] sm:px-5",
          isAssistant
            ? "border border-white/12 bg-white/[0.065] text-white/88"
            : "bg-white text-slate-950",
        )}
      >
        <p className="text-[15px] leading-7 whitespace-pre-wrap">{message.content}</p>
        {streaming ? (
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-white/48">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white/65" />
            กำลังพิมพ์...
          </div>
        ) : null}
      </div>

      {!isAssistant ? (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-950">
          <User2 className="h-4 w-4" />
        </div>
      ) : null}
    </article>
  );
}
