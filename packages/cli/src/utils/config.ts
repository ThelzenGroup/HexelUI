import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export interface HexeluiConfig {
  $schema: string
  version: string
  style: string
  tsx: boolean
  tailwind: {
    config: string
    css: string
    baseColor: string
    cssVariables: boolean
  }
  aliases: {
    components: string
    utils: string
  }
}

export const DEFAULT_CONFIG: HexeluiConfig = {
  $schema:
    'https://raw.githubusercontent.com/ThelzenGroup/HexelUI/main/schema.json',
  version: '0.1.0',
  style: 'default',
  tsx: true,
  tailwind: {
    config: 'tailwind.config.ts',
    css: 'app/globals.css',
    baseColor: 'zinc',
    cssVariables: true,
  },
  aliases: {
    components: '@/components',
    utils: '@/lib/utils',
  },
}

export function getConfigPath(cwd: string): string {
  return join(cwd, 'hexelui.json')
}

export function configExists(cwd: string): boolean {
  return existsSync(getConfigPath(cwd))
}

export function readConfig(cwd: string): HexeluiConfig | null {
  const configPath = getConfigPath(cwd)
  if (!existsSync(configPath)) return null
  try {
    return JSON.parse(readFileSync(configPath, 'utf-8')) as HexeluiConfig
  } catch {
    return null
  }
}
