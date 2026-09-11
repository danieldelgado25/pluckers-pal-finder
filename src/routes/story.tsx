import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "How Pluckers Wing Bar grew from one Austin college hangout in 1995 into a Texas and Louisiana wing institution.",
      },
      { property: "og:title", content: "Our Story | Pluckers Wing Bar" },
      {
        property: "og:description",
        content: "From one Austin sports bar in 1995 to eleven locations across two states.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoryPage,
});

function StoryPage() {
  const { t, lang } = useLang();

  const timeline = [
    {
      year: "1995",
      en: ["Two roommates, one fryer", "Pluckers opens near the University of Texas campus in Austin."],
      es: ["Dos compañeros, una freidora", "Pluckers abre cerca del campus de UT en Austin."],
    },
    {
      year: "2003",
      en: ["The sauce board grows", "House sauces move from a handful to a full wall of options."],
      es: ["Crece el muro de salsas", "Las salsas de la casa pasan de unas pocas a una pared completa."],
    },
    {
      year: "2010",
      en: ["Beyond Austin", "Locations open in Dallas, Fort Worth, Houston and San Antonio."],
      es: ["Más allá de Austin", "Abren sucursales en Dallas, Fort Worth, Houston y San Antonio."],
    },
    {
      year: "2019",
      en: ["Across the state line", "Baton Rouge becomes the first location outside Texas."],
      es: ["Cruzando la frontera estatal", "Baton Rouge es la primera ubicación fuera de Texas."],
    },
    {
      year: "2026",
      en: ["Eleven locations", "Same wings, same sauce lab, more tables for the crew."],
      es: ["Once ubicaciones", "Las mismas alitas, el mismo laboratorio de salsas, más mesas."],
    },
  ];

  return (
    <>
      <PageHeader title={t("story.title")} sub={t("story.sub")} />

      <div className="container-x py-12">
        <ol className="relative space-y-8 border-l-2 border-border pl-8">
          {timeline.map((e) => {
            const [title, body] = lang === "es" ? e.es : e.en;
            return (
              <li key={e.year} className="relative">
                <span className="absolute -left-[41px] grid size-5 place-items-center rounded-full border-2 border-primary bg-background" />
                <p className="font-display text-3xl leading-none text-primary">{e.year}</p>
                <h2 className="mt-2 font-display text-2xl leading-none">{title}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{body}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}
