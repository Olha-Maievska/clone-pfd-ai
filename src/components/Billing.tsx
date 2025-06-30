import { generateBillingLink } from "@/lib/subscription";
import { Button } from "./ui/button";

export const Billing = async () => {
  const portalUrl = await generateBillingLink();
  return (
    <>
      {portalUrl && (
        <a href={portalUrl}>
          <Button variant="link" className="sm:px-4 px-[10px]">
            🧲 Billing
          </Button>
        </a>
      )}
    </>
  );
};
