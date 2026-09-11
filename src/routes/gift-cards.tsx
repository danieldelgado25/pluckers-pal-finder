import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/gift-cards")({
  head: () => ({
    meta: [
      { title: "Gift Cards | Pluckers Wing Bar" },
      {
        name: "description",
        content:
          "Buy a Pluckers Wing Bar gift card or check your balance — available in English and Spanish.",
      },
      { property: "og:title", content: "Gift Cards | Pluckers Wing Bar" },
      { property: "og:description", content: "Buy a card or check a balance in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GiftPage,
});

function GiftPage() {
  const { t } = useLang();
  const [num, setNum] = React.useState("");
  const [msg, setMsg] = React.useState<string | null>(null);

  return (
    <>
      <PageHeader title={t("gift.title")} sub={t("gift.sub")} />

      <div className="container-x py-12">
        <div className="rounded-xl bg-primary p-10 text-primary-foreground">
          <p className="font-display text-5xl leading-none sm:text-6xl">Pluckers</p>
          <p className="mt-2 max-w-md font-semibold">{t("gift.sub")}</p>
          <a
            href="https://www.pluckers.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-md bg-background px-5 py-3 font-bold text-foreground"
          >
            {t("gift.buy")}
          </a>
        </div>

        <div className="mt-8 max-w-lg rounded-xl border border-border bg-card p-8">
          <h2 className="font-display text-2xl leading-none">{t("gift.balance")}</h2>
          <form
            className="mt-4 grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              setMsg(
                num.replace(/\D/g, "").length === 16
                  ? "$25.00"
                  : t("gift.balanceResult"),
              );
            }}
          >
            <label className="grid gap-1.5 text-sm font-semibold">
              {t("gift.balanceLabel")}
              <input
                value={num}
                onChange={(e) => setNum(e.target.value)}
                inputMode="numeric"
                placeholder="0000 0000 0000 0000"
                className="rounded-md border border-border bg-secondary px-4 py-3 font-normal outline-none focus:border-primary"
              />
            </label>
            <button
              type="submit"
              className="justify-self-start rounded-md bg-primary px-5 py-3 font-bold text-primary-foreground"
            >
              {t("gift.check")}
            </button>
          </form>
          {msg && <p className="mt-4 font-display text-3xl leading-none text-primary">{msg}</p>}
        </div>
      </div>
    </>
  );
}
