import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      showError("Passwords do not match. Please try again.");
      return;
    }
    
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
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        showError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      showError('Registration failed. Please try again.');
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
      <div className="bg-custom-bg-2 p-8 rounded-lg shadow-md w-full max-w-md transition-theme">
        <h2 className="text-2xl font-bold text-center mb-6">Register for Campus Connect</h2>

        <div className="flex items-center justify-center mb-4">
          <div className="flex gap-3 items-center">
            <ThemeToggle showLabel={true} />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
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
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Password
            </label>
            <div className="input-with-icon">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 pr-10 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
                placeholder="Your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('password')}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon isOpen={showPassword} />
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-custom-text-secondary text-sm font-bold mb-2">
              Confirm Password
            </label>
            <div className="input-with-icon">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="shadow appearance-none border border-custom-border rounded w-full py-2 px-3 pr-10 text-custom-text leading-tight focus:outline-none focus:ring-2 focus:ring-custom-teal bg-input"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                <EyeIcon isOpen={showConfirmPassword} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
            <Link
              to="/login"
              className="inline-block align-baseline font-bold text-sm text-custom-teal hover:text-blue-800"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
