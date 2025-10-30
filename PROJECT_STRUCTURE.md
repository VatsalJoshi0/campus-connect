# Campus Connect - Project Structure & Flow

## 📁 Project Overview

Campus Connect is a modern Event Networking platform built with React that helps students connect meaningfully at college events through AI-powered matching, real-time chat, and gamified networking.

---

## 🗂️ File Structure

```
WebApp.io/
├── public/                          # Static assets
│   ├── index.html                   # Main HTML template
│   └── theme-init.js                # Pre-React theme initialization (prevents FOUC)
│
├── src/                             # Source code
│   ├── components/                  # Reusable UI components
│   │   ├── ErrorBoundary.js         # Error handling wrapper
│   │   ├── EventCard.js             # Event display card
│   │   ├── Footer.js                # Application footer
│   │   ├── Header.js                # Navigation header with theme toggle
│   │   ├── HeroSection.js           # Homepage carousel
│   │   ├── LoadingSpinner.js        # Loading indicator
│   │   ├── NotificationDropdown.js  # Notification center
│   │   ├── QRCodeScanner.js         # QR code contact exchange
│   │   ├── SearchSuggestions.js     # Smart search functionality
│   │   ├── ThemeToggle.js           # Dark/Light mode toggle
│   │   ├── Toast.js                 # Toast notification system
│   │   └── UserAvatar.js            # User avatar component
│   │
│   ├── contexts/                    # React Context API (State Management)
│   │   ├── AuthContext.js           # User authentication state
│   │   ├── NetworkingContext.js     # Connections & gamification state
│   │   ├── NotificationContext.js   # Notification management
│   │   └── ThemeContext.js          # Theme management
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useLocalStorage.js       # Persistent local storage hook
│   │
│   ├── pages/                       # Main application pages (Routes)
│   │   ├── EventsPage.js            # Browse & filter events
│   │   ├── HomePage.js              # Main dashboard
│   │   ├── LiveSessionsPage.js      # Live event sessions
│   │   ├── LoginPage.js             # User login
│   │   ├── MessagesPage.js          # Chat & group forums
│   │   ├── NetworkPage.js           # AI matching & connections
│   │   ├── ProfilePage.js           # User profile management
│   │   ├── RegistrationPage.js      # User registration
│   │   ├── SchedulePage.js          # Personal event calendar
│   │   ├── SettingsPage.js          # App preferences
│   │   └── SocialFeedPage.js        # Social wall & posts
│   │
│   ├── utils/                       # Utility functions
│   │   └── themeUtils.js            # Theme helper functions
│   │
│   ├── App.js                       # Main app component with routing
│   ├── index.css                    # Global styles & CSS variables
│   └── index.js                     # Application entry point
│
├── Documentation/                   # Detailed documentation
│   ├── CampusConnect_Complete_Guide.docx
│   ├── CampusConnect_Complete_Guide.md
│   ├── CampusConnect_Documentation.docx
│   └── CampusConnect_Documentation.md
│
├── .gitignore                       # Git ignore rules
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Dependency lock file
├── tailwind.config.js               # Tailwind CSS configuration
├── README.md                        # Main project documentation
└── PROJECT_STRUCTURE.md             # This file - Project guide
```

---

## 🔄 Application Flow

### User Journey
```
1. Landing (HomePage) → View dashboard, events, recommendations
2. Register/Login → Create account or authenticate
3. Profile Setup → Add interests, skills, goals, projects
4. AI Matching → Receive smart connection suggestions
5. Networking → Connect with peers, exchange QR codes
6. Communication → Chat, join group forums
7. Events → Browse, register, join live sessions
8. Social → Post updates, participate in discussions
9. Gamification → Earn points, badges, climb leaderboards
```

### Technical Flow
```
index.js (Entry)
    ↓
App.js (Root Component)
    ↓
Providers (Context Wrappers)
    ├── ThemeProvider → Manages dark/light mode
    ├── AuthProvider → Manages user authentication
    ├── NetworkingProvider → Manages connections & gamification
    └── NotificationProvider → Manages notifications
        ↓
Router (React Router)
    ├── Routes → Maps URLs to page components
    └── Pages → Render based on current route
        ↓
Components → Reusable UI elements
```

---

## 🎯 Key Features by File

### Navigation & Layout
- **Header.js** → Navigation bar with all page links, user profile, notifications
- **Footer.js** → App footer with links and info
- **ThemeToggle.js** → Dark/Light mode switcher

### User Management
- **LoginPage.js** → User authentication with JWT
- **RegistrationPage.js** → New user signup with validation
- **ProfilePage.js** → Profile builder with interests, skills, goals, projects
- **AuthContext.js** → Authentication state management

### Networking Features
- **NetworkPage.js** → AI-powered matching, connection requests, matches display
- **QRCodeScanner.js** → Instant contact exchange via QR codes
- **NetworkingContext.js** → Connection management & gamification logic

### Communication
- **MessagesPage.js** → Direct messages & group forums with real-time interface
- **NotificationDropdown.js** → Notification center with alerts
- **NotificationContext.js** → Notification state management

### Events & Activities
- **EventsPage.js** → Browse, filter, and discover events
- **SchedulePage.js** → Personal calendar with event registration
- **LiveSessionsPage.js** → Join and participate in live event sessions
- **EventCard.js** → Reusable event display component

