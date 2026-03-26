"use client";

import { LoaderCircle, RotateCcw, SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  onRetry,
  disabled,
  isStreaming,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onRetry?: () => void;
  disabled?: boolean;
  isStreaming?: boolean;
}) {
  return (
    <Panel className="sticky bottom-0 z-10 border-white/10 bg-[rgba(14,16,24,0.82)] p-3 backdrop-blur-xl sm:p-4">
      <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-3 dark:bg-black/30">
        <textarea
          className="min-h-24 w-full resize-none bg-transparent text-[15px] leading-7 text-white outline-none placeholder:text-white/35"
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          placeholder="พิมพ์สิ่งที่อยากคุย เช่น วันนี้ผมควรยอมรับอะไร และควรวางอะไรลงบ้าง"
          value={value}
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-6 text-white/42">
            คำตอบจะค่อย ๆ ปรากฏแบบสตรีม พร้อมสถานะ timeout, retry และ fallback
          </p>
          <div className="flex flex-wrap gap-2">
            {onRetry ? (
              <Button onClick={onRetry} type="button" variant="ghost">
                <RotateCcw className="mr-2 h-4 w-4" />
                ส่งข้อความล่าสุดอีกครั้ง
              </Button>
            ) : null}
            <Button disabled={disabled} onClick={onSubmit} type="button">
              {isStreaming ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <SendHorizonal className="mr-2 h-4 w-4" />
              )}
              {isStreaming ? "กำลังตอบ..." : "ส่งข้อความ"}
            </Button>
          </div>
        </div>
      </div>
    </Panel>
  );
}
