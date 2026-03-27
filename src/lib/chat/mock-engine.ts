import type { ChatMessage, MindState } from "@/src/lib/types";

function joinThemes(values: string[]) {
  if (values.length === 0) return "เรื่องเดิมๆ";
  if (values.length === 1) return values[0];
  return `${values.slice(0, -1).join(", ")} และ ${values.at(-1)}`;
}

export async function createMockReply(
  input: string,
  mindState: MindState,
  history: ChatMessage[],
) {
  const lower = input.toLowerCase();
  const fairThemes = joinThemes(mindState.fairCriticism);
  const unfairThemes = joinThemes(mindState.unfairAttacks);
  const rumorThemes = joinThemes(mindState.rumors);
  const growthThemes = joinThemes(mindState.growthSignals);
  
  const isSerious = /(เศร้า|เครียด|เสียใจ|เจ็บ|ท้อ|เหนื่อย|หนัก|ไม่ไหว|แย่)/.test(lower);
  const isQuestion = /(ไหม|จริงหรอ|ยังไง|หรอ|เหรอ|ป่ะ)/.test(lower);
  
  // Greeting or general check-in
  if (lower.length < 10 && !isQuestion) {
    if (isSerious) {
      return "เฮ้ย เป็นไรป่าว ดูทรงแล้วน่าจะหนักอยู่ มีอะไรระบายมาได้เลย พี่ฟังอยู่";
    }
    return "ว่าไง มีอะไรอยากระบาย หรืออยากให้พี่ช่วยดูเรื่องไหนเป็นพิเศษไหม วันนี้พร้อมฟังเต็มที่";
  }

  // Handling specific topics more naturally
  if (lower.includes("ยุติธรรม") || lower.includes("จริงไหม") || lower.includes("แฟร์")) {
    return `ถ้าให้พูดตรงๆ แบบไม่เข้าข้างนะ เรื่อง ${fairThemes} มันก็มีส่วนที่คนเค้าพูดกันถูกแหละ แต่พี่ว่าเราอย่าเพิ่งไปเหมาเข่งว่าเราผิดไปหมด แยกแยะเป็นเรื่องๆ ไปดีกว่า`;
  }

  if (lower.includes("ข่าวลือ") || lower.includes("คนพูดถึง")) {
    return `ไอ้พวก ${rumorThemes} นี่ตัวดีเลย อย่าไปให้ค่ามันมาก ส่วนใหญ่ก็เดากันไปเรื่อย ถ้าเรามัวแต่ไปฟังเสียงพวกนี้ เราเองนั่นแหละที่จะประสาทแดก เอาเวลามาโฟกัสที่ตัวเราดีกว่า`;
  }

  if (lower.includes("เติบโต") || lower.includes("เปลี่ยน")) {
    return `พี่เห็นเราพยายามอยู่นะ เรื่อง ${growthThemes} มันชัดขึ้นเยอะเลย การที่เราเริ่มคิดได้แบบนี้ พี่ว่ามันคือการเริ่มต้นที่ดีมากแล้วล่ะ ค่อยๆ เป็นค่อยๆ ไปนะ`;
  }

  if (isSerious) {
    return `เข้าใจเลยว่ามันยาก โดยเฉพาะตอนที่ต้องเจอเรื่อง ${unfairThemes} แบบนี้ บางทีความใจร้ายของคนมันก็เกินไปจริงๆ แต่เชื่อพี่นะ วันนึงเราจะข้ามมันไปได้`;
  }

  // Default fallback that feels like a real continuation
  const fallbacks = [
    `ฟังดูแล้วเข้าใจเลยนะ พี่ว่าเรื่อง ${mindState.summary.toLowerCase()} มันยังกวนใจเราอยู่ใช่ไหม ลองเล่าเจาะจงหน่อยดิว่าตรงไหนที่ทำให้เรารู้สึกติดขัดที่สุด`,
    `เออ พี่ฟังอยู่ เรื่อง ${fairThemes} กับ ${unfairThemes} มันปนๆ กันจนนัวไปหมดเลยเนอะ แล้วตอนนี้ใจเราเป็นไงบ้างล่ะไหวไหม`,
    `เอาจริงๆ พี่ว่าเราเก่งนะที่ผ่านเรื่องพวกนี้มาได้ โดยเฉพาะเรื่อง ${growthThemes} เนี่ย ลองดูดิว่ามีอะไรที่เราอยากปรับเพิ่มอีกไหม พี่พร้อมซัพพอร์ต`,
    "เล่าต่อดิ พี่อยากฟังมุมมองเรามากกว่านี้ ว่าเรื่องที่เกิดขึ้นมันกระทบใจเราท่าไหน"
  ];

  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}
