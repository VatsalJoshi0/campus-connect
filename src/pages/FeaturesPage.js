import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const features = [
    {
      icon: 'psychology',
      title: 'AI-Powered Matching',
      description: 'Connect with the right people using our intelligent matching algorithm that analyzes your interests, skills, and goals.',
      color: 'text-purple-500'
    },
    {
      icon: 'event',
      title: 'Event Management',
      description: 'Discover, register, and attend campus events. Get personalized recommendations based on your interests.',
      color: 'text-blue-500'
    },
    {
      icon: 'qr_code_scanner',
      title: 'QR Code Networking',
      description: 'Instantly exchange contact information at events using QR codes. Quick, seamless, and efficient.',
      color: 'text-teal-500'
    },
    {
      icon: 'chat',
      title: 'Real-time Messaging',
      description: 'Stay connected with your network through our built-in messaging system. Direct messages and group chats.',
      color: 'text-green-500'
    },
    {
      icon: 'videocam',
      title: 'Live Sessions',
      description: 'Join virtual networking sessions, workshops, and webinars. Interactive and engaging experiences.',
      color: 'text-red-500'
    },
    {
      icon: 'star',
      title: 'Gamification & Rewards',
      description: 'Earn points and badges for networking activities. Unlock achievements and climb the leaderboard.',
      color: 'text-yellow-500'
    },
    {
      icon: 'analytics',
      title: 'Profile Analytics',
      description: 'Track your networking progress with detailed analytics and insights about your connections.',
      color: 'text-indigo-500'
    },
    {
      icon: 'calendar_today',
      title: 'Smart Scheduling',
      description: 'Manage your event calendar, set reminders, and never miss important networking opportunities.',
      color: 'text-orange-500'
    },
    {
      icon: 'workspace_premium',
      title: 'Verified Profiles',
      description: 'Connect with confidence. All profiles are verified to ensure authentic networking experiences.',
      color: 'text-cyan-500'
    },
    {
      icon: 'share',
      title: 'Social Feed',
      description: 'Share updates, achievements, and insights with your network. Engage with content that matters.',
      color: 'text-pink-500'
    },
    {
      icon: 'school',
      title: 'Student-Focused',
      description: 'Built specifically for students with features designed to enhance your academic and professional journey.',
      color: 'text-blue-600'
    },
    {
      icon: 'security',
      title: 'Privacy & Security',
      description: 'Your data is protected with enterprise-grade security. Control who sees your information.',
      color: 'text-gray-500'
    }
  ];

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-custom-text mb-4">
            Powerful Features for <span className="text-custom-teal">Campus Networking</span>
          </h1>
          <p className="text-xl text-custom-text-secondary max-w-3xl mx-auto">
            Everything you need to build meaningful connections, attend events, and grow your professional network.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-custom-bg-2 p-6 rounded-lg border border-custom-border card-hover group"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-custom-bg mb-4 group-hover:scale-110 transition-transform`}>
                <span className={`material-icons text-3xl ${feature.color}`}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-custom-text mb-3">
                {feature.title}
              </h3>
              <p className="text-custom-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-custom-blue to-custom-teal p-12 rounded-lg text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of students already networking and growing on Campus Connect.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Link
              to="/register"
              className="bg-white text-custom-blue px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-opacity"
            >
              Sign Up Now
            </Link>
            <Link
              to="/events"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all"
            >
              Browse Events
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-custom-teal mb-2">10K+</div>
            <div className="text-custom-text-secondary">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-custom-teal mb-2">500+</div>
            <div className="text-custom-text-secondary">Events Monthly</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-custom-teal mb-2">95%</div>
            <div className="text-custom-text-secondary">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-custom-teal mb-2">50+</div>
            <div className="text-custom-text-secondary">Universities</div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeaturesPage;
