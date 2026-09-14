import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { config } from './config.js'
import type { Collection, RecordData, Store } from './types.js'

const initialData = JSON.parse(readFileSync(config.dataPath, 'utf8')) as Record<string, Collection>
const data = existsSync(config.dataPath)
  ? (JSON.parse(readFileSync(config.dataPath, 'utf8')) as Record<string, Collection>)
  : initialData

export const store: Store = {
  data,
  save: () => writeFileSync(config.dataPath, JSON.stringify(data, null, 2)),
}

export const collection = (name: string): Collection => store.data[name] ?? []
export const findById = (items: Collection, value: string) =>
  items.find((item) => String(item.id) === value)
export const stringValue = (value: unknown) =>
  typeof value === 'string' ? value : ''
export const createId = (prefix: string) =>
  `${prefix}-${randomUUID().slice(0, 8)}`
export const publicUser = (user: RecordData) => {
  const result = { ...user }
  delete result.password
  return result
}
