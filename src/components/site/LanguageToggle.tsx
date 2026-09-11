import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border border-border bg-secondary p-1",
        className,
      )}
      role="group"
      aria-label={t("lang.label")}
    >
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors",
            lang === l
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t(`lang.${l}`)}
        </button>
      ))}
    </div>
  );
}
