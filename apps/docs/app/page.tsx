import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            HexelUI
          </Link>
          <nav className="ml-8 hidden gap-6 md:flex">
            <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <Link href="/docs/components" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Components
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="https://github.com/ThelzenGroup/HexelUI"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-4 py-32 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-medium mb-8">
            v0.1.0 — 16 components
          </div>
          <h1 className="text-5xl font-bold tracking-tight lg:text-6xl">
            Copy, paste, ship:
            <br />
            <span className="text-muted-foreground">React components for SaaS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Open-source React UI kit built with TypeScript, Tailwind CSS, and Radix UI. Accessible by default, yours to customize.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/docs"
              className="inline-flex h-10 items-center rounded-md bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/80"
            >
              Get Started
            </Link>
            <Link
              href="/docs/components"
              className="inline-flex h-10 items-center rounded-md border px-6 text-sm font-medium transition-colors hover:bg-accent"
            >
              Browse Components
            </Link>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span className="rounded-md border px-3 py-1">TypeScript</span>
            <span className="rounded-md border px-3 py-1">Tailwind CSS</span>
            <span className="rounded-md border px-3 py-1">Radix UI</span>
            <span className="rounded-md border px-3 py-1">Dark mode</span>
            <span className="rounded-md border px-3 py-1">MIT license</span>
          </div>
        </section>

        {/* Quick install */}
        <section className="border-t border-b bg-muted/30 py-16">
          <div className="container mx-auto max-w-6xl px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Get started in seconds</h2>
            <div className="mx-auto max-w-lg">
              <div className="rounded-lg border bg-background p-4 text-left font-mono text-sm">
                <div className="text-muted-foreground mb-1"># Initialize in your project</div>
                <div>npx hexelui init</div>
                <div className="text-muted-foreground mt-3 mb-1"># Add any component</div>
                <div>npx hexelui add button card dialog</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border p-6">
                <div className="text-2xl mb-3">📋</div>
                <h3 className="text-lg font-semibold mb-2">Copy-paste distribution</h3>
                <p className="text-sm text-muted-foreground">
                  Components live in your codebase. Customize everything with no risk of breaking changes from upstream.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="text-2xl mb-3">♿</div>
                <h3 className="text-lg font-semibold mb-2">Accessible by default</h3>
                <p className="text-sm text-muted-foreground">
                  Built on Radix UI primitives. Keyboard navigation, focus management, and ARIA attributes included.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <div className="text-2xl mb-3">🌙</div>
                <h3 className="text-lg font-semibold mb-2">Dark mode ready</h3>
                <p className="text-sm text-muted-foreground">
                  CSS variables + class strategy. Light and dark themes work instantly with next-themes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Component list */}
        <section className="border-t py-24 bg-muted/30">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-center mb-4">16 components, v0.1.0</h2>
            <p className="text-center text-muted-foreground mb-12">More on the way. Check the roadmap.</p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {[
                'Alert','Avatar','Badge','Button',
                'Card','Checkbox','Dialog','Dropdown Menu',
                'Input','Label','Select','Separator',
                'Switch','Tabs','Toast','Tooltip',
              ].map((name) => (
                <Link
                  key={name}
                  href={`/docs/components/${name.toLowerCase().replace(' ', '-')}`}
                  className="rounded-md border bg-background px-4 py-3 text-sm font-medium text-center hover:bg-accent transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div>Built by <a href="https://github.com/ThelzenGroup" className="hover:text-foreground">ThelzenGroup</a>. MIT license.</div>
          <div className="flex gap-6">
            <Link href="/docs" className="hover:text-foreground">Docs</Link>
            <a href="https://github.com/ThelzenGroup/HexelUI" className="hover:text-foreground">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
