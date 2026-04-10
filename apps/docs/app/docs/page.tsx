export default function DocsPage() {
  return (
    <>
      <h1>Introduction</h1>
      <p className="lead">
        HexelUI is a collection of re-usable components built with React, TypeScript, Tailwind CSS, and Radix UI.
      </p>

      <h2>Philosophy</h2>
      <p>
        HexelUI uses a copy-paste distribution model. Components are not installed as npm packages — instead, you copy the source code directly into your project. This gives you full ownership and control.
      </p>

      <h3>Why copy-paste?</h3>
      <ul>
        <li><strong>No breaking changes</strong> — You own the code, so upstream changes never break your app</li>
        <li><strong>Full customization</strong> — Modify components freely without fighting abstractions</li>
        <li><strong>No lock-in</strong> — Start with HexelUI, evolve it into your own design system</li>
        <li><strong>Transparent</strong> — See exactly what's running in your app</li>
      </ul>

      <h2>Tech Stack</h2>
      <ul>
        <li><strong>React 18+</strong> — Modern React with hooks and concurrent features</li>
        <li><strong>TypeScript</strong> — Full type safety out of the box</li>
        <li><strong>Tailwind CSS</strong> — Utility-first styling with CSS variables for theming</li>
        <li><strong>Radix UI</strong> — Unstyled, accessible primitives for complex components</li>
        <li><strong>CVA</strong> — Class variance authority for variant management</li>
      </ul>

      <h2>Accessibility</h2>
      <p>
        All components are built on Radix UI primitives, which provide:
      </p>
      <ul>
        <li>Keyboard navigation</li>
        <li>Focus management</li>
        <li>Screen reader support</li>
        <li>ARIA attributes</li>
      </ul>

      <h2>Dark Mode</h2>
      <p>
        HexelUI uses CSS variables for theming. Components automatically support light and dark modes when you use <code>next-themes</code> or a similar solution with the <code>class</code> strategy.
      </p>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/docs/installation">Installation</a> — Set up HexelUI in your project</li>
        <li><a href="/docs/cli">CLI</a> — Learn about the <code>hexelui</code> CLI tool</li>
        <li><a href="/docs/components">Components</a> — Browse all available components</li>
      </ul>
    </>
  )
}
