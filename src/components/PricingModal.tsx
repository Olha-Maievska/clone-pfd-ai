import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { currentUser } from "@clerk/nextjs";
import { PricingTable } from './PricingTable';

const PricingModal = async () => {
  const user = await currentUser();

  if (!user) return null;

  const email = user.emailAddresses[0].emailAddress;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="sm:px-4 px-[10px]">
          🎁 Upgrade
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-[#f8f5ee]">
        <DialogHeader>
          <DialogTitle className="text-center mb-6">
            Upgrade your account
          </DialogTitle>
          <DialogDescription className="sr-only">
            {" "}
            This is a description{" "}
          </DialogDescription>
        </DialogHeader>

        <PricingTable clientReferenceId={user.id} customerEmail={email} />
      </DialogContent>
    </Dialog>
  );
};

export default PricingModal;
