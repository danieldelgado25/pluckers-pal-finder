import { createFileRoute } from "@tanstack/react-router";
import { Cake, Gift, Star, Ticket } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { partners } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/club")({
  head: () => ({
    meta: [
      { title: "Pluckers Club Rewards | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Join the Pluckers Club: points on every visit, a free appetizer to start, birthday perks and partner discounts.",
      },
      { property: "og:title", content: "Pluckers Club Rewards" },
      {
        property: "og:description",
        content: "Points, birthday perks and partner discounts — one card, every visit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClubPage,
});

function ClubPage() {
  const { t, lang } = useLang();

  const steps = [
    {
      icon: Ticket,
      en: ["Join free", "Sign up in under a minute — no plastic card required."],
      es: ["Únete gratis", "Regístrate en menos de un minuto, sin tarjeta física."],
    },
    {
      icon: Star,
      en: ["Earn points", "One point per dollar, every visit, dine-in or to-go."],
      es: ["Acumula puntos", "Un punto por dólar en cada visita, en mesa o para llevar."],
    },
    {
      icon: Gift,
      en: ["Redeem rewards", "Trade points for wings, apps and desserts."],
      es: ["Canjea recompensas", "Cambia puntos por alitas, entradas y postres."],
    },
  ];

  return (
    <>
      <PageHeader title={t("club.title")} sub={t("club.sub")} />

      <div className="container-x py-12">
        <h2 className="font-display text-3xl leading-none">{t("club.how")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const [title, body] = lang === "es" ? s.es : s.en;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <s.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl leading-none">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-display text-2xl leading-none">
              <Cake className="size-5 text-primary" />
              {t("club.birthday")}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("club.birthdayBody")}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl leading-none">{t("club.partners")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("club.partnersBody")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {partners.map((p) => (
                <li
                  key={p}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-muted-foreground"
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl bg-primary p-8 text-primary-foreground">
          <h2 className="font-display text-4xl leading-none">{t("home.club.title")}</h2>
          <p className="mt-2 max-w-xl text-sm font-medium">{t("home.club.body")}</p>
          <a
            href="https://www.pluckers.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block rounded-md bg-background px-5 py-3 font-bold text-foreground"
          >
            {t("club.join")}
          </a>
        </div>
      </div>
    </>
  );
}
