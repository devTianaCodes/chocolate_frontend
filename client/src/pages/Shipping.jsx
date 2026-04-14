import InfoPageTemplate from '../components/layout/InfoPageTemplate.jsx';

const sections = [
  {
    title: 'Dispatch Rhythm',
    body:
      'Orders are dispatched from our atelier on business days once payment is confirmed and packing is complete. Because the assortment includes delicate finishes and seasonal items, we prioritise product condition over raw dispatch speed.',
  },
  {
    title: 'Warm Weather Handling',
    body:
      'During warmer periods we monitor temperature closely and may adjust packing methods or dispatch windows to protect the chocolate in transit. This helps preserve appearance, texture, and shelf quality on arrival.',
  },
  {
    title: 'Address Accuracy',
    body:
      'Customers should review the delivery address carefully before placing the order. Premium chocolate is time-sensitive in transit, so incorrect delivery information creates a real risk of failed arrival quality.',
  },
  {
    title: 'Delivery Windows',
    body:
      'Estimated delivery timing depends on the selected service level and destination. While carriers provide expected windows, the atelier focuses on dispatch quality and secure packing before handoff.',
  },
];

export default function Shipping() {
  return (
    <InfoPageTemplate
      eyebrow="Service information"
      title="Shipping & Delivery"
      intro="A clear overview of how Chocolate Craft House dispatches, protects, and delivers premium chocolate orders."
      sections={sections}
    />
  );
}
