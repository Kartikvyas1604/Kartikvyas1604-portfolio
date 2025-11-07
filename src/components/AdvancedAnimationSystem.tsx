import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export class AdvancedAnimationSystem {
  private static instance: AdvancedAnimationSystem
  private animationQueue: Array<() => void> = []
  private performanceMetrics = {
    frameRate: 60,
    averageFrameTime: 16.67,
    droppedFrames: 0,
    activeAnimations: 0
  }

  static getInstance(): AdvancedAnimationSystem {
    if (!AdvancedAnimationSystem.instance) {
      AdvancedAnimationSystem.instance = new AdvancedAnimationSystem()
    }
    return AdvancedAnimationSystem.instance
  }

  // Performance monitoring
  startPerformanceMonitoring() {
    let frameCount = 0
    let lastTime = performance.now()
    const frameTimes: number[] = []

    const updateMetrics = () => {
      const currentTime = performance.now()
      const frameTime = currentTime - lastTime
      frameTimes.push(frameTime)
      
      if (frameTimes.length > 60) frameTimes.shift()
      
      this.performanceMetrics.averageFrameTime = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length
      this.performanceMetrics.frameRate = 1000 / this.performanceMetrics.averageFrameTime
      
      if (frameTime > 20) this.performanceMetrics.droppedFrames++
      
      lastTime = currentTime
      frameCount++
      
      requestAnimationFrame(updateMetrics)
    }
    
    requestAnimationFrame(updateMetrics)
  }

  // Adaptive quality system
  getAdaptiveSettings() {
    const { frameRate, averageFrameTime } = this.performanceMetrics
    
    if (frameRate < 30 || averageFrameTime > 35) {
      return {
        particleCount: 50,
        animationComplexity: 'low',
        enableHeavyEffects: false,
        updateFrequency: 30
      }
    } else if (frameRate < 45 || averageFrameTime > 25) {
      return {
        particleCount: 100,
        animationComplexity: 'medium',
        enableHeavyEffects: true,
        updateFrequency: 45
      }
    } else {
      return {
        particleCount: 150,
        animationComplexity: 'high',
        enableHeavyEffects: true,
        updateFrequency: 60
      }
    }
  }

  // Smart animation queue
  queueAnimation(animationFn: () => void, priority: 'low' | 'medium' | 'high' = 'medium') {
    if (priority === 'high') {
      this.animationQueue.unshift(animationFn)
    } else {
      this.animationQueue.push(animationFn)
    }
    
    this.processQueue()
  }

  private processQueue() {
    if (this.animationQueue.length === 0) return
    
    const { frameRate } = this.performanceMetrics
    const maxAnimationsPerFrame = frameRate > 45 ? 3 : frameRate > 30 ? 2 : 1
    
    for (let i = 0; i < Math.min(maxAnimationsPerFrame, this.animationQueue.length); i++) {
      const animationFn = this.animationQueue.shift()
      if (animationFn) {
        animationFn()
        this.performanceMetrics.activeAnimations++
      }
    }
    
    if (this.animationQueue.length > 0) {
      requestAnimationFrame(() => this.processQueue())
    }
  }

  // Optimized scroll animations
  createOptimizedScrollTrigger(options: {
    trigger: string
    start?: string
    end?: string
    onEnter?: () => void
    onLeave?: () => void
    scrub?: boolean | number
  }) {
    const settings = this.getAdaptiveSettings()
    
    return ScrollTrigger.create({
      trigger: options.trigger,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      scrub: settings.animationComplexity === 'high' ? options.scrub : false,
      refreshPriority: settings.animationComplexity === 'high' ? 1 : -1,
      invalidateOnRefresh: settings.animationComplexity === 'high'
    })
  }

  // Batch animations for better performance
  batchAnimate(elements: string | Element[], animations: gsap.TweenVars, stagger: number = 0.1) {
    const settings = this.getAdaptiveSettings()
    const adaptedStagger = settings.animationComplexity === 'low' ? stagger * 2 : stagger
    
    return gsap.to(elements, {
      ...animations,
      stagger: adaptedStagger,
      ease: settings.animationComplexity === 'high' ? "power4.out" : "power2.out"
    })
  }

  // Smart particle system
  createParticleSystem(canvas: HTMLCanvasElement, options: {
    count?: number
    color?: string
    size?: number
    speed?: number
  } = {}) {
    const ctx = canvas.getContext('2d')!
    const settings = this.getAdaptiveSettings()
    
    const particleCount = options.count || settings.particleCount
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (options.speed || 2),
        vy: (Math.random() - 0.5) * (options.speed || 2),
        size: Math.random() * (options.size || 4) + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: options.color || '#00d4ff'
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        
        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })
      
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return {
      destroy: () => {
        if (animationId) {
          cancelAnimationFrame(animationId)
        }
      },
      updateCount: (newCount: number) => {
        const diff = newCount - particles.length
        if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            particles.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
              vx: (Math.random() - 0.5) * (options.speed || 2),
              vy: (Math.random() - 0.5) * (options.speed || 2),
              size: Math.random() * (options.size || 4) + 1,
              opacity: Math.random() * 0.8 + 0.2,
              color: options.color || '#00d4ff'
            })
          }
        } else if (diff < 0) {
          particles.splice(newCount)
        }
      }
    }
  }

  // Intersection Observer for performance
  createIntersectionObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
    return new IntersectionObserver(
      callback,
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '50px'
      }
    )
  }

  // Memory cleanup
  cleanup() {
    ScrollTrigger.getAll().forEach(st => st.kill())
    gsap.killTweensOf("*")
    this.animationQueue.length = 0
    this.performanceMetrics.activeAnimations = 0
  }

  // Get performance report
  getPerformanceReport() {
    return {
      ...this.performanceMetrics,
      queueLength: this.animationQueue.length,
      adaptiveSettings: this.getAdaptiveSettings()
    }
  }
}

