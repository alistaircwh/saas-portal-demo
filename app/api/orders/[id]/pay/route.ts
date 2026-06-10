import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPaymentProvider } from "@/lib/payment";

// POST /api/orders/:id/pay  ->  { redirectUrl }
// The client then sends the browser to redirectUrl to pay.
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: { user: true },
  });
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const provider = getPaymentProvider();
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const result = await provider.createPayment({
    orderId: order.id,
    orderNo: order.orderNo,
    amount: Number(order.grandTotal),
    currency: order.currency,
    customerEmail: order.user.email,
    customerName: [order.user.firstName, order.user.lastName].filter(Boolean).join(" "),
    returnUrl: `${base}/payment-complete?orderId=${order.id}`,
    callbackUrl: `${base}/api/payments/callback`,
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,
      provider: provider.name,
      amount: order.grandTotal,
      currency: order.currency,
      status: "pending",
      providerRef: result.providerRef,
    },
  });

  await prisma.order.update({
    where: { id: order.id },
    data: { status: "pending_payment" },
  });

  return NextResponse.json({ redirectUrl: result.redirectUrl });
}
