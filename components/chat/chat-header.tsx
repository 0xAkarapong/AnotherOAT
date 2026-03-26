import { Bot, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { formatDateLabel } from "@/src/lib/utils";
import type { SessionState } from "@/src/lib/types";

export function ChatHeader({
  session,
  onRefresh,
  isRefreshing,
}: {
  session: SessionState;
  onRefresh: () => void;
  isRefreshing: boolean;
}) {
  return (
    <Panel className="p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs uppercase tracking-[0.22em] text-white/55">
            <Bot className="h-3.5 w-3.5" />
            Reflection Session
          </div>
          <div className="space-y-2">
            <h1 className="font-serif text-3xl text-white sm:text-4xl">
              คุยกับตัวตนที่ผ่านเสียงของโลกมาแล้ว
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-white/66 sm:text-base">
              พื้นที่นี้ไม่ใช่แค่แชต แต่คือการแยกให้ออกว่าอะไรคือคำวิจารณ์ที่ควรรับฟัง
              อะไรคือการโจมตี และอะไรยังเป็นเพียงความไม่ชัดเจน
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3 text-sm text-white/62 dark:bg-black/25">
            อัปเดตล่าสุด {formatDateLabel(session.fetchedAt)}
          </div>
          <Button onClick={onRefresh} type="button" variant="ghost">
            <Sparkles className="mr-2 h-4 w-4" />
            {isRefreshing ? "กำลังอัปเดตสัญญาณ..." : "รีเฟรชมุมมองล่าสุด"}
          </Button>
        </div>
      </div>
    </Panel>
  );
}
