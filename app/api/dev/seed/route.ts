import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DEV ONLY. Creates a package + price + user + a draft order so you can test
// the pay -> provision -> email flow before any real UI exists.
// Returns the orderId. DELETE this route before production.
export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "disabled in production" }, { status: 403 });
  }

  const pkg = await prisma.package.create({
    data: { name: "MTD Personal", description: "Mobile Threat Defense — 1 device", tier: "personal" },
  });

  const price = await prisma.packagePrice.create({
    data: { packageId: pkg.id, durationMonths: 12, currency: "MYR", unitPrice: 120.0 },
  });

  const user = await prisma.user.create({
    data: { email: `test-${Date.now()}@example.com`, firstName: "Test", lastName: "Buyer" },
  });

  const quantity = 2;
  const unit = 120.0;
  const subtotal = unit * quantity;

  const order = await prisma.order.create({
    data: {
      orderNo: `ORD-${Date.now()}`,
      userId: user.id,
      status: "draft",
      currency: "MYR",
      subtotal,
      grandTotal: subtotal,
      billingSnapshot: { name: "Test Buyer", email: user.email },
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

  return NextResponse.json({
    orderId: order.id,
    next: `POST /api/orders/${order.id}/pay then open the returned redirectUrl`,
  });
}
