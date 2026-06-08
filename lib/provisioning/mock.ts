import { randomUUID } from "crypto";
import type {
  ProvisioningProvider,
  ProvisionInput,
  ProvisionedLicense,
} from "./types";

// Generates believable activation tokens + QR payloads so the whole
// pay -> provision -> email flow works end to end before Zimperium exists.
export class MockProvisioningProvider implements ProvisioningProvider {
  readonly name = "mock";

  async provision(input: ProvisionInput): Promise<ProvisionedLicense[]> {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    return Array.from({ length: input.quantity }, () => {
      const activationToken = `ACT-${randomUUID()}`;
      const qrPayload = `${base}/activate/${activationToken}`;
      return { activationToken, qrPayload, expiresAt: input.expiresAt };
    });
  }

  async revoke(_activationToken: string): Promise<void> {
    // no-op in mock mode
  }

  async status(_activationToken: string): Promise<string> {
    return "issued";
  }
}
