// The contract for issuing MTD licenses. MockProvisioningProvider generates
// activation tokens + QR payloads today; ZimperiumProvider implements the same
// interface against the real console API later, with no other code changes.

export interface ProvisionInput {
  subscriptionId: string;
  packageName: string;
  quantity: number;
  customerEmail: string;
  expiresAt?: Date;
}

export interface ProvisionedLicense {
  activationToken: string;
  qrPayload: string;
  zimperiumActivationId?: string;
  expiresAt?: Date;
}

export interface ProvisioningProvider {
  readonly name: string;
  provision(input: ProvisionInput): Promise<ProvisionedLicense[]>;
  revoke(activationToken: string): Promise<void>;
  status(activationToken: string): Promise<string>;
}
