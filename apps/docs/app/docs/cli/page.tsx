export default function CLIPage() {
  return (
    <>
      <h1>CLI</h1>
      <p className="lead">
        Use the <code>hexelui</code> CLI to add components to your project.
      </p>

      <h2>init</h2>
      <p>Initialize HexelUI in your project:</p>
      <pre><code>npx hexelui init</code></pre>

      <h3>Options</h3>
      <ul>
        <li><code>-y, --yes</code> — Skip prompts and use defaults</li>
      </ul>

      <h3>What it does</h3>
      <ul>
        <li>Creates <code>hexelui.json</code> configuration file</li>
        <li>Adds CSS variables to your global CSS file</li>
        <li>Creates <code>lib/utils.ts</code> with the <code>cn()</code> utility</li>
        <li>Installs base dependencies</li>
      </ul>

      <h2>add</h2>
      <p>Add components to your project:</p>
      <pre><code>npx hexelui add button</code></pre>

      <p>Add multiple components:</p>
      <pre><code>npx hexelui add button input card dialog</code></pre>

      <p>Interactive mode (select from list):</p>
      <pre><code>npx hexelui add</code></pre>

      <h3>Options</h3>
      <ul>
        <li><code>-o, --overwrite</code> — Overwrite existing files</li>
      </ul>

      <h3>What it does</h3>
      <ul>
        <li>Fetches component source from the registry</li>
        <li>Resolves dependencies (if a component depends on another)</li>
        <li>Writes component files to <code>components/ui/</code></li>
        <li>Installs npm dependencies (Radix primitives, lucide-react, etc.)</li>
      </ul>

      <h2>Configuration</h2>
      <p>The <code>hexelui.json</code> file stores your project configuration:</p>
      <pre><code>{`{
  "$schema": "https://raw.githubusercontent.com/ThelzenGroup/HexelUI/main/schema.json",
  "version": "0.1.0",
  "style": "default",
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}`}</code></pre>

      <h3>Options</h3>
      <ul>
        <li><code>version</code> — HexelUI version (used to fetch components from the correct release)</li>
        <li><code>style</code> — Component style (currently only "default")</li>
        <li><code>tsx</code> — Use <code>.tsx</code> extension (vs <code>.jsx</code>)</li>
        <li><code>tailwind.css</code> — Path to your global CSS file</li>
        <li><code>tailwind.baseColor</code> — Base color theme (zinc, slate, stone, gray)</li>
        <li><code>aliases.components</code> — Import alias for components</li>
        <li><code>aliases.utils</code> — Import alias for utilities</li>
      </ul>
    </>
  )
}
