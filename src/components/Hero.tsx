export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center md:px-6 md:py-20">
        <p className="text-sm font-bold uppercase tracking-widest text-primary">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold text-balance text-accent md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
          {description}
        </p>
      </div>
    </section>
  )
}
