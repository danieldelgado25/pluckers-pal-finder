import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import {
  menu,
  menuNotes,
  drinks,
  barSpecials,
  locations,
  type Category,
  type EntreeType,
} from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Wings, jumbo tenders, burgers, sandwiches, salads, sideline sides, dessert and drinks at Pluckers Wing Bar — jump straight to the section you want.",
      },
      { property: "og:title", content: "Menu | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "Jump to any section and filter entrées by wings, tenders, burgers, sandwiches or salads.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

const sections: Category[] = ["pregame", "entrees", "sideline", "desserts", "drinks"];
const entreeTypes: EntreeType[] = ["wings", "tenders", "burgers", "sandwiches", "salads"];
const drinkGroups = ["cocktails", "margaritas", "draft", "cans", "wine"] as const;

function MenuPage() {
  const { t, lang } = useLang();
  const [tab, setTab] = React.useState<EntreeType>("wings");

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goEntree = (type: EntreeType) => {
    setTab(type);
    jump("entrees");
  };

  return (
    <>
      <PageHeader title={t("menu.title")} sub={t("menu.sub")} />

      {/* Jump bar */}
      <div className="sticky top-[68px] z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container-x flex gap-2 overflow-x-auto py-3">
          <span className="hidden shrink-0 self-center pr-1 text-xs font-bold tracking-widest uppercase text-muted-foreground sm:block">
            {t("menu.jump")}
          </span>
          {sections.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => jump(s)}
              className="shrink-0 rounded-full border border-border px-4 py-1.5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              {t(`cat.${s}`)}
            </button>
          ))}
          <Link
            to="/sauces"
            className="shrink-0 rounded-full bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground"
          >
            {t("nav.sauces")}
          </Link>
        </div>
      </div>

      <div className="container-x space-y-16 py-12">
        {/* PREGAME */}
        <Section id="pregame" title={t("cat.pregame")}>
          <ItemGrid ids="pregame" lang={lang} t={t} />
        </Section>

        {/* ENTREES */}
        <Section id="entrees" title={t("cat.entrees")}>
          <div
            role="tablist"
            aria-label={t("menu.filter.label")}
            className="mb-8 flex flex-wrap gap-2 border-b border-border pb-4"
          >
            {entreeTypes.map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={tab === type}
                onClick={() => goEntree(type)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-bold transition-colors",
                  tab === type
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary",
                )}
              >
                {t(`sub.${type}`)}
              </button>
            ))}
          </div>

          <p className="mb-6 text-sm text-muted-foreground">{menuNotes.baskets[lang]}</p>

          {tab === "wings" ? (
            <WingMenu lang={lang} t={t} />
          ) : (
            <ItemGrid ids="entrees" type={tab} lang={lang} t={t} />
          )}

          {tab === "wings" && (
            <p className="mt-6 rounded-lg border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
              {menuNotes.wings[lang]}
            </p>
          )}
          {tab === "burgers" && (
            <p className="mt-6 rounded-lg border border-border bg-secondary/50 p-4 text-sm text-muted-foreground">
              {menuNotes.burgers[lang]}
            </p>
          )}

          <div className="mt-8 rounded-xl border-2 border-accent bg-card p-5">
            <p className="font-display text-2xl leading-none text-accent">{menuNotes.toss[lang]}</p>
            <Link
              to="/sauces"
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              {t("menu.seeSauces")} <ArrowRight className="size-4" />
            </Link>
          </div>
        </Section>

        {/* SIDELINE */}
        <Section id="sideline" title={t("cat.sideline")}>
          <ItemGrid ids="sideline" lang={lang} t={t} />
        </Section>

        {/* DESSERT */}
        <Section id="desserts" title={t("cat.desserts")}>
          <ItemGrid ids="desserts" lang={lang} t={t} />
        </Section>

        {/* DRINKS */}
        <Section id="drinks" title={t("cat.drinks")}>
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {[barSpecials.happyHour[lang], barSpecials.allDay[lang], barSpecials.events[lang]].map(
              (text) => (
                <p
                  key={text}
                  className="rounded-lg border border-border bg-secondary/50 p-4 text-sm text-muted-foreground"
                >
                  {text}
                </p>
              ),
            )}
          </div>

          <div className="space-y-10">
            {drinkGroups.map((g) => (
              <div key={g}>
                <h3 className="mb-4 font-display text-2xl leading-none text-primary">
                  {t(`drink.${g}`)}
                </h3>
                <ul className="grid gap-5 sm:grid-cols-2">
                  {drinks
                    .filter((d) => d.group === g)
                    .map((d) => (
                      <li key={d.id} className="border-b border-border pb-4 last:border-0">
                        <div className="flex items-baseline justify-between gap-4">
                          <h4 className="font-display text-xl leading-tight">{d.name}</h4>
                          {d.price && (
                            <span className="shrink-0 text-sm font-bold text-primary">{d.price}</span>
                          )}
                        </div>
                        {(lang === "es" ? d.descEs : d.desc) && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {lang === "es" ? d.descEs : d.desc}
                          </p>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <aside className="rounded-xl border-2 border-accent bg-card p-6">
          <h2 className="flex items-center gap-2 font-display text-2xl leading-none text-accent">
            <AlertTriangle className="size-5 shrink-0" />
            {t("menu.allergen.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("menu.allergen.body")}</p>
          <p className="mt-3 text-sm font-semibold">{t("menu.caution")}</p>
          <p className="mt-3 text-sm text-muted-foreground">{menuNotes.party[lang]}</p>
        </aside>
      </div>
    </>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-40">
      <h2 className="mb-6 font-display text-4xl leading-none sm:text-5xl">{title}</h2>
      {children}
    </section>
  );
}

function ItemGrid({
  ids,
  type,
  lang,
  t,
}: {
  ids: Category;
  type?: EntreeType;
  lang: "en" | "es";
  t: (k: string) => string;
}) {
  const items = menu.filter((m) => m.category === ids && (!type || m.type === type));
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {items.map((m) => {
        const missing = (m.unavailableAt ?? [])
          .map((id) => locations.find((l) => l.id === id)?.city)
          .filter(Boolean);
        return (
          <li key={m.id} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl leading-tight">
                {lang === "es" ? m.nameEs : m.name}
                {m.allergen && (
                  <span className="ml-1 font-bold text-accent" aria-hidden>
                    *
                  </span>
                )}
              </h3>
              {m.price && (
                <span className="shrink-0 text-sm font-bold text-primary">{m.price}</span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {lang === "es" ? m.descEs : m.desc}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {m.calories && (
                <span className="text-xs italic text-muted-foreground">{m.calories}</span>
              )}
              {missing.length > 0 && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                  {t("menu.notAll")}: {missing.join(", ")}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function WingMenu({
  lang,
  t,
}: {
  lang: "en" | "es";
  t: (k: string) => string;
}) {
  const wingItems = menu.filter((item) => item.category === "entrees" && item.type === "wings");
  const sizes = [5, 10, 15].map((count) => ({
    count,
    base: wingItems.find((item) => item.id === `wings-${count}`),
    combo: wingItems.find((item) => item.id === `wing-combo-${count}`),
  }));
  const extras = wingItems.filter(
    (item) => !sizes.some(({ base, combo }) => item.id === base?.id || item.id === combo?.id),
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 font-display text-2xl leading-none">{t("menu.wings.choose")}</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {sizes.map(({ count, base, combo }) => {
            if (!base || !combo) return null;
            return (
              <li key={count} className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-display text-3xl leading-none">
                      {lang === "es" ? base.nameEs : base.name}
                    </h4>
                    <span className="shrink-0 font-bold text-primary">{base.price}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {lang === "es" ? base.descEs : base.desc}
                  </p>
                </div>
                <div className="border-t border-brand-yellow bg-brand-yellow/15 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-xl leading-none text-foreground">
                      {t("menu.wings.combo")}
                    </span>
                    <span className="font-bold text-primary">{combo.price}</span>
                  </div>
                  <p className="mt-1 text-xs font-semibold text-muted-foreground">
                    {t("menu.wings.comboIncludes")}
                  </p>
                  {combo.calories && (
                    <p className="mt-2 text-xs italic text-muted-foreground">{combo.calories}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="mb-4 font-display text-2xl leading-none">{t("menu.wings.more")}</h3>
        <ul className="grid gap-6 sm:grid-cols-2">
          {extras.map((item) => (
            <li key={item.id} className="border-b border-border pb-4 last:border-0">
              <div className="flex items-baseline justify-between gap-4">
                <h4 className="font-display text-xl leading-tight">
                  {lang === "es" ? item.nameEs : item.name}
                </h4>
                {item.price && (
                  <span className="shrink-0 text-sm font-bold text-primary">{item.price}</span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {lang === "es" ? item.descEs : item.desc}
              </p>
              {item.calories && (
                <p className="mt-2 text-xs italic text-muted-foreground">{item.calories}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
