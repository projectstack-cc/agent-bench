import { Folder, FolderOpen, File, FolderPlus } from 'lucide-react'
import { useHarnessStore } from '../store/harness'
import type { FileNode } from '../engine/workspace/fs'

function TreeRow({ node, depth }: { node: FileNode; depth: number }) {
  const { expandedDirs, workspaceEntries, selectedFilePath, toggleDir, openFile } = useHarnessStore()
  const isExpanded = !!expandedDirs[node.path]
  const isSelected = selectedFilePath === node.path
  const children = workspaceEntries[node.path]

  return (
    <div>
      <button
        onClick={() => (node.isDirectory ? toggleDir(node.path) : openFile(node.path))}
        title={node.path}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          width: '100%',
          padding: '3px var(--space-2)',
          paddingLeft: `${8 + depth * 14}px`,
          background: isSelected ? 'var(--color-surface-hover)' : 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        {node.isDirectory ? (
          isExpanded ? <FolderOpen size={13} color="var(--color-text-muted)" /> : <Folder size={13} color="var(--color-text-muted)" />
        ) : (
          <File size={13} color="var(--color-text-muted)" />
        )}
        <span
          style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: isSelected ? 'var(--color-text)' : 'var(--color-text-secondary)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {node.name}
        </span>
      </button>

      {node.isDirectory && isExpanded && children && children.map((child) => (
        <TreeRow key={child.path} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export function ExplorerPanel() {
  const { workspaceRoot, workspaceEntries, openFolder } = useHarnessStore()
  const rootChildren = workspaceRoot ? workspaceEntries[workspaceRoot] : undefined

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        <span>Explorer</span>
        <button
          className="btn btn-ghost"
          onClick={() => openFolder()}
          title="Open Folder"
          style={{ minHeight: 'unset', padding: '2px' }}
        >
          <FolderPlus size={13} />
        </button>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '2px 0' }}>
        {!workspaceRoot && (
          <button
            className="btn btn-secondary"
            onClick={() => openFolder()}
            style={{ margin: 'var(--space-3)', fontSize: 'var(--text-xs)' }}
          >
            Open Folder…
          </button>
        )}

        {workspaceRoot && rootChildren && (
          <TreeRow
            node={{ name: workspaceRoot.split('\\').pop() ?? workspaceRoot, path: workspaceRoot, isDirectory: true, loaded: true }}
            depth={0}
          />
        )}
      </div>
    </div>
  )
}
