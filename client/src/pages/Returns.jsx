import InfoPageTemplate from '../components/layout/InfoPageTemplate.jsx';

const sections = [
  {
    title: 'Damaged Parcels',
    body:
      'If an order arrives visibly damaged, customers should contact us as soon as possible with the order number and a short description of the issue. Rapid reporting helps us assess transit damage and respond appropriately.',
  },
  {
    title: 'Perishable Care',
    body:
      'Chocolate is a sensitive food product, so returns are handled differently from non-perishable goods. We review quality issues case by case, with particular attention to transit conditions and storage after delivery.',
  },
  {
    title: 'Storage After Delivery',
    body:
      'Once an order has been delivered, correct storage becomes part of product care. For the best experience, customers should keep the assortment in a cool, dry environment away from heat and direct light.',
  },
  {
    title: 'Satisfaction Support',
    body:
      'When something is not right, we prefer a direct support conversation rather than a generic return form. This allows us to review the situation properly and respond in a way that protects both product quality and customer trust.',
  },
];

export default function Returns() {
  return (
    <InfoPageTemplate
      eyebrow="Customer care"
      title="Returns & Care"
      intro="Guidance on damaged deliveries, storage expectations, and the support path when a chocolate order does not arrive as expected."
      sections={sections}
    />
  );
}
