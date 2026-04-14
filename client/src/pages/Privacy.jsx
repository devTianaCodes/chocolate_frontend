import InfoPageTemplate from '../components/layout/InfoPageTemplate.jsx';

const sections = [
  {
    title: 'Account Information',
    body:
      'When customers create an account, we store the core information required to manage authentication, order history, and the signed-in purchasing experience across the storefront.',
  },
  {
    title: 'Checkout Data',
    body:
      'Delivery details, order totals, and payment-related order records are used only to complete and support the purchase process. Payment processing itself follows the configured provider workflow rather than exposing sensitive payment data inside the storefront UI.',
  },
  {
    title: 'Support And Newsletter Requests',
    body:
      'If a customer contacts the brand or requests to join the mailing list, the provided information is used only for that communication purpose. The goal is to keep contact handling limited, relevant, and brand-appropriate.',
  },
  {
    title: 'Cookies And Session Behaviour',
    body:
      'Cookies and session behaviour support authentication, cart continuity, and essential storefront interactions. They are used to maintain a functional ecommerce experience rather than to overload the customer with unnecessary prompts.',
  },
];

export default function Privacy() {
  return (
    <InfoPageTemplate
      eyebrow="Policy"
      title="Privacy Policy"
      intro="A concise explanation of how customer information supports the account, checkout, and communication features inside Chocolate Craft House."
      sections={sections}
    />
  );
}
