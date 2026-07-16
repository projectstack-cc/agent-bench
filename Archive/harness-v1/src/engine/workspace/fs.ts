import { readDir, readTextFile } from '@tauri-apps/plugin-fs'
import { open as openDialog } from '@tauri-apps/plugin-dialog'

export interface FileNode {
  name: string
  path: string
  isDirectory: boolean
  children?: FileNode[]
  loaded: boolean
}

const HIDDEN_NAMES = new Set(['.git', 'node_modules', 'target', '.cargo'])

export async function pickFolder(): Promise<string | null> {
  const selected = await openDialog({ directory: true, multiple: false })
  if (!selected || Array.isArray(selected)) return null
  return selected
}

export async function listDir(path: string): Promise<FileNode[]> {
  const entries = await readDir(path)
  return entries
    .filter((e) => e.name && !HIDDEN_NAMES.has(e.name))
    .map((e) => ({
      name: e.name!,
      path: `${path}\\${e.name}`,
      isDirectory: !!e.isDirectory,
      loaded: false,
    }))
    .sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
      return a.name.localeCompare(b.name)
    })
}

export async function readWorkspaceFile(path: string): Promise<string> {
  return readTextFile(path)
}
