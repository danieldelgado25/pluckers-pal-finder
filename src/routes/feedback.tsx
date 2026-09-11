import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { locations } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Tell Pluckers Wing Bar how your visit went. Short form, available in English and Spanish.",
      },
      { property: "og:title", content: "Feedback | Pluckers Wing Bar" },
      { property: "og:description", content: "Tell us how we did — we read all of it." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const { t } = useLang();
  const [sent, setSent] = React.useState(false);

  return (
    <>
      <PageHeader title={t("feedback.title")} sub={t("feedback.sub")} />

      <div className="container-x py-12">
        <div className="max-w-2xl rounded-xl border border-border bg-card p-8">
          {sent ? (
            <p className="font-display text-2xl leading-none text-primary">{t("feedback.thanks")}</p>
          ) : (
            <form
              className="grid gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("feedback.name")}
                <input
                  required
                  className="rounded-md border border-border bg-secondary px-4 py-3 font-normal outline-none focus:border-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("feedback.email")}
                <input
                  required
                  type="email"
                  className="rounded-md border border-border bg-secondary px-4 py-3 font-normal outline-none focus:border-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("feedback.location")}
                <select
                  required
                  defaultValue=""
                  className="rounded-md border border-border bg-secondary px-4 py-3 font-normal outline-none focus:border-primary"
                >
                  <option value="" disabled>
                    {t("home.location.choose")}
                  </option>
                  {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.city} — {l.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5 text-sm font-semibold">
                {t("feedback.message")}
                <textarea
                  required
                  rows={5}
                  className="rounded-md border border-border bg-secondary px-4 py-3 font-normal outline-none focus:border-primary"
                />
              </label>
              <button
                type="submit"
                className="justify-self-start rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground"
              >
                {t("feedback.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
