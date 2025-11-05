import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-custom-text mb-4">
              Terms of Service
            </h1>
            <p className="text-custom-text-secondary text-lg">
              Please read these terms carefully before using Campus Connect.
            </p>
            <p className="text-custom-text-secondary text-sm mt-2">
              Effective date: November 5, 2025
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Acceptance of Terms",
                icon: "gavel",
                content: "By accessing and using Campus Connect, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform."
              },
              {
                title: "Eligibility",
                icon: "school",
                content: "You must be at least 13 years old and enrolled in or affiliated with an educational institution to use Campus Connect. Users under 18 require parental consent."
              },
              {
                title: "User Accounts",
                icon: "account_circle",
                content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information and update it as necessary. You are solely responsible for all activities under your account."
              },
              {
                title: "Acceptable Use",
                icon: "verified_user",
                points: [
                  "Use the platform for legitimate networking and educational purposes",
                  "Respect other users and maintain professional conduct",
                  "Do not share inappropriate, offensive, or illegal content",
                  "Do not harass, bully, or threaten other users",
                  "Do not spam or send unsolicited commercial messages",
                  "Do not attempt to hack, disrupt, or misuse the platform"
                ]
              },
              {
                title: "Intellectual Property",
                icon: "copyright",
                content: "All content, features, and functionality on Campus Connect are owned by us and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without permission."
              },
              {
                title: "User-Generated Content",
                icon: "create",
                points: [
                  "You retain ownership of content you post on the platform",
                  "You grant us a license to use, display, and distribute your content",
                  "You are responsible for the content you share",
                  "We may remove content that violates our policies",
                  "Respect intellectual property rights of others"
                ]
              },
              {
                title: "Privacy and Data",
                icon: "privacy_tip",
                content: "Your use of Campus Connect is subject to our Privacy Policy. We collect, use, and protect your data as described in the Privacy Policy. Please review it carefully."
              },
              {
                title: "Termination",
                icon: "block",
                content: "We reserve the right to suspend or terminate your account at any time for violations of these terms or for any other reason. You may delete your account at any time through your settings."
              },
              {
                title: "Disclaimers",
                icon: "warning",
                points: [
                  "The platform is provided 'as is' without warranties of any kind",
                  "We do not guarantee uninterrupted or error-free service",
                  "We are not responsible for user-generated content",
                  "Event information is provided by organizers; verify independently",
                  "We are not liable for interactions between users"
                ]
              },
              {
                title: "Limitation of Liability",
                icon: "shield",
                content: "Campus Connect and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability is limited to the amount you paid, if any, to use our services."
              },
              {
                title: "Changes to Terms",
                icon: "update",
                content: "We may update these Terms of Service from time to time. We will notify you of significant changes via email or platform notification. Your continued use after changes constitutes acceptance of the updated terms."
              },
              {
                title: "Governing Law",
                icon: "balance",
                content: "These terms are governed by and construed in accordance with applicable laws. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction."
              }
            ].map((section, index) => (
              <section key={index} className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                  <span className="material-icons text-custom-teal mr-2">{section.icon}</span>
                  {section.title}
                </h2>
                {section.content && (
                  <p className="text-custom-text-secondary leading-relaxed">{section.content}</p>
                )}
                {section.points && (
                  <ul className="space-y-2">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start text-custom-text-secondary">
                        <span className="material-icons text-custom-teal mr-3 mt-0.5 text-sm">check_circle</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-custom-teal bg-opacity-10 border border-custom-teal rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-custom-text mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-custom-text-secondary mb-6 max-w-2xl mx-auto">
              If you have questions about these Terms of Service, please contact our legal team.
            </p>
            <a
              href="mailto:legal@campusconnect.com"
              className="inline-flex items-center gap-2 bg-custom-teal text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-icons">email</span>
              Contact Legal Team
            </a>
          </div>

          {/* Related Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/privacy"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Privacy Policy</span>
              <span className="material-icons text-custom-text-secondary">arrow_forward</span>
            </Link>
            <Link
              to="/security"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Security</span>
              <span className="material-icons text-custom-text-secondary">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsPage;
