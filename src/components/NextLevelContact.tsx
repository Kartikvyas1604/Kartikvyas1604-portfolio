import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Mail, 
  MessageSquare, 
  Send, 
  User, 
  MapPin, 
  Phone,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Zap,
  Shield,
  Satellite,
  Radio,
  Wifi,
  Activity,
  Terminal,
  Eye,
  Lock,
  Heart,
  Star,
  CheckCircle,
  AlertCircle,
  Loader,
  Sparkles,
  Brain,
  Rocket,
  Target,
  Award,
  Coffee,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

interface ContactMethod {
  icon: LucideIcon
  label: string
  value: string
  type: 'email' | 'phone' | 'location' | 'frequency'
  color: string
  status: string
  link?: string
}

interface SocialLink {
  name: string
  url: string
  icon: LucideIcon
  color: string
  description: string
  stats: string
}

interface ConnectionStats {
  icon: LucideIcon
  label: string
  value: string
  color: string
  trend: 'up' | 'down' | 'stable'
}

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "Primary Email",
    value: "kartik@neuraldomain.dev",
    type: "email",
    color: "#00d4ff",
    status: "ACTIVE",
    link: "mailto:kartik@neuraldomain.dev"
  },
  {
    icon: Phone,
    label: "Secure Line",
    value: "+1 (555) DEV-CODE",
    type: "phone",
    color: "#4ecdc4",
    status: "ENCRYPTED",
    link: "tel:+15553382633"
  },
  {
    icon: MapPin,
    label: "Location Hub",
    value: "San Francisco, CA",
    type: "location",
    color: "#ff6b6b",
    status: "AVAILABLE"
  },
  {
    icon: Radio,
    label: "Neural Frequency",
    value: "148.735 MHz",
    type: "frequency",
    color: "#ffe66d",
    status: "BROADCASTING"
  }
]

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/Kartikvyas1604",
    icon: Github,
    color: "#00d4ff",
    description: "Code Repository & Open Source",
    stats: "500+ Stars"
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kartik-vyas-dev",
    icon: Linkedin,
    color: "#4ecdc4",
    description: "Professional Network",
    stats: "10K+ Connections"
  },
  {
    name: "Twitter",
    url: "https://twitter.com/kartikvyas",
    icon: Twitter,
    color: "#ff6b6b",
    description: "Tech Updates & Insights",
    stats: "5K+ Followers"
  },
  {
    name: "Portfolio",
    url: "https://kartikvyas.dev",
    icon: Globe,
    color: "#ffe66d",
    description: "Complete Digital Presence",
    stats: "50K+ Views"
  }
]

const connectionStats: ConnectionStats[] = [
  { icon: Users, label: "Response Rate", value: "98%", color: "#00d4ff", trend: "up" },
  { icon: Clock, label: "Avg Response Time", value: "2h", color: "#4ecdc4", trend: "stable" },
  { icon: Star, label: "Client Satisfaction", value: "4.9/5", color: "#ffe66d", trend: "up" },
  { icon: TrendingUp, label: "Project Success", value: "100%", color: "#ff6b6b", trend: "up" }
]

const availabilityStatus = {
  status: "available",
  message: "Currently available for new projects",
  nextAvailable: "Immediate start available",
  timezone: "PST (UTC-8)"
}

