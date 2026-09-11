import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsCarousel } from "@/components/site/NewsCarousel";
import { news } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Community | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Current Pluckers Wing Bar news, community giving updates, and an archive of past events and announcements.",
      },
      { property: "og:title", content: "News & Community | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "What's happening now, how we give back, and everything from the archive.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const { t, lang } = useLang();
  const [tab, setTab] = React.useState<"current" | "giving" | "archive">("current");

  const items = news.filter((n) => n.kind === tab);

  return (
    <>
      <PageHeader title={t("news.title")} sub={t("news.sub")} />

      <div className="container-x py-12">
        <NewsCarousel items={news.filter((n) => n.kind === "current")} />

        <div className="mt-10 flex flex-wrap gap-2">
          {(["current", "giving", "archive"] as const).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                tab === k
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {t(`news.${k}`)}
            </button>
          ))}
        </div>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {items.map((n) => (
            <li key={n.id} className="rounded-xl border border-border bg-card p-6">
              <p className="text-xs font-bold tracking-widest uppercase text-primary">
                {new Date(n.date).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <h2 className="mt-2 font-display text-2xl leading-tight">
                {lang === "es" ? n.titleEs : n.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "es" ? n.bodyEs : n.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
