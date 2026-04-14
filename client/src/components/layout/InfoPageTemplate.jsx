import PageWrapper from './PageWrapper.jsx';

function InfoSection({ title, body }) {
  return (
    <section className="border-t border-[rgba(var(--color-panel-border),0.18)] pt-5 first:border-t-0 first:pt-0">
      <h2 className="text-panel-ink font-display text-[28px] leading-none md:text-[32px]">{title}</h2>
      <p className="mt-3 max-w-3xl text-body-md leading-relaxed text-panel-secondary">{body}</p>
    </section>
  );
}

export default function InfoPageTemplate({ eyebrow, title, intro, sections }) {
  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="text-panel-secondary text-xs uppercase tracking-[0.2em]">{eyebrow}</p>
        <h1 className="text-panel-ink font-display text-display-md">{title}</h1>
        <p className="max-w-3xl text-body-md leading-relaxed text-panel-secondary">{intro}</p>
      </header>

      <div className="panel-wash-strong space-y-7 p-6 md:p-8">
        {sections.map((section) => (
          <InfoSection key={section.title} title={section.title} body={section.body} />
        ))}
      </div>
    </PageWrapper>
  );
}