export function NextLevelContact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    budget: "",
    timeline: "",
    message: ""
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'validating' | 'sending' | 'success' | 'error'>('idle')
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})
  const [scanlineActive, setScanlineActive] = useState(true)
  const [securityLevel, setSecurityLevel] = useState(95)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeField, setActiveField] = useState<string | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".contact-section", { opacity: 0, y: 100 })
      gsap.set(".contact-card", { opacity: 0, scale: 0.8, rotationX: -20 })
      gsap.set(".social-link", { opacity: 0, scale: 0.5, rotation: 180 })
      gsap.set(".contact-method", { opacity: 0, x: -100, skewX: 15 })
      gsap.set(".stat-item", { opacity: 0, y: 50, scale: 0.8 })
      gsap.set(".form-field", { opacity: 0, y: 30 })

      // Section entrance
      ScrollTrigger.batch(".contact-section", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out"
          })
        }
      })

      // Contact cards animation
      ScrollTrigger.batch(".contact-card", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "back.out(1.7)"
          })
        }
      })

      // Social links animation
      ScrollTrigger.batch(".social-link", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.1,
            ease: "elastic.out(1, 0.8)"
          })
        }
      })

      // Contact methods animation
      ScrollTrigger.batch(".contact-method", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            x: 0,
            skewX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
          })
        }
      })

      // Stats animation
      ScrollTrigger.batch(".stat-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)"
          })
        }
      })

      // Form fields animation
      gsap.to(".form-field", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 1
      })

      // Continuous animations
      gsap.to(".floating-contact", {
        y: -15,
        rotation: 3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
      })

      // Security level animation
      gsap.to({}, {
        duration: 3,
        repeat: -1,
        yoyo: true,
        onUpdate: function() {
          setSecurityLevel(93 + Math.random() * 4)
        }
      })

      // Mouse tracking for parallax
      const handleMouseMove = (e: MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect()
        if (!rect) return

        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        setMousePosition({ x: e.clientX, y: e.clientY })

        gsap.to(".parallax-element", {
          rotationY: (x - 0.5) * 10,
          rotationX: (y - 0.5) * -10,
          duration: 1,
          ease: "power2.out"
        })
      }

      window.addEventListener("mousemove", handleMouseMove)

      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Scanline animation
  useEffect(() => {
    if (scanlineActive) {
      gsap.to(".scanline", {
        y: "100vh",
        duration: 4,
        repeat: -1,
        ease: "none"
      })
    }
  }, [scanlineActive])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear validation errors on input
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ""
      }))
    }
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) errors.name = "Name is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Invalid email format"
    if (!formData.message.trim()) errors.message = "Message is required"
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setFormStatus('error')
      return
    }

    setFormStatus('validating')
    
    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setFormStatus('sending')
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success (or error based on some condition)
    const success = Math.random() > 0.1 // 90% success rate
    
    if (success) {
      setFormStatus('success')
      setFormData({
        name: "",
        email: "",
        company: "",
        project: "",
        budget: "",
        timeline: "",
        message: ""
      })
      
      // Reset form status after showing success
      setTimeout(() => setFormStatus('idle'), 5000)
    } else {
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 3000)
    }
  }

  const getFormStatusIcon = () => {
    switch (formStatus) {
      case 'validating':
      case 'sending':
        return <Loader className="w-5 h-5 animate-spin" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />
      default:
        return <Send className="w-5 h-5" />
    }
  }

  const getFormStatusText = () => {
    switch (formStatus) {
      case 'validating':
        return 'Validating Neural Data...'
      case 'sending':
        return 'Transmitting Message...'
      case 'success':
        return 'Message Transmitted Successfully!'
      case 'error':
        return 'Transmission Failed - Retry'
      default:
        return 'Send Neural Message'
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top left, rgba(255, 107, 107, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at top right, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
          radial-gradient(ellipse at bottom right, rgba(78, 205, 196, 0.06) 0%, transparent 60%),
          linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #020617 100%)
        `
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-15">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'grid-drift 25s ease-in-out infinite'
          }}
        />

        {/* Grid intersection particles */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${(i % 8) * 12.5}%`,
              top: `${Math.floor(i / 8) * 20}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Scanline Effect */}
      {scanlineActive && (
        <div className="scanline absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent pointer-events-none" 
             style={{ top: "-1px" }} />
      )}

      {/* Floating Data Streams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-xs text-cyan-400/20 font-mono"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `data-drift ${8 + Math.random() * 8}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`
            }}
          >
            {Math.random().toString(36).substr(2, 12).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="contact-section text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-400/30 bg-emerald-400/10 backdrop-blur-sm mb-6">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-mono text-sm tracking-wide">
                CONTACT_PROTOCOL.INIT()
              </span>
              <Badge
                variant="secondary"
                className="ml-2 text-xs bg-green-400/20 border-green-400/30 text-green-400"
              >
                ONLINE
              </Badge>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #00d4ff 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-pulse 4s ease-in-out infinite'
              }}
            >
              Let's Create
            </span>
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 50%, #ffe66d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-pulse 5s ease-in-out infinite reverse'
              }}
            >
              Something Amazing
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Ready to transform your ideas into 
            <span className="text-cyan-400 font-semibold mx-2">digital reality</span>? 
            Let's connect and build something extraordinary together with
            <span className="text-emerald-400 font-semibold mx-2">cutting-edge technology</span>
            and innovative solutions.
          </p>

          {/* Connection Status */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-mono text-sm">
                SECURITY: {securityLevel.toFixed(1)}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-mono text-sm">
                STATUS: {availabilityStatus.status.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-mono text-sm">
                TIMEZONE: {availabilityStatus.timezone}
              </span>
            </div>
            <button
              onClick={() => setScanlineActive(!scanlineActive)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span className="font-mono text-xs">
                {scanlineActive ? "DISABLE_SCAN" : "ENABLE_SCAN"}
              </span>
            </button>
          </div>
        </div>

        {/* Connection Stats */}
        <div className="contact-section grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {connectionStats.map((stat, index) => (
            <div key={index} className="stat-item floating-contact">
              <div 
                className="p-6 rounded-2xl border backdrop-blur-sm text-center group hover:scale-105 transition-all duration-500"
                style={{
                  background: `${stat.color}08`,
                  borderColor: `${stat.color}30`,
                  boxShadow: `0 0 30px ${stat.color}20`
                }}
              >
                <div className="relative">
                  <stat.icon 
                    className="w-8 h-8 mx-auto mb-4 group-hover:animate-pulse" 
                    style={{ color: stat.color }}
                  />
                  
                  {/* Trend indicator */}
                  <div className="absolute -top-2 -right-2">
                    {stat.trend === 'up' && (
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-ping" />
                    )}
                  </div>
                </div>
                
                <div className="text-3xl font-black mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                
                <div className="text-sm text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <div className="contact-card floating-contact parallax-element">
            <div 
              className="relative p-8 rounded-3xl border backdrop-blur-sm"
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(16, 185, 129, 0.05) 0%, 
                    rgba(30, 41, 59, 0.8) 50%, 
                    rgba(0, 212, 255, 0.05) 100%
                  )
                `,
                borderColor: '#10b98140',
                boxShadow: '0 0 50px rgba(16, 185, 129, 0.2)'
              }}
            >
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-emerald-400" />
                  Neural Message Portal
                </h3>
                <p className="text-slate-400">
                  Send your project details through our secure quantum channel
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field space-y-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField('name')}
                        onBlur={() => setActiveField(null)}
                        placeholder="John Doe"
                        className={`w-full bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 ${
                          validationErrors.name ? 'border-red-400' : ''
                        }`}
                        required
                      />
                      <User className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      {activeField === 'name' && (
                        <div className="absolute -top-1 left-3 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                    {validationErrors.name && (
                      <p className="text-red-400 text-xs">{validationErrors.name}</p>
                    )}
                  </div>

                  <div className="form-field space-y-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField('email')}
                        onBlur={() => setActiveField(null)}
                        placeholder="john@company.com"
                        className={`w-full bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 ${
                          validationErrors.email ? 'border-red-400' : ''
                        }`}
                        required
                      />
                      <Mail className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      {activeField === 'email' && (
                        <div className="absolute -top-1 left-3 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-400 text-xs">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field space-y-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Input
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField('company')}
                        onBlur={() => setActiveField(null)}
                        placeholder="Your Company"
                        className="w-full bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300"
                      />
                      <Globe className="absolute right-3 top-3 w-5 h-5 text-slate-400" />
                      {activeField === 'company' && (
                        <div className="absolute -top-1 left-3 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>

                  <div className="form-field space-y-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Project Type
                    </label>
                    <div className="relative">
                      <select
                        name="project"
                        value={formData.project}
                        onChange={handleInputChange}
                        onFocus={() => setActiveField('project')}
                        onBlur={() => setActiveField(null)}
                        className="w-full bg-slate-800/50 border border-slate-600/50 text-white focus:border-emerald-400 focus:ring-emerald-400/20 rounded-md px-3 py-2 transition-all duration-300"
                      >
                        <option value="">Select project type</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile Application</option>
                        <option value="devops">DevOps & Cloud</option>
                        <option value="blockchain">Blockchain & Web3</option>
                        <option value="ai-ml">AI/ML Solutions</option>
                        <option value="consulting">Technical Consulting</option>
                        <option value="other">Other</option>
                      </select>
                      {activeField === 'project' && (
                        <div className="absolute -top-1 left-3 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Advanced Options Toggle */}
                <div className="form-field">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm">
                      {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
                    </span>
                  </button>
                </div>

                {/* Advanced Options */}
                {showAdvancedOptions && (
                  <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                    <div className="form-field space-y-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Budget Range
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-600/50 text-white focus:border-emerald-400 focus:ring-emerald-400/20 rounded-md px-3 py-2 transition-all duration-300"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-15k">$5,000 - $15,000</option>
                          <option value="15k-50k">$15,000 - $50,000</option>
                          <option value="50k-plus">$50,000+</option>
                          <option value="discuss">Let's discuss</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-field space-y-2">
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Timeline
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-slate-800/50 border border-slate-600/50 text-white focus:border-emerald-400 focus:ring-emerald-400/20 rounded-md px-3 py-2 transition-all duration-300"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="1-3-months">1-3 months</option>
                          <option value="3-6-months">3-6 months</option>
                          <option value="6-plus-months">6+ months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="form-field space-y-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Project Details *
                  </label>
                  <div className="relative">
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField('message')}
                      onBlur={() => setActiveField(null)}
                      placeholder="Tell me about your project, goals, and how I can help bring your vision to life..."
                      rows={6}
                      className={`w-full bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-300 resize-none ${
                        validationErrors.message ? 'border-red-400' : ''
                      }`}
                      required
                    />
                    {activeField === 'message' && (
                      <div className="absolute top-3 right-3 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    )}
                  </div>
                  {validationErrors.message && (
                    <p className="text-red-400 text-xs">{validationErrors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={formStatus === 'validating' || formStatus === 'sending'}
                  className={`w-full group relative overflow-hidden py-4 text-lg font-semibold transition-all duration-500 ${
                    formStatus === 'success' 
                      ? 'bg-green-500 hover:bg-green-600' 
                      : formStatus === 'error'
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600'
                  }`}
                  style={{
                    boxShadow: formStatus === 'idle' ? '0 0 30px rgba(16, 185, 129, 0.3)' : 'none'
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {getFormStatusIcon()}
                    {getFormStatusText()}
                  </span>
                  
                  {/* Scanning effect */}
                  {formStatus === 'idle' && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  )}
                </Button>

                {/* Form Status Message */}
                {formStatus === 'success' && (
                  <div className="text-center text-green-400 text-sm animate-fade-in">
                    <CheckCircle className="w-4 h-4 inline mr-2" />
                    Message sent successfully! I'll get back to you within 24 hours.
                  </div>
                )}

                {formStatus === 'error' && (
                  <div className="text-center text-red-400 text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    Something went wrong. Please try again or contact me directly.
                  </div>
                )}
              </form>

              {/* Security Notice */}
              <div className="mt-8 pt-6 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Lock className="w-4 h-4" />
                  <span>End-to-end encrypted • GDPR compliant • No data stored</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information & Social Links */}
          <div className="space-y-8">
            
            {/* Contact Methods */}
            <div className="contact-card floating-contact">
              <div 
                className="p-8 rounded-3xl border backdrop-blur-sm"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(0, 212, 255, 0.05) 0%, 
                      rgba(30, 41, 59, 0.8) 50%, 
                      rgba(139, 92, 246, 0.05) 100%
                    )
                  `,
                  borderColor: '#00d4ff40',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)'
                }}
              >
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Satellite className="w-8 h-8 text-cyan-400" />
                  Direct Channels
                </h3>

                <div className="space-y-6">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="contact-method group">
                      <div 
                        className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 group-hover:border-opacity-60 cursor-pointer"
                        style={{
                          background: `${method.color}05`,
                          borderColor: `${method.color}30`
                        }}
                        onClick={() => method.link && window.open(method.link, '_blank')}
                      >
                        <div 
                          className="p-3 rounded-lg group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `${method.color}20`,
                            border: `1px solid ${method.color}40`
                          }}
                        >
                          <method.icon className="w-6 h-6" style={{ color: method.color }} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-semibold text-white">
                              {method.label}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{
                                background: `${method.color}15`,
                                color: method.color
                              }}
                            >
                              {method.status}
                            </Badge>
                          </div>
                          <span className="text-slate-400 font-mono text-sm">
                            {method.value}
                          </span>
                        </div>

                        {/* Status indicator */}
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex gap-1">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-1 bg-green-400 rounded-full transition-all duration-300"
                                style={{
                                  height: `${8 + i * 4}px`,
                                  opacity: i < 3 ? 1 : 0.3
                                }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-green-400 font-mono">LIVE</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Availability Status */}
                <div className="mt-8 p-6 rounded-xl border border-green-400/30 bg-green-400/10">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-green-400/20">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-400 mb-2">
                        {availabilityStatus.message}
                      </h4>
                      <p className="text-sm text-slate-300 mb-1">
                        {availabilityStatus.nextAvailable}
                      </p>
                      <p className="text-xs text-slate-400">
                        Timezone: {availabilityStatus.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Networks */}
            <div className="contact-card floating-contact">
              <div 
                className="p-8 rounded-3xl border backdrop-blur-sm"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(139, 92, 246, 0.05) 0%, 
                      rgba(30, 41, 59, 0.8) 50%, 
                      rgba(255, 107, 107, 0.05) 100%
                    )
                  `,
                  borderColor: '#8b5cf640',
                  boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)'
                }}
              >
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Wifi className="w-8 h-8 text-purple-400" />
                  Connect Online
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link group block"
                    >
                      <div 
                        className="p-6 rounded-xl border transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
                        style={{
                          background: `${link.color}05`,
                          borderColor: `${link.color}30`
                        }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div 
                            className="p-3 rounded-lg group-hover:animate-pulse"
                            style={{
                              background: `${link.color}20`,
                              border: `1px solid ${link.color}40`
                            }}
                          >
                            <link.icon className="w-6 h-6" style={{ color: link.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-semibold text-white block truncate">
                              {link.name}
                            </span>
                            <span className="text-xs text-slate-400 block">
                              {link.description}
                            </span>
                          </div>
                        </div>
                        
                        {/* Stats & Connection indicator */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium" style={{ color: link.color }}>
                            {link.stats}
                          </span>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2 h-2 rounded-full animate-pulse"
                              style={{ background: link.color }}
                            />
                            <span className="text-xs text-slate-400 font-mono">
                              ONLINE
                            </span>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="contact-card text-center">
              <div 
                className="p-8 rounded-3xl border backdrop-blur-sm"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(255, 230, 109, 0.1) 0%, 
                      rgba(30, 41, 59, 0.8) 50%, 
                      rgba(16, 185, 129, 0.1) 100%
                    )
                  `,
                  borderColor: '#ffe66d40'
                }}
              >
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <Brain className="w-16 h-16 text-yellow-400 animate-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">
                  Lightning Fast Response
                </h3>
                
                <p className="text-slate-300 mb-6">
                  Get a detailed response within 
                  <span className="text-yellow-400 font-semibold mx-1">2 hours</span>
                  during business hours. I'm committed to understanding your vision and providing actionable next steps.
                </p>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">2h</div>
                    <div className="text-xs text-slate-400">Avg Response</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-xs text-slate-400">Monitoring</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">100%</div>
                    <div className="text-xs text-slate-400">Response Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Styles */}
      <style>{`
        @keyframes gradient-pulse {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes grid-drift {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg); 
            opacity: 0.15;
          }
          25% { 
            transform: translateY(-10px) translateX(5px) rotate(0.5deg); 
            opacity: 0.25;
          }
          50% { 
            transform: translateY(0) translateX(10px) rotate(0deg); 
            opacity: 0.15;
          }
          75% { 
            transform: translateY(10px) translateX(5px) rotate(-0.5deg); 
            opacity: 0.25;
          }
        }
        
        @keyframes data-drift {
          0% { 
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-20px) translateX(100px);
            opacity: 0;
          }
        }
        
        @keyframes animate-fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: animate-fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}