import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { HeatLevel } from "@/components/site/HeatLevel";
import { sauces, menuNotes, type SauceGroup } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/sauces")({
  head: () => ({
    meta: [
      { title: "Wing Sauces & Dry Rubs | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Every Pluckers homemade wing sauce and dry rub with heat levels — from Buffalo Mild to Fire in the Hole, plus the featured Pickle Dust rub.",
      },
      { property: "og:title", content: "Wing Sauces & Dry Rubs | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "Heat-rated sauces and dry rubs, from Buffalo Mild to Fire in the Hole.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SaucesPage,
});

const groups: SauceGroup[] = ["marks", "daves", "seans", "originals", "traditional", "rubs"];

function SaucesPage() {
  const { t, lang } = useLang();
  const featured = sauces.filter((s) => s.group === "featured");

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <PageHeader title={t("sauces.title")} sub={t("sauces.sub")} />

      <div className="sticky top-[68px] z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          <span className="hidden shrink-0 self-center pr-1 text-xs font-bold tracking-widest uppercase text-muted-foreground sm:block">
            {t("menu.jump")}
          </span>
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => jump(g)}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              {t(`sauce.${g}`)}
            </button>
          ))}
          <Link
            to="/menu"
            className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground"
          >
            {t("nav.menu")}
          </Link>
        </div>
      </div>

      <div className="container-x space-y-14 py-12">
        {featured.map((s) => (
          <section key={s.id} className="rounded-2xl border-2 border-accent bg-card p-6 sm:p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-accent">
              {t("sauce.featured")}
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none sm:text-5xl">
              {lang === "es" ? s.nameEs : s.name}
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              {lang === "es" ? s.descEs : s.desc}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <HeatLevel level={s.heat} label={`${t("sauces.heat")}: ${s.heat}/5`} />
              {s.dryRub && (
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  {t("sauce.dryRub")}
                </span>
              )}
            </div>
            {s.note && (
              <p className="mt-3 text-xs text-muted-foreground">
                {lang === "es" ? s.noteEs : s.note}
              </p>
            )}
          </section>
        ))}

        <p className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="font-bold text-foreground">{t("sauces.heat")}:</span>
          <HeatLevel level={5} />
          <span>{t("sauces.heatLegend")}</span>
        </p>

        {groups.map((g) => {
          const list = sauces.filter((s) => s.group === g);
          if (!list.length) return null;
          return (
            <section key={g} id={g} className="scroll-mt-40">
              <h2 className="mb-6 font-display text-3xl leading-none sm:text-4xl">
                {t(`sauce.${g}`)}
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <li key={s.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl leading-tight">
                        {lang === "es" ? s.nameEs : s.name}
                      </h3>
                      <HeatLevel
                        level={s.heat}
                        className="shrink-0"
                        label={`${t("sauces.heat")}: ${s.heat}/5`}
                      />
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {lang === "es" ? s.descEs : s.desc}
                    </p>
                    {s.dryRub && (
                      <span className="mt-3 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                        {t("sauce.dryRub")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <aside className="rounded-xl border-2 border-accent bg-card p-6">
          <p className="font-display text-2xl leading-none text-accent">{menuNotes.toss[lang]}</p>
          <Link
            to="/menu"
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            {t("sauces.backToMenu")} <ArrowRight className="size-4" />
          </Link>
        </aside>
      </div>
    </>
  );
}
