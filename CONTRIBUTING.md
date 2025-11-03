# 🤝 Contributing to Campus Connect

Thank you for your interest in contributing to Campus Connect! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards others

**Unacceptable behavior includes:**
- Harassment, trolling, or derogatory comments
- Publishing others' private information
- Any conduct inappropriate in a professional setting

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/campus-connect.git
   cd campus-connect
   ```

3. **Add upstream remote:**
   ```bash
   git remote add upstream https://github.com/VatsalJoshi0/campus-connect.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Run development server:**
   ```bash
   npm start
   ```

---

## 🔄 Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your fork
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Branch Naming Convention

- `feature/` - New features (e.g., `feature/add-search`)
- `fix/` - Bug fixes (e.g., `fix/login-error`)
- `docs/` - Documentation (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/optimize-component`)
- `test/` - Testing (e.g., `test/add-unit-tests`)
- `style/` - Styling changes (e.g., `style/improve-theme`)

### 2. Make Your Changes

- Write clean, readable code
- Follow the project's coding standards
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run tests
npm test

# Build to verify
npm run build

# Check for linting errors
npm run lint
```

### 4. Commit Your Changes

Follow our commit message convention (see below):

```bash
git add .
git commit -m "feat: add new search functionality"
```

### 5. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request

Go to GitHub and create a pull request from your branch to the main repository.

---

## 📝 Coding Standards

### JavaScript/React

**Use ES6+ Features:**
```javascript
// ✅ Good
const handleClick = () => {
  console.log('Clicked');
};

// ❌ Bad
function handleClick() {
  console.log('Clicked');
}
```

**Use Functional Components with Hooks:**
```javascript
// ✅ Good
const MyComponent = () => {
  const [state, setState] = useState(false);
  return <div>{state && 'Active'}</div>;
};

// ❌ Bad
class MyComponent extends React.Component {
  // Class components
}
```

**Destructure Props:**
```javascript
// ✅ Good
const UserCard = ({ name, email }) => (
  <div>{name} - {email}</div>
);

// ❌ Bad
const UserCard = (props) => (
  <div>{props.name} - {props.email}</div>
);
```

**Use Meaningful Variable Names:**
```javascript
// ✅ Good
const isUserAuthenticated = checkAuth();
const eventList = getEvents();

// ❌ Bad
const x = checkAuth();
const arr = getEvents();
```

### CSS/Tailwind

**Prefer Tailwind Classes:**
```jsx
// ✅ Good
<button className="bg-custom-teal text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
  Click Me
</button>

// ❌ Bad
<button style={{ backgroundColor: '#06b6d4', color: 'white' }}>
  Click Me
</button>
```

**Use Theme Variables:**
```css
/* ✅ Good */
.custom-card {
  background-color: var(--custom-bg);
  color: var(--custom-text);
}

/* ❌ Bad */
.custom-card {
  background-color: #ffffff;
  color: #000000;
}
```

### File Naming

- **Components:** PascalCase (e.g., `EventCard.js`, `HeroSection.js`)
- **Utilities:** camelCase (e.g., `analytics.js`, `imageOptimization.js`)
- **Pages:** PascalCase with Page suffix (e.g., `HomePage.js`, `EventsPage.js`)
- **Contexts:** PascalCase with Context suffix (e.g., `AuthContext.js`)

### Code Organization

```javascript
// Import order:
// 1. React and third-party libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Local components
import Header from '../components/Header';
import Footer from '../components/Footer';

// 3. Contexts and hooks
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

// 4. Utilities
import { validateEmail } from '../utils/validation';
```

---

## 💬 Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat:** New feature
- **fix:** Bug fix
- **docs:** Documentation changes
- **style:** Code style changes (formatting, no logic change)
- **refactor:** Code refactoring
- **test:** Adding or updating tests
- **chore:** Maintenance tasks
- **perf:** Performance improvements

### Examples

```bash
feat(auth): add password reset functionality

fix(events): correct date formatting issue

docs(readme): update installation instructions

style(homepage): improve responsive layout

refactor(api): simplify error handling logic

test(profile): add unit tests for profile update

chore(deps): update React to v18.2.0

perf(images): optimize image loading
```

### Commit Message Rules

- Use present tense ("add feature" not "added feature")
- Use imperative mood ("move cursor to" not "moves cursor to")
- Capitalize first letter of subject
- No period at the end of subject
- Limit subject line to 50 characters
- Wrap body at 72 characters
- Reference issues in footer (`Closes #123`)

---

## 🔀 Pull Request Process

### Before Submitting

- ✅ Code follows project coding standards
- ✅ All tests pass (`npm test`)
- ✅ Build succeeds (`npm run build`)
- ✅ No console errors or warnings
- ✅ Documentation updated if needed
- ✅ Commits follow commit guidelines

### PR Title Format

Follow the same format as commit messages:

```
feat: add event search functionality
fix: resolve login redirect issue
docs: update API documentation
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

### Review Process

1. **Automated Checks** - GitHub Actions will run tests
2. **Code Review** - Maintainers will review your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, PR will be merged
5. **Celebrate!** 🎉 Your contribution is live!

### After PR is Merged

```bash
# Update your local main branch
git checkout main
git pull upstream main

# Delete feature branch
git branch -d feature/your-feature-name
git push origin --delete feature/your-feature-name
```

---

## 🐛 Reporting Issues

### Before Reporting

- Check existing issues to avoid duplicates
- Test on latest version
- Provide clear steps to reproduce

### Issue Template

```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 96]
- Version: [e.g., 2.0.0]

**Additional Context**
Any other information
```

### Feature Requests

```markdown
**Feature Description**
Clear description of proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Screenshots, mockups, examples
```

---

## 📚 Additional Resources

### Helpful Links

- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Git Best Practices](https://git-scm.com/book/en/v2)
- [JavaScript Style Guide](https://github.com/airbnb/javascript)

### Project Documentation

- [README.md](./README.md) - Project overview
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Complete documentation
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API reference

---

## 🎯 Areas for Contribution

We especially welcome contributions in these areas:

- 🐛 **Bug Fixes** - Fix reported issues
- ✨ **Features** - Add new functionality
- 📖 **Documentation** - Improve docs
- ♿ **Accessibility** - Enhance accessibility
- 🎨 **UI/UX** - Design improvements
- ⚡ **Performance** - Optimize code
- 🧪 **Testing** - Add test coverage
- 🌐 **Internationalization** - Add language support

---

## ❓ Questions?

If you have questions:

1. Check [DOCUMENTATION.md](./DOCUMENTATION.md)
2. Search existing [GitHub Issues](https://github.com/VatsalJoshi0/campus-connect/issues)
3. Create a new issue with the `question` label

---

## 🙏 Thank You!

Your contributions make Campus Connect better for everyone. We appreciate your time and effort!

**Happy Coding!** 💻🎉

---

**Maintained by:** Vatsal Joshi  
**Last Updated:** November 3, 2025
