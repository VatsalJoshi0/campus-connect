# 🎓 Campus Connect - Event Networking Platform

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Version](https://img.shields.io/badge/version-2.0.0-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()
[![React](https://img.shields.io/badge/React-18.2.0-61dafb)]()
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38bdf8)]()
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://vatsaljoshi0.github.io/campus-connect)

A modern, feature-rich event networking platform for students built with React. Connect meaningfully at college events through AI-powered matching, real-time chat, QR code exchanges, and gamified networking experiences.

🌐 **Live Demo:** [https://vatsaljoshi0.github.io/campus-connect](https://vatsaljoshi0.github.io/campus-connect)

## 🎉 Recent Updates (v2.0.0)

**Major technical enhancements completed!** This version includes:
- ✅ **Hero Carousel** - Automated event showcase with smooth cross-fade transitions
- ✅ **Interactive Navigation** - All buttons connected with proper routing
- ✅ **Connection System** - Dynamic connect button with state management
- ✅ **Schedule Integration** - My Schedule accessible from Events page
- ✅ **Security hardening** - XSS prevention, input sanitization
- ✅ **Performance optimization** - Optimized load times and Core Web Vitals
- ✅ **Accessibility** - WCAG 2.2 Level AA compliant
- ✅ **Image optimization** - Lazy loading, responsive images
- ✅ **Form validation** - Comprehensive client-side validation

📖 **See [DOCUMENTATION.md](./DOCUMENTATION.md) for complete details**

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm start
```

### Build for Production
```bash
npm run build
```

Access the app at `http://localhost:3000`

---

## ✨ Core Features

### User Experience
- **🔐 Authentication** - Secure login and registration with JWT
- **👤 Profile Builder** - Interests, skills, goals, and projects
- **🤖 AI Matching** - Smart connection suggestions based on compatibility
- **💬 Real-time Chat** - Direct messages and group forums
- **📱 QR Exchange** - Instant contact sharing via QR codes
- **🎮 Gamification** - Points, badges, and leaderboards

### Events & Activities
- **📅 Event Discovery** - Browse and filter events by category
- **📺 Live Sessions** - Join interactive event sessions
- **🗓️ Personal Schedule** - Calendar with event registration and reminders
- **📢 Social Feed** - Posts, polls, and trending topics

### System Features
- **🌓 Dark/Light Theme** - Persistent theme toggle
- **🔔 Notifications** - Real-time alerts and updates
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **⚡ Modern UI** - Built with Tailwind CSS and Material Icons

---

## 🏗️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Google Material Icons
- **State Management**: React Context API
- **Storage**: localStorage for persistence

---

## 📂 Project Structure

For detailed project structure and file organization, see **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**

```
WebApp.io/
├── src/                      # Source code
│   ├── components/           # Reusable UI components (12 files)
│   ├── contexts/             # State management (4 contexts)
│   ├── pages/                # Main pages (11 pages)
│   ├── hooks/                # Custom hooks
│   ├── utils/                # Utility functions
│   ├── App.js                # Main app with routing
│   └── index.js              # Entry point
├── public/                   # Static assets
├── Documentation/            # Detailed documentation
├── package.json              # Dependencies
└── README.md                 # This file
```

## 📖 Documentation

### Core Documentation
- **[README.md](./README.md)** - This file (overview and quick start)
- **[DOCUMENTATION.md](./DOCUMENTATION.md)** - Complete technical documentation
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contribution guidelines for developers
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[LICENSE](./LICENSE)** - MIT License details

### Additional Files
- **[.env.example](./.env.example)** - Environment variables template
- **[package.json](./package.json)** - Dependencies and scripts
- **[tailwind.config.js](./tailwind.config.js)** - Tailwind CSS configuration

---

## 🎮 Gamification System

Earn points and badges by engaging with the platform:

### Points
- Make connections: **10 pts**
- Send messages: **5 pts**
- QR exchange: **15 pts**
- Join live sessions: **20 pts**
- Create posts: **15 pts**

### Badges
- **Networker** - 100+ points
- **Super Connector** - 500+ points
- **Active Participant** - 10+ events joined
- **Social Butterfly** - 50+ connections

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run eject` | Eject from CRA (one-way) |

---

## 🌐 Browser Support

✅ Chrome (latest)  
✅ Firefox (latest)  
✅ Safari (latest)  
✅ Edge (latest)

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

---

## 🚢 Deployment

### GitHub Pages (Current)
The app is live at: **[https://vatsaljoshi0.github.io/campus-connect](https://vatsaljoshi0.github.io/campus-connect)**

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Alternative Platforms
- **Netlify** - Drag and drop the `build` folder
- **Vercel** - Import GitHub repository
- **Firebase Hosting** - Use Firebase CLI
- **AWS S3** - Upload to S3 bucket with static hosting

See [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed deployment instructions.

---

## 🤝 Contributing

We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

### Quick Start
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature-name`)
3. Commit your changes (`git commit -m 'feat: add feature'`)
4. Push to the branch (`git push origin feature/feature-name`)
5. Open a Pull Request

### Areas for Contribution
- 🐛 Bug fixes
- ✨ New features
- 📖 Documentation improvements
- ♿ Accessibility enhancements
- ⚡ Performance optimizations

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## 📞 Support

For questions or support:
- 📖 Review [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed information
- 🐛 Report issues on [GitHub Issues](https://github.com/VatsalJoshi0/campus-connect/issues)
- 💬 Check [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines
- 📋 See [CHANGELOG.md](./CHANGELOG.md) for version history

---

## 📊 Project Stats

- **Lines of Code:** ~10,000+
- **Components:** 15+
- **Pages:** 11
- **Contexts:** 4
- **Bundle Size:** ~160KB (gzipped)
- **Performance Score:** 90+

---

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

---

## 👨‍💻 Author

**Vatsal Joshi**
- GitHub: [@VatsalJoshi0](https://github.com/VatsalJoshi0)
- Project: [Campus Connect](https://github.com/VatsalJoshi0/campus-connect)

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**
