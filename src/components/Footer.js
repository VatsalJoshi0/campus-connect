import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setShowCookieBanner(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleCustomizeCookies = () => {
    localStorage.setItem('cookieConsent', 'customized');
    setShowCookieBanner(false);
    // In a real app, this would open a customization modal
  };

  const links = {
    product: [
      { label: 'Features', href: '/features' },
      { label: 'Events', href: '/events' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' }
    ],
    resources: [
      { label: 'Documentation', href: '/docs' },
      { label: 'Blog', href: '/blog' },
      { label: 'Community', href: '/community' },
      { label: 'Support', href: '/support' }
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
      { label: 'Partners', href: '/partners' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Security', href: '/security' }
    ]
  };

  return (
    <footer className="bg-custom-bg-2 mt-12 border-t border-custom-border">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link 
              className="inline-block text-2xl font-bold text-custom-text hover:opacity-90 transition-opacity" 
              to="/"
            >
              Campus<span className="text-custom-teal">Connect</span>
            </Link>
            <p className="text-custom-text-secondary mt-4 text-sm max-w-md leading-relaxed">
              Connecting students and professionals for networking, learning, and 
              collaboration opportunities. Join our community to enhance your 
              educational and professional journey.
            </p>
            <div className="flex space-x-4 mt-6">
              {['facebook', 'twitter', 'linkedin', 'github'].map((platform) => (
                <a
                  key={platform}
                  href={`https://${platform}.com/campusconnect`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-custom-text-secondary hover:text-custom-teal hover:bg-custom-bg rounded-full transition-all duration-300"
                  aria-label={`Follow us on ${platform}`}
                >
                  <span className="material-icons text-xl">{
                    platform === 'linkedin' ? 'work' :
                    platform === 'github' ? 'code' :
                    platform
                  }</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-custom-text font-semibold mb-4 uppercase tracking-wider text-sm">
                {section}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-custom-text-secondary hover:text-custom-teal text-sm transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-custom-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-custom-text-secondary text-sm">
              © {currentYear} CampusConnect. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <select
                className="bg-custom-bg text-custom-text-secondary text-sm rounded-lg border border-custom-border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-custom-teal"
                defaultValue="en"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-custom-teal text-sm">verified</span>
                <span className="text-custom-text-secondary text-sm">ISO 27001 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 max-w-md bg-custom-bg-2 border border-custom-border rounded-lg shadow-xl p-4 backdrop-blur-lg bg-opacity-95 z-[9997] animate-slide-up">
          <div className="flex items-start space-x-4">
            <span className="material-icons text-custom-teal mt-1">cookie</span>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <p className="text-custom-text text-sm font-medium">Cookie Notice</p>
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="p-1 hover:bg-custom-bg rounded-full transition-colors ml-2"
                  aria-label="Close cookie banner"
                >
                  <span className="material-icons text-sm text-custom-text-secondary">close</span>
                </button>
              </div>
              <p className="text-custom-text-secondary text-xs mt-1">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                <Link to="/cookies" className="text-custom-teal hover:underline ml-1">Learn more</Link>
              </p>
              <div className="flex items-center space-x-3 mt-3">
                <button
                  onClick={handleAcceptCookies}
                  className="text-xs bg-custom-teal text-black font-medium px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
                <button
                  onClick={handleCustomizeCookies}
                  className="text-xs text-custom-text-secondary hover:text-custom-text px-3 py-1.5 transition-colors"
                  aria-label="Customize cookie preferences"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
