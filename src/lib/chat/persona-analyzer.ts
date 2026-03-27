import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/src/lib/env";
import type { MentionItem } from "@/src/lib/types";

export async function analyzePersonaContext(mentions: MentionItem[]): Promise<string> {
  if (!env.claudeApiKey || mentions.length === 0) return "";

  const years = [...new Set(mentions.map((m) => new Date(m.publishedAt).getUTCFullYear()))].sort();
  const yearRange =
    years.length > 1 ? `${years[0]}–${years[years.length - 1]}` : String(years[0] ?? "");

  const mentionsSummary = mentions
    .slice(0, 20)
    .map((m) => `- [${new Date(m.publishedAt).getUTCFullYear()}] ${m.title}: ${m.snippet}`)
    .join("\n");

  try {
    const anthropic = new Anthropic({ apiKey: env.claudeApiKey });

    const msg = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: `จากข้อมูลข่าวและ mentions ของ โอ๊ต ปราโมทย์ ในช่วงปี ${yearRange} ต่อไปนี้:

${mentionsSummary}

สรุปเป็นภาษาไทย 3-5 ประโยคว่า: ในช่วงเวลานี้โอ๊ตกำลังเผชิญกับอะไร รู้สึกอย่างไร สังคมมองเขาว่าอะไร และเขาอยู่ในจุดไหนของชีวิต
เขียนในรูปแบบ "ช่วงนี้ โอ๊ตกำลัง..." เพื่อนำไปใช้เป็น context ให้ตัวละครโอ๊ตในการสนทนา ห้ามใส่หัวข้อหรือ bullet — เขียนเป็นย่อหน้าเดียว`,
        },
      ],
    });

    const content = msg.content[0];
    return content.type === "text" ? content.text.trim() : "";
  } catch {
    return "";
  }
}
