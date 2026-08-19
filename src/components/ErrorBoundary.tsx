import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, info: ErrorInfo) => void
  message?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)

    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Error capturado:', error, info)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
          <AlertTriangle className="size-10 text-destructive" />
          <p className="text-sm font-medium text-foreground">
            {this.props.message ?? 'Ocurrió un problema al mostrar este contenido.'}
          </p>
          <p className="text-xs text-muted-foreground">
            Intenta nuevamente en unos segundos.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-2 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary