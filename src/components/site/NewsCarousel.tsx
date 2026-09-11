import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { NewsItem } from "@/lib/data";
import { cn } from "@/lib/utils";

export function NewsCarousel({ items }: { items: NewsItem[] }) {
  const { lang } = useLang();
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || items.length < 2) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % items.length), 6000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const item = items[i];
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-card p-6 sm:p-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <p className="text-xs font-bold tracking-widest uppercase text-primary">
        {new Date(item.date).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h3 className="mt-3 font-display text-3xl leading-tight sm:text-4xl">
        {lang === "es" ? item.titleEs : item.title}
      </h3>
      <p className="mt-3 max-w-xl text-muted-foreground">
        {lang === "es" ? item.bodyEs : item.body}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          className="grid size-9 place-items-center rounded-md border border-border hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          className="grid size-9 place-items-center rounded-md border border-border hover:border-primary hover:text-primary"
        >
          <ChevronRight className="size-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((n, idx) => (
            <button
              key={n.id}
              type="button"
              aria-label={n.title}
              onClick={() => setI(idx)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === i ? "w-6 bg-primary" : "w-2 bg-border",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
