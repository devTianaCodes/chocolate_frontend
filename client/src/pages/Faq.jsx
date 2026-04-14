import InfoPageTemplate from '../components/layout/InfoPageTemplate.jsx';

const sections = [
  {
    title: 'Ordering',
    body:
      'Orders are confirmed after payment and move into small-batch preparation immediately. During peak gifting periods, dispatch can take slightly longer because each box is packed by hand rather than bulk processed.',
  },
  {
    title: 'Delivery Timing',
    body:
      'Standard dispatch usually leaves the atelier within two to three business days. Seasonal releases and high-volume gifting windows may extend that timing, but we keep the customer updated when fulfilment takes longer than expected.',
  },
  {
    title: 'Storage',
    body:
      'Chocolate is best kept in a cool, dry room away from direct sunlight and strong odours. Refrigeration is not our first recommendation because condensation can affect texture and finish once the product returns to room temperature.',
  },
  {
    title: 'Allergens',
    body:
      'Individual product pages reflect the most relevant ingredient information, but our assortment is prepared in an environment that handles milk, nuts, gluten, and other common allergens. Customers with strict dietary needs should review product details carefully before ordering.',
  },
  {
    title: 'Gifting',
    body:
      'Gift-ready collections are available year-round, with additional seasonal edits during holidays and special occasions. If you are ordering for a client, team, or event, the contact page is the right path for personalised assistance.',
  },
];

export default function Faq() {
  return (
    <InfoPageTemplate
      eyebrow="Customer care"
      title="FAQ"
      intro="The most common questions about ordering, delivery, storage, gifting, and the way our atelier handles premium chocolate fulfilment."
      sections={sections}
    />
  );
}
