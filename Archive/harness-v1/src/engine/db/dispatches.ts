import Database from '@tauri-apps/plugin-sql'
import type { DispatchTask, ExecutionChunk } from '../executor/types'

let dbPromise: Promise<Database> | null = null

function getDb(): Promise<Database> {
  if (!dbPromise) dbPromise = Database.load('sqlite:harness.db')
  return dbPromise
}

export async function initDispatchStore(): Promise<void> {
  const db = await getDb()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS dispatches (
      id TEXT PRIMARY KEY,
      agent TEXT NOT NULL,
      project TEXT NOT NULL,
      task TEXT NOT NULL,
      model TEXT NOT NULL,
      cwd TEXT,
      status TEXT NOT NULL,
      session_id TEXT,
      chunks_json TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )
  `)
}

interface DispatchRow {
  id: string
  agent: string
  project: string
  task: string
  model: string
  cwd: string | null
  status: string
  session_id: string | null
  chunks_json: string
  created_at: number
}

function rowToTask(row: DispatchRow): DispatchTask {
  return {
    id: row.id,
    agent: row.agent,
    project: row.project,
    task: row.task,
    model: row.model,
    cwd: row.cwd ?? undefined,
    status: row.status as DispatchTask['status'],
    sessionId: row.session_id,
    chunks: JSON.parse(row.chunks_json) as ExecutionChunk[],
    createdAt: row.created_at,
  }
}

export async function loadRecentDispatches(limit = 50): Promise<DispatchTask[]> {
  const db = await getDb()
  const rows = await db.select<DispatchRow[]>(
    'SELECT * FROM dispatches ORDER BY created_at DESC LIMIT ?',
    [limit]
  )
  return rows.map(rowToTask)
}

export async function saveDispatch(task: DispatchTask): Promise<void> {
  const db = await getDb()
  await db.execute(
    `INSERT INTO dispatches (id, agent, project, task, model, cwd, status, session_id, chunks_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET
       status = excluded.status,
       session_id = excluded.session_id,
       chunks_json = excluded.chunks_json`,
    [
      task.id, task.agent, task.project, task.task, task.model,
      task.cwd ?? null, task.status, task.sessionId,
      JSON.stringify(task.chunks), task.createdAt,
    ]
  )
}

export async function deleteDispatch(id: string): Promise<void> {
  const db = await getDb()
  await db.execute('DELETE FROM dispatches WHERE id = ?', [id])
}
