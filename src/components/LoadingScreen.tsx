import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Code, Sparkles, Zap } from "lucide-react"

interface LoadingScreenProps {
  onLoadingComplete: () => void
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")

  useEffect(() => {
    const loadingTexts = [
      "Initializing...",
      "Loading Core Systems...",
      "Establishing Connections...", 
      "Preparing UI Elements...",
      "Optimizing Performance...",
      "Finalizing Experience..."
    ]

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(containerRef.current, { opacity: 1 })
      gsap.set(logoRef.current, { scale: 0.5, opacity: 0, rotation: -45 })
      gsap.set(progressRef.current, { width: "0%" })

      // Entrance animation
      const tl = gsap.timeline()
      
      // Logo entrance with bounce
      tl.to(logoRef.current, {
        scale: 1.2,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      })
      .to(logoRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })

      // Create floating particles
      const particles = particlesRef.current?.children
      if (particles) {
        Array.from(particles).forEach((particle, i) => {
          gsap.set(particle, { 
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200,
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          })
          
          gsap.to(particle, {
            opacity: 0.6,
            duration: 1,
            delay: i * 0.1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          })

          gsap.to(particle, {
            rotation: 360,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            ease: "none"
          })

          gsap.to(particle, {
            x: `+=${(Math.random() - 0.5) * 100}`,
            y: `+=${(Math.random() - 0.5) * 100}`,
            duration: 4 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          })
        })
      }

      // Progress animation
      let currentProgress = 0
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5
        if (currentProgress >= 100) {
          currentProgress = 100
          clearInterval(progressInterval)
          
          // Exit animation
          setTimeout(() => {
            const exitTl = gsap.timeline({
              onComplete: onLoadingComplete
            })

            exitTl.to(progressRef.current, {
              width: "100%",
              duration: 0.3,
              ease: "power2.out"
            })
            .to(logoRef.current, {
              scale: 1.5,
              opacity: 0,
              rotation: 45,
              duration: 0.6,
              ease: "power2.in"
            }, "-=0.1")
            .to(containerRef.current, {
              opacity: 0,
              scale: 1.1,
              duration: 0.8,
              ease: "power2.inOut"
            }, "-=0.3")
          }, 500)
        }
        
        setProgress(currentProgress)
        
        // Update progress bar
        gsap.to(progressRef.current, {
          width: `${currentProgress}%`,
          duration: 0.3,
          ease: "power2.out"
        })

        // Update text
        const textIndex = Math.floor((currentProgress / 100) * (loadingTexts.length - 1))
        setLoadingText(loadingTexts[textIndex] || loadingTexts[loadingTexts.length - 1])
        
      }, 200)

      return () => clearInterval(progressInterval)
    }, containerRef)

    return () => ctx.revert()
  }, [onLoadingComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center"
    >
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute">
            {i % 3 === 0 ? (
              <Code className="w-6 h-6 text-blue-400" />
            ) : i % 3 === 1 ? (
              <Sparkles className="w-4 h-4 text-purple-400" />
            ) : (
              <Zap className="w-5 h-5 text-cyan-400" />
            )}
          </div>
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-8">
          <div className="inline-block relative">
            {/* Glowing ring */}
            <div className="absolute inset-0 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
            
            {/* Main logo */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-white">KV</span>
            </div>
            
            {/* Rotating ring */}
            <div className="absolute inset-0 w-24 h-24 border-2 border-transparent border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Kartik Vyas
          </h1>
          <p className="text-lg text-slate-300">
            Full Stack Developer & Blockchain Engineer
          </p>
        </div>

        {/* Progress section */}
        <div className="w-80 max-w-sm mx-auto space-y-4">
          <div className="text-center">
            <p className="text-blue-300 text-sm mb-2">{loadingText}</p>
            <div className="text-2xl font-mono text-white">
              {Math.round(progress)}%
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full shadow-lg"
              style={{ width: "0%" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex justify-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 20 ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            <span>Systems</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 50 ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            <span>Assets</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${progress > 80 ? 'bg-green-500 animate-pulse' : 'bg-slate-600'}`}></div>
            <span>UI</span>
          </div>
        </div>

        {/* Subtle hint */}
        <p className="text-xs text-slate-500 animate-pulse">
          Preparing an extraordinary experience...
        </p>
      </div>
    </div>
  )
}