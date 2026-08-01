import axios from 'axios'

export class ApiError extends Error {
  readonly status?: number
  readonly code?: string
  readonly details?: unknown

  constructor(
    message: string,
    status?: number,
    code?: string,
    details?: unknown,
  ) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return new ApiError(
        'No se pudo conectar con el servidor.',
        0,
        'NETWORK_ERROR',
      )
    }

    const { status, data } = error.response
    const message = data?.message ?? error.message
    return new ApiError(message, status, error.code, data)
  }

  return new ApiError('Ha ocurrido un error inesperado.')
}
