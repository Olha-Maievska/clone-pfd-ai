import Script from "next/script";

interface Props {
  clientReferenceId: string;
  customerEmail: string;
}

export const PricingTable = ({ clientReferenceId, customerEmail }: Props) => {
  return (
    <>
      <Script
        async
        strategy="lazyOnload"
        src="https://js.stripe.com/v3/pricing-table.js"
      ></Script>
      <stripe-pricing-table
        pricing-table-id="prctbl_1RdwQlRYwEpXZWg5UE13Hnow"
        publishable-key="pk_test_51RdbVKRYwEpXZWg5vx1LKNQUfZjwQx3KmhYh5PcBoVjWZXQeOzofjBrZzZcfbU1Aqn3FxjZcKsrsBYcNCXbG9qR100xVbMq1HF"
        client-reference-id={clientReferenceId}
        customer-email={customerEmail}
      />
    </>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
