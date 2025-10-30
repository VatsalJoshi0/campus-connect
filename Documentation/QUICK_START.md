# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

### 3. Open in Browser
Navigate to `http://localhost:3000`

## 📱 What You'll See

- **Home Page** (`/`) - Main dashboard with events, user profile, and recommendations
- **Login Page** (`/login`) - User authentication
- **Registration Page** (`/register`) - New user signup

## 🎨 Features

✅ **Dark/Light Theme Toggle** - Click the toggle in the header  
✅ **Responsive Design** - Works on desktop, tablet, and mobile  
✅ **Hero Carousel** - Auto-rotating featured events  
✅ **Event Filtering** - Filter events by category  
✅ **Form Validation** - Password matching and required fields  
✅ **Navigation** - Seamless routing between pages  

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm test` | Run tests |
| `npm run build` | Build for production |
| `npm run eject` | Eject from Create React App |

## 🔧 Troubleshooting

**Port 3000 already in use?**
```bash
npx kill-port 3000
npm start
```

**Dependencies not installing?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📂 Key Files

- `src/App.js` - Main application component
- `src/pages/HomePage.js` - Main dashboard
- `src/contexts/ThemeContext.js` - Theme management
- `src/components/` - Reusable UI components

## 🎯 Next Steps

1. Customize the event data in `HomePage.js`
2. Add your own styling in `index.css`
3. Implement backend API integration
4. Add more pages and features

Happy coding! 🎉
