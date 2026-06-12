import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy | Vigilant Asia",
  description:
    "Vigilant Asia's refund policy for Mobile Threat Defense subscriptions, including how to request a refund.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      subtitle="How refunds work for your Vigilant Asia Mobile Threat Defense subscription."
      lastUpdated="12 June 2026"
    >
      <p>
        This Refund Policy applies to subscriptions purchased from Vigilant Asia (M) Sdn Bhd (Company
        Registration No. 1255978-D) through this website. It forms part of our{" "}
        <a className="text-primary hover:underline" href="/terms">
          Terms &amp; Conditions
        </a>
        .
      </p>

      {/* TODO: Replace the interim terms below with the finalised refund window and conditions once confirmed. */}
      <LegalSection heading="Overview">
        <p>
          Our detailed refund terms are currently being finalised. In the meantime, if you believe you are
          entitled to a refund or you are not satisfied with your purchase, please contact us using the
          details below and our team will review your request on a case-by-case basis.
        </p>
      </LegalSection>

      <LegalSection heading="How to Request a Refund">
        <p>
          To request a refund, email us at{" "}
          <a className="text-primary hover:underline" href="mailto:info@vigilantasia.com.my">
            info@vigilantasia.com.my
          </a>{" "}
          with your order details (the email address used at checkout, the plan purchased, and your payment
          reference). We aim to acknowledge refund requests within one (1) business day.
        </p>
      </LegalSection>

      <LegalSection heading="Processing">
        <p>
          Approved refunds are returned to the original payment method through our payment provider. The
          time taken for the funds to appear depends on your bank or card issuer.
        </p>
      </LegalSection>

      <LegalSection heading="Contact Us">
        <p>
          Vigilant Asia (M) Sdn Bhd (1255978-D)
          <br />
          No 3, Jalan Astaka U8/82, Bukit Jelutong, 40150 Shah Alam, Selangor, Malaysia
          <br />
          Email:{" "}
          <a className="text-primary hover:underline" href="mailto:info@vigilantasia.com.my">
            info@vigilantasia.com.my
          </a>
          <br />
          Phone:{" "}
          <a className="text-primary hover:underline" href="tel:+60358702252">
            +603 5870 2252
          </a>
        </p>
      </LegalSection>
    </LegalPage>
  );
}
