import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SecurityPage = () => {
  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-custom-text mb-4">
              Security & Data Protection
            </h1>
            <p className="text-custom-text-secondary text-lg">
              Your security and privacy are our top priorities. Learn how we protect your data and maintain platform security.
            </p>
            <p className="text-custom-text-secondary text-sm mt-2">
              Last updated: November 5, 2025
            </p>
          </div>

          {/* Security Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: 'verified_user', title: 'ISO 27001 Certified', desc: 'Information security management' },
              { icon: 'security', title: 'SOC 2 Type II', desc: 'Compliance verified' },
              { icon: 'lock', title: 'GDPR Compliant', desc: 'EU data protection standards' }
            ].map((cert, index) => (
              <div key={index} className="bg-custom-bg-2 border border-custom-border rounded-lg p-6 text-center">
                <span className="material-icons text-4xl text-custom-teal mb-3">{cert.icon}</span>
                <h3 className="text-custom-text font-semibold mb-1">{cert.title}</h3>
                <p className="text-custom-text-secondary text-sm">{cert.desc}</p>
              </div>
            ))}
          </div>

          {/* Security Measures */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                <span className="material-icons text-custom-teal mr-2">https</span>
                Data Encryption
              </h2>
              <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <ul className="space-y-3 text-custom-text-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">End-to-End Encryption:</strong> All messages and sensitive data are encrypted in transit using TLS 1.3</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Data at Rest:</strong> AES-256 encryption for all stored user data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Secure Authentication:</strong> JWT tokens with short expiration and refresh token rotation</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                <span className="material-icons text-custom-teal mr-2">shield</span>
                Access Controls
              </h2>
              <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <ul className="space-y-3 text-custom-text-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Multi-Factor Authentication (MFA):</strong> Optional 2FA for enhanced account security</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Role-Based Access:</strong> Granular permissions for different user types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Session Management:</strong> Automatic logout after inactivity and device tracking</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                <span className="material-icons text-custom-teal mr-2">assessment</span>
                Monitoring & Auditing
              </h2>
              <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <ul className="space-y-3 text-custom-text-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">24/7 Monitoring:</strong> Real-time threat detection and automated security alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Regular Audits:</strong> Annual third-party security audits and penetration testing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Activity Logs:</strong> Comprehensive audit trails for all data access and modifications</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                <span className="material-icons text-custom-teal mr-2">backup</span>
                Data Protection & Recovery
              </h2>
              <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <ul className="space-y-3 text-custom-text-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Automated Backups:</strong> Daily encrypted backups with 30-day retention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Disaster Recovery:</strong> 99.9% uptime SLA with redundant infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Data Sovereignty:</strong> Data stored in secure, geographically distributed data centers</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-custom-text mb-4 flex items-center">
                <span className="material-icons text-custom-teal mr-2">bug_report</span>
                Vulnerability Management
              </h2>
              <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-6">
                <ul className="space-y-3 text-custom-text-secondary">
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Bug Bounty Program:</strong> Security researchers can report vulnerabilities responsibly</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Patch Management:</strong> Regular security updates and vulnerability patches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-custom-teal mr-3 mt-0.5">check_circle</span>
                    <span><strong className="text-custom-text">Dependency Scanning:</strong> Automated scanning for vulnerable dependencies</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Report Security Issue */}
          <div className="mt-12 bg-custom-teal bg-opacity-10 border border-custom-teal rounded-lg p-8 text-center">
            <span className="material-icons text-5xl text-custom-teal mb-4">report_problem</span>
            <h2 className="text-2xl font-bold text-custom-text mb-3">
              Report a Security Issue
            </h2>
            <p className="text-custom-text-secondary mb-6 max-w-2xl mx-auto">
              If you discover a security vulnerability, please report it to our security team immediately. 
              We appreciate responsible disclosure and will respond within 48 hours.
            </p>
            <a
              href="mailto:security@campusconnect.com"
              className="inline-flex items-center gap-2 bg-custom-teal text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-icons">email</span>
              Contact Security Team
            </a>
          </div>

          {/* Related Links */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/privacy"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Privacy Policy</span>
              <span className="material-icons text-custom-text-secondary">arrow_forward</span>
            </Link>
            <Link
              to="/terms"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Terms of Service</span>
              <span className="material-icons text-custom-text-secondary">arrow_forward</span>
            </Link>
            <Link
              to="/cookies"
              className="flex items-center justify-between p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="text-custom-text font-medium">Cookie Policy</span>
              <span className="material-icons text-custom-text-secondary">arrow_forward</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SecurityPage;
