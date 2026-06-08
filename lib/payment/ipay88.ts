import type {
  PaymentProvider,
  CreatePaymentInput,
  CreatePaymentResult,
  CallbackResult,
  PaymentOutcome,
} from "./types";

export class IPay88Provider implements PaymentProvider {
  readonly name = "ipay88";

  async createPayment(_input: CreatePaymentInput): Promise<CreatePaymentResult> {
    throw new Error("IPay88Provider: not implemented yet");
  }

  async handleCallback(_req: Request): Promise<CallbackResult> {
    throw new Error("IPay88Provider: not implemented yet");
  }

  async verifyPayment(_providerRef: string): Promise<PaymentOutcome> {
    throw new Error("IPay88Provider: not implemented yet");
  }
}
