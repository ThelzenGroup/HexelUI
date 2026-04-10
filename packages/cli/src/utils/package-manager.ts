import { existsSync } from 'fs'
import { join } from 'path'

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export function detectPackageManager(cwd: string): PackageManager {
  if (existsSync(join(cwd, 'bun.lockb'))) return 'bun'
  if (existsSync(join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (existsSync(join(cwd, 'yarn.lock'))) return 'yarn'
  return 'npm'
}

export function installCommand(pm: PackageManager, packages: string[]): string {
  const pkgs = packages.join(' ')
  switch (pm) {
    case 'bun':
      return `bun add ${pkgs}`
    case 'pnpm':
      return `pnpm add ${pkgs}`
    case 'yarn':
      return `yarn add ${pkgs}`
    default:
      return `npm install ${pkgs}`
  }
}
