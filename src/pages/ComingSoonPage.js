import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ComingSoonPage = () => {
  const location = useLocation();
  
  const pageInfo = {
    '/faq': { title: 'FAQ', icon: 'help', desc: 'Frequently Asked Questions' },
    '/pricing': { title: 'Pricing', icon: 'payments', desc: 'Plans and Pricing' },
    '/docs': { title: 'Documentation', icon: 'description', desc: 'Developer Documentation' },
    '/blog': { title: 'Blog', icon: 'article', desc: 'News and Updates' },
    '/community': { title: 'Community', icon: 'groups', desc: 'Community Forum' },
    '/support': { title: 'Support', icon: 'support_agent', desc: 'Help and Support' },
    '/about': { title: 'About Us', icon: 'info', desc: 'About Campus Connect' },
    '/careers': { title: 'Careers', icon: 'work', desc: 'Join Our Team' },
    '/contact': { title: 'Contact', icon: 'contact_mail', desc: 'Get in Touch' },
    '/partners': { title: 'Partners', icon: 'handshake', desc: 'Partnership Opportunities' },
    '/cookies': { title: 'Cookie Policy', icon: 'cookie', desc: 'Cookie Usage Policy' }
  };

  const currentPage = pageInfo[location.pathname] || { 
    title: 'Coming Soon', 
    icon: 'schedule', 
    desc: 'This page is under development' 
  };

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-16 flex items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="mb-8">
            <div className="inline-block p-6 bg-custom-teal bg-opacity-10 rounded-full">
              <span className="material-icons text-6xl text-custom-teal">
                {currentPage.icon}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-custom-text mb-4">
            {currentPage.title}
          </h1>
          <p className="text-xl text-custom-text-secondary mb-8">
            {currentPage.desc}
          </p>

          {/* Coming Soon Message */}
          <div className="bg-custom-bg-2 border border-custom-border rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-custom-text mb-3">
              Coming Soon!
            </h2>
            <p className="text-custom-text-secondary leading-relaxed">
              We're working hard to bring you this feature. It will be available soon. 
              In the meantime, feel free to explore other parts of Campus Connect.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-custom-teal text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              <span className="material-icons">home</span>
              Go to Homepage
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center gap-2 bg-custom-bg-2 border border-custom-border text-custom-text px-6 py-3 rounded-lg font-semibold hover:bg-custom-bg-3 transition-colors"
            >
              <span className="material-icons">event</span>
              Browse Events
            </Link>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/network"
              className="flex items-center justify-center gap-2 p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="material-icons text-custom-teal">people</span>
              <span className="text-custom-text">Network</span>
            </Link>
            <Link
              to="/messages"
              className="flex items-center justify-center gap-2 p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="material-icons text-custom-teal">chat</span>
              <span className="text-custom-text">Messages</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center justify-center gap-2 p-4 bg-custom-bg-2 border border-custom-border rounded-lg hover:border-custom-teal transition-colors"
            >
              <span className="material-icons text-custom-teal">person</span>
              <span className="text-custom-text">Profile</span>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ComingSoonPage;
