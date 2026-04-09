# Contributing to HexelUI

Thanks for your interest in contributing to HexelUI. This guide will help you get started.

## Development Setup

### Prerequisites

- Node.js >= 20.0.0
- pnpm 10.33.0 (enforced via `packageManager` field)

### Getting Started

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   corepack enable  # Enable pnpm via corepack (requires admin on Windows)
   pnpm install
   ```

3. Build all packages:
   ```bash
   pnpm build
   ```

4. Run tests:
   ```bash
   pnpm test
   ```

## Component Standards

Every component must include:

- **TypeScript types** — full type safety with proper prop interfaces
- **Dark mode support** — test both light and dark themes
- **Accessibility** — keyboard navigation, ARIA attributes, screen reader support
- **Tests** — Vitest + React Testing Library + vitest-axe for a11y
- **Documentation** — usage examples, props table, accessibility notes

### Typography Conventions

| Context | Classes |
|---------|---------|
| Card title | `text-lg font-semibold tracking-tight` |
| Dialog title | `text-xl font-semibold tracking-tight` |
| Body / description | `text-sm text-muted-foreground` |
| Input / label | `text-sm font-medium` |
| Button | `text-sm font-medium` |
| Badge | `text-xs font-medium` |

## Adding a Changeset

Every PR that changes functionality must include a changeset:

```bash
pnpm changeset
```

Follow the prompts to describe your changes. The changeset will be used to generate the changelog and bump versions.

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add a changeset (`pnpm changeset`)
4. Ensure all checks pass (`pnpm lint`, `pnpm build`, `pnpm test`)
5. Open a PR with a clear description

## Code of Conduct

See [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
