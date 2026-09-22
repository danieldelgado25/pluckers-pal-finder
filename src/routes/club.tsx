import { createFileRoute } from "@tanstack/react-router";
import {
  Cake,
  Coins,
  Gift,
  PartyPopper,
  Sparkles,
  Star,
  Ticket,
  Trophy,
  Utensils,
} from "lucide-react";
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
          "Join Pluckers Club Gold for $10 every 6 months: $15 off today, 10% cashback, free birthday meals, free food every dine-in visit and a Prize Wheel spin.",
      },
      { property: "og:title", content: "Pluckers Club Rewards" },
      {
        property: "og:description",
        content: "$406 of value in your first year — all the perks, none of the gimmicks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClubPage,
});

function ClubPage() {
  const { t, lang } = useLang();
  const es = lang === "es";

  const steps = [
    {
      icon: Ticket,
      en: ["Join free", "Sign up in the Pluckers Club app in under a minute — no plastic card."],
      es: ["Únete gratis", "Regístrate en la app del Club Pluckers en menos de un minuto."],
    },
    {
      icon: Star,
      en: ["Go Gold", "$10 every 6 months unlocks every perk on this page."],
      es: ["Hazte Gold", "$10 cada 6 meses desbloquea todos los beneficios de esta página."],
    },
    {
      icon: Gift,
      en: ["Cash in", "Earn, spin and redeem every single visit, dine-in or to-go."],
      es: ["Aprovecha", "Gana, gira y canjea en cada visita, en mesa o para llevar."],
    },
  ];

  const perks = [
    {
      icon: Coins,
      en: [
        "10% cashback",
        "1 point for every $1 on food and non-alcoholic drinks. 100 points = a $10 credit.",
      ],
      es: [
        "10% de reembolso",
        "1 punto por cada $1 en comida y bebidas sin alcohol. 100 puntos = $10 de crédito.",
      ],
    },
    {
      icon: Cake,
      en: [
        "Free birthday meals",
        "For you, your significant other and up to 3 kids — up to $85 per year.",
      ],
      es: [
        "Comidas de cumpleaños gratis",
        "Para ti, tu pareja y hasta 3 niños — hasta $85 al año.",
      ],
    },
    {
      icon: Utensils,
      en: [
        "Free food every dine-in visit",
        "Weekly rotating appetizer or dessert specials, up to $10 every visit.",
      ],
      es: [
        "Comida gratis en cada visita",
        "Entradas o postres especiales que rotan cada semana, hasta $10 por visita.",
      ],
    },
    {
      icon: Sparkles,
      en: [
        "Your annual custom benefit",
        "Pick your perk each year — including a free meal every month (up to $17).",
      ],
      es: [
        "Tu beneficio anual a elegir",
        "Elige tu beneficio cada año — incluye una comida gratis al mes (hasta $17).",
      ],
    },
    {
      icon: Trophy,
      en: [
        "Prize Wheel spin every visit",
        "Chance at the rotating Mega Prize or up to $200 in Pluckers e-gift cards.",
      ],
      es: [
        "Gira la Rueda de Premios cada visita",
        "Oportunidad de ganar el Mega Premio rotativo o hasta $200 en tarjetas de regalo.",
      ],
    },
    {
      icon: PartyPopper,
      en: ["Bonus point challenges", "Fun challenges in the app that stack up extra points."],
      es: ["Retos de puntos extra", "Retos divertidos en la app que suman puntos adicionales."],
    },
  ];

  const savings = [
    { en: "Free appetizer for joining Gold", es: "Entrada gratis por hacerte Gold", value: "$10" },
    { en: "$5 reward for joining the app", es: "$5 de recompensa por unirte a la app", value: "$5" },
    { en: "Free meal every month*", es: "Una comida gratis al mes*", value: "$17 × 12" },
    {
      en: "Free app/dessert every time you dine in**",
      es: "Entrada o postre gratis cada vez que comes aquí**",
      value: "$8.50 × 12",
    },
    {
      en: "Free birthday meals for you, your significant other and up to 3 kids",
      es: "Comidas de cumpleaños para ti, tu pareja y hasta 3 niños",
      value: "$85",
    },
  ];

  const prizes = [
    {
      en: ["Up to $200", "in Pluckers e-gift cards"],
      es: ["Hasta $200", "en tarjetas de regalo Pluckers"],
    },
    { en: ["Your favorite food", "on the house"], es: ["Tu comida favorita", "por nuestra cuenta"] },
    {
      en: ["Our rotating Mega Prize", "Nintendo Switches, Yeti coolers, airline gift cards"],
      es: ["El Mega Premio rotativo", "Nintendo Switch, hieleras Yeti, tarjetas de aerolíneas"],
    },
  ];

  const spinSteps = es
    ? [
        "Hazte miembro Gold y activa el acceso a tu ubicación en la app.",
        "Abre la app mientras estás en tu mesa.",
        "¡Gira y gana!",
      ]
    : [
        "Join Pluckers Club Gold and turn on location access in the app.",
        "Open the app while you're at your table.",
        "Spin & win!",
      ];

  return (
    <>
      <PageHeader title={t("club.title")} sub={t("club.sub")} />

      <div className="container-x py-12">
        {/* $15 off hero */}
        <section className="overflow-hidden rounded-xl border-2 border-brand-blue bg-brand-blue p-8 text-brand-blue-foreground sm:p-10">
          <p className="font-display text-5xl leading-none sm:text-6xl">
            {es ? "¿Quieres $15 de descuento hoy?" : "Want $15 off your meal today?"}
          </p>
          <p className="mt-4 max-w-2xl text-base font-medium">
            {es
              ? "Al unirte al Club Pluckers Gold recibes $5 de recompensa por entrar a la app más una ENTRADA GRATIS (hasta $10) por hacerte Gold."
              : "When you join Pluckers Club Gold, you get a $5 reward for joining the app plus a FREE APPETIZER (up to $10) for going Gold."}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-background/95 p-5 text-foreground">
              <h3 className="font-display text-2xl leading-none">
                {es ? "¿Listo para unirte?" : "Ready to join?"}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {es
                  ? "Descarga la app o pídele a tu mesero que te registre hoy."
                  : "Grab the app, or ask your server to sign you up today."}
              </p>
              <a
                href="https://www.pluckers.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground"
              >
                {t("club.join")}
              </a>
            </div>
            <div className="rounded-xl border-2 border-dashed border-brand-yellow p-5">
              <h3 className="font-display text-2xl leading-none text-brand-yellow">
                {es ? "¿Aún no te convence?" : "Still not convinced?"}
              </h3>
              <p className="mt-2 text-sm font-medium">
                {es
                  ? "Con la membresía Lite, que es gratis y limitada, aún recibes $5 de descuento hoy por unirte a la app."
                  : "If you join our free, limited Lite membership, you still get $5 off today for joining the app."}
              </p>
            </div>
          </div>
          <p className="mt-5 text-xs opacity-80">
            {es
              ? "*Las recompensas de bienvenida son válidas solo para nuevos miembros."
              : "*Onboarding rewards are valid for new members only."}
          </p>
        </section>

        {/* How it works */}
        <h2 className="mt-12 font-display text-3xl leading-none">{t("club.how")}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const [title, body] = es ? s.es : s.en;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <s.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl leading-none">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            );
          })}
        </div>

        {/* Perks */}
        <h2 className="mt-12 font-display text-4xl leading-none">
          {es ? "Todos los beneficios, cero trucos." : "All of the perks, none of the gimmicks."}
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p, i) => {
            const [title, body] = es ? p.es : p.en;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <span className="grid size-10 place-items-center rounded-full bg-brand-yellow text-brand-yellow-foreground">
                  <p.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-xl leading-tight">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            );
          })}
        </div>

        {/* Savings table */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-3xl leading-none">
              {es ? "Vale su peso en oro" : "Worth your weight in Gold"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {es
                ? "Esto es lo que puedes ahorrar en tu primer año como miembro Gold:"
                : "Here's how much you can save in your first year as a Pluckers Club Gold member:"}
            </p>
            <table className="mt-5 w-full text-left text-sm">
              <thead>
                <tr className="bg-brand-blue text-brand-blue-foreground">
                  <th className="rounded-l-md px-3 py-2 font-bold uppercase tracking-wide">
                    {es ? "Lo que recibes" : "What you get"}
                  </th>
                  <th className="rounded-r-md px-3 py-2 text-right font-bold uppercase tracking-wide">
                    {es ? "Valor" : "Value"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {savings.map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="px-3 py-3 text-muted-foreground">{es ? row.es : row.en}</td>
                    <td className="px-3 py-3 text-right font-bold whitespace-nowrap">
                      {row.value}
                    </td>
                  </tr>
                ))}
                <tr className="bg-brand-yellow text-brand-yellow-foreground">
                  <td className="rounded-l-md px-3 py-3 font-display text-xl leading-none">
                    {es ? "AHORRO TOTAL" : "TOTAL SAVINGS"}
                  </td>
                  <td className="rounded-r-md px-3 py-3 text-right font-display text-xl leading-none">
                    $406
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-4 text-sm font-semibold">
              {es
                ? "Todo por solo $10 cada 6 meses — que se pagan solos en cuanto llega esa entrada gratis a tu mesa."
                : "All for just $10 every 6 months — which pays for itself the second that free appetizer hits your table."}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              {es
                ? "*Miembros Gold, Platinum y Diamond pueden elegir Comidas Gratis Mensuales como beneficio anual. **Con la compra de dos platos fuertes de adulto. Los cálculos asumen una visita al mes; el ahorro varía según tus visitas."
                : "*Pluckers Club Gold, Platinum & Diamond members can select Monthly Free Meals as their custom annual benefit. **With the purchase of two adult entrées. Calculations are based on one visit per month; savings vary with the number of visits."}
            </p>
          </div>

          {/* Prize Wheel */}
          <div className="rounded-xl border-2 border-brand-yellow bg-card p-6 sm:p-8">
            <span className="rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-yellow-foreground">
              {es ? "Gira y gana" : "Spin & win"}
            </span>
            <h2 className="mt-4 font-display text-3xl leading-none">
              {es ? "Rueda de Premios del Club" : "Pluckers Club Prize Wheel"}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {es
                ? "Los miembros Gold, Platinum y Diamond giran la rueda en cada visita desde la app."
                : "Gold, Platinum and Diamond members spin the Prize Wheel during every visit on the Pluckers Club app."}
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {prizes.map((p, i) => {
                const [title, body] = es ? p.es : p.en;
                return (
                  <li key={i} className="rounded-xl bg-secondary p-4">
                    <p className="font-display text-lg leading-tight">{title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{body}</p>
                  </li>
                );
              })}
            </ul>
            <h3 className="mt-6 font-display text-2xl leading-none">
              {es ? "Cómo girar" : "How to spin"}
            </h3>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              {spinSteps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-muted-foreground">
              {es
                ? "Los premios de la rueda sustituyen el especial semanal rotativo del Club Pluckers."
                : "Prize Wheel prizes replace the existing Pluckers Club weekly rotating special."}
            </p>
          </div>
        </div>

        {/* Birthday + partners */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">
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
          <p className="mt-2 max-w-xl text-sm font-medium">
            {es
              ? "Hazte Gold por $10 cada 6 meses y empieza con $15 de descuento hoy."
              : "Go Gold for $10 every 6 months and start with $15 off today."}
          </p>
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
