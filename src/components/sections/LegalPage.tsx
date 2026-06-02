type LegalSection = {
  title: string
  body: string[]
}

type LegalPageProps = {
  title: string
  updatedAt: string
  intro?: string[]
  sections: LegalSection[]
}

export function LegalPage({ title, updatedAt, intro = [], sections }: LegalPageProps) {
  return (
    <main className="bg-surface pt-28 pb-20">
      <section className="w-full max-w-[920px] mx-auto px-6">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-growth">Scalvia</p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-ink text-balance">
            {title}
          </h1>
          <p className="mt-4 text-base text-ink-60">Última actualización: {updatedAt}</p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-soft">
          {intro.length > 0 && (
            <div className="mb-9 space-y-4 text-base sm:text-lg leading-8 text-ink-60">
              {intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}

          <div className="space-y-9">
            {sections.map((section, index) => {
              const headingId = `legal-section-${index + 1}`

              return (
                <section key={section.title} aria-labelledby={headingId}>
                  <h2 id={headingId} className="text-xl sm:text-2xl font-extrabold tracking-tight text-ink">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-8 text-ink-60">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
