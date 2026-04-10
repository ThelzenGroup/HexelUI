export default function ButtonPage() {
  return (
    <>
      <h1>Button</h1>
      <p className="lead">
        Displays a button or a component that looks like a button.
      </p>

      <h2>Installation</h2>
      <pre><code>npx hexelui add button</code></pre>

      <h2>Usage</h2>
      <pre><code>{`import { Button } from '@/components/ui/button'

export default function Example() {
  return <Button>Click me</Button>
}`}</code></pre>

      <h2>Variants</h2>
      <p>The Button component supports 6 variants:</p>
      <ul>
        <li><code>default</code> — Primary button with solid background</li>
        <li><code>destructive</code> — For destructive actions (delete, remove)</li>
        <li><code>outline</code> — Button with border, no background</li>
        <li><code>secondary</code> — Secondary button with muted background</li>
        <li><code>ghost</code> — Transparent button, shows background on hover</li>
        <li><code>link</code> — Styled like a link with underline</li>
      </ul>

      <h2>Sizes</h2>
      <p>The Button component supports 4 sizes:</p>
      <ul>
        <li><code>sm</code> — Small (32px height)</li>
        <li><code>md</code> — Medium (36px height, default)</li>
        <li><code>lg</code> — Large (40px height)</li>
        <li><code>icon</code> — Square button for icons (36x36px)</li>
      </ul>

      <h2>Examples</h2>

      <h3>Variants</h3>
      <pre><code>{`<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`}</code></pre>

      <h3>Sizes</h3>
      <pre><code>{`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`}</code></pre>

      <h3>With Icon</h3>
      <pre><code>{`import { ChevronRight } from 'lucide-react'

<Button>
  Continue
  <ChevronRight className="ml-2 h-4 w-4" />
</Button>`}</code></pre>

      <h3>Loading State</h3>
      <pre><code>{`<Button loading>Loading...</Button>`}</code></pre>

      <h3>As Link</h3>
      <pre><code>{`import Link from 'next/link'

<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>`}</code></pre>

      <h2>Props</h2>
      <table>
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>variant</code></td>
            <td><code>default | destructive | outline | secondary | ghost | link</code></td>
            <td><code>default</code></td>
            <td>Visual style variant</td>
          </tr>
          <tr>
            <td><code>size</code></td>
            <td><code>sm | md | lg | icon</code></td>
            <td><code>md</code></td>
            <td>Button size</td>
          </tr>
          <tr>
            <td><code>loading</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Shows loading state, disables button</td>
          </tr>
          <tr>
            <td><code>asChild</code></td>
            <td><code>boolean</code></td>
            <td><code>false</code></td>
            <td>Render as child element (for Link, etc.)</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
