import PageWrapper from '../components/layout/PageWrapper.jsx';
import aboutUs1 from '../assets/about-us1.png';
import aboutUs2 from '../assets/about-us2.png';
import aboutUs3 from '../assets/about-us3.png';
import aboutUs4 from '../assets/about-us4.png';

const storyBlocks = [
  {
    title: 'An atelier that stayed small on purpose',
    body: 'Chocolate Craft House began as a family-led workshop focused on slow tempering, careful sourcing, and recipes that privilege texture as much as flavor. We chose to remain deliberately small-batch so every collection can be adjusted by hand, tasted in-house, and released only when the finish feels exact.',
    align: 'left',
    image: aboutUs1,
  },
  {
    title: 'Cacao first, embellishment second',
    body: 'Our work starts with the bean profile: depth, acidity, roast response, and the way cocoa behaves once it is tempered and rested. From there we build pairings around restraint rather than excess, so nuts, fruit, spice, and floral notes support the chocolate instead of covering it.',
    align: 'right',
    image: aboutUs2,
  },
  {
    title: 'Crafted for gifting and daily ritual',
    body: 'Some boxes are designed for a table, some bars for an evening square, and some spreads for a slower breakfast. Across all of them, the standard stays the same: elegant finish, reliable snap, balanced sweetness, and packaging that feels as considered as the chocolate inside it.',
    align: 'left',
    image: aboutUs3,
  },
  {
    title: 'A modern house with classic discipline',
    body: 'We borrow from old-world chocolate houses where technique, repetition, and patience mattered more than speed. The result is a catalog that feels contemporary in presentation but classical in method: refined, precise, and meant to be returned to rather than consumed once and forgotten.',
    align: 'right',
    image: aboutUs4,
  },
];

function StoryImage({ image, title }) {
  return (
    <div className="relative min-h-[280px] overflow-hidden md:min-h-[380px] lg:min-h-[440px]">
      <img
        src={image}
        alt={title}
        className="h-full w-full scale-[1.08] object-cover"
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-[linear-gradient(to_right,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.34)_38%,transparent_100%)] sm:w-16 md:w-20 lg:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-[linear-gradient(to_left,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.34)_38%,transparent_100%)] sm:w-16 md:w-20 lg:w-24" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-[linear-gradient(to_bottom,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.34)_38%,transparent_100%)] sm:h-12 md:h-16 lg:h-20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-[linear-gradient(to_top,rgb(var(--color-page-bg))_0%,rgba(249,207,191,0.34)_38%,transparent_100%)] sm:h-12 md:h-16 lg:h-20" />
    </div>
  );
}

function StoryBlock({ title, body, align, image }) {
  const isRight = align === 'right';
  const content = (
    <div className="panel-wash-strong relative z-10 p-6 md:p-8">
      <div className="space-y-4">
        <p className="text-white text-xs uppercase tracking-[0.2em]">About us</p>
        <h2 className="text-panel-ink font-display text-display-sm">{title}</h2>
        <p className="text-panel-secondary text-body-md">{body}</p>
      </div>
    </div>
  );

  return (
    <section className="grid gap-6 md:grid-cols-2 md:gap-0">
      {isRight ? (
        <div className="order-2 pt-0 md:order-1 md:pt-[60px] md:-mr-12 lg:-mr-16">
          <StoryImage image={image} title={title} />
        </div>
      ) : (
        <div className="pt-0 md:pt-[120px] md:-mr-9 lg:-mr-[47px]">{content}</div>
      )}
      {isRight ? (
        <div className="order-1 pt-0 md:order-2 md:pt-[120px] md:-ml-9 lg:-ml-[47px]">{content}</div>
      ) : (
        <div className="pt-0 md:pt-[60px] md:-ml-12 lg:-ml-16">
          <StoryImage image={image} title={title} />
        </div>
      )}
    </section>
  );
}

export default function About() {
  return (
    <PageWrapper>
      <header className="panel-wash-strong mb-4 flex flex-col gap-4 p-6 md:mb-10 md:p-8">
        <p className="text-white text-xs uppercase tracking-[0.2em]">Our house</p>
        <h1 className="text-panel-ink font-display text-display-md">About us</h1>
        <p className="text-panel-secondary max-w-2xl text-body-md">
          Chocolate Craft House is a small-batch chocolate studio shaped by slow technique, ingredient clarity, and a belief that luxury should feel warm, tactile, and deeply memorable.
        </p>
      </header>

      <div className="space-y-0 md:-space-y-10 lg:-space-y-14">
        {storyBlocks.map((block) => (
          <StoryBlock
            key={block.title}
            title={block.title}
            body={block.body}
            align={block.align}
            image={block.image}
          />
        ))}
      </div>
    </PageWrapper>
  );
}
