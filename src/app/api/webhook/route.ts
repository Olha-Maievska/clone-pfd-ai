import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import prismaDB from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    if (!session?.client_reference_id) {
      return new NextResponse("No client reference id", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await prismaDB.subscription.create({
      data: {
        userId: session.client_reference_id,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object as Stripe.Invoice;

    if (!invoice.subscription) {
      console.warn("Invoice has no subscription attached. Skipping.");
      return new NextResponse(null, { status: 200 });
    }

    const subscriptionId = invoice.subscription as string;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    try {
      const existing = await prismaDB.subscription.findUnique({
        where: {
          stripeSubscriptionId: subscription.id,
        },
      });

      if (!existing) {
        return new NextResponse("Subscription not found in DB", {
          status: 200,
        });
      }

      await prismaDB.subscription.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    } catch (err) {
      console.error("Error updating subscription:", err);
      return new NextResponse("Update failed", { status: 500 });
    }
  }

  return new NextResponse(null, { status: 200 });
}
