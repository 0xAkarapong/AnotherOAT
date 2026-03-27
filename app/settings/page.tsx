import { AppShell } from "@/components/app-shell";
import { MotionWrapper } from "@/components/motion-wrapper";
import { assetsConfig } from "@/src/config/assets";
import { personaConfig } from "@/src/config/persona";
import { sourcesConfig } from "@/src/config/sources";
import { getPersonaProfile, getPersonaProfilePath } from "@/src/lib/chat/persona-profile";

export default async function SettingsPage() {
  const personaProfile = await getPersonaProfile();

  return (
    <AppShell eyebrow="หน้าดูค่าตั้งต้นรวมศูนย์">
      <div className="space-y-4 sm:space-y-5 lg:space-y-6">
        <MotionWrapper className="rounded-2xl border border-white/15 bg-white/8 p-4 shadow-glow backdrop-blur-xl sm:rounded-3xl sm:p-6 md:p-8">
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 sm:text-xs">ตั้งค่า</p>
          <h1 className="mt-1.5 font-serif text-2xl text-white sm:text-3xl md:text-4xl">แก้ค่าหลักของแอปได้จากไฟล์ config โดยตรง</h1>
          <div className="mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SettingsCard
              title="Persona Markdown"
              body={personaProfile || "(empty persona file)"}
              footer={getPersonaProfilePath()}
            />
            <SettingsCard
              title="แหล่งข้อมูล"
              body={sourcesConfig.searchTerms.join(", ")}
              footer={`ผู้ให้ข้อมูลที่เปิดอยู่: ${sourcesConfig.providerList.filter((item) => item.enabled).length}`}
            />
            <SettingsCard
              title="Framework"
              body={personaConfig.frameworkInstruction}
              footer={`Starter prompts: ${personaConfig.defaultStarterPrompts.length}`}
            />
            <SettingsCard
              title="ไฟล์ภาพ"
              body={[assetsConfig.avatarPath, assetsConfig.logoPath, assetsConfig.heroNoisePath].join("\n")}
              footer="ถ้ามีไฟล์จริงอยู่ตาม path นี้ ระบบจะใช้แทน placeholder อัตโนมัติ"
            />
          </div>
        </MotionWrapper>
      </div>
    </AppShell>
  );
}

function SettingsCard({
  title,
  body,
  footer,
}: {
  title: string;
  body: string;
  footer: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4 dark:bg-black/20 sm:rounded-[1.75rem] sm:p-5">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 sm:text-xs">{title}</p>
      <pre className="mt-2.5 whitespace-pre-wrap font-sans text-xs leading-5 text-white/72 sm:text-sm sm:leading-7">{body}</pre>
      <p className="mt-2.5 text-[10px] text-white/45 sm:text-xs">{footer}</p>
    </div>
  );
}
