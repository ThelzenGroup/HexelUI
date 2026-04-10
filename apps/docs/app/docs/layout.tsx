import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

const navigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'CLI', href: '/docs/cli' },
    ],
  },
  {
    title: 'Components',
    items: [
      { title: 'Alert', href: '/docs/components/alert' },
      { title: 'Avatar', href: '/docs/components/avatar' },
      { title: 'Badge', href: '/docs/components/badge' },
      { title: 'Button', href: '/docs/components/button' },
      { title: 'Card', href: '/docs/components/card' },
      { title: 'Checkbox', href: '/docs/components/checkbox' },
      { title: 'Dialog', href: '/docs/components/dialog' },
      { title: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
      { title: 'Input', href: '/docs/components/input' },
      { title: 'Label', href: '/docs/components/label' },
      { title: 'Select', href: '/docs/components/select' },
      { title: 'Separator', href: '/docs/components/separator' },
      { title: 'Switch', href: '/docs/components/switch' },
      { title: 'Tabs', href: '/docs/components/tabs' },
      { title: 'Toast', href: '/docs/components/toast' },
      { title: 'Tooltip', href: '/docs/components/tooltip' },
    ],
  },
]

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-7xl items-center px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            HexelUI
          </Link>
          <nav className="ml-8 hidden gap-6 md:flex">
            <Link href="/docs" className="text-sm font-medium">
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

      <div className="container mx-auto flex-1 max-w-7xl px-4">
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className="hidden w-64 shrink-0 md:block">
            <nav className="sticky top-24 space-y-6">
              {navigation.map((section) => (
                <div key={section.title}>
                  <h4 className="mb-2 text-sm font-semibold">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
