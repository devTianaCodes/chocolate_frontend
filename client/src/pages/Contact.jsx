import InfoPageTemplate from '../components/layout/InfoPageTemplate.jsx';

const sections = [
  {
    title: 'Customer Care',
    body:
      'For order assistance, delivery questions, or product care enquiries, customers can reach the house at hello@chocolatecrafthouse.com. We aim to respond with the same tone and attention we bring to the chocolate itself.',
  },
  {
    title: 'Response Time',
    body:
      'Most enquiries receive a reply within one to two business days. During major gifting periods, response times may extend slightly, but we keep communication direct and practical.',
  },
  {
    title: 'Gifting And Business Enquiries',
    body:
      'If you are arranging hospitality gifting, corporate orders, or larger curated selections, contact us directly so the request can be handled with the right level of product and packaging attention.',
  },
  {
    title: 'Social Presence',
    body:
      'Chocolate Craft House maintains a light social presence to share atmosphere, gifting releases, and atelier moments. The footer links connect to the general platforms while dedicated brand handles can be introduced later.',
  },
];

export default function Contact() {
  return (
    <InfoPageTemplate
      eyebrow="Get in touch"
      title="Contact"
      intro="The simplest contact points for customer care, gifting requests, and general communication with the Chocolate Craft House atelier."
      sections={sections}
    />
  );
}
