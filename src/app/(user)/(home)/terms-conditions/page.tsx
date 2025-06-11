import "./style.scss";

const TermsAndCondition = () => {
  return (
    <>
      <header>
        <div className="logo">
          <h1>
            Ozolio Inc <br /> Token Platform
          </h1>
        </div>
      </header>

      <div className="container">
        <section className="terms-section">
          <h2>Terms of Service</h2>
          <p>
            Before using or accessing the Ozolio Token Platform ("Platform"),
            please carefully read these Terms of Service ("Terms"). You accept
            these Terms and all other terms and conditions that may be included
            by reference by accessing or using the Platform. You are not
            permitted to access or use the Platform if you do not agree to these
            Terms.
          </p>

          <h3>1. Use of the Platform</h3>
          <h4>a. Eligibility</h4>
          <p>
            To access and utilize the Platform, you must be at least 18 years
            old and legally able to enter into a binding contract. You represent
            and warrant that you meet these requirements by using the Platform.
          </p>

          <h4>b. Account Creation</h4>
          <p>
            You might need to register an account to use some Platform features
            and services. You are accountable for any activities or acts that
            take place under your account and for keeping the confidentiality of
            your account information.
          </p>

          <h4>c. User Responsibilities</h4>
          <p>
            You acknowledge that in using the Platform, you will abide by all
            applicable rules, laws, and this Agreement. You won't take part in
            any actions that might hurt, interfere with, or otherwise negatively
            affect the Platform or its users.
          </p>

          <h3>2. Intellectual Property</h3>
          <h4>a. Ownership</h4>
          <p>
            The Platform is protected by intellectual property laws along with
            any related material, features, and functionalities. You acknowledge
            that copyrights, trademarks, trade secrets, and other proprietary
            rights are used to protect the Platform and its contents.
          </p>

          <h4>b. Limited Licence</h4>
          <p>
            Ozolio hereby grants you a personal, non-commercial, limited,
            non-exclusive, and revocable licence to access and use the Platform.
            No information, software, products, or services obtained through the
            Platform may be modified, copied, distributed, transmitted,
            displayed, performed, reproduced, published, licenced, used to
            generate derivative works, transferred, or sold in accordance with
            the terms of this licence.
          </p>

          <h3>3. Prohibited Activities</h3>
          <ul>
            <li>Break any rules, laws, or the rights of third parties.</li>
            <li>Engage in fraudulent, deceptive, or misleading activities.</li>
            <li>
              Upload, transmit, or distribute any harmful or malicious content.
            </li>
            <li>
              Falsely represent your affiliation with any person or organisation
              or impersonate someone or something.
            </li>
            <li>
              Interfere with or disrupt the integrity, security, or performance
              of the Platform.
            </li>
            <li>Use the Platform for any unauthorized commercial purposes.</li>
          </ul>

          <h3>4. Limitation of Liability</h3>
          <h4>a. Disclaimer</h4>
          <p>
            The Platform is supplied "as is" and "as available." Regarding the
            Platform's accessibility, correctness, dependability, or suitability
            for any purpose, we make no guarantees or promises, either express
            or implied. The Platform is used at your own risk. Ozolio, its
            officers, directors, employees, and affiliates shall not be liable
            for any indirect, incidental, special, consequential, or punitive
            damages arising out of or related to your use of the Platform or
            these Terms, to the fullest extent permitted by law.
          </p>

          <h3>5. Modifications and Termination</h3>
          <h4>a. Modifications</h4>
          <p>
            The Platform or any portion of it may be changed, suspended, or
            terminated at any time without prior notice by Ozolio. We may
            occasionally change these Terms as well. The revised Terms take
            effect when they are posted on the site.
          </p>

          <h4>b. Termination</h4>
          <p>
            For any reason, including but not limited to a breach of these Terms
            or suspicion of fraudulent, abusive, or illegal activity, Ozolio may
            suspend or terminate your access to the Platform without prior
            notice.
          </p>

          <h3>6. Governing Law and Dispute Resolution</h3>
          <p>
            The Parties to this Agreement submit to the jurisdiction of the
            courts of the State of Hawaii for the enforcement of this Agreement
            or any arbitration award or decision arising from this Agreement.
            This Agreement will be enforced or construed according to the laws
            of the State of Hawaii.
          </p>

          <h3>7. Severability</h3>
          <p>
            The remaining sections of these Terms shall remain in full force and
            effect if any provision is deemed to be defective or unenforceable.
          </p>

          <h3>8. Entire Agreement</h3>
          <p>
            These Terms replace all earlier agreements or understandings with
            respect to your usage of the Platform and represent the entire
            understanding between you and Ozolio.
          </p>

          <h3>9. Contacts & Notices</h3>
          <p>
            All notices under these Terms are to be provided at the following
            address:
          </p>
          <address>
            Ozolio Inc.
            <br />
            PO Box 1735
            <br />
            Kahului, Hawaii 96733 US
          </address>
        </section>
      </div>

      <footer>
        <p>&copy; {new Date().getFullYear()} Ozolio Inc. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default TermsAndCondition;
