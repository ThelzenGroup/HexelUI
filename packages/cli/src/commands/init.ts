import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs'
import { join, dirname } from 'path'
import { execSync } from 'child_process'
import pc from 'picocolors'
import ora from 'ora'
import prompts from 'prompts'
import { DEFAULT_CONFIG, getConfigPath, configExists, type HexeluiConfig } from '../utils/config'
import { detectPackageManager, installCommand } from '../utils/package-manager'

const CSS_VARIABLES = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`

const CN_UTILITY = `import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`

export async function init(options: { yes: boolean }) {
  const cwd = process.cwd()

  console.log()
  console.log(pc.bold('Initializing HexelUI...'))
  console.log()

  if (configExists(cwd) && !options.yes) {
    const { overwrite } = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: pc.yellow('hexelui.json already exists. Overwrite?'),
      initial: false,
    })
    if (!overwrite) {
      console.log(pc.gray('Cancelled.'))
      process.exit(0)
    }
  }

  let config: HexeluiConfig = { ...DEFAULT_CONFIG }

  if (!options.yes) {
    const answers = await prompts([
      {
        type: 'select',
        name: 'baseColor',
        message: 'Which base color would you like to use?',
        choices: [
          { title: 'Zinc', value: 'zinc' },
          { title: 'Slate', value: 'slate' },
          { title: 'Stone', value: 'stone' },
          { title: 'Gray', value: 'gray' },
        ],
        initial: 0,
      },
      {
        type: 'text',
        name: 'cssPath',
        message: 'Where is your global CSS file?',
        initial: 'app/globals.css',
      },
      {
        type: 'text',
        name: 'componentsAlias',
        message: 'Configure the import alias for components:',
        initial: '@/components',
      },
      {
        type: 'text',
        name: 'utilsAlias',
        message: 'Configure the import alias for utils:',
        initial: '@/lib/utils',
      },
    ])

    config = {
      ...DEFAULT_CONFIG,
      tailwind: {
        ...DEFAULT_CONFIG.tailwind,
        baseColor: answers.baseColor ?? 'zinc',
        css: answers.cssPath ?? 'app/globals.css',
      },
      aliases: {
        components: answers.componentsAlias ?? '@/components',
        utils: answers.utilsAlias ?? '@/lib/utils',
      },
    }
  }

  // Write hexelui.json
  const spinner = ora('Writing hexelui.json').start()
  writeFileSync(getConfigPath(cwd), JSON.stringify(config, null, 2) + '\n', 'utf-8')
  spinner.succeed(pc.green('Created hexelui.json'))

  // Write CSS variables
  const cssSpinner = ora(`Writing CSS variables to ${config.tailwind.css}`).start()
  try {
    const cssPath = join(cwd, config.tailwind.css)
    const cssDir = dirname(cssPath)
    if (!existsSync(cssDir)) mkdirSync(cssDir, { recursive: true })

    // Prepend variables to existing CSS or write fresh
    const existing = existsSync(cssPath) ? readFileSync(cssPath, 'utf-8') : ''
    const hasVariables = existing.includes('--background:')
    if (!hasVariables) {
      writeFileSync(cssPath, CSS_VARIABLES + (existing ? '\n' + existing : ''), 'utf-8')
      cssSpinner.succeed(pc.green(`Updated ${config.tailwind.css} with CSS variables`))
    } else {
      cssSpinner.info(pc.gray(`${config.tailwind.css} already has CSS variables — skipped`))
    }
  } catch (err) {
    cssSpinner.warn(
      pc.yellow(
        `Could not write to ${config.tailwind.css} — add CSS variables manually from the docs`
      )
    )
  }

  // Write cn() utility
  const utilsAlias = config.aliases.utils
  const utilsRelPath = utilsAlias.replace('@/', '')
  const utilsPath = join(cwd, `${utilsRelPath}.ts`)
  const utilsSpinner = ora(`Writing cn() utility to ${utilsRelPath}.ts`).start()
  try {
    const utilsDir = dirname(utilsPath)
    if (!existsSync(utilsDir)) mkdirSync(utilsDir, { recursive: true })
    if (!existsSync(utilsPath)) {
      writeFileSync(utilsPath, CN_UTILITY, 'utf-8')
      utilsSpinner.succeed(pc.green(`Created ${utilsRelPath}.ts`))
    } else {
      utilsSpinner.info(pc.gray(`${utilsRelPath}.ts already exists — skipped`))
    }
  } catch {
    utilsSpinner.warn(pc.yellow(`Could not write ${utilsRelPath}.ts — create it manually`))
  }

  // Install base dependencies
  const pm = detectPackageManager(cwd)
  const baseDeps = ['clsx', 'tailwind-merge', 'class-variance-authority']
  const installSpinner = ora(`Installing base dependencies with ${pm}`).start()
  try {
    execSync(installCommand(pm, baseDeps), { cwd, stdio: 'pipe' })
    installSpinner.succeed(pc.green(`Installed ${baseDeps.join(', ')}`))
  } catch {
    installSpinner.warn(
      pc.yellow(
        `Could not install dependencies automatically. Run:\n  ${installCommand(pm, baseDeps)}`
      )
    )
  }

  console.log()
  console.log(pc.green(pc.bold('HexelUI initialized successfully!')))
  console.log()
  console.log(pc.gray('Next steps:'))
  console.log(pc.gray('  1. Add components:'), pc.cyan('npx hexelui add button'))
  console.log(pc.gray('  2. Browse components:'), pc.cyan('https://hexelui.dev/docs/components'))
  console.log()
}
