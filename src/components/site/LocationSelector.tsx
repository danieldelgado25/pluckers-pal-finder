import * as React from "react";
import { Check, ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import { locations } from "@/lib/data";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocationSelector() {
  const { t } = useLang();
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState<string | null>(null);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("pluckers-loc");
    if (stored) setId(stored);
  }, []);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const selected = locations.find((l) => l.id === id) ?? null;

  const pick = (v: string) => {
    setId(v);
    window.localStorage.setItem("pluckers-loc", v);
    setOpen(false);
  };

  const grouped = locations.reduce<Record<string, typeof locations>>((acc, l) => {
    (acc[l.region] ||= []).push(l);
    return acc;
  }, {});

  return (
    <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-display text-3xl leading-none">{t("home.location.title")}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{t("home.location.sub")}</p>

      <div ref={ref} className="relative mt-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-secondary px-4 py-3 text-left font-semibold"
        >
          <span className="min-w-0 truncate">
            {selected ? `${selected.city} — ${selected.name}` : t("home.location.choose")}
          </span>
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-primary transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>

        <div
          className={cn(
            "absolute z-40 mt-2 w-full origin-top overflow-hidden rounded-md border border-border bg-popover shadow-xl transition-all duration-200",
            open
              ? "max-h-96 overflow-y-auto opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          )}
        >
          {Object.entries(grouped).map(([region, locs]) => (
            <div key={region}>
              <p className="bg-secondary px-4 py-2 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                {region}
              </p>
              {locs.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => pick(l.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-secondary"
                >
                  <span className="min-w-0 truncate">
                    {l.city} — {l.name}
                  </span>
                  {id === l.id && <Check className="size-4 shrink-0 text-primary" />}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="mt-6 grid gap-3 text-sm">
          <p className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
            {selected.address}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Phone className="size-4 shrink-0 text-primary" />
            {selected.phone}
          </p>
          <p className="flex items-center gap-2 text-muted-foreground">
            <Clock className="size-4 shrink-0 text-primary" />
            {selected.hours}
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <a
              href="https://www.pluckers.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
            >
              {t("home.location.order")}
            </a>
            <a
              href="https://www.pluckers.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-border px-4 py-2 text-sm font-bold hover:border-primary hover:text-primary"
            >
              {t("home.location.waitlist")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
