export default function InstallationPage() {
  return (
    <>
      <h1>Installation</h1>
      <p className="lead">
        Get started with HexelUI in your Next.js, Vite, or React project.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 20 or later</li>
        <li>React 18 or later</li>
        <li>Tailwind CSS v3 or v4</li>
      </ul>

      <h2>Quick Start</h2>
      <p>Run the init command to set up HexelUI:</p>
      <pre><code>npx hexelui init</code></pre>

      <p>This will:</p>
      <ul>
        <li>Create <code>hexelui.json</code> config file</li>
        <li>Add CSS variables to your global CSS</li>
        <li>Create the <code>cn()</code> utility function</li>
        <li>Install base dependencies (<code>clsx</code>, <code>tailwind-merge</code>, <code>class-variance-authority</code>)</li>
      </ul>

      <h2>Add Components</h2>
      <p>Add components to your project:</p>
      <pre><code>npx hexelui add button input card</code></pre>

      <p>Components are copied to <code>components/ui/</code> by default. You can customize this path in <code>hexelui.json</code>.</p>

      <h2>Manual Installation</h2>
      <p>If you prefer to set up manually:</p>

      <h3>1. Install dependencies</h3>
      <pre><code>npm install clsx tailwind-merge class-variance-authority</code></pre>

      <h3>2. Add CSS variables</h3>
      <p>Add these to your <code>globals.css</code>:</p>
      <pre><code>{`@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    /* ... more variables */
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    /* ... dark mode variables */
  }
}`}</code></pre>

      <h3>3. Create cn() utility</h3>
      <p>Create <code>lib/utils.ts</code>:</p>
      <pre><code>{`import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}</code></pre>

      <h3>4. Copy components</h3>
      <p>Copy component source from the <a href="https://github.com/ThelzenGroup/HexelUI/tree/main/packages/ui/src/components">GitHub repo</a> into your project.</p>

      <h2>Framework Guides</h2>

      <h3>Next.js</h3>
      <p>HexelUI works with both App Router and Pages Router. Make sure you have Tailwind CSS configured.</p>

      <h3>Vite</h3>
      <p>Install Tailwind CSS following the <a href="https://tailwindcss.com/docs/guides/vite">Vite guide</a>, then run <code>npx hexelui init</code>.</p>

      <h3>Remix</h3>
      <p>Install Tailwind CSS following the <a href="https://tailwindcss.com/docs/guides/remix">Remix guide</a>, then run <code>npx hexelui init</code>.</p>
    </>
  )
}
