import type { ApiConfig } from '@/types/config'

export const apiConfig: ApiConfig = {
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10_000,
}