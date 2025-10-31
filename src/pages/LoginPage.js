import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import ThemeToggle from '../components/ThemeToggle';
import LoadingSpinner from '../components/LoadingSpinner';
import { isValidEmail, isValidPhone, checkRateLimit } from '../utils/validation';
import { sanitizeText } from '../utils/sanitize';

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
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'password' ? value : sanitizeText(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
    
    // Clear field-specific error
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    if (error) setError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone || !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.enrollment || formData.enrollment.trim().length < 3) {
      newErrors.enrollment = 'Please enter a valid enrollment number';
    }
    
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Rate limiting check
    if (!checkRateLimit('login', 5, 300000)) { // 5 attempts per 5 minutes
      const errorMsg = 'Too many login attempts. Please try again in 5 minutes.';
      setError(errorMsg);
      showError(errorMsg);
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      showError('Please fix the errors in the form');
      return;
    }
    
    setAttempts(prev => prev + 1);
    
    const result = await login(formData);
    if (result.success) {
      showSuccess('🎉 Welcome back to Campus Connect!', {
        duration: 3000
      });
      // Clear rate limit on successful login
      localStorage.removeItem('rateLimit_login');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } else {
      const errorMsg = result.error || 'Login failed. Please check your credentials.';
      setError(errorMsg);
      showError(errorMsg);
    }
  };

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen flex items-center justify-center transition-theme">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content" className="bg-custom-bg-2 p-8 rounded-lg shadow-md w-full max-w-md transition-theme">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In to Campus Connect</h1>

        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-3 items-center">
            <ThemeToggle showLabel={true} />
          </div>
        </div>

        {error && (
          <div 
            className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded" 
            role="alert"
            aria-live="polite"
          >
            <strong className="font-bold">Error: </strong>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate aria-label="Login form">
          <div className="mb-4">
            <label htmlFor="email" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Email ID (College Provided)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                errors.email ? 'border-red-500' : 'border-custom-border'
              }`}
              placeholder="yourname@university.edu"
              required
              disabled={loading}
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                errors.phone ? 'border-red-500' : 'border-custom-border'
              }`}
              placeholder="+1 (555) 123-4567"
              required
              disabled={loading}
              aria-required="true"
              aria-invalid={errors.phone ? 'true' : 'false'}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              autoComplete="tel"
            />
            {errors.phone && (
              <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.phone}
              </p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="enrollment" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Enrollment Number
            </label>
            <input
              type="text"
              id="enrollment"
              name="enrollment"
              value={formData.enrollment}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                errors.enrollment ? 'border-red-500' : 'border-custom-border'
              }`}
              placeholder="ENR123456"
              required
              disabled={loading}
              aria-required="true"
              aria-invalid={errors.enrollment ? 'true' : 'false'}
              aria-describedby={errors.enrollment ? 'enrollment-error' : undefined}
              autoComplete="off"
            />
            {errors.enrollment && (
              <p id="enrollment-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.enrollment}
              </p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                errors.password ? 'border-red-500' : 'border-custom-border'
              }`}
              placeholder="••••••••"
              required
              disabled={loading}
              aria-required="true"
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete="current-password"
              minLength="6"
            />
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <button
              className="bg-custom-blue hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
              type="submit"
              disabled={loading}
              aria-busy={loading ? 'true' : 'false'}
            >
              {loading && <LoadingSpinner size="small" />}
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
            <Link
              to="#"
              className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-custom-teal rounded px-1"
              aria-label="Reset your forgotten password"
            >
              Forgot password?
            </Link>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-custom-text-secondary text-sm">
            Don't have an account?{' '}
            <Link 
              to="/register" 
              className="text-custom-teal hover:text-blue-800 font-bold focus:outline-none focus:ring-2 focus:ring-custom-teal rounded px-1"
              aria-label="Create a new Campus Connect account"
            >
              Register here
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
