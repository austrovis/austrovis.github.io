# Contributing to AustroVis

Thank you for your interest in contributing to AustroVis! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and constructive in all interactions.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Git
- A GitHub account

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/austrovis.github.io.git
   cd austrovis.github.io
   ```

3. **Add the upstream repository:**
   ```bash
   git remote add upstream https://github.com/austrovis/austrovis.github.io.git
   ```

4. **Install dependencies:**
   ```bash
   npm install
   ```

5. **Create `.env.local` for local development:**
   ```env
   NEXT_PUBLIC_NEWSLETTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/newsletter
   NEXT_PUBLIC_REGISTER_API_URL=https://austrovis-serverless.netlify.app/.netlify/functions/register
   ```

6. **Start the development server:**
   ```bash
   npm run dev
   ```

7. **Open [http://localhost:3000](http://localhost:3000)** to see your changes

## Development Workflow

### Creating a New Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Convention

- `feature/` - New features or enhancements
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `content/` - Content changes and updates   
- `style/` - Code style changes (formatting, etc.)
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### Making Changes

1. Make your changes in your feature branch
2. Test your changes thoroughly
3. Ensure the code follows our [coding standards](#coding-standards)
4. Run linting and type checking:
   ```bash
   npm run lint
   ```

5. Build the project to ensure no errors:
   ```bash
   npm run build
   ```

### Keeping Your Branch Up to Date

```bash
git checkout main
git pull upstream main
git checkout your-branch-name
git rebase main
```

## Project Structure

```
austrovis.github.io/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   ├── register/            # Registration page
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EventCard.tsx
│   ├── NewsletterSignup.tsx
│   ├── ParallaxHero.tsx
│   └── ScrollReveal.tsx
├── lib/                     # Utility functions and data
│   └── events.ts            # Event data management
├── types/                   # TypeScript type definitions
│   └── event.ts
├── public/                  # Static assets
└── .github/workflows/       # GitHub Actions workflows
```

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types for props, state, and data structures
- Avoid using `any` type unless absolutely necessary
- Use interfaces for object types
- Use type aliases for unions and primitives

### React Components

- Use functional components with hooks
- Use `'use client'` directive for client-side components
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use descriptive prop names

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Ensure responsive design (mobile-first approach)
- Test on multiple screen sizes
- Maintain consistent spacing and typography

### File Organization

- One component per file
- Name files with PascalCase for components (`EventCard.tsx`)
- Name files with camelCase for utilities (`events.ts`)
- Keep related files together

### Code Quality

- Write self-documenting code with clear variable and function names
- Add comments for complex logic
- Remove console.logs before committing (except intentional logging)
- Handle errors gracefully
- Avoid code duplication

## Submitting Changes

### Commit Messages

Write clear, descriptive commit messages:

```
<type>: <subject>

<body (optional)>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, semicolons, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat: add parallax effect to hero section

fix: resolve mobile menu overflow issue

docs: update installation instructions in README
```

### Pull Request Process

1. **Push your branch to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request:**
   - Go to the [original repository](https://github.com/austrovis/austrovis.github.io)
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template

3. **PR Title Format:**
   ```
   [Type] Brief description
   ```
   Example: `[Feature] Add event filtering by location`

4. **PR Description should include:**
   - What changes were made
   - Why these changes are necessary
   - Screenshots for UI changes
   - Related issue numbers (if applicable)

5. **Wait for review:**
   - Address any feedback from reviewers
   - Make requested changes in new commits
   - Don't force-push after review has started

6. **After approval:**
   - Your PR will be merged by a maintainer
   - Delete your feature branch

## Reporting Issues

### Before Creating an Issue

- Check if the issue already exists
- Test on the latest version
- Gather relevant information

### Creating a Good Issue

Include:

1. **Clear title:** Brief, descriptive summary
2. **Description:** Detailed explanation of the issue or feature request
3. **Steps to reproduce:** (for bugs) Step-by-step instructions
4. **Expected behavior:** What should happen
5. **Actual behavior:** What actually happens
6. **Screenshots:** If applicable
7. **Environment:**
   - Browser and version
   - Operating system
   - Node.js version (for build issues)

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## Areas for Contribution

### Content

- Adding new events to `lib/events.ts`
- Updating event information
- Improving copy and descriptions

### Features

- New UI components
- Animation enhancements
- Accessibility improvements
- Performance optimizations

### Documentation

- Improving README
- Adding code comments
- Creating tutorials or guides

### Bug Fixes

- Fixing reported issues
- Improving error handling
- Cross-browser compatibility

## Questions?

If you have questions about contributing:

1. Check existing documentation
2. Look through closed issues and PRs
3. Open a new issue with the `question` label
4. Reach out to maintainers

Thank you for contributing to AustroVis! 🎉
