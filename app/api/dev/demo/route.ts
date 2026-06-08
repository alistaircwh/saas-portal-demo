import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getPaymentProvider } from "@/lib/payment";

// DEV ONLY. Open http://localhost:3000/api/dev/demo in a browser — it seeds a
// test order, initiates payment, and redirects straight to the mock checkout
// page so you can demo the full funnel with one click. DELETE before production.
export async function GET() {
  if (process.env.NODE_ENV === "production") {
    redirect("/");
  }

  const pkg = await prisma.package.create({
    data: { name: "MTD Personal", description: "Mobile Threat Defense — 1 device", tier: "personal" },
  });

  const price = await prisma.packagePrice.create({
    data: { packageId: pkg.id, durationMonths: 12, currency: "MYR", unitPrice: 120.0 },
  });

  const user = await prisma.user.create({
    data: { email: `demo-${Date.now()}@example.com`, firstName: "Demo", lastName: "User" },
  });

  const quantity = 2;
  const unit = 120.0;
  const subtotal = unit * quantity;

  const order = await prisma.order.create({
    data: {
      orderNo: `ORD-DEMO-${Date.now()}`,
      userId: user.id,
      status: "draft",
      currency: "MYR",
      subtotal,
      grandTotal: subtotal,
      billingSnapshot: { name: "Demo User", email: user.email },
      items: {
        create: [
          {
            packagePriceId: price.id,
            descriptionSnapshot: "MTD Personal — 12 months",
            quantity,
            unitPrice: unit,
            lineTotal: subtotal,
          },
        ],
      },
    },
  });

  const provider = getPaymentProvider();
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const result = await provider.createPayment({
    orderId: order.id,
    orderNo: order.orderNo,
    amount: Number(order.grandTotal),
    currency: order.currency,
    customerEmail: user.email,
    customerName: "Demo User",
    returnUrl: `${base}/orders/${order.id}`,
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

  redirect(result.redirectUrl);
}
