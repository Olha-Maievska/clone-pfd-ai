import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export const isValidSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const subscription = await prismaDB.subscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!subscription) {
    return false;
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! > Date.now();

  return !!isValid;
};