// React hook for using the animation system
export function useAdvancedAnimations() {
  const animationSystemRef = useRef<AdvancedAnimationSystem>()

  useEffect(() => {
    animationSystemRef.current = AdvancedAnimationSystem.getInstance()
    animationSystemRef.current.startPerformanceMonitoring()

    return () => {
      animationSystemRef.current?.cleanup()
    }
  }, [])

  return {
    animationSystem: animationSystemRef.current,
    queueAnimation: (fn: () => void, priority?: 'low' | 'medium' | 'high') => 
      animationSystemRef.current?.queueAnimation(fn, priority),
    createScrollTrigger: (options: Parameters<typeof AdvancedAnimationSystem.prototype.createOptimizedScrollTrigger>[0]) =>
      animationSystemRef.current?.createOptimizedScrollTrigger(options),
    batchAnimate: (elements: string | Element[], animations: gsap.TweenVars, stagger?: number) =>
      animationSystemRef.current?.batchAnimate(elements, animations, stagger),
    createParticleSystem: (canvas: HTMLCanvasElement, options?: Parameters<typeof AdvancedAnimationSystem.prototype.createParticleSystem>[1]) =>
      animationSystemRef.current?.createParticleSystem(canvas, options),
    getPerformanceReport: () => animationSystemRef.current?.getPerformanceReport()
  }
}

interface PerformanceReport {
  frameRate: number
  averageFrameTime: number
  droppedFrames: number
  activeAnimations: number
  queueLength: number
  adaptiveSettings: {
    particleCount: number
    animationComplexity: string
    enableHeavyEffects: boolean
    updateFrequency: number
  }
}

// Performance monitoring component
export function PerformanceMonitor() {
  const { getPerformanceReport } = useAdvancedAnimations()
  const [report, setReport] = useState<PerformanceReport | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const newReport = getPerformanceReport?.()
      if (newReport) setReport(newReport)
    }, 1000)

    return () => clearInterval(interval)
  }, [getPerformanceReport])

  if (!report || process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-4 right-4 z-50 p-4 bg-black/90 text-white rounded-lg text-xs font-mono">
      <div>FPS: {report.frameRate.toFixed(1)}</div>
      <div>Frame Time: {report.averageFrameTime.toFixed(1)}ms</div>
      <div>Dropped: {report.droppedFrames}</div>
      <div>Active: {report.activeAnimations}</div>
      <div>Queue: {report.queueLength}</div>
      <div>Quality: {report.adaptiveSettings.animationComplexity}</div>
    </div>
  )
}

export default AdvancedAnimationSystem