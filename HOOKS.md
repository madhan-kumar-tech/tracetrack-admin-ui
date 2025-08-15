# Husky Git Hooks Configuration

This project uses [Husky](https://typicode.github.io/husky/) to automate code quality checks through git hooks. The configuration ensures consistent code style, proper commit messages, and passing tests before code is committed or pushed.

## 🔧 Installed Hooks

### Pre-commit Hook (`.husky/pre-commit`)

Runs automatically before each commit to ensure code quality:

- **ESLint**: Fixes auto-fixable issues
- **Prettier**: Formats code according to project style
- **Targeted Testing**: Runs tests only for modified files

**What it does:**

```bash
pnpm exec lint-staged
```

**Configuration in `package.json`:**

```json
{
  "lint-staged": {
    "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,md}": ["prettier --write"],
    "*.{ts,tsx}": ["vitest related --run"]
  }
}
```

### Commit Message Hook (`.husky/commit-msg`)

Validates commit messages follow conventional commit format:

- **Conventional Commits**: Enforces standardized commit message format
- **Examples**: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

**What it does:**

```bash
pnpm exec commitlint --edit $1
```

**Valid commit message examples:**

```
feat: add user authentication
fix: resolve navigation bug
docs: update API documentation
style: format code with prettier
refactor: simplify user service
test: add authentication tests
chore: update dependencies
```

### Pre-push Hook (`.husky/pre-push`)

Runs the complete test suite before allowing push:

- **Full Test Suite**: Ensures all tests pass before code reaches remote repository
- **Quality Gate**: Prevents broken code from being pushed

**What it does:**

```bash
pnpm run test:run
# Exits with error code if any tests fail
```

## 📦 Dependencies

### Core Husky Dependencies

- **husky** `9.1.7`: Git hooks automation
- **lint-staged** `16.1.5`: Run linters on staged files only

### Commit Message Validation

- **@commitlint/cli** `19.6.0`: Commit message linter
- **@commitlint/config-conventional** `19.6.0`: Conventional commit rules
- **commitizen** `4.3.1`: Interactive commit creation
- **cz-conventional-changelog** `3.3.0`: Conventional changelog adapter

### Code Formatting

- **prettier-plugin-tailwindcss** `0.6.14`: Tailwind CSS class sorting

## 🚀 Usage

### Making Commits

The hooks run automatically when you use git commands:

```bash
# Hooks will run automatically
git add .
git commit -m "feat: add new feature"
git push
```

### Using Commitizen (Recommended)

For interactive commit creation:

```bash
# Use commitizen for guided commit messages
pnpm run commit
# or
npx git-cz
```

### Manual Hook Testing

You can test hooks manually:

```bash
# Test pre-commit hook
pnpm exec lint-staged

# Test commit message
pnpm exec commitlint --from HEAD~1 --to HEAD --verbose

# Test pre-push hook
pnpm run test:run
```

## 🔍 Hook Behavior

### Pre-commit Success Flow

1. ✅ ESLint fixes auto-fixable issues
2. ✅ Prettier formats code
3. ✅ Related tests pass
4. ✅ Files are staged with fixes
5. ✅ Commit proceeds

### Pre-commit Failure Flow

1. ❌ ESLint finds unfixable errors, OR
2. ❌ Tests fail
3. ❌ Commit is blocked
4. 🔧 Fix issues manually
5. 🔄 Try commit again

### Commit Message Failure Flow

1. ❌ Message doesn't follow conventional format
2. ❌ Commit is blocked with error message
3. 🔧 Update commit message
4. 🔄 Try commit again

### Pre-push Failure Flow

1. ❌ Any test in the suite fails
2. ❌ Push is blocked
3. 🔧 Fix failing tests
4. 🔄 Try push again

## ⚙️ Configuration Files

### Husky Configuration

- `.husky/pre-commit`: Lint-staged execution
- `.husky/commit-msg`: Commitlint validation
- `.husky/pre-push`: Full test suite execution

### Supporting Configuration

- `commitlint.config.js`: Conventional commit rules
- `package.json` `lint-staged`: File-specific linting rules
- `.prettierrc`: Code formatting rules

## 🛠️ Troubleshooting

### Skipping Hooks (Emergency Only)

```bash
# Skip pre-commit hook (not recommended)
git commit -m "message" --no-verify

# Skip pre-push hook (not recommended)
git push --no-verify
```

### Common Issues

**Husky not working after clone:**

```bash
pnpm prepare
```

**Tests failing on push:**

```bash
# Run tests locally first
pnpm test
# Fix any failing tests before pushing
```

**Commit message rejected:**

```bash
# Use conventional format
git commit -m "type: description"
# Examples: feat:, fix:, docs:, style:, refactor:, test:, chore:
```

**Lint-staged issues:**

```bash
# Check what files are staged
git diff --cached --name-only
# Run lint-staged manually
pnpm exec lint-staged
```

## 📝 Best Practices

1. **Commit Often**: Small, focused commits work better with hooks
2. **Fix Before Commit**: Address linting issues as you code
3. **Test Locally**: Run tests before committing
4. **Use Conventional Commits**: Follow the format for better changelog generation
5. **Stage Selectively**: Only stage files you want to commit

## 🔄 Updates and Maintenance

### Updating Hook Dependencies

```bash
# Update husky and related tools
pnpm update husky lint-staged @commitlint/cli @commitlint/config-conventional

# Reinstall hooks after updates
pnpm prepare
```

### Modifying Hook Behavior

- Edit files in `.husky/` directory
- Update `lint-staged` configuration in `package.json`
- Modify `commitlint.config.js` for commit message rules

---

_This configuration ensures high code quality and consistency across the team while preventing common issues from reaching the remote repository._
