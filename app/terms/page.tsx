import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vigilant Asia",
  description:
    "The terms and conditions governing your use of the Vigilant Asia Mobile Threat Defense service and website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      subtitle="The terms governing your purchase and use of the Vigilant Asia Mobile Threat Defense service."
      lastUpdated="12 June 2026"
    >
      <p>
        These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website,
        products and services provided by Vigilant Asia (M) Sdn Bhd (Company Registration No. 1255978-D)
        (&quot;Vigilant Asia&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;). By subscribing to
        our service or using our website, you agree to be bound by these Terms.
      </p>

      <LegalSection heading="1. The Service">
        <p>
          Vigilant Asia provides a Mobile Threat Defense (MTD) service that helps protect iOS and Android
          devices against mobile security threats. The service is powered by Zimperium technology. We may
          update, improve or modify features of the service from time to time.
        </p>
      </LegalSection>

      <LegalSection heading="2. Eligibility and Accounts">
        <p>
          You must provide accurate and complete information when subscribing. You are responsible for
          keeping your account credentials and activation details confidential and for all activity that
          occurs under your account or licenses.
        </p>
      </LegalSection>

      <LegalSection heading="3. Subscriptions and Term">
        <p>
          Subscriptions are sold on a fixed-term basis of one (1), two (2) or three (3) years, as selected
          at the time of purchase. Each plan covers a defined number of devices as described on our pricing
          page. The subscription begins on activation and continues for the term you have purchased.
        </p>
      </LegalSection>

      <LegalSection heading="4. Pricing and Payment">
        <p>
          All prices are stated in Malaysian Ringgit (RM) and, unless stated otherwise, are exclusive of
          any applicable taxes. Payment is collected upfront through our authorised third-party payment
          gateway. By submitting a payment, you authorise us and our payment provider to charge the amount
          due for your selected plan.
        </p>
      </LegalSection>

      <LegalSection heading="5. Activation and Licenses">
        <p>
          Following successful payment, we provision your subscription and issue activation details
          (including a QR code and activation token) by email. You are responsible for installing and
          activating the service on your devices using the details provided.
        </p>
      </LegalSection>

      <LegalSection heading="6. Acceptable Use">
        <p>
          You agree not to misuse the service, including by attempting to resell, sublicense, reverse
          engineer, or circumvent the service or its licensing, or by using it for any unlawful purpose.
          Licenses are intended for the number of devices covered by your plan and may not be shared beyond
          that allowance.
        </p>
      </LegalSection>

      <LegalSection heading="7. Third-Party Technology">
        <p>
          The service relies on technology provided by Zimperium and other third parties. Your use of the
          service may also be subject to the applicable terms of those providers. We are not responsible for
          third-party services or networks outside our reasonable control.
        </p>
      </LegalSection>

      <LegalSection heading="8. Intellectual Property">
        <p>
          All intellectual property rights in the website, the service and related materials remain the
          property of Vigilant Asia or its licensors. Nothing in these Terms transfers any such rights to
          you other than the limited right to use the service for the duration of your subscription.
        </p>
      </LegalSection>

      <LegalSection heading="9. Disclaimers and Limitation of Liability">
        <p>
          While Vigilant Asia provides Mobile Threat Defense to reduce risk, no security product can
          guarantee that a device will never be compromised. The service is provided on a reasonable-efforts
          basis. To the maximum extent permitted by law, our total liability arising out of or in connection
          with the service shall not exceed the fees paid by you for the subscription giving rise to the
          claim.
        </p>
      </LegalSection>

      <LegalSection heading="10. Refunds">
        <p>
          Refunds are governed by our{" "}
          <a className="text-primary hover:underline" href="/refund-policy">
            Refund Policy
          </a>
          , which forms part of these Terms.
        </p>
      </LegalSection>

      <LegalSection heading="11. Privacy">
        <p>
          Your personal data is handled in accordance with our{" "}
          <a className="text-primary hover:underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="12. Suspension and Termination">
        <p>
          We may suspend or terminate your access to the service if you breach these Terms or if required by
          law. On expiry or termination of your subscription, your right to use the service ends.
        </p>
      </LegalSection>

      <LegalSection heading="13. Changes to These Terms">
        <p>
          We may update these Terms from time to time. The latest version will be published on this page
          with an updated effective date. Continued use of the service after changes take effect constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection heading="14. Governing Law">
        <p>
          These Terms are governed by the laws of Malaysia, and any disputes shall be subject to the
          exclusive jurisdiction of the courts of Malaysia.
        </p>
      </LegalSection>

      <LegalSection heading="15. Contact Us">
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
