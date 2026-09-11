export function PageHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-x py-14">
        <h1 className="font-display text-5xl leading-none sm:text-6xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{sub}</p>
      </div>
    </section>
  );
}
