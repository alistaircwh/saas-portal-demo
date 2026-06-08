import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaymentProvider } from "@/lib/payment";
import { fulfillOrder } from "@/lib/orders/fulfill";

// The single endpoint every gateway notifies. Mock posts here from
// /mock-checkout today; iPay88 posts here later. Must be idempotent because
// gateways retry.
export async function POST(req: Request) {
  const provider = getPaymentProvider();
  const result = await provider.handleCallback(req);

  if (!result.signatureValid) {
    return new NextResponse("INVALID SIGNATURE", { status: 400 });
  }

  // Idempotency: the unique dedupeKey makes a duplicate callback a no-op.
  try {
    await prisma.paymentEvent.create({
      data: {
        eventType: "callback",
        payload: result.raw as object,
        signatureValid: true,
        dedupeKey: result.dedupeKey,
      },
    });
  } catch {
    // Unique violation = we've already processed this callback.
    return new NextResponse("RECEIVEOK", { status: 200 });
  }

  const payment = await prisma.payment.findFirst({
    where: { providerRef: result.providerRef },
  });

  if (payment) {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: result.status,
        providerTxnId: result.providerTxnId,
        rawResponse: result.raw as object,
      },
    });

    if (result.status === "succeeded") {
      const order = await prisma.order.findUnique({ where: { id: payment.orderId } });
      if (order && order.status !== "paid") {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "paid", paidAt: new Date() },
        });
        await fulfillOrder(order.id); // create subscription(s), licenses, email
      }
    }
  }

  // iPay88 expects this literal string so it stops retrying.
  return new NextResponse("RECEIVEOK", { status: 200 });
}
