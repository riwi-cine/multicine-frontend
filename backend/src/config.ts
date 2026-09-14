import path from 'node:path'
import { fileURLToPath } from 'node:url'

export const config = {
  port: Number(process.env.PORT ?? 4000),
  dataPath: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../data.json'),
}
