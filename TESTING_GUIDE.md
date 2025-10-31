# Testing & Validation Guide

## Table of Contents
1. [Testing Strategy](#testing-strategy)
2. [Functional Testing](#functional-testing)
3. [Performance Testing](#performance-testing)
4. [Accessibility Testing](#accessibility-testing)
5. [Security Testing](#security-testing)
6. [Browser Compatibility](#browser-compatibility)
7. [Mobile Testing](#mobile-testing)

---

## Testing Strategy

This guide follows the audit recommendations to ensure the Campus Connect platform meets production-grade standards.

### Testing Pyramid
```
    /\
   /E2E\        End-to-End Tests (Few)
  /------\
 /Integr.\     Integration Tests (Some)
/----------\
| Unit Tests|  Unit Tests (Many)
\----------/
```

---

## Functional Testing

### 1. User Registration Flow

**Test Case: New User Registration**
```
✓ Navigate to /register
✓ Fill in valid email (college domain)
✓ Fill in valid phone number
✓ Fill in enrollment number
✓ Create password meeting all requirements:
  - Minimum 8 characters
  - One uppercase letter
  - One lowercase letter
  - One number
  - One special character
✓ Confirm password matches
✓ Submit form
✓ Verify success notification
✓ Verify redirect to home page
✓ Verify user is authenticated
```

**Test Case: Invalid Registration**
```
✓ Invalid email format → Show error
✓ Invalid phone number → Show error
✓ Weak password → Show specific error
✓ Passwords don't match → Show error
✓ Rate limiting (3 attempts) → Show timeout message
```

### 2. User Login Flow

**Test Case: Successful Login**
```
✓ Navigate to /login
✓ Enter valid credentials
✓ Submit form
✓ Verify success notification
✓ Verify redirect to home page
✓ Verify session token stored
✓ Verify user data loaded
```

**Test Case: Failed Login**
```
✓ Invalid credentials → Show error
✓ Empty fields → Show validation errors
✓ Rate limiting (5 attempts per 5 min) → Block login
```

### 3. Event Registration

**Test Case: Register for Event**
```
✓ Navigate to home page
✓ Click "Register" on an event card
✓ Verify confirmation notification
✓ Verify points awarded (15 pts)
✓ Event appears in "Your Upcoming Events"
```

### 4. Messaging System

**Test Case: Send Message**
```
✓ Navigate to /messages
✓ Select a contact from list
✓ Type message (max 1000 chars)
✓ Click "Send"
✓ Verify message appears in chat
✓ Verify message is sanitized (no XSS)
✓ Verify messages sorted by sequence
✓ Verify timestamp displayed correctly
```

**Test Case: XSS Prevention**
```
✓ Attempt to send <script>alert('XSS')</script>
✓ Verify script tags are stripped
✓ Message displays as plain text
✓ No JavaScript execution
```

---

## Performance Testing

### Core Web Vitals Thresholds

Run Lighthouse audit on each major page:

```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

**Target Metrics:**
- **LCP (Largest Contentful Paint)**: < 2.5s ✓
- **INP (Interaction to Next Paint)**: < 200ms ✓
- **CLS (Cumulative Layout Shift)**: < 0.1 ✓
- **FCP (First Contentful Paint)**: < 1.8s ✓
- **TTFB (Time to First Byte)**: < 800ms ✓

### Performance Test Checklist

#### Image Optimization
```
✓ All images use OptimizedImage component
✓ Images have explicit width/height (prevent CLS)
✓ Lazy loading enabled for below-fold images
✓ Images use responsive srcset
✓ Loading skeleton shown during image load
```

#### Bundle Size
```bash
npm run build

# Check bundle sizes
ls -lh build/static/js/*.js

# Target: Main bundle < 250KB (gzipped)
```

#### Network Performance
```
✓ API calls use retry logic with exponential backoff
✓ Failed requests don't crash the app
✓ Loading states shown during API calls
✓ Optimistic updates where appropriate
```

---

## Accessibility Testing

### WCAG 2.2 Level AA Compliance

#### Automated Testing
```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run in browser console
axe.run().then(results => {
  console.log(results.violations);
});
```

#### Manual Testing Checklist

**Keyboard Navigation**
```
✓ Tab through all interactive elements
✓ Focus indicators visible on all elements
✓ No keyboard traps in modals/dropdowns
✓ Skip to main content link works
✓ Escape closes modals/dropdowns
```

**Screen Reader Testing**
```
# macOS: VoiceOver (Cmd+F5)
# Windows: NVDA (free) or JAWS

✓ All images have descriptive alt text
✓ Decorative images use alt=""
✓ Form inputs have associated labels
✓ Error messages announced to screen reader
✓ Dynamic content changes announced (aria-live)
✓ Semantic HTML used (header, nav, main, footer)
```

**Color Contrast**
```
# Use WebAIM Contrast Checker
# https://webaim.org/resources/contrastchecker/

✓ All text has 4.5:1 contrast ratio minimum
✓ Large text (18pt+) has 3:1 minimum
✓ UI components have 3:1 contrast
✓ Don't rely on color alone for information
```

**Touch Targets**
```
✓ All interactive elements minimum 44×44px
✓ Adequate spacing between clickable elements
✓ Works on mobile devices (test on real device)
```

---

## Security Testing

### OWASP Top 10 Verification

#### 1. Injection Prevention
```
✓ All user input sanitized using DOMPurify
✓ Chat messages render as text, not HTML
✓ URL parameters validated
✓ SQL prepared statements (backend)
```

#### 2. Authentication & Session Management
```
✓ Passwords hashed with bcrypt/Argon2
✓ Session tokens are HttpOnly, Secure, SameSite
✓ Rate limiting on login (5 attempts/5min)
✓ Rate limiting on registration (3 attempts/10min)
✓ No credentials in URL or localStorage
✓ Auto-logout after inactivity
```

#### 3. XSS Prevention
```
✓ Content Security Policy headers set
✓ X-XSS-Protection header enabled
✓ All user content escaped/sanitized
✓ React's JSX escapes by default (no dangerouslySetInnerHTML)
```

#### 4. Access Control
```
✓ Backend validates user owns requested resource
✓ Frontend hides unauthorized actions (defense in depth)
✓ API returns 403 for unauthorized requests
✓ Session validation on every protected route
```

#### 5. Security Headers
```bash
# Verify headers are set
curl -I https://your-domain.com

Expected headers:
✓ X-Content-Type-Options: nosniff
✓ X-Frame-Options: DENY
✓ X-XSS-Protection: 1; mode=block
✓ Referrer-Policy: strict-origin-when-cross-origin
✓ Content-Security-Policy: [restrictive policy]
✓ Strict-Transport-Security: max-age=31536000
```

---

## Browser Compatibility

### Required Browser Support

Test on **latest versions** of:

#### Desktop
- ✓ Chrome (Chromium-based)
- ✓ Firefox
- ✓ Safari
- ✓ Edge

#### Mobile
- ✓ iOS Safari (iOS 14+)
- ✓ Chrome Mobile (Android)
- ✓ Samsung Internet

### Testing Checklist per Browser
```
✓ UI renders correctly
✓ All interactions work (click, tap, scroll)
✓ Forms submit successfully
✓ Images load and display properly
✓ CSS styles applied correctly
✓ No console errors
✓ Performance acceptable (Lighthouse score)
```

### Cross-Browser Testing Tools
- **BrowserStack** (recommended)
- **Sauce Labs**
- **LambdaTest**
- Manual testing on physical devices

---

## Mobile Testing

### Device Testing Matrix

**Must test on real devices:**
- iPhone (iOS 14+)
- Android phone (Android 10+)
- iPad/Tablet

### Mobile-Specific Tests

#### Responsive Design
```
✓ Layout adapts at breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
✓ Text remains readable (min 16px)
✓ No horizontal scrolling
✓ Images scale appropriately
```

#### Touch Interactions
```
✓ All buttons easily tappable (44×44px minimum)
✓ Swipe gestures work (if applicable)
✓ Pinch-to-zoom disabled appropriately
✓ Form inputs trigger correct mobile keyboard
✓ Dropdown menus usable on mobile
```

#### Mobile Performance
```
✓ Page loads in < 3 seconds on 4G
✓ Images optimized for mobile
✓ No layout shift during loading
✓ Smooth scrolling (60fps)
```

#### Mobile-Specific Features
```
✓ Safe area insets respected (iPhone notch)
✓ Viewport meta tag configured
✓ Touch events don't conflict
✓ Service worker (if using PWA features)
```

---

## Running Tests

### Unit Tests
```bash
npm test
```

### Lighthouse Audit
```bash
npm run build
npx serve -s build
lighthouse http://localhost:3000 --view
```

### Manual Test Execution

Create a test execution log:

```
Date: ___________
Tester: ___________
Build: ___________

Test Results:
[ ] Registration Flow
[ ] Login Flow  
[ ] Event Registration
[ ] Messaging
[ ] Performance (Lighthouse > 90)
[ ] Accessibility (no violations)
[ ] Security headers
[ ] Mobile responsive
[ ] Cross-browser

Notes:
_______________________
```

---

## Reporting Issues

When filing a bug, include:
1. **Browser & Version**
2. **Device** (if mobile)
3. **Steps to Reproduce**
4. **Expected Behavior**
5. **Actual Behavior**
6. **Screenshots/Video** (if applicable)
7. **Console Errors** (F12 → Console)

---

## Continuous Testing

### Pre-Deployment Checklist
```
✓ All tests passing
✓ Lighthouse score > 90 (all categories)
✓ No accessibility violations
✓ Security headers verified
✓ Cross-browser tested
✓ Mobile tested on real devices
✓ Build succeeds without warnings
✓ Bundle size within limits
```

### Post-Deployment Verification
```
✓ Production URL loads
✓ Login works
✓ Critical user flows work
✓ Performance metrics acceptable
✓ Error tracking configured
✓ Analytics working
```

---

**Last Updated:** 2025-10-31  
**Version:** 1.0.0
