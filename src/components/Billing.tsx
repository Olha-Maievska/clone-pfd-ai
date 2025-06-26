import { Button } from './ui/button';

export const Billing = () => {
  return <a href={process.env.STRIPE_BILLING_PORTAL_URL!}>
	<Button variant="link">🧲 Billing</Button>
  </a>;
}
