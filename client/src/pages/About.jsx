import PageWrapper from '../components/layout/PageWrapper.jsx';

const storyBlocks = [
  {
    title: 'An atelier that stayed small on purpose',
    body: 'Chocolate Craft House began as a family-led workshop focused on slow tempering, careful sourcing, and recipes that privilege texture as much as flavor. We chose to remain deliberately small-batch so every collection can be adjusted by hand, tasted in-house, and released only when the finish feels exact.',
    align: 'left',
  },
  {
    title: 'Cacao first, embellishment second',
    body: 'Our work starts with the bean profile: depth, acidity, roast response, and the way cocoa behaves once it is tempered and rested. From there we build pairings around restraint rather than excess, so nuts, fruit, spice, and floral notes support the chocolate instead of covering it.',
    align: 'right',
  },
  {
    title: 'Crafted for gifting and daily ritual',
    body: 'Some boxes are designed for a table, some bars for an evening square, and some spreads for a slower breakfast. Across all of them, the standard stays the same: elegant finish, reliable snap, balanced sweetness, and packaging that feels as considered as the chocolate inside it.',
    align: 'left',
  },
  {
    title: 'A modern house with classic discipline',
    body: 'We borrow from old-world chocolate houses where technique, repetition, and patience mattered more than speed. The result is a catalog that feels contemporary in presentation but classical in method: refined, precise, and meant to be returned to rather than consumed once and forgotten.',
    align: 'right',
  },
];

function StoryBlock({ title, body, align }) {
  const isRight = align === 'right';
  const content = (
    <div className="panel-wash-strong p-6 md:p-8">
      <div className="space-y-4">
        <p className="text-white text-xs uppercase tracking-[0.2em]">About us</p>
        <h2 className="text-panel-ink font-display text-display-sm">{title}</h2>
        <p className="text-panel-secondary text-body-md">{body}</p>
      </div>
    </div>
  );

  return (
    <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-12">
      {isRight ? <div className="hidden min-h-[240px] md:block" aria-hidden="true" /> : content}
      {isRight ? content : <div className="hidden min-h-[240px] md:block" aria-hidden="true" />}
    </section>
  );
}

export default function About() {
  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-10 flex flex-col gap-4 p-6 md:p-8">
        <p className="text-white text-xs uppercase tracking-[0.2em]">Our house</p>
        <h1 className="text-panel-ink font-display text-display-md">About us</h1>
        <p className="text-panel-secondary max-w-2xl text-body-md">
          Chocolate Craft House is a small-batch chocolate studio shaped by slow technique, ingredient clarity, and a belief that luxury should feel warm, tactile, and deeply memorable.
        </p>
      </header>

      <div className="space-y-8 md:space-y-10 lg:space-y-12">
        {storyBlocks.map((block) => (
          <StoryBlock
            key={block.title}
            title={block.title}
            body={block.body}
            align={block.align}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