### Social Features
- **SocialFeedPage.js** → Social wall with posts, polls, trending topics
- **UserAvatar.js** → User profile picture component

### Settings & Preferences
- **SettingsPage.js** → App configuration, privacy, notifications, account management

### Utility & Support
- **SearchSuggestions.js** → Smart search across connections, events, users
- **LoadingSpinner.js** → Loading state indicator
- **ErrorBoundary.js** → Error handling wrapper
- **Toast.js** → Toast notification system
- **useLocalStorage.js** → Persistent storage hook

---

## 🎨 Theme System

### How It Works
1. **theme-init.js** (public/) → Runs BEFORE React loads to prevent flash
2. **ThemeContext.js** → React context for theme state
3. **themeUtils.js** → Helper functions for theme operations
4. **index.css** → CSS variables for light/dark modes

### CSS Variables
```css
:root (Light Mode)
  --custom-bg: #f8fafc
  --custom-text: #0f172a

.dark (Dark Mode)
  --custom-bg: #0f172a
  --custom-text: #f8fafc
```

---

## 🔌 State Management

### Context Providers (src/contexts/)

#### AuthContext
- User authentication (login/logout)
- JWT token management
- User profile data
- Authentication status

#### NetworkingContext
- Connection management
- AI matching algorithm
- Gamification (points, badges, leaderboard)
- QR code exchanges

#### ThemeContext
- Dark/light mode toggle
- Theme persistence (localStorage)
- Theme application

#### NotificationContext
- Notification management
- Alert categorization
- Read/unread status
- Real-time updates

---

## 🚀 Development Workflow

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm start

# Access app at http://localhost:3000
```

### Available Scripts
- **npm start** → Development server with hot reload
- **npm run build** → Production build
- **npm test** → Run test suite
- **npm run eject** → Eject from Create React App (one-way operation)

### Making Changes

1. **Add a new page**: Create file in `src/pages/`, add route in `App.js`
2. **Add a component**: Create file in `src/components/`, import where needed
3. **Add global state**: Extend existing context or create new one in `src/contexts/`
4. **Modify styles**: Update `src/index.css` or use Tailwind classes
5. **Change theme colors**: Modify CSS variables in `src/index.css`

---

## 📊 Data Flow

### Current Implementation (Development)
- **State**: React Context API
- **Storage**: localStorage for persistence
- **Data**: Mock data in components (arrays/objects)

### Production Ready
For production deployment, replace mock data with:
- **Backend API**: Express.js, Node.js, or similar
- **Database**: MongoDB, PostgreSQL, or Firebase
- **Authentication**: Firebase Auth, Auth0, or custom JWT
- **Real-time**: Socket.io for chat and notifications
- **File Storage**: AWS S3, Cloudinary for images

---

## 🎮 Gamification System

### Points Earning
- Making connections: **10 points**
- Sending messages: **5 points**
- QR contact exchange: **15 points**
- Joining live sessions: **20 points**
- Creating posts: **15 points**
- Liking posts: **2 points**
- Registering for events: **10 points**

### Badges
- **Networker**: 100+ points
- **Super Connector**: 500+ points
- **Active Participant**: 10+ events joined
- **Social Butterfly**: 50+ connections

### Leaderboard
Displays top users by total points earned across all activities.

---

## 🔒 Security Features

- JWT-based authentication (mock implementation)
- Password validation and confirmation
- Privacy controls for profile visibility
- Secure QR code exchange validation
- Input sanitization in forms

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Approach
- Mobile-first design with Tailwind CSS
- Responsive navigation (hamburger menu on mobile)
- Touch-optimized interactions
- Flexible grid layouts

---

## 🧪 Testing Recommendations

### Unit Tests
- Component rendering tests
- Context state management tests
- Utility function tests

### Integration Tests
- User authentication flow
- Connection request workflow
- Message sending/receiving
- Event registration

### E2E Tests
- Complete user journey
- Cross-browser compatibility
- Mobile responsiveness

---

## 🚢 Deployment Guide

### Build for Production
```bash
npm run build
```

### Hosting Options
1. **Netlify** (Recommended) → Auto-deploy from Git
2. **Vercel** → Optimized for React apps
3. **Firebase Hosting** → Google's hosting platform
4. **AWS S3 + CloudFront** → Enterprise solution

---

## 🔧 Customization Guide

### Changing App Name
1. Update `package.json` → "name" field
2. Update `public/index.html` → `<title>` tag
3. Update `README.md` → Project name

### Changing Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --custom-teal: #00f5d4;  /* Primary color */
  --custom-blue: #0077b6;  /* Secondary color */
}
```

### Adding New Features
1. Create component/page in appropriate folder
2. Add route if it's a page (in `App.js`)
3. Update navigation in `Header.js`
4. Add to this documentation

---

## 📚 Related Documentation

- **README.md** → Quick start and overview
- **Documentation/** → Detailed guides and user manuals
- **.gitignore** → Files excluded from version control
- **tailwind.config.js** → Tailwind CSS configuration

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

For questions or issues:
- Review this documentation
- Check README.md for quick start
- Review code comments in source files
- Check Documentation/ folder for detailed guides

---

**Last Updated**: October 2024  
**Version**: 1.0  
**Framework**: React 18.2  
**UI Library**: Tailwind CSS  
**Routing**: React Router DOM v6
