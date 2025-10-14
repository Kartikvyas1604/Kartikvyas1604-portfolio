import { useState, useEffect, useRef } from 'react'
import Spline from '@splinetool/react-spline'
import { SplineErrorBoundary } from './ErrorBoundary'

interface SplineWrapperProps {
  scene: string
  fallback?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onLoad?: () => void
  onError?: (error: Error) => void
}

// Beautiful animated fallback component
const AnimatedFallback = () => {
  return (
    <div className="absolute inset-0 w-full h-full opacity-30 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-md max-h-md">
        {/* Main animated geometry */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute w-48 h-48 border border-blue-400/20 rounded-full animate-spin-slow">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1" />
            <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-slate-400 rounded-full transform -translate-x-1/2 translate-y-1" />
          </div>
          
          {/* Middle ring */}
          <div className="absolute w-32 h-32 border border-slate-400/20 rounded-full animate-reverse-spin">
            <div className="absolute top-1/2 right-0 w-1.5 h-1.5 bg-blue-500 rounded-full transform translate-x-1 -translate-y-1/2" />
            <div className="absolute top-1/2 left-0 w-1.5 h-1.5 bg-slate-400 rounded-full transform -translate-x-1 -translate-y-1/2" />
          </div>
          
          {/* Inner core */}
          <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full animate-pulse">
            <div className="absolute inset-2 bg-blue-400/30 rounded-full" />
            <div className="absolute inset-4 bg-white/10 rounded-full animate-ping" />
          </div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-300 rounded-full animate-float" />
        <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-slate-300 rounded-full animate-float-delay-1" />
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-float-delay-2" />
        <div className="absolute bottom-1/4 right-1/3 w-0.5 h-0.5 bg-slate-400 rounded-full animate-float-delay-3" />
        <div className="absolute top-1/2 left-1/6 w-0.5 h-0.5 bg-blue-300 rounded-full animate-float-delay-4" />
        <div className="absolute top-2/3 right-1/6 w-1 h-1 bg-slate-300 rounded-full animate-float-delay-5" />
        
        {/* Orbital elements */}
        <div className="absolute inset-0 animate-orbit">
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2" />
        </div>
        <div className="absolute inset-0 animate-orbit-reverse">
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-slate-400 rounded-full transform -translate-x-1/2" />
        </div>
      </div>
    </div>
  )
}

export function SplineWrapper({ 
  scene, 
  fallback, 
  className = "", 
  style,
  onLoad,
  onError 
}: SplineWrapperProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showFallback, setShowFallback] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Set a timeout to show fallback if Spline takes too long to load
    timeoutRef.current = setTimeout(() => {
      if (isLoading) {
        console.warn('Spline model taking too long to load, showing fallback')
        setShowFallback(true)
        setIsLoading(false)
      }
    }, 8000) // 8 second timeout

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isLoading])

  const handleLoad = () => {
    console.log('Spline model loaded successfully')
    setIsLoading(false)
    setHasError(false)
    setShowFallback(false)
    onLoad?.()
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleError = () => {
    const error = new Error('Spline model failed to load')
    console.error('Spline model failed to load:', error)
    setHasError(true)
    setIsLoading(false)
    setShowFallback(true)
    onError?.(error)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Show fallback if there's an error or if loading is taking too long
  if (hasError || showFallback) {
    return (
      <div className={className} style={style}>
        {fallback || <AnimatedFallback />}
      </div>
    )
  }

  return (
    <div className={className} style={style}>
      <SplineErrorBoundary fallback={fallback || <AnimatedFallback />}>
        <Spline
          scene={scene}
          onLoad={handleLoad}
          onError={handleError}
        />
      </SplineErrorBoundary>
    </div>
  )
}