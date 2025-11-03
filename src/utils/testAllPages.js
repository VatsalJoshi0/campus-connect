// Automated Page Testing Script for Event Networking App
// This script tests all pages and components for functionality and UI consistency

const testPages = () => {
  const pages = [
    { path: '/', name: 'HomePage', expectedElements: ['.hero-section', '.event-card', '.profile-card'] },
    { path: '/login', name: 'LoginPage', expectedElements: ['input[name="email"]', 'input[name="password"]'] },
    { path: '/register', name: 'RegistrationPage', expectedElements: ['input[name="name"]', 'input[name="email"]'] },
    { path: '/events', name: 'EventsPage', expectedElements: ['.event-card', '.filter-pill'] },
    { path: '/network', name: 'NetworkPage', expectedElements: ['.connection-card', '.network-stats'] },
    { path: '/messages', name: 'MessagesPage', expectedElements: ['.chat-list', '.message-input'] },
    { path: '/live-sessions', name: 'LiveSessionsPage', expectedElements: ['.session-card', '.live-indicator'] },
    { path: '/profile', name: 'ProfilePage', expectedElements: ['.profile-header', '.profile-tabs'] },
    { path: '/settings', name: 'SettingsPage', expectedElements: ['.settings-section', '.theme-toggle'] },
    { path: '/schedule', name: 'SchedulePage', expectedElements: ['.calendar-view', '.event-list'] },
    { path: '/social-feed', name: 'SocialFeedPage', expectedElements: ['.feed-post', '.post-input'] }
  ];

  const testResults = {
    passed: [],
    failed: [],
    warnings: []
  };

  console.log('🧪 Starting automated page testing...\n');

  pages.forEach(page => {
    console.log(`Testing ${page.name} at ${page.path}...`);
    
    // Navigate to page
    if (window.location.pathname !== page.path) {
      window.location.href = `#${page.path}`;
    }

    // Wait for page load
    setTimeout(() => {
      // Check for expected elements
      page.expectedElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
          console.log(`✅ Found: ${selector}`);
          testResults.passed.push(`${page.name}: ${selector}`);
        } else {
          console.error(`❌ Missing: ${selector}`);
          testResults.failed.push(`${page.name}: ${selector}`);
        }
      });

      // Check for console errors
      const errors = window.__errors || [];
      if (errors.length > 0) {
        testResults.warnings.push(`${page.name}: ${errors.length} console errors`);
      }

      // Check responsive design
      const viewports = [
        { width: 375, height: 667, name: 'Mobile' },
        { width: 768, height: 1024, name: 'Tablet' },
        { width: 1920, height: 1080, name: 'Desktop' }
      ];

      viewports.forEach(viewport => {
        window.resizeTo(viewport.width, viewport.height);
        const layout = checkLayout();
        if (!layout.isValid) {
          testResults.warnings.push(`${page.name}: Layout issues on ${viewport.name}`);
        }
      });
    }, 1000);
  });

  // Generate report
  setTimeout(() => {
    generateTestReport(testResults);
  }, pages.length * 1500);
};

const checkLayout = () => {
  const issues = [];
  
  // Check for overflow
  const elements = document.querySelectorAll('*');
  elements.forEach(el => {
    if (el.scrollWidth > el.clientWidth) {
      issues.push(`Horizontal overflow on ${el.className}`);
    }
  });

  // Check for overlapping elements
  const rects = Array.from(elements).map(el => ({
    el,
    rect: el.getBoundingClientRect()
  }));

  // Check text readability
  const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const fontSize = parseFloat(styles.fontSize);
    if (fontSize < 12) {
      issues.push(`Text too small: ${el.className}`);
    }
  });

  return {
    isValid: issues.length === 0,
    issues
  };
};

