import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake } from "lucide-react";
import heroImg from "@/assets/hero-wings.jpg";
import { LocationSelector } from "@/components/site/LocationSelector";
import { NewsCarousel } from "@/components/site/NewsCarousel";
import { dailySpecials, news } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pluckers Wing Bar | Wings, Sauces & Game Day in TX & LA" },
      {
        name: "description",
        content:
          "Hand-tossed wings and 20+ house sauces at Pluckers Wing Bar. Order online, join the waitlist, and check daily specials at 11 locations in Texas and Louisiana.",
      },
      { property: "og:title", content: "Pluckers Wing Bar | Wings, Sauces & Game Day" },
      {
        property: "og:description",
        content: "Wings, sauces and game day since 1995 — order online or find your location.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  const current = news.filter((n) => n.kind === "current");
  const giving = news.filter((n) => n.kind === "giving");

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="Platter of saucy Pluckers chicken wings with dipping sauces"
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="relative container-x py-20 sm:py-28">
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary">
            {t("home.tagline")}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">{t("home.hero.sub")}</p>
          <div id="order" className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.pluckers.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("home.hero.order")}
            </a>
            <Link
              to="/menu"
              className="rounded-md border border-border bg-background/60 px-6 py-3.5 font-bold backdrop-blur hover:border-primary hover:text-primary"
            >
              {t("home.hero.menu")}
            </Link>
          </div>
        </div>
      </section>

      <div className="container-x grid gap-6 py-14 lg:grid-cols-2">
        <LocationSelector />

        <div className="flex flex-col justify-between rounded-xl border-2 border-primary bg-card p-6 sm:p-8">
          <div>
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-widest uppercase text-primary-foreground">
              {t("home.grad.badge")}
            </span>
            <h2 className="mt-4 font-display text-4xl leading-none">{t("home.grad.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("home.grad.body")}</p>
          </div>
          <Link
            to="/catering"
            className="mt-6 inline-flex items-center gap-2 font-bold text-primary"
          >
            {t("home.grad.cta")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <section className="container-x pb-14">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-4xl leading-none">{t("home.news.title")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("home.news.sub")}</p>
            <div className="mt-5">
              <NewsCarousel items={current} />
            </div>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display text-4xl leading-none">
              <HeartHandshake className="size-7 text-primary" />
              {t("home.giving.title")}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{t("home.giving.sub")}</p>
            <ul className="mt-5 space-y-3">
              {giving.map((g) => (
                <li key={g.id} className="rounded-xl border border-border bg-card p-5">
                  <p className="text-xs font-bold tracking-widest uppercase text-primary">
                    {new Date(g.date).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
                      month: "short",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-tight">
                    {lang === "es" ? g.titleEs : g.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {lang === "es" ? g.bodyEs : g.body}
                  </p>
                </li>
              ))}
            </ul>
            <Link
              to="/news"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              {t("home.news.all")}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-14">
        <div className="container-x">
          <h2 className="font-display text-4xl leading-none">{t("home.daily.title")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("home.daily.sub")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {dailySpecials.map((d) => (
              <li key={d.day} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold tracking-widest uppercase text-primary">
                  {lang === "es" ? d.dayEs : d.day}
                </p>
                <p className="mt-2 font-display text-xl leading-tight">
                  {lang === "es" ? d.titleEs : d.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="rounded-xl bg-primary p-8 text-primary-foreground sm:p-12">
          <h2 className="font-display text-5xl leading-none">{t("home.club.title")}</h2>
          <p className="mt-3 max-w-xl font-medium">{t("home.club.body")}</p>
          <Link
            to="/club"
            className="mt-6 inline-block rounded-md bg-background px-6 py-3.5 font-bold text-foreground"
          >
            {t("home.club.cta")}
          </Link>
        </div>
      </section>
    </>
  );
}
