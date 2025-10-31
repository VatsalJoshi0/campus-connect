import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { isValidEmail, isValidPhone, validatePassword, checkRateLimit } from '../utils/validation';
import { sanitizeText } from '../utils/sanitize';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showSuccess, showError } = useNotification();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    enrollment: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ isValid: false, errors: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'password' || name === 'confirmPassword' ? value : sanitizeText(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
    
    // Clear field-specific error
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Check password strength in real-time
    if (name === 'password') {
      const strength = validatePassword(sanitizedValue);
      setPasswordStrength(strength);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid college email address';
    }
    
    if (!formData.phone || !isValidPhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.enrollment || formData.enrollment.trim().length < 3) {
      newErrors.enrollment = 'Please enter a valid enrollment number';
    }
    
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Rate limiting check
    if (!checkRateLimit('registration', 3, 600000)) { // 3 attempts per 10 minutes
      showError('Too many registration attempts. Please try again in 10 minutes.');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      showError('Please fix the errors in the form before submitting');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await register({
        name: 'Vatsal Joshi', // You can add name field to form later
        email: formData.email,
        phone: formData.phone,
        enrollment: formData.enrollment,
        password: formData.password
      });
      
      if (result.success) {
        showSuccess('🎉 Registration successful! Welcome to Campus Connect!', {
          duration: 4000
        });
        // Clear rate limit on success
        localStorage.removeItem('rateLimit_registration');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        showError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      showError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const EyeIcon = ({ isOpen }) => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isOpen ? (
        <>
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </>
      ) : (
        <>
          <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7 .9-1.9 2.2-3.6 3.8-4.9"></path>
          <path d="M1 1l22 22"></path>
          <path d="M9.88 9.88a3 3 0 0 0 4.24 4.24"></path>
        </>
      )}
    </svg>
  );

  return (
    <div className="bg-custom-bg text-custom-text min-h-screen flex items-center justify-center transition-theme">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <main id="main-content" className="bg-custom-bg-2 p-8 rounded-lg shadow-md w-full max-w-md transition-theme">
        <h1 className="text-2xl font-bold text-center mb-6">Register for Campus Connect</h1>

        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-3 items-center">
            <ThemeToggle showLabel={true} />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate aria-label="Registration form">
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
              disabled={isSubmitting}
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : 'email-help'}
              autoComplete="email"
            />
            <p id="email-help" className="text-xs text-custom-text-secondary mt-1">
              Use your official college email address
            </p>
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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

          <div className="mb-4">
            <label htmlFor="password" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Password
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                  errors.password ? 'border-red-500' : 'border-custom-border'
                }`}
                placeholder="Create a strong password"
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby="password-requirements password-error"
                autoComplete="new-password"
                minLength="8"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('password')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                tabIndex="0"
              >
                <EyeIcon isOpen={showPassword} />
              </button>
            </div>
            <div id="password-requirements" className="text-xs mt-2 space-y-1">
              <p className="text-custom-text-secondary font-semibold">Password must contain:</p>
              <ul className="list-disc list-inside text-custom-text-secondary space-y-1">
                <li className={formData.password.length >= 8 ? 'text-green-600' : ''}>
                  At least 8 characters
                </li>
                <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}>
                  One uppercase letter
                </li>
                <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : ''}>
                  One lowercase letter
                </li>
                <li className={/[0-9]/.test(formData.password) ? 'text-green-600' : ''}>
                  One number
                </li>
                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}>
                  One special character
                </li>
              </ul>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-custom-text-secondary text-sm font-bold mb-2 required">
              Confirm Password
            </label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input ${
                  errors.confirmPassword ? 'border-red-500' : 'border-custom-border'
                }`}
                placeholder="Re-enter your password"
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                tabIndex="0"
              >
                <EyeIcon isOpen={showConfirmPassword} />
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-red-500 text-xs mt-1" role="alert">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-custom-blue hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-custom-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting ? 'true' : 'false'}
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-custom-teal rounded px-1"
              aria-label="Sign in to existing account"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RegistrationPage;