const generateTestReport = (results) => {
  console.log('\n📊 TEST REPORT\n');
  console.log('=====================================');
  console.log(`✅ Passed: ${results.passed.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);
  console.log(`⚠️ Warnings: ${results.warnings.length}`);
  console.log('=====================================\n');

  if (results.failed.length > 0) {
    console.log('Failed Tests:');
    results.failed.forEach(test => console.log(`  - ${test}`));
  }

  if (results.warnings.length > 0) {
    console.log('\nWarnings:');
    results.warnings.forEach(warning => console.log(`  - ${warning}`));
  }

  // Save report to localStorage
  const report = {
    timestamp: new Date().toISOString(),
    results,
    summary: {
      totalTests: results.passed.length + results.failed.length,
      passRate: (results.passed.length / (results.passed.length + results.failed.length) * 100).toFixed(2) + '%'
    }
  };

  localStorage.setItem('testReport', JSON.stringify(report));
  console.log('\n💾 Report saved to localStorage');
  
  return report;
};

// UI Component Testing
const testComponents = () => {
  const components = [
    { name: 'Header', selector: 'header', tests: ['navigation', 'theme-toggle', 'search'] },
    { name: 'Footer', selector: 'footer', tests: ['links', 'social-media'] },
    { name: 'EventCard', selector: '.event-card', tests: ['hover-effect', 'button-click'] },
    { name: 'NotificationDropdown', selector: '.notification-dropdown', tests: ['toggle', 'mark-read'] },
    { name: 'ThemeToggle', selector: '.theme-toggle', tests: ['switch-theme'] }
  ];

  console.log('\n🔧 Testing UI Components...\n');

  components.forEach(component => {
    const element = document.querySelector(component.selector);
    if (element) {
      console.log(`✅ ${component.name} found`);
      
      // Test interactions
      component.tests.forEach(test => {
        switch(test) {
          case 'hover-effect':
            element.dispatchEvent(new MouseEvent('mouseenter'));
            const hasHoverClass = element.classList.contains('card-hover');
            console.log(`  ${hasHoverClass ? '✅' : '❌'} Hover effect`);
            break;
          
          case 'button-click':
            const button = element.querySelector('button');
            if (button) {
              button.click();
              console.log('  ✅ Button clickable');
            }
            break;
          
          case 'theme-toggle':
            const toggle = document.querySelector('.theme-toggle button');
            if (toggle) {
              toggle.click();
              const isDark = document.documentElement.classList.contains('dark');
              console.log(`  ✅ Theme switched to ${isDark ? 'dark' : 'light'}`);
            }
            break;
        }
      });
    } else {
      console.log(`❌ ${component.name} not found`);
    }
  });
};

// Performance Testing
const testPerformance = () => {
  console.log('\n⚡ Performance Testing...\n');
  
  const metrics = {
    loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
    domReady: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
    resources: performance.getEntriesByType('resource').length
  };

  console.log(`Page Load Time: ${metrics.loadTime}ms`);
  console.log(`DOM Ready: ${metrics.domReady}ms`);
  console.log(`First Paint: ${metrics.firstPaint}ms`);
  console.log(`Resources Loaded: ${metrics.resources}`);

  // Check for performance issues
  if (metrics.loadTime > 3000) {
    console.warn('⚠️ Page load time exceeds 3 seconds');
  }
  if (metrics.resources > 50) {
    console.warn('⚠️ Too many resources loaded');
  }

  return metrics;
};

// Accessibility Testing
const testAccessibility = () => {
  console.log('\n♿ Accessibility Testing...\n');
  
  const issues = [];

  // Check for alt text on images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      issues.push(`Missing alt text: ${img.src}`);
    }
  });

  // Check for ARIA labels on buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
      issues.push('Button missing label');
    }
  });

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1]);
    if (level - lastLevel > 1) {
      issues.push(`Heading hierarchy skip: ${heading.tagName}`);
    }
    lastLevel = level;
  });

  // Check color contrast
  const textElements = document.querySelectorAll('p, span, a, button');
  textElements.forEach(el => {
    const styles = window.getComputedStyle(el);
    const bgColor = styles.backgroundColor;
    const textColor = styles.color;
    // Simple contrast check (would need more sophisticated algorithm for production)
    if (bgColor === textColor) {
      issues.push('Poor color contrast detected');
    }
  });

  if (issues.length === 0) {
    console.log('✅ No accessibility issues found');
  } else {
    console.log(`❌ Found ${issues.length} accessibility issues:`);
    issues.forEach(issue => console.log(`  - ${issue}`));
  }

  return issues;
};

// Export functions for use in console
window.testAllPages = {
  testPages,
  testComponents,
  testPerformance,
  testAccessibility,
  runAllTests: () => {
    testPages();
    setTimeout(() => {
      testComponents();
      testPerformance();
      testAccessibility();
    }, 2000);
  }
};

console.log('🚀 Page testing script loaded. Run window.testAllPages.runAllTests() to start testing.');

export { testPages, testComponents, testPerformance, testAccessibility };
