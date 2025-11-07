import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail,
  Download,
  Sparkles,
  Zap,
  Code,
  Cpu,
  Database,
  Globe,
  Shield,
  Rocket,
  Star,
  Play,
  ArrowRight,
  Eye,
  Heart,
  Lightbulb,
  Target,
  Trophy,
  Flame,
  LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger, TextPlugin)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  trail: Array<{ x: number; y: number; alpha: number }>
}

interface FloatingIcon {
  id: string
  icon: LucideIcon
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  speed: number
}

const techStack = [
  { name: "React", icon: "⚛️", color: "#61DAFB", level: 95 },
  { name: "TypeScript", icon: "📘", color: "#3178C6", level: 92 },
  { name: "Next.js", icon: "▲", color: "#000000", level: 90 },
  { name: "Node.js", icon: "🟢", color: "#339933", level: 88 },
  { name: "Python", icon: "🐍", color: "#3776AB", level: 85 },
  { name: "Docker", icon: "🐳", color: "#2496ED", level: 82 },
  { name: "AWS", icon: "☁️", color: "#FF9900", level: 80 },
  { name: "GraphQL", icon: "◆", color: "#E10098", level: 78 }
]

const achievements = [
  { icon: Trophy, count: "50+", label: "Projects", color: "#FFD700" },
  { icon: Star, count: "1000+", label: "GitHub Stars", color: "#FF6B6B" },
  { icon: Heart, count: "100+", label: "Happy Clients", color: "#FF1744" },
  { icon: Flame, count: "4+", label: "Years Experience", color: "#FF5722" }
]

const roles = [
  "Full Stack Developer",
  "DevOps Engineer", 
  "Blockchain Developer",
  "AI/ML Engineer",
  "Cloud Architect",
  "Cyber Security Expert",
  "UI/UX Designer",
  "Tech Innovator"
]

