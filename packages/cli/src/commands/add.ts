import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import pc from 'picocolors'
import ora from 'ora'
import prompts from 'prompts'
import { readConfig, configExists } from '../utils/config'
import { fetchRegistryIndex, fetchComponentDetail, fetchComponentSource } from '../utils/registry'
import { detectPackageManager, installCommand } from '../utils/package-manager'

export async function add(components: string[], options: { overwrite: boolean }) {
  const cwd = process.cwd()

  if (!configExists(cwd)) {
    console.log()
    console.log(
      pc.red('No hexelui.json found.'),
      pc.gray('Run'),
      pc.cyan('npx hexelui init'),
      pc.gray('first.')
    )
    console.log()
    process.exit(1)
  }

  const config = readConfig(cwd)!
  const pm = detectPackageManager(cwd)

  // If no components given, prompt with a list from the registry
  if (components.length === 0) {
    const indexSpinner = ora('Fetching component list').start()
    let registryComponents: string[] = []
    try {
      const index = await fetchRegistryIndex()
      registryComponents = index.components.map((c) => c.name)
      indexSpinner.stop()
    } catch (err) {
      indexSpinner.fail(pc.red('Failed to fetch registry'))
      console.error(pc.gray(String(err)))
      process.exit(1)
    }

    const { selected } = await prompts({
      type: 'multiselect',
      name: 'selected',
      message: 'Which components would you like to add?',
      choices: registryComponents.map((name) => ({ title: name, value: name })),
      min: 1,
    })

    if (!selected || selected.length === 0) {
      console.log(pc.gray('No components selected.'))
      process.exit(0)
    }

    components = selected as string[]
  }

  // Resolve dependencies recursively
  const toInstall = new Set<string>()
  const resolved = new Set<string>()

  async function resolve(name: string): Promise<void> {
    if (resolved.has(name)) return
    resolved.add(name)

    const spinner = ora(`Resolving ${name}`).start()
    let detail
    try {
      detail = await fetchComponentDetail(name)
      spinner.stop()
    } catch (err) {
      spinner.fail(pc.red(`Unknown component: ${name}`))
      console.error(pc.gray(String(err)))
      process.exit(1)
    }

    // Queue registry dependencies first
    for (const dep of detail.registryDependencies) {
      await resolve(dep)
    }

    toInstall.add(name)
  }

  for (const name of components) {
    await resolve(name)
  }

  // Collect all npm deps
  const allNpmDeps = new Set<string>()

  for (const name of toInstall) {
    const detail = await fetchComponentDetail(name)
    for (const dep of detail.dependencies) allNpmDeps.add(dep)
  }

  // Write component files
  const componentsDir = config.aliases.components.replace('@/', '')
  const uiDir = join(cwd, componentsDir, 'ui')

  console.log()

  for (const name of toInstall) {
    const fileSpinner = ora(`Adding ${name}`).start()

    let source: string
    try {
      source = await fetchComponentSource(name)
    } catch (err) {
      fileSpinner.fail(pc.red(`Failed to fetch source for ${name}`))
      console.error(pc.gray(String(err)))
      continue
    }

    // Replace @hexelui/ui import paths with local alias
    const utilsAlias = config.aliases.utils
    source = source
      .replace(/from '\.\.\/\.\.\/lib\/utils'/g, `from '${utilsAlias}'`)
      .replace(/from "\.\.\/\.\.\/lib\/utils"/g, `from '${utilsAlias}'`)

    const ext = config.tsx ? 'tsx' : 'jsx'
    const filePath = join(uiDir, `${name}.${ext}`)

    if (existsSync(filePath) && !options.overwrite) {
      fileSpinner.warn(
        pc.yellow(`${componentsDir}/ui/${name}.${ext} already exists — use --overwrite to replace`)
      )
      continue
    }

    mkdirSync(uiDir, { recursive: true })
    writeFileSync(filePath, source, 'utf-8')
    fileSpinner.succeed(pc.green(`Added ${componentsDir}/ui/${name}.${ext}`))
  }

  // Install npm deps
  if (allNpmDeps.size > 0) {
    const deps = Array.from(allNpmDeps)
    const installSpinner = ora(`Installing dependencies with ${pm}`).start()
    try {
      execSync(installCommand(pm, deps), { cwd, stdio: 'pipe' })
      installSpinner.succeed(pc.green(`Installed ${deps.join(', ')}`))
    } catch {
      installSpinner.warn(
        pc.yellow(
          `Could not install dependencies automatically. Run:\n  ${installCommand(pm, deps)}`
        )
      )
    }
  }

  console.log()
  console.log(pc.green(pc.bold('Done!')))
  console.log()
}
