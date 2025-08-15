# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# TraceTrack Admin UI

A modern React admin dashboard built with cutting-edge technologies for optimal performance and developer experience.

## 🚀 Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type safety and better developer experience
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS with custom theme
- **React Router v7** - Declarative routing
- **Zustand** - Lightweight state management
- **TanStack Query** - Powerful data synchronization
- **React Hook Form + Zod** - Performant forms with validation
- **Vitest** - Fast unit testing framework
- **pnpm** - Efficient package manager

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Input, etc.)
│   └── common/       # Common app components (Header, Footer, etc.)
├── pages/            # Page components for routing
├── hooks/            # Custom React hooks
├── utils/            # Utility functions and helpers
├── types/            # TypeScript type definitions
├── assets/           # Static assets (images, icons)
├── styles/           # Global styles and CSS modules
├── config/           # App and library configurations
└── stores/           # Zustand state management stores
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm (recommended for better performance)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Lint code
pnpm lint

# Format code
pnpm format

# Interactive commit (recommended)
pnpm commit
```

### Git Hooks

This project uses Husky for automated code quality checks:

- **Pre-commit**: Runs ESLint, Prettier, and related tests on staged files
- **Commit-msg**: Validates conventional commit message format
- **Pre-push**: Runs full test suite before pushing

See [HOOKS.md](./HOOKS.md) for detailed information about git hooks and commit conventions.

# Fix linting issues

pnpm lint:fix

# Format code

pnpm format

# Analyze bundle

pnpm analyze

````

## 🧪 Testing

- **Vitest** for unit and integration tests
- **React Testing Library** for component testing
- **jsdom** for DOM simulation

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate coverage report
pnpm test:coverage
````

## 📋 Code Quality

- **ESLint** with TypeScript rules
- **Prettier** for code formatting
- **TypeScript** strict mode enabled
- **Tailwind CSS** with custom design system

## 🔧 Configuration

### Tailwind CSS v4

Custom theme configuration in `src/index.css` using `@theme` directive:

```css
@theme {
  --color-primary-600: #2563eb;
  --font-family-sans: 'Inter', 'system-ui', 'sans-serif';
}
```

### State Management

- **Zustand** for client-side state
- **TanStack Query** for server state management
- Devtools enabled in development

### Forms

- **React Hook Form** for performant forms
- **Zod** for schema validation
- **@hookform/resolvers** for integration

## 🚀 Deployment

Build the project:

```bash
pnpm build
```

The `dist` folder contains the production build ready for deployment.

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Zustand Documentation](https://zustand.docs.pmnd.rs)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com)

## 📄 License

This project is licensed under the MIT License.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
