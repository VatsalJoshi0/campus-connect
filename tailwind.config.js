/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#1a202c',
        'dark-lighter': '#2d3748',
      },
      textColor: {
        'dark': '#fff',
        'dark-lighter': '#e2e8f0',
      },
      colors: {
        'custom-bg': 'var(--custom-bg)',
        'custom-bg-2': 'var(--custom-bg-2)',
        'custom-bg-3': 'var(--custom-bg-3)',
        'custom-text': 'var(--custom-text)',
        'custom-text-secondary': 'var(--custom-text-secondary)',
        'custom-border': 'var(--custom-border)',
        'custom-border-2': 'var(--custom-border-2)',
        'custom-blue': 'var(--custom-blue)',
        'custom-teal': 'var(--custom-teal)',
        'custom-orange': 'var(--custom-orange)',
        'input-bg': 'var(--input-bg)',
        'card-bg': 'var(--card-bg)',
        'modal-bg': 'var(--modal-bg)',
        'hover-bg': 'var(--hover-bg)',
        'active-bg': 'var(--active-bg)',
      },
      backgroundImage: {
        'hero-bg-1': 'var(--hero-bg-1)',
        'hero-bg-2': 'var(--hero-bg-2)',
        'hero-bg-3': 'var(--hero-bg-3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 245, 212, 0.1), 0 2px 4px -1px rgba(0, 245, 212, 0.06)',
        'custom-lg': '0 10px 15px -3px rgba(0, 245, 212, 0.1), 0 4px 6px -2px rgba(0, 245, 212, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
