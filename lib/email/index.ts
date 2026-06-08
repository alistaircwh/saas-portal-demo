import { randomUUID } from "crypto";
import { prisma } from "@/lib/prisma";

// Mock email "sends" by logging and recording an EmailLog row. Swap the body
// of this function for a real provider (e.g. Resend) later — callers don't change.
export async function sendActivationEmail(
  userId: string,
  orderId: string,
  toEmail: string,
) {
  const licenses = await prisma.license.findMany({
    where: { subscription: { orderId } },
  });

  const lines = licenses
    .map((l, i) => `  ${i + 1}. Activation link: ${l.qrPayload}\n     Token: ${l.activationToken}`)
    .join("\n");

  const body =
    `Thank you for your purchase!\n\n` +
    `Your ${licenses.length} MTD license(s):\n${lines}\n\n` +
    `Open each link on the device you want to protect, or scan the QR code we'll attach.`;

  const provider = (process.env.EMAIL_PROVIDER ?? "mock").toLowerCase();
  let providerMessageId = `MOCK-EMAIL-${randomUUID()}`;
  let status = "sent";

  if (provider === "mock") {
    console.log(`\n----- MOCK EMAIL to ${toEmail} -----\n${body}\n-----------------------------\n`);
  } else {
    // TODO: real provider, e.g.
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   const res = await resend.emails.send({ from, to: toEmail, subject, text: body });
    //   providerMessageId = res.data?.id ?? providerMessageId;
    status = "queued";
  }

  await prisma.emailLog.create({
    data: { userId, orderId, type: "activation", toEmail, status, providerMessageId, sentAt: new Date() },
  });

  return providerMessageId;
}
