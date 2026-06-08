import { prisma } from "@/lib/prisma";
import { getProvisioningProvider } from "@/lib/provisioning";
import { sendActivationEmail } from "@/lib/email";

// Runs once when an order is paid. Idempotent: if subscriptions already exist
// for the order (e.g. a retried callback), it does nothing.
export async function fulfillOrder(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: true,
      items: { include: { packagePrice: { include: { package: true } } } },
    },
  });
  if (!order) throw new Error(`Order ${orderId} not found`);

  const already = await prisma.subscription.count({ where: { orderId } });
  if (already > 0) return; // already fulfilled

  const provisioning = getProvisioningProvider();

  for (const item of order.items) {
    const start = new Date();
    const end = new Date(start);
    end.setMonth(end.getMonth() + item.packagePrice.durationMonths);

    const sub = await prisma.subscription.create({
      data: {
        userId: order.userId,
        companyId: order.companyId,
        orderId,
        packagePriceId: item.packagePriceId,
        status: "active",
        quantity: item.quantity,
        startDate: start,
        endDate: end,
      },
    });

    const licenses = await provisioning.provision({
      subscriptionId: sub.id,
      packageName: item.packagePrice.package.name,
      quantity: item.quantity,
      customerEmail: order.user.email,
      expiresAt: end,
    });

    await prisma.license.createMany({
      data: licenses.map((l) => ({
        subscriptionId: sub.id,
        activationToken: l.activationToken,
        qrPayload: l.qrPayload,
        zimperiumActivationId: l.zimperiumActivationId,
        expiresAt: l.expiresAt,
        assignedEmail: order.user.email,
        status: "issued" as const,
      })),
    });
  }

  await prisma.document.create({
    data: {
      orderId,
      type: "receipt",
      docNo: `RCP-${order.orderNo}`,
      amount: order.grandTotal,
      currency: order.currency,
    },
  });

  await sendActivationEmail(order.userId, orderId, order.user.email);
}
