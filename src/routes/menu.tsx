import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, ChevronDown, Flame } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { menu, locations, type Category, type EntreeType } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Sauces, appetizers, entrées, sides and desserts at Pluckers Wing Bar — filter wings, boneless, sandwiches, burgers and salads.",
      },
      { property: "og:title", content: "Menu | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "Five simple sections, filterable entrées, and clear allergen info.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

const categories: Category[] = ["sauces", "apps", "entrees", "sides", "desserts"];
const entreeTypes: EntreeType[] = ["wings", "boneless", "sandwiches", "burgers", "salads"];

function MenuPage() {
  const { t, lang } = useLang();
  const [open, setOpen] = React.useState<Category[]>(["entrees"]);
  const [filter, setFilter] = React.useState<EntreeType | "all">("all");

  const toggle = (c: Category) =>
    setOpen((v) => (v.includes(c) ? v.filter((x) => x !== c) : [...v, c]));

  return (
    <>
      <PageHeader title={t("menu.title")} sub={t("menu.sub")} />

      <div className="container-x py-10">
        <div className="mb-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen(categories)}
            className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            {t("menu.expand")}
          </button>
          <button
            type="button"
            onClick={() => setOpen([])}
            className="rounded-md border border-border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
          >
            {t("menu.collapse")}
          </button>
        </div>

        <div className="space-y-4">
          {categories.map((cat) => {
            const isOpen = open.includes(cat);
            const items = menu.filter(
              (m) =>
                m.category === cat && (cat !== "entrees" || filter === "all" || m.type === filter),
            );

            return (
              <section key={cat} className="overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => toggle(cat)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary"
                >
                  <span className="font-display text-3xl leading-none">{t(`cat.${cat}`)}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-primary transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-border px-6 py-6">
                    {cat === "entrees" && (
                      <div className="mb-6">
                        <p className="mb-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                          {t("menu.filter.label")}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(["all", ...entreeTypes] as const).map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setFilter(f)}
                              className={cn(
                                "rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors",
                                filter === f
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border text-muted-foreground hover:text-foreground",
                              )}
                            >
                              {f === "all" ? t("menu.filter.all") : t(`sub.${f}`)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <ul className="grid gap-5 sm:grid-cols-2">
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
                                <span className="shrink-0 text-sm font-bold text-primary">
                                  {m.price}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {lang === "es" ? m.descEs : m.desc}
                            </p>
                            <div className="mt-2 flex flex-wrap items-center gap-3">
                              {typeof m.heat === "number" && m.heat > 0 && (
                                <span className="flex items-center gap-0.5 text-accent">
                                  {Array.from({ length: m.heat }).map((_, idx) => (
                                    <Flame key={idx} className="size-3.5" />
                                  ))}
                                </span>
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
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <aside className="mt-10 rounded-xl border-2 border-accent bg-card p-6">
          <h2 className="flex items-center gap-2 font-display text-2xl leading-none text-accent">
            <AlertTriangle className="size-5 shrink-0" />
            {t("menu.allergen.title")}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">{t("menu.allergen.body")}</p>
          <p className="mt-3 text-sm font-semibold">
            {t("menu.caution")}
          </p>
          <p className="mt-3 text-xs tracking-wide uppercase text-muted-foreground">
            {t("menu.allergen.updated")}: {new Date().toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { month: "long", year: "numeric" })}
          </p>
        </aside>
      </div>
    </>
  );
}
