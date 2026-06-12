import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Notice | Vigilant Asia",
  description:
    "Vigilant Asia (M) Sdn Bhd's privacy notice, issued pursuant to the Personal Data Protection Act 2010 (PDPA) in Malaysia.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice">
      <p>
        This Notice is issued to all our current or prospective customers pursuant to the requirements of
        the Personal Data Protection Act 2010 (&ldquo;PDPA&rdquo;) in Malaysia. We, Vigilant Asia (M) Sdn Bhd
        and/or its group of companies (referred hereinafter to as &ldquo;Vigilant Asia&rdquo;) wish to inform
        you that we may maintain certain personal information about you as part of our records.
      </p>
      <p>
        We appreciate your support for our services and value our relationship with you. We would like to
        continue communicating for further feedback on our products, service, promotions and matters relating
        to the primary purposes above, which we may consider to be interesting to you from time to time.
      </p>
      <p>
        Please find the following notice in English and Bahasa Malaysia stating the reasons we collect
        information, the type of information collected, our disclosure to third parties (if any) and who you
        may contact for access to your information.
      </p>
      <p>
        Vigilant Asia reserves the right to amend this notice to client at any time and will place notice of
        such amendments on the company website (www.vigilantasia.com.my) or via any other mode the company
        views suitable, which will be clearly informed to you.
      </p>

      <LegalSection heading="1. Purpose of information Collected">
        <p>The use of this information is for the following primary purposes, but is not limited to:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>communication;</li>
          <li>internal record keeping;</li>
          <li>providing and improving our services;</li>
          <li>finance and marketing activities;</li>
          <li>sales agreements;</li>
          <li>general administration;</li>
          <li>customize our website according to your interests.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="2. Type of Information Collected">
        <p>Types of personal data that we may collect:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>name, age, race, gender, nationality, IC Number, date of birth;</li>
          <li>
            contact details such as, but not limited to; email address, home address, work address, mobile
            number;
          </li>
          <li>education background;</li>
          <li>bank account details;</li>
          <li>
            any other information supplied by you that can indirectly or directly identify you, in order for
            us to carry out our activities with you.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="3. Consequences of not providing your Personal Data">
        <p>The failure to supply us with the required personal data will potentially:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>result in us being unable to enter into a service contract or agreement with you;</li>
          <li>result in us being unable to communicate notices, value added services and updates to you;</li>
          <li>affect our capacity to accomplish the above stated purposes.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="4. Disclosure">
        <p>
          Your personal data will be kept confidential but you consent and authorise us to provide or share
          your Personal data to the following class of users:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>persons / organisations required under law or in response to government requests;</li>
          <li>
            related subsidiaries, holdings of Vigilant Asia, including future entities under Vigilant Asia;
          </li>
          <li>government agencies, statutory authorities, enforcement agencies under law;</li>
          <li>auditors, accountants, lawyers under Vigilant Asia</li>
          <li>contractors, sub-contractors of Vigilant Asia;</li>
          <li>
            third party service / product providers that is deem necessary or appropriate for the purposes
            stated above (including those located out of Malaysia, under conditions of confidentiality and
            similar levels of security);
          </li>
          <li>persons under a duty of confidentiality to Vigilant Asia;</li>
        </ul>
        <p>
          Data shared will be for the purpose as stated in this notice, or purposes not stated but directly
          related to the primary purpose of collection.
        </p>
        <p>
          We may also share your Personal Data where required by law or where disclosure is necessary to
          comply with applicable laws, legal processes or queries from the relevant authorities.
        </p>
      </LegalSection>

      <LegalSection heading="5. Data Security">
        <p>
          We shall take necessary steps to store and process your personal data securely. We will undertake
          the following security steps:
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>
            Implementation of a formal information security policy and necessary technology controls such as
            firewall, password controls, physical security, logging and monitoring etc;
          </li>
          <li>
            Process controls such as segregation of duties, defined roles and responsibilities and need to
            know basis for staff;
          </li>
          <li>
            Third party providers and contractors storing or processing personal data has implemented similar
            acceptable standards of security.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="6. Retention of Personal Data">
        <p>
          Your personal data will be stored for only the period as necessary to fulfill the purposes stated
          above after which we proceed to ensure that your personal data is destroyed, anonymized or
          permanently deleted if it is no longer necessary to store. Reasons to further store your information
          even after the fulfillment of the purposes includes
        </p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>to satisfy legal, regulatory or accounting requirements;</li>
          <li>to protect the interests of Vigilant Asia.</li>
        </ul>
      </LegalSection>

      <LegalSection heading="7. Direct Marketing">
        <p>
          We may use your personal data to provide you with information about our and third-party services
          and/or products, which may be related to your interests, unless requested otherwise by you.
        </p>
        <p>
          We may, in some circumstances, disclose your personal data to preferred merchants and strategic
          partners. Such disclosure will only occur where you have subscribed for particular Services or
          Products which require such disclosure, and/or where your consent has been obtained, subject at all
          times to any laws (including regulations, guidelines and/or obligations) applicable to Vigilant
          Asia.
        </p>
        <p>
          We take reasonable steps to ensure that the third parties we are sharing your personal data with
          also have appropriate privacy and confidentiality obligations.
        </p>
        <p>
          If you do not wish your personal data to be utilised for the purposes of marketing and promotion,
          please contact us at the contact details below. Your latest written instructions to us will prevail.
        </p>
      </LegalSection>

      <LegalSection heading="8. Right of Access and Correction">
        <p>
          Pursuant to the PDPA, you have the right to access your personal data and request for correction of
          the personal data that might be inaccurate, obsolete, incomplete or misleading.
        </p>
        <p>In respect to this, you may:</p>
        <ul className="list-disc pl-5 space-y-1.5">
          <li>request to check and access your personal data in our records;</li>
          <li>
            request that we correct any of your inaccurate, obsolete, incomplete or misleading personal data;
          </li>
          <li>request copies of the data from us.</li>
        </ul>
        <p>
          Once we receive a request, we will acknowledge the receipt of such request. For data amendment and
          correction, we will consider if the information requires amendment.
        </p>
        <p>In accordance with the PDPA, and to the extent not limited by any other applicable law, we may:</p>
        <ol className="list-decimal pl-5 space-y-1.5">
          <li>
            charge an administration fee for processing your request for access and / or correction to the
            Personal Data, in compliance to the fees stated in PDPA sub-regulation; and / or
          </li>
          <li>
            refuse to comply with your request for access or correction to the Personal Information and give
            you a written reason for such an action.
          </li>
        </ol>
      </LegalSection>

      <LegalSection heading="9. Transfer of your Personal Information Outside Malaysia">
        <p>
          It may be necessary for us to transfer your personal data outside Malaysia if any of our service
          providers and / or strategic partners who are involved in providing part of a services are located
          in countries outside Malaysia. You consent to us transferring your personal information outside
          Malaysia in the instances whereby it is necessary to fulfil the execution of the services and / or
          products that you signed up for.
        </p>
        <p>
          We shall take necessary steps to ensure that any such partners are contractually bound not to use
          your personal information for any reason other than to provide the services and/or products they are
          contracted by us, to safeguard your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="10. Contact Us">
        <p>
          For further information or clarification regarding personal data access, correction, deletion or any
          other information in relation to PDPA, you can contact us through the following details:
        </p>
        <p>
          Email:{" "}
          <a className="text-primary hover:underline" href="mailto:info@vigilantasia.com.my">
            info@vigilantasia.com.my
          </a>
          <br />
          Tel no: +60 (3) 58702252
          <br />
          Address: No 3, Jalan Astaka U8/82, Bukit Jelutong 40150 Shah Alam, Selangor, Malaysia.
        </p>
      </LegalSection>

      <LegalSection heading="11. Language">
        <p>
          Pursuant to Section 7(3) of the PDPA, this notice is issued in both English and Bahasa Malaysia. In
          the event of any inconsistency, the terms of the English version shall prevail.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
