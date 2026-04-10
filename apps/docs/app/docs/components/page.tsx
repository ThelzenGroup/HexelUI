import Link from 'next/link'

const components = [
  { name: 'Alert', href: '/docs/components/alert', description: 'Displays a callout for user attention.' },
  { name: 'Avatar', href: '/docs/components/avatar', description: 'An image element with a fallback for representing the user.' },
  { name: 'Badge', href: '/docs/components/badge', description: 'Displays a badge or a component that looks like a badge.' },
  { name: 'Button', href: '/docs/components/button', description: 'Displays a button or a component that looks like a button.' },
  { name: 'Card', href: '/docs/components/card', description: 'Displays a card with header, content, and footer.' },
  { name: 'Checkbox', href: '/docs/components/checkbox', description: 'A control that allows the user to toggle between checked and not checked.' },
  { name: 'Dialog', href: '/docs/components/dialog', description: 'A window overlaid on either the primary window or another dialog window.' },
  { name: 'Dropdown Menu', href: '/docs/components/dropdown-menu', description: 'Displays a menu to the user triggered by a button.' },
  { name: 'Input', href: '/docs/components/input', description: 'Displays a form input field or a component that looks like an input field.' },
  { name: 'Label', href: '/docs/components/label', description: 'Renders an accessible label associated with controls.' },
  { name: 'Select', href: '/docs/components/select', description: 'Displays a list of options for the user to pick from, triggered by a button.' },
  { name: 'Separator', href: '/docs/components/separator', description: 'Visually or semantically separates content.' },
  { name: 'Switch', href: '/docs/components/switch', description: 'A control that allows the user to toggle between checked and not checked.' },
  { name: 'Tabs', href: '/docs/components/tabs', description: 'A set of layered sections of content displayed one at a time.' },
  { name: 'Toast', href: '/docs/components/toast', description: 'A succinct message that is displayed temporarily.' },
  { name: 'Tooltip', href: '/docs/components/tooltip', description: 'A popup that displays information related to an element.' },
]

export default function ComponentsPage() {
  return (
    <>
      <h1>Components</h1>
      <p className="lead">
        16 accessible, customizable components built with Radix UI and Tailwind CSS.
      </p>

      <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2">
        {components.map((component) => (
          <Link
            key={component.name}
            href={component.href}
            className="group rounded-lg border p-4 hover:border-foreground transition-colors"
          >
            <h3 className="font-semibold group-hover:text-foreground transition-colors">
              {component.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {component.description}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}