export function UltimateHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentRole, setCurrentRole] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])
  const [showStats, setShowStats] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    // Initialize particles
    const initParticles = () => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 150; i++) {
        newParticles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          color: ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#8b5cf6'][Math.floor(Math.random() * 5)],
          alpha: Math.random() * 0.8 + 0.2,
          trail: []
        })
      }
      setParticles(newParticles)
    }

    // Initialize floating icons
    const initFloatingIcons = () => {
      const icons = [Code, Cpu, Database, Globe, Shield, Rocket, Lightbulb, Target]
      const newIcons: FloatingIcon[] = []
      
      for (let i = 0; i < 12; i++) {
        newIcons.push({
          id: `icon-${i}`,
          icon: icons[Math.floor(Math.random() * icons.length)],
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.5 + 0.5,
          color: ['#00d4ff', '#ff6b6b', '#4ecdc4', '#ffe66d', '#8b5cf6'][Math.floor(Math.random() * 5)],
          speed: Math.random() * 0.5 + 0.2
        })
      }
      setFloatingIcons(newIcons)
    }

    initParticles()
    initFloatingIcons()
    
    // Glitch effect trigger
    const glitchInterval = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle animation
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Update trail
        particle.trail.push({ x: particle.x, y: particle.y, alpha: particle.alpha })
        if (particle.trail.length > 20) particle.trail.shift()

        // Draw trail
        particle.trail.forEach((point, index) => {
          const trailAlpha = (index / particle.trail.length) * point.alpha * 0.5
          ctx.globalAlpha = trailAlpha
          ctx.fillStyle = particle.color
          ctx.beginPath()
          ctx.arc(point.x, point.y, particle.size * 0.3, 0, Math.PI * 2)
          ctx.fill()
        })

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Mouse interaction
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 100) {
          particle.vx += dx * 0.0001
          particle.vy += dy * 0.0001
        }

        // Boundary check with wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 20
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add sparkle effect
        if (Math.random() < 0.02) {
          ctx.globalAlpha = 1
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // Draw connections between nearby particles
      particles.forEach((particle1, i) => {
        particles.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.globalAlpha = (150 - distance) / 150 * 0.3
            ctx.strokeStyle = particle1.color
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animateParticles)
    }

    animateParticles()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [particles, mousePos])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".hero-content", { opacity: 0, y: 100, scale: 0.8 })
      gsap.set(".hero-title", { opacity: 0, y: 50 })
      gsap.set(".hero-subtitle", { opacity: 0, y: 30 })
      gsap.set(".hero-description", { opacity: 0, y: 20 })
      gsap.set(".hero-buttons", { opacity: 0, y: 40 })
      gsap.set(".tech-stack-item", { opacity: 0, scale: 0, rotation: 180 })
      gsap.set(".achievement-item", { opacity: 0, scale: 0, y: 50 })
      gsap.set(".floating-icon", { opacity: 0, scale: 0 })

      // Main entrance animation
      const tl = gsap.timeline({
        delay: 0.5,
        onComplete: () => {
          setIsLoaded(true)
          setShowStats(true)
        }
      })

      tl.to(".hero-content", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: "power4.out"
      })
      .to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
      }, "-=1")
      .to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.8")
      .to(".hero-description", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.6")
      .to(".hero-buttons", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.4")

      // Tech stack animation
      gsap.to(".tech-stack-item", {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 2
      })

      // Achievement items animation
      gsap.to(".achievement-item", {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "elastic.out(1, 0.8)",
        delay: 2.5
      })

      // Floating icons animation
      gsap.to(".floating-icon", {
        opacity: 0.7,
        scale: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 3
      })

      // Continuous animations
      gsap.to(".floating-element", {
        y: -20,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      })

      // Breathing effect for main title
      gsap.to(".hero-title", {
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

      // Pulsing effect for buttons
      gsap.to(".pulse-button", {
        boxShadow: "0 0 50px rgba(0, 212, 255, 0.8)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Role cycling effect
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)

    return () => clearInterval(roleTimer)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    projectsSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(0, 212, 255, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(78, 205, 196, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #020617 100%)
        `
      }}
    >
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {floatingIcons.map((icon, index) => (
          <div
            key={icon.id}
            className="floating-icon absolute opacity-0"
            style={{
              left: `${icon.x}px`,
              top: `${icon.y}px`,
              transform: `rotate(${icon.rotation}deg) scale(${icon.scale})`,
              animation: `float-${index} ${10 + index * 2}s ease-in-out infinite`,
              color: icon.color
            }}
          >
            <icon.icon size={24 + Math.random() * 16} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="hero-content relative z-20 container mx-auto px-4 text-center">
        
        {/* Greeting */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            <span className="text-cyan-300 font-mono text-sm tracking-wide">
              Hello, World! I'm Kartik Vyas
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-ping" />
          </div>
        </div>

        {/* Main Title */}
        <div className="hero-title mb-8">
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black leading-tight ${glitchActive ? 'glitch-effect' : ''}`}>
            <span 
              className="block mb-4"
              style={{
                background: 'linear-gradient(135deg, #00d4ff 0%, #ffffff 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 4s ease-in-out infinite'
              }}
            >
              Creative
            </span>
            <span 
              className="block relative"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '300% 300%',
                animation: 'gradient-shift 5s ease-in-out infinite reverse'
              }}
            >
              Developer
              
              {/* Animated underline */}
              <div 
                className="absolute -bottom-4 left-0 h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full"
                style={{
                  width: '100%',
                  animation: 'pulse-line 2s ease-in-out infinite'
                }}
              />
            </span>
          </h1>
        </div>

        {/* Role Cycling */}
        <div className="hero-subtitle mb-8">
          <div className="relative h-16 flex items-center justify-center">
            <span 
              key={currentRole}
              className="text-2xl md:text-4xl font-bold animate-role-change"
              style={{
                background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {roles[currentRole]}
            </span>
            
            {/* Typing cursor */}
            <span className="ml-2 text-3xl md:text-5xl text-cyan-400 animate-pulse">|</span>
          </div>
        </div>

        {/* Description */}
        <div className="hero-description mb-12 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
            Crafting digital experiences with 
            <span className="text-cyan-400 font-semibold mx-2 glow-text">cutting-edge technology</span>
            and innovative design. Transforming ideas into 
            <span className="text-purple-400 font-semibold mx-2 glow-text">scalable solutions</span>
            that make a difference.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-buttons flex flex-wrap justify-center gap-6 mb-16">
          <Button
            size="lg"
            className="pulse-button group px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-500 transform hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00d4ff, #8b5cf6)',
              boxShadow: '0 20px 40px rgba(0, 212, 255, 0.3)',
            }}
            onClick={scrollToProjects}
          >
            <Eye className="w-6 h-6 mr-3 group-hover:animate-spin" />
            View My Work
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 text-lg font-semibold rounded-xl border-2 border-purple-400/50 text-purple-300 hover:bg-purple-400/20 backdrop-blur-sm transition-all duration-500 transform hover:scale-105"
          >
            <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
            Download CV
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group px-8 py-6 text-lg font-semibold rounded-xl border-2 border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/20 backdrop-blur-sm transition-all duration-500 transform hover:scale-105"
            asChild
          >
            <a href="#contact">
              <Mail className="w-6 h-6 mr-3 group-hover:animate-pulse" />
              Get In Touch
            </a>
          </Button>
        </div>

        {/* Tech Stack Visualization */}
        <div className="floating-element mb-16">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center justify-center gap-3">
            <Code className="w-6 h-6 text-cyan-400" />
            Tech Arsenal
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((tech, index) => (
              <div
                key={tech.name}
                className="tech-stack-item group relative"
              >
                <div 
                  className="flex items-center gap-3 px-4 py-3 rounded-xl backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: `${tech.color}10`,
                    boxShadow: `0 0 20px ${tech.color}20`
                  }}
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-white font-medium">{tech.name}</span>
                  
                  {/* Skill level indicator */}
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-1000"
                      style={{ 
                        width: showStats ? `${tech.level}%` : '0%',
                        animation: showStats ? 'shimmer 2s ease-in-out infinite' : 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-item floating-element text-center">
              <div 
                className="relative p-6 rounded-2xl backdrop-blur-sm border border-slate-600/50 hover:border-slate-500/50 transition-all duration-500 group"
                style={{
                  background: `${achievement.color}10`,
                  boxShadow: `0 0 30px ${achievement.color}20`
                }}
              >
                <achievement.icon 
                  className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" 
                  style={{ color: achievement.color }}
                />
                <div 
                  className="text-2xl md:text-3xl font-black mb-2 counter-animation"
                  style={{ color: achievement.color }}
                >
                  {showStats ? achievement.count : '0'}
                </div>
                <div className="text-sm text-slate-400 font-medium">
                  {achievement.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="floating-element animate-bounce">
          <button
            onClick={scrollToProjects}
            className="group flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-300"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 group-hover:animate-pulse" />
          </button>
        </div>

        {/* Social Links - Floating */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
          <a
            href="https://github.com/Kartikvyas1604"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full backdrop-blur-sm border border-slate-600/50 text-slate-400 hover:text-white hover:border-cyan-400/50 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(0, 212, 255, 0.1)' }}
          >
            <Github className="w-5 h-5 group-hover:animate-spin" />
          </a>
          <a
            href="https://linkedin.com/in/kartik-vyas"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-3 rounded-full backdrop-blur-sm border border-slate-600/50 text-slate-400 hover:text-white hover:border-purple-400/50 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(139, 92, 246, 0.1)' }}
          >
            <Linkedin className="w-5 h-5 group-hover:animate-pulse" />
          </a>
          <a
            href="mailto:kartik@example.com"
            className="group p-3 rounded-full backdrop-blur-sm border border-slate-600/50 text-slate-400 hover:text-white hover:border-emerald-400/50 transition-all duration-300 hover:scale-110"
            style={{ background: 'rgba(16, 185, 129, 0.1)' }}
          >
            <Mail className="w-5 h-5 group-hover:animate-bounce" />
          </a>
        </div>
      </div>

      {/* Dynamic Styles */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-line {
          0%, 100% { 
            opacity: 1;
            transform: scaleX(1);
          }
          50% { 
            opacity: 0.7;
            transform: scaleX(1.1);
          }
        }
        
        @keyframes animate-role-change {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          20% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          80% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        ${floatingIcons.map((_, index) => `
          @keyframes float-${index} {
            0%, 100% { 
              transform: translateY(0) rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5});
            }
            50% { 
              transform: translateY(-${20 + Math.random() * 30}px) rotate(${Math.random() * 360}deg) scale(${0.7 + Math.random() * 0.6});
            }
          }
        `).join('')}
        
        .glitch-effect {
          animation: glitch 0.3s ease-in-out infinite;
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        .glow-text {
          text-shadow: 0 0 20px currentColor;
        }
        
        .counter-animation {
          animation: countUp 2s ease-out forwards;
        }
        
        @keyframes countUp {
          from { transform: scale(0) rotate(180deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </section>
  )
}