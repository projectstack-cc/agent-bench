import { useHarnessStore } from '../store/harness'

export function FilePanel() {
  const { selectedFilePath, fileContent, isFileLoading } = useHarnessStore()

  if (!selectedFilePath) {
    return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
        Select a file in Explorer to preview it
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div
        style={{
          padding: 'var(--space-2) var(--space-3)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-muted)',
          flexShrink: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {selectedFilePath}
      </div>
      <pre
        style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          margin: 0,
          padding: 'var(--space-4)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {isFileLoading ? 'Loading…' : fileContent}
      </pre>
    </div>
  )
}
