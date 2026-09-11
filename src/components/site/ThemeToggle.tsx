import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const { lang } = useLang();

  const label =
    theme === "dark"
      ? lang === "es"
        ? "Cambiar a modo claro"
        : "Switch to light mode"
      : lang === "es"
        ? "Cambiar a modo oscuro"
        : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-full border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
