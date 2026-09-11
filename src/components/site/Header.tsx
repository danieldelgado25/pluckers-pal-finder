import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Menu as MenuIcon, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { cn } from "@/lib/utils";

const links = [
  { to: "/menu", key: "nav.menu" },
  { to: "/club", key: "nav.club" },
  { to: "/catering", key: "nav.catering" },
  { to: "/news", key: "nav.news" },
  { to: "/story", key: "nav.story" },
  { to: "/feedback", key: "nav.feedback" },
  { to: "/gift-cards", key: "nav.gift" },
] as const;

export function Header() {
  const { t } = useLang();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary font-display text-xl text-primary-foreground">
            P
          </span>
          <span className="truncate font-display text-2xl leading-none tracking-wide">
            Pluckers <span className="text-primary">Wing Bar</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Link
            to="/"
            hash="order"
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 md:inline-block"
          >
            {t("nav.order")}
          </Link>
          <button
            type="button"
            aria-label={open ? t("nav.close") : t("nav.open")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-md border border-border lg:hidden"
          >
            {open ? <X className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="container-x flex flex-col gap-1 py-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base font-semibold text-foreground hover:bg-secondary"
              activeProps={{ className: "text-primary" }}
            >
              {t(l.key)}
            </Link>
          ))}
          <div className="mt-3 flex items-center justify-between gap-3">
            <LanguageToggle />
            <Link
              to="/"
              hash="order"
              onClick={() => setOpen(false)}
              className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              {t("nav.order")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
