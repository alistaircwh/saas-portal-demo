import type { ProvisioningProvider } from "./types";
import { MockProvisioningProvider } from "./mock";
import { ZimperiumProvider } from "./zimperium";

let cached: ProvisioningProvider | undefined;

export function getProvisioningProvider(): ProvisioningProvider {
  if (cached) return cached;
  const which = (process.env.PROVISIONING_PROVIDER ?? "mock").toLowerCase();
  cached = which === "zimperium" ? new ZimperiumProvider() : new MockProvisioningProvider();
  return cached;
}
