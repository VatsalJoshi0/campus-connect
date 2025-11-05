import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-custom-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-custom-text-secondary text-lg">
              How we collect, use, and protect your personal information.
            </p>
            <p className="text-custom-text-secondary text-sm mt-2">
              Last updated: November 5, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            {[
              {
                title: "Information We Collect",
                icon: "info",
                content: [
                  "Account Information: Name, email, profile photo, and educational details",
                  "Usage Data: How you interact with our platform, features used, and preferences",
                  "Device Information: IP address, browser type, device ID, and operating system",
                  "Communication Data: Messages, posts, and interactions with other users",
                  "Event Data: Registrations, attendance, and participation in campus events"
                ]
              },
              {
                title: "How We Use Your Information",
                icon: "settings",
                content: [
                  "Provide and improve our services and platform features",
                  "Personalize your experience and recommend relevant connections",
                  "Send notifications about events, messages, and platform updates",
                  "Analyze usage patterns to enhance platform functionality",
                  "Ensure security and prevent fraudulent activities"
                ]
              },
              {
                title: "Information Sharing",
                icon: "share",
                content: [
                  "With Other Users: Profile information you choose to make public",
                  "With Event Organizers: Registration and attendance data",
                  "With Service Providers: Third-party services that help operate our platform",
                  "For Legal Compliance: When required by law or to protect rights and safety",
                  "We never sell your personal information to third parties"
                ]
              },
              {
                title: "Your Privacy Rights",
                icon: "account_circle",
                content: [
                  "Access and download your personal data at any time",
                  "Update or correct your information through your profile settings",
                  "Delete your account and associated data permanently",
                  "Opt-out of marketing communications and notifications",
                  "Control privacy settings for profile visibility and discoverability"
                ]
              },
              {
                title: "Data Retention",
                icon: "schedule",
                content: [
                  "Active accounts: Data retained while your account is active",
                  "Deleted accounts: Most data removed within 30 days",
                  "Legal requirements: Some data may be retained for compliance purposes",
                  "Backups: Backup copies deleted within 90 days of account deletion"
                ]
              },
              {
                title: "Cookies and Tracking",
                icon: "cookie",
                content: [
                  "Essential cookies for platform functionality and security",
                  "Analytics cookies to understand usage patterns (with your consent)",
                  "Preference cookies to remember your settings and choices",
                  "You can manage cookie preferences in your browser settings"
                ]
              }
            ].map((section, index) => (
              <section key={index} className="mb-8">
                <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                  <span className="material-icons text-custom-teal mr-2">{section.icon}</span>
                  {section.title}
                </h2>
                <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start text-custom-text-secondary">
                        <span className="material-icons text-custom-teal mr-3 mt-0.5 text-sm">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-custom-bg-2 border border-custom-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-custom-text mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-custom-text-secondary mb-6">
              If you have questions about our privacy practices or want to exercise your privacy rights, 
              please contact our Data Protection Officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:privacy@campusconnect.com"
                className="inline-flex items-center justify-center gap-2 bg-custom-teal text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                <span className="material-icons">email</span>
                Contact Privacy Team
              </a>
              <Link
                to="/settings"
                className="inline-flex items-center justify-center gap-2 bg-custom-bg border border-custom-border text-custom-text px-6 py-3 rounded-lg font-semibold hover:bg-custom-bg-2 transition-colors"
              >
                <span className="material-icons">settings</span>
                Privacy Settings
              </Link>
            </div>
          </div>

          {/* Related Links */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/terms"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Terms of Service</span>
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

export default PrivacyPage;
