# Git Hooks Configuration

This project uses Husky to enforce code quality and conventional commits.

## Configured Hooks

### Pre-commit Hook

- **Runs**: ESLint with auto-fix, Prettier formatting, and related tests
- **On**: Staged files only (via lint-staged)
- **Purpose**: Ensure code quality before commits

### Commit Message Hook

- **Runs**: Commitlint validation
- **Purpose**: Enforce conventional commit messages
- **Format**: `type(scope): description`

### Pre-push Hook

- **Runs**: All tests
- **Purpose**: Ensure all tests pass before pushing

## Commit Message Types

```
feat:     A new feature
fix:      A bug fix
docs:     Documentation only changes
style:    Changes that do not affect the meaning of the code
refactor: A code change that neither fixes a bug nor adds a feature
perf:     A code change that improves performance
test:     Adding missing tests or correcting existing tests
build:    Changes that affect the build system or external dependencies
ci:       Changes to our CI configuration files and scripts
chore:    Other changes that don't modify src or test files
revert:   Reverts a previous commit
```

## Usage

### Interactive Commits

```bash
pnpm run commit
```

This will guide you through creating a conventional commit.

### Manual Commits

```bash
git commit -m "feat: add new dashboard component"
git commit -m "fix: resolve sidebar navigation issue"
git commit -m "docs: update README with deployment instructions"
```

## Bypassing Hooks (Not Recommended)

```bash
git commit --no-verify -m "emergency fix"
git push --no-verify
```

⚠️ Only use `--no-verify` in emergency situations as it bypasses all quality checks.
