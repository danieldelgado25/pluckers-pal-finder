import { createFileRoute } from "@tanstack/react-router";
import { PartyPopper, Truck, Users, Utensils } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/catering")({
  head: () => ({
    meta: [
      { title: "Catering & Parties | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Wing platters, party rooms and full-service catering from Pluckers Wing Bar for groups of 10 to 500.",
      },
      { property: "og:title", content: "Catering & Parties | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "Wings for 10 or 500 — drop-off platters, party rooms and full-service catering.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CateringPage,
});

function CateringPage() {
  const { t, lang } = useLang();

  const packages = [
    {
      icon: Utensils,
      en: ["Drop-off platters", "Wings, tenders and sides packed hot, delivered on your schedule.", "10–50 guests"],
      es: ["Platones a domicilio", "Alitas, tiras y guarniciones calientes, entregadas a tu hora.", "10–50 personas"],
    },
    {
      icon: PartyPopper,
      en: ["Party rooms", "Reserved space, dedicated server, screens for the game.", "15–80 guests"],
      es: ["Salones para fiestas", "Espacio reservado, mesero dedicado y pantallas para el partido.", "15–80 personas"],
    },
    {
      icon: Truck,
      en: ["Full-service catering", "Setup, chafers, staff and cleanup for the big one.", "50–500 guests"],
      es: ["Catering completo", "Montaje, calentadores, personal y limpieza para eventos grandes.", "50–500 personas"],
    },
  ];

  return (
    <>
      <PageHeader title={t("catering.title")} sub={t("catering.sub")} />

      <div className="container-x py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((p, i) => {
            const [title, body, size] = lang === "es" ? p.es : p.en;
            return (
              <div key={i} className="rounded-xl border border-border bg-card p-6">
                <p.icon className="size-6 text-primary" />
                <h2 className="mt-4 font-display text-2xl leading-none">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
                <p className="mt-4 flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-primary">
                  <Users className="size-3.5" />
                  {size}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-8">
          <h2 className="font-display text-3xl leading-none">{t("catering.quote")}</h2>
          <form
            className="mt-6 grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert(t("feedback.thanks"));
            }}
          >
            <input
              required
              placeholder={t("feedback.name")}
              className="rounded-md border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <input
              required
              type="email"
              placeholder={t("feedback.email")}
              className="rounded-md border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
            />
            <textarea
              required
              rows={4}
              placeholder={t("feedback.message")}
              className="rounded-md border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary sm:col-span-2"
            />
            <button
              type="submit"
              className="justify-self-start rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground sm:col-span-2"
            >
              {t("catering.quote")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
