import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div>
          <p className="font-display text-3xl leading-none">
            Pluckers <span className="text-primary">Wing Bar</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">{t("home.tagline")}</p>
          <p className="mt-4 max-w-xs font-display text-2xl leading-tight text-foreground">
            {t("brand.slogan")}
          </p>
          <div className="mt-5 flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase text-primary">
            {t("footer.explore")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/menu", key: "nav.menu" },
              { to: "/club", key: "nav.club" },
              { to: "/catering", key: "nav.catering" },
              { to: "/gift-cards", key: "nav.gift" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {t(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase text-primary">
            {t("footer.company")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { to: "/story", key: "nav.story" },
              { to: "/news", key: "nav.news" },
              { to: "/feedback", key: "nav.feedback" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-foreground">
                  {t(l.key)}
                </Link>
              </li>
            ))}
            <li className="text-muted-foreground">{t("footer.careers")}</li>
            <li className="text-muted-foreground">{t("footer.corporate")}</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold tracking-widest uppercase text-primary">
            {t("footer.connect")}
          </h3>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="https://www.pluckers.com/"
                target="_blank"
                rel="noreferrer"
                className="grid size-10 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Pluckers Wing Bar. {t("footer.rights")}
      </div>
    </footer>
  );
}
