import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    enrollment: '',
    password: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    const result = await login(formData);
    if (result.success) {
      showSuccess('🎉 Welcome back to Campus Connect!', {
        duration: 3000
      });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      const errorMsg = result.error || 'Login failed. Please try again.';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen flex items-center justify-center transition-theme">
      <div className="bg-custom-bg-2 p-8 rounded-lg shadow-md w-full max-w-md transition-theme">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In to Campus Connect</h2>

        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-3 items-center">
            <ThemeToggle showLabel={true} />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Email ID (College Provided)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
              placeholder="Your college email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
              placeholder="Your phone number"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="enrollment" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Enrollment Number
            </label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleChange}
              className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
              placeholder="Your enrollment number"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
              placeholder="Your password"
              required
              disabled={loading}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 flex items-center space-x-2"
              type="submit"
              disabled={loading}
            >
              {loading && <LoadingSpinner size="small" />}
              <span>Sign In</span>
            </button>
            <Link
              to="#"
              className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-custom-text-secondary text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-custom-teal hover:text-blue-800 font-bold">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
