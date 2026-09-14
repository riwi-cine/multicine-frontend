export type RecordData = Record<string, unknown>
export type Collection = RecordData[]

export interface Store {
  data: Record<string, Collection>
  save: () => void
}
