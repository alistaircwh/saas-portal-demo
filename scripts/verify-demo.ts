import { prisma } from "../lib/prisma";

async function main() {
  // Grab the most recent demo/test order
  // Show all test orders so we can see the full picture
  const allOrders = await prisma.order.findMany({
    where: { orderNo: { startsWith: "ORD-" } },
    orderBy: { createdAt: "desc" },
    take: 10,
    select: { id: true, orderNo: true, status: true, paidAt: true, createdAt: true },
  });
  console.log("\n── ALL RECENT TEST ORDERS ──────────────────────");
  for (const o of allOrders) {
    console.log(`  ${o.orderNo}  status=${o.status}  paidAt=${o.paidAt ?? "null"}`);
  }

  // Focus on the most recently PAID order
  const order = await prisma.order.findFirst({
    where: { status: "paid" },
    orderBy: { paidAt: "desc" },
    include: {
      user: true,
      items: { include: { packagePrice: { include: { package: true } } } },
      payments: { include: { events: true } },
      subscriptions: { include: { licenses: true } },
      documents: true,
    },
  });

  if (!order) { console.log("\nNo paid orders found."); return; }
  console.log("\n── MOST RECENTLY PAID ORDER ────────────────────");

  console.log("\n── ORDER ──────────────────────────────────────");
  console.log(`  id:         ${order.id}`);
  console.log(`  orderNo:    ${order.orderNo}`);
  console.log(`  status:     ${order.status}`);
  console.log(`  grandTotal: ${order.currency} ${order.grandTotal}`);
  console.log(`  paidAt:     ${order.paidAt ?? "null"}`);

  console.log("\n── USER ────────────────────────────────────────");
  console.log(`  id:    ${order.user.id}`);
  console.log(`  email: ${order.user.email}`);

  console.log("\n── ORDER ITEMS ─────────────────────────────────");
  for (const item of order.items) {
    console.log(`  ${item.packagePrice.package.name} × ${item.quantity}  @ ${item.unitPrice} = ${item.lineTotal}`);
  }

  console.log("\n── PAYMENTS ────────────────────────────────────");
  for (const p of order.payments) {
    console.log(`  id:          ${p.id}`);
    console.log(`  provider:    ${p.provider}`);
    console.log(`  status:      ${p.status}`);
    console.log(`  providerRef: ${p.providerRef}`);
    console.log(`  events:      ${p.events.length} payment_event row(s)`);
  }

  console.log("\n── SUBSCRIPTIONS ───────────────────────────────");
  for (const sub of order.subscriptions) {
    console.log(`  id:       ${sub.id}`);
    console.log(`  status:   ${sub.status}`);
    console.log(`  start:    ${sub.startDate?.toISOString().slice(0,10) ?? "—"}`);
    console.log(`  end:      ${sub.endDate?.toISOString().slice(0,10) ?? "—"}`);
    console.log(`  licenses: ${sub.licenses.length}`);
    for (const lic of sub.licenses) {
      console.log(`    ├ id:     ${lic.id}`);
      console.log(`    ├ status: ${lic.status}`);
      console.log(`    ├ token:  ${lic.activationToken}`);
      console.log(`    └ qr:     ${lic.qrPayload}`);
    }
  }

  console.log("\n── DOCUMENTS ───────────────────────────────────");
  for (const doc of order.documents) {
    console.log(`  type:   ${doc.type}`);
    console.log(`  docNo:  ${doc.docNo}`);
    console.log(`  amount: ${doc.currency} ${doc.amount}`);
  }

  console.log("\n── EMAIL LOG ───────────────────────────────────");
  const emails = await prisma.emailLog.findMany({ where: { orderId: order.id } });
  if (emails.length === 0) console.log("  (none)");
  for (const e of emails) {
    console.log(`  type:      ${e.type}`);
    console.log(`  to:        ${e.toEmail}`);
    console.log(`  status:    ${e.status}`);
    console.log(`  messageId: ${e.providerMessageId}`);
  }

  console.log("\n── PAYMENT EVENTS ──────────────────────────────");
  const events = await prisma.paymentEvent.findMany({
    orderBy: { receivedAt: "desc" },
    take: 5,
  });
  for (const ev of events) {
    console.log(`  eventType: ${ev.eventType}  valid: ${ev.signatureValid}  dedupeKey: ${ev.dedupeKey}`);
  }

  console.log("\n✓ done\n");
}

main().catch(console.error).finally(() => prisma.$disconnect());
