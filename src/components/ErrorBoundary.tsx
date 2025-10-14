import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <AlertTriangle className="h-12 w-12 text-yellow-500" />
          <h3 className="text-lg font-semibold text-white">Something went wrong</h3>
          <p className="text-slate-400 text-sm max-w-md">
            We encountered an error while loading this component. This might be due to network issues or browser compatibility.
          </p>
          <Button
            onClick={this.handleRetry}
            variant="outline"
            size="sm"
            className="border-slate-600 hover:border-slate-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}

// Specific Spline Error Boundary with custom fallback
interface SplineErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SplineErrorBoundary({ children, fallback }: SplineErrorBoundaryProps) {
  const defaultFallback = (
    <div className="absolute inset-0 w-full h-full opacity-30 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Animated geometric shapes as fallback */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Main rotating circle */}
            <div className="w-32 h-32 border-2 border-blue-400/30 rounded-full animate-spin-slow" />
            
            {/* Inner elements */}
            <div className="absolute inset-4 border border-purple-400/20 rounded-full animate-pulse" />
            <div className="absolute inset-8 w-16 h-16 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full animate-bounce" />
            
            {/* Floating dots */}
            <div className="absolute -top-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-ping" />
            <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-500" />
            <div className="absolute -bottom-2 left-1/2 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-1000" />
            <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping delay-1500" />
          </div>
        </div>
        
        {/* Background particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-3/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-1400" />
      </div>
    </div>
  )

  return (
    <ErrorBoundary 
      fallback={fallback || defaultFallback}
      onError={(error) => {
        console.warn('Spline component failed to load:', error.message)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}