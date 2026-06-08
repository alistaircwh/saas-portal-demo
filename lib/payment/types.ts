export type PaymentOutcome = "succeeded" | "failed" | "pending";

export interface CreatePaymentInput {
  orderId: string;
  orderNo: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  /** Where the browser lands after the gateway page. */
  returnUrl: string;
  /** Server-to-server notification endpoint (your callback route). */
  callbackUrl: string;
}

export interface CreatePaymentResult {
  /** Your reference handed to the gateway; store it on the Payment row. */
  providerRef: string;
  /** Where to send the browser to pay. */
  redirectUrl: string;
}

export interface CallbackResult {
  providerRef: string;
  providerTxnId?: string;
  status: PaymentOutcome;
  signatureValid: boolean;
  amount?: number;
  currency?: string;
  /** Raw gateway payload, stored for audit. */
  raw: unknown;
  /** Unique per terminal event so retried callbacks are processed once. */
  dedupeKey: string;
}

export interface PaymentProvider {
  readonly name: string;
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  /** Parse + verify an incoming callback request from the gateway. */
  handleCallback(req: Request): Promise<CallbackResult>;
  /** Optional reconciliation: ask the gateway for current status. */
  verifyPayment(providerRef: string): Promise<PaymentOutcome>;
}
