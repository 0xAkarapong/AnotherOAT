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
      className={cn("flex items-end gap-2.5 sm:gap-3", isAssistant ? "justify-start" : "justify-end")}
      data-role={message.role}
    >
      {isAssistant ? (
        <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white/78">
          <Bot className="h-4 w-4" />
        </div>
      ) : null}

      <div
        className={cn(
          "max-w-[85%] rounded-[1.4rem] px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.18)] sm:max-w-[72%]",
          isAssistant
            ? "rounded-bl-md border border-white/12 bg-white/[0.065] text-white/88"
            : "rounded-br-md bg-white text-slate-950",
        )}
      >
        <p className={cn("mb-1.5 text-[11px] font-medium", isAssistant ? "text-white/42" : "text-slate-500")}>
          {isAssistant ? "another oat" : "คุณ"}
        </p>
        <p className="whitespace-pre-wrap text-[15px] leading-7">{message.content}</p>
        {streaming ? (
          <div className="mt-2 inline-flex items-center gap-2 text-xs text-white/48">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white/65" />
            กำลังพิมพ์...
          </div>
        ) : null}
      </div>

      {!isAssistant ? (
        <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-950">
          <User2 className="h-4 w-4" />
        </div>
      ) : null}
    </article>
  );
}
