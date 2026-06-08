import type { PaymentProvider } from "./types";
import { MockPaymentProvider } from "./mock";
import { IPay88Provider } from "./ipay88";

let cached: PaymentProvider | undefined;

// Flip PAYMENT_PROVIDER from "mock" to "ipay88" when you're ready. No other
// file needs to change.
export function getPaymentProvider(): PaymentProvider {
  if (cached) return cached;
  const which = (process.env.PAYMENT_PROVIDER ?? "mock").toLowerCase();
  cached = which === "ipay88" ? new IPay88Provider() : new MockPaymentProvider();
  return cached;
}
