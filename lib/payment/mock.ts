import { randomUUID } from "crypto";
import type {
  PaymentProvider,
  CreatePaymentInput,
  CreatePaymentResult,
  CallbackResult,
  PaymentOutcome,
} from "./types";

export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    const providerRef = `MOCK-${randomUUID()}`;
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const params = new URLSearchParams({
      ref: providerRef,
      orderId: input.orderId,
      amount: String(input.amount),
      currency: input.currency,
      callbackUrl: input.callbackUrl,
      returnUrl: input.returnUrl,
    });
    return { providerRef, redirectUrl: `${base}/mock-checkout?${params.toString()}` };
  }

  async handleCallback(req: Request): Promise<CallbackResult> {
    const form = await req.formData();
    const providerRef = String(form.get("ref") ?? "");
    const rawStatus = String(form.get("status") ?? "failed");
    const status: PaymentOutcome = rawStatus === "succeeded" ? "succeeded" : "failed";
    const providerTxnId = `MOCKTXN-${providerRef}`;

    return {
      providerRef,
      providerTxnId,
      status,
      signatureValid: true,
      amount: Number(form.get("amount") ?? 0),
      currency: String(form.get("currency") ?? "MYR"),
      raw: Object.fromEntries(form.entries()),
      dedupeKey: providerTxnId,
    };
  }

  async verifyPayment(): Promise<PaymentOutcome> {
    return "pending";
  }
}
