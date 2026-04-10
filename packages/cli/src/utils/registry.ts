const REGISTRY_BASE =
  'https://raw.githubusercontent.com/ThelzenGroup/HexelUI/main/registry'

export interface RegistryComponent {
  name: string
  description: string
  category: string
  docs: string
}

export interface RegistryIndex {
  version: string
  components: RegistryComponent[]
}

export interface RegistryComponentDetail {
  name: string
  type: string
  description: string
  category: string
  docs: string
  dependencies: string[]
  peerDependencies: Record<string, string>
  devDependencies: string[]
  registryDependencies: string[]
  files: Array<{
    path: string
    type: string
    target: string
    content?: string
  }>
  keywords: string[]
}

export async function fetchRegistryIndex(): Promise<RegistryIndex> {
  const res = await fetch(`${REGISTRY_BASE}/index.json`)
  if (!res.ok) {
    throw new Error(`Failed to fetch registry index: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<RegistryIndex>
}

export async function fetchComponentDetail(name: string): Promise<RegistryComponentDetail> {
  const res = await fetch(`${REGISTRY_BASE}/components/${name}.json`)
  if (!res.ok) {
    throw new Error(`Component "${name}" not found in registry (${res.status})`)
  }
  return res.json() as Promise<RegistryComponentDetail>
}

export async function fetchComponentSource(name: string): Promise<string> {
  const res = await fetch(
    `https://raw.githubusercontent.com/ThelzenGroup/HexelUI/main/packages/ui/src/components/${name}/${name}.tsx`
  )
  if (!res.ok) {
    throw new Error(`Failed to fetch source for "${name}": ${res.status}`)
  }
  return res.text()
}
