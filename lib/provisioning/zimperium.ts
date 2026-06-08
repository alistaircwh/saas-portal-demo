import type {
  ProvisioningProvider,
  ProvisionInput,
  ProvisionedLicense,
} from "./types";

// SKELETON ONLY — implement once the Zimperium console/API is available to you.
// Same interface as the mock, so switching is just PROVISIONING_PROVIDER=zimperium.
//
// Expected real behaviour (adjust to their actual API):
//   - authenticate with ZIMPERIUM_API_TOKEN against ZIMPERIUM_API_URL
//   - create `quantity` activations under your reseller/tenant account
//   - return each activation's link/code -> map into ProvisionedLicense,
//     setting zimperiumActivationId so the License row can reconcile later.
export class ZimperiumProvider implements ProvisioningProvider {
  readonly name = "zimperium";

  private get apiUrl() {
    const v = process.env.ZIMPERIUM_API_URL;
    if (!v) throw new Error("ZIMPERIUM_API_URL not set");
    return v;
  }

  private get apiToken() {
    const v = process.env.ZIMPERIUM_API_TOKEN;
    if (!v) throw new Error("ZIMPERIUM_API_TOKEN not set");
    return v;
  }

  async provision(_input: ProvisionInput): Promise<ProvisionedLicense[]> {
    throw new Error("ZimperiumProvider.provision not implemented yet");
  }

  async revoke(_activationToken: string): Promise<void> {
    throw new Error("ZimperiumProvider.revoke not implemented yet");
  }

  async status(_activationToken: string): Promise<string> {
    throw new Error("ZimperiumProvider.status not implemented yet");
  }
}
