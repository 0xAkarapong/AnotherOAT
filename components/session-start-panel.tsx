"use client";

import { LoaderCircle, Radio, TrendingUp } from "lucide-react";

import { cn } from "@/src/lib/utils";
import type { SessionProgressEvent, SessionState } from "@/src/lib/types";

export function SessionStartPanel({
  events,
  active,
  session,
}: {
  events: SessionProgressEvent[];
  active: boolean;
  session?: SessionState | null;
}) {
  const chartPoints = events
    .filter((event) => typeof event.count === "number")
    .map((event, index) => ({
      x: index,
      y: event.count ?? 0,
    }));

  const sourceBuckets = new Map<string, number>();
  for (const mention of session?.mentions ?? []) {
    sourceBuckets.set(mention.source, (sourceBuckets.get(mention.source) ?? 0) + 1);
  }

  const sourceRows = [...sourceBuckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxBucket = Math.max(...sourceRows.map((row) => row[1]), 1);

  return (
    <div className="rounded-[1.75rem] border border-white/12 bg-black/20 p-4 backdrop-blur-xl dark:bg-black/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">Live research visualization</p>
          <h3 className="mt-2 font-serif text-xl text-white">
            กราฟสดของการ populate ข้อมูลในรอบ session start
          </h3>
          <p className="mt-2 text-sm leading-7 text-white/58">
            แสดงลำดับเหตุการณ์จริงระหว่างค้นหา ดึงข้อมูล คัดกรอง และสรุปสภาพใจ
          </p>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-100">
          <Radio className="h-3.5 w-3.5" />
          {active ? "streaming" : "standby"}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-white/66">
            <TrendingUp className="h-4 w-4" />
            Real-time event population
          </div>
          <div className="mt-4 h-40 rounded-2xl border border-white/8 bg-black/20 p-3 dark:bg-black/25">
            <svg className="h-full w-full" viewBox="0 0 320 120">
              <defs>
                <linearGradient id="session-line" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(214,181,255,1)" />
                  <stop offset="100%" stopColor="rgba(116,202,255,1)" />
                </linearGradient>
              </defs>
              <path
                d={buildPath(chartPoints)}
                fill="none"
                stroke="url(#session-line)"
                strokeLinecap="round"
                strokeWidth="3"
              />
              {chartPoints.map((point, index) => (
                <circle
                  cx={mapX(index, chartPoints.length)}
                  cy={mapY(point.y, chartPoints)}
                  fill="white"
                  key={`${point.x}-${point.y}`}
                  r="3.5"
                />
              ))}
            </svg>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-white/42">
            <span>เริ่มเซสชัน</span>
            <span>{active ? "กำลัง populate" : "พร้อมรอบถัดไป"}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/66">Source distribution</p>
            <div className="mt-4 space-y-3">
              {sourceRows.length > 0 ? (
                sourceRows.map(([source, count]) => (
                  <div key={source}>
                    <div className="mb-1 flex items-center justify-between text-xs text-white/52">
                      <span className="truncate pr-3">{source}</span>
                      <span>{count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8">
                      <div
                        className="h-2 rounded-full bg-[linear-gradient(90deg,rgba(214,181,255,0.95),rgba(116,202,255,0.95))]"
                        style={{ width: `${(count / maxBucket) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/45">กดเริ่มเซสชันเพื่อดูแหล่งข้อมูลที่ populate แบบสด</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {events.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/12 bg-black/10 px-4 py-3 text-sm text-white/50 dark:bg-black/20">
                เมื่อเริ่มเซสชัน แผงนี้จะโชว์ progress feed และกราฟ populate แบบสด
              </div>
            ) : (
              events.slice(-5).map((event, index) => (
                <div
                  className={cn(
                    "rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/80",
                    index === events.slice(-5).length - 1 ? "bg-white/10" : "bg-white/5",
                  )}
                  key={event.id}
                >
                  <div className="flex items-start gap-3">
                    {active && index === events.slice(-5).length - 1 ? (
                      <LoaderCircle className="mt-0.5 h-4 w-4 animate-spin text-white/80" />
                    ) : (
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/55" />
                    )}
                    <div className="min-w-0">
                      <p>{event.message}</p>
                      <p className="mt-1 text-xs text-white/45">
                        {[event.detail, event.source, event.count ? `${event.count} จุดข้อมูล` : undefined]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapX(index: number, total: number) {
  if (total <= 1) return 16;
  return 16 + (index / (total - 1)) * 288;
}

function mapY(value: number, points: { x: number; y: number }[]) {
  const max = Math.max(...points.map((point) => point.y), 1);
  return 104 - (value / max) * 88;
}

function buildPath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    return `M ${mapX(0, 1)} ${mapY(points[0].y, points)}`;
  }

  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${mapX(index, points.length)} ${mapY(point.y, points)}`)
    .join(" ");
}
