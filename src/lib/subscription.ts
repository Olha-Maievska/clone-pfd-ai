import prismaDB from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { stripe } from "./stripe";

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

export const generateBillingLink = async () => {
  const baseUrl = process.env.BASE_URL + "/documents";
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const subscription = await prismaDB.subscription.findUnique({
    where: {
      userId,
    },
  });

  if (subscription && subscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: baseUrl,
    });

    return stripeSession.url;
  }
};

const MAX_FREE_DOCS = 1;
export const isMaxFreeDocuments = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const documents = await prismaDB.document.findMany({
    where: {
      userId,
    },
  });

  if (documents && documents.length >= MAX_FREE_DOCS) return true;

  return false;
};

export const needToUpgrade = async () => {
  const subscripted = await isValidSubscription();
  const reachedFreeQuota = await isMaxFreeDocuments();

  if (!subscripted && reachedFreeQuota) return true;

  return false;
};
