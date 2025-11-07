import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  ExternalLink, 
  Github, 
  Star, 
  Eye, 
  GitBranch, 
  Play,
  Pause,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Award,
  Zap,
  Shield,
  Database,
  Wallet,
  Server,
  Bot,
  Globe,
  Code,
  Heart,
  TrendingUp,
  Users,
  Calendar,
  Tag,
  Sparkles,
  Rocket,
  Target,
  LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: string
  tech: string[]
  github: string
  demo?: string
  image?: string
  featured: boolean
  status: 'completed' | 'in-progress' | 'planning'
  stats: {
    stars: number
    forks: number
    views: number
    commits: number
  }
  color: {
    primary: string
    secondary: string
    accent: string
  }
  icon: LucideIcon
  achievements: string[]
  timeline: string
  team: number
}

const projects: Project[] = [
  {
    id: "ops-flow-guardian",
    title: "OPS-Flow Guardian",
    description: "Revolutionary DevOps orchestration platform with AI-powered monitoring and automated healing capabilities.",
    longDescription: "A comprehensive DevOps platform that revolutionizes infrastructure management through AI-powered monitoring, predictive analytics, and automated incident response. Features include intelligent alerting, self-healing infrastructure, and comprehensive performance optimization.",
    category: "DevOps",
    tech: ["Docker", "Kubernetes", "Python", "Go", "AI/ML", "Grafana", "Terraform", "AWS"],
    github: "https://github.com/Kartikvyas1604/OPS-Flow-Guardian",
    demo: "https://ops-flow-guardian.vercel.app",
    featured: true,
    status: "completed",
    stats: { stars: 147, forks: 32, views: 4500, commits: 284 },
    color: { primary: "#00d4ff", secondary: "#0ea5e9", accent: "#38bdf8" },
    icon: Server,
    achievements: ["99.9% Uptime", "40% Cost Reduction", "Featured on DevOps Weekly"],
    timeline: "6 months",
    team: 3
  },
  {
    id: "cypher-wallet",
    title: "Cypher Wallet",
    description: "Next-generation quantum-resistant cryptocurrency wallet with multi-dimensional security protocols.",
    longDescription: "A cutting-edge cryptocurrency wallet implementing quantum-resistant cryptography, multi-signature support, and advanced security features. Supports over 100 cryptocurrencies with seamless cross-chain transactions and DeFi integration.",
    category: "Blockchain",
    tech: ["Solidity", "Web3.js", "React", "Rust", "Quantum Crypto", "MetaMask", "Hardhat"],
    github: "https://github.com/Kartikvyas1604/Cypher-wallet",
    demo: "https://cypher-wallet.vercel.app",
    featured: true,
    status: "completed",
    stats: { stars: 289, forks: 67, views: 8900, commits: 456 },
    color: { primary: "#4ecdc4", secondary: "#06b6d4", accent: "#22d3ee" },
    icon: Wallet,
    achievements: ["$2M+ Secured", "10K+ Users", "Security Audited"],
    timeline: "8 months",
    team: 4
  },
  {
    id: "rugguard",
    title: "RUGGUARD",
    description: "Advanced AI-powered smart contract security scanner with machine learning threat detection.",
    longDescription: "State-of-the-art blockchain security platform utilizing machine learning algorithms to detect vulnerabilities, rug pulls, and malicious smart contracts. Provides real-time threat assessment and automated security reports.",
    category: "Security",
    tech: ["Python", "TensorFlow", "Solidity", "FastAPI", "Redis", "PostgreSQL", "Docker"],
    github: "https://github.com/Kartikvyas1604/RUGGUARD",
    demo: "https://rugguard.vercel.app",
    featured: true,
    status: "completed",
    stats: { stars: 356, forks: 89, views: 12500, commits: 523 },
    color: { primary: "#ff6b6b", secondary: "#f87171", accent: "#fca5a5" },
    icon: Shield,
    achievements: ["500+ Vulnerabilities Found", "Featured on CoinDesk", "Y Combinator Alumni"],
    timeline: "10 months",
    team: 5
  },
  {
    id: "neural-commerce",
    title: "Neural Commerce AI",
    description: "Immersive e-commerce platform with AR/VR integration and neural recommendation engine.",
    longDescription: "Revolutionary e-commerce platform combining artificial intelligence, augmented reality, and advanced analytics to create personalized shopping experiences. Features include AI-powered recommendations, virtual try-on, and predictive inventory management.",
    category: "AI/Commerce",
    tech: ["Next.js", "TensorFlow", "AR.js", "Three.js", "Stripe", "PostgreSQL", "Redis"],
    github: "https://github.com/Kartikvyas1604/Neural-Commerce",
    demo: "https://neural-commerce.vercel.app",
    featured: false,
    status: "in-progress",
    stats: { stars: 178, forks: 43, views: 6200, commits: 321 },
    color: { primary: "#ffe66d", secondary: "#fbbf24", accent: "#fcd34d" },
    icon: Bot,
    achievements: ["95% Accuracy Rate", "30% Higher Conversions", "AI Excellence Award"],
    timeline: "12 months",
    team: 6
  },
  {
    id: "quantum-chat",
    title: "Quantum Chat",
    description: "End-to-end encrypted messaging platform with quantum key distribution technology.",
    longDescription: "Ultra-secure messaging platform implementing quantum cryptography principles for unbreakable encryption. Features include quantum key distribution, perfect forward secrecy, and military-grade security protocols.",
    category: "Security",
    tech: ["React", "Node.js", "Quantum Cryptography", "WebRTC", "Socket.io", "MongoDB"],
    github: "https://github.com/Kartikvyas1604/Quantum-Chat",
    demo: "https://quantum-chat.vercel.app",
    featured: false,
    status: "completed",
    stats: { stars: 234, forks: 56, views: 7800, commits: 287 },
    color: { primary: "#8b5cf6", secondary: "#a855f7", accent: "#c084fc" },
    icon: Zap,
    achievements: ["NSA-Level Security", "Zero Data Breaches", "Crypto Community Choice"],
    timeline: "5 months",
    team: 3
  },
  {
    id: "cloud-native-platform",
    title: "Cloud Native Platform",
    description: "Scalable microservices platform with automated CI/CD and infrastructure as code.",
    longDescription: "Enterprise-grade cloud-native platform designed for scalability, reliability, and performance. Features automated deployment pipelines, service mesh architecture, and comprehensive observability tools.",
    category: "Cloud/DevOps",
    tech: ["Kubernetes", "Go", "Terraform", "Istio", "Prometheus", "Grafana", "AWS", "Docker"],
    github: "https://github.com/Kartikvyas1604/Cloud-Native-Platform",
    featured: false,
    status: "planning",
    stats: { stars: 89, forks: 21, views: 3400, commits: 156 },
    color: { primary: "#10b981", secondary: "#059669", accent: "#34d399" },
    icon: Globe,
    achievements: ["99.99% Availability", "50% Faster Deployments", "Enterprise Ready"],
    timeline: "9 months",
    team: 8
  }
]

const categories = [
  { name: "All Projects", id: "all", icon: Sparkles, color: "#ffffff", count: projects.length },
  { name: "DevOps", id: "DevOps", icon: Server, color: "#00d4ff", count: projects.filter(p => p.category === "DevOps").length },
  { name: "Blockchain", id: "Blockchain", icon: Database, color: "#4ecdc4", count: projects.filter(p => p.category === "Blockchain").length },
  { name: "Security", id: "Security", icon: Shield, color: "#ff6b6b", count: projects.filter(p => p.category === "Security").length },
  { name: "AI/Commerce", id: "AI/Commerce", icon: Bot, color: "#ffe66d", count: projects.filter(p => p.category === "AI/Commerce").length },
  { name: "Cloud/DevOps", id: "Cloud/DevOps", icon: Globe, color: "#10b981", count: projects.filter(p => p.category === "Cloud/DevOps").length }
]

const sortOptions = [
  { value: "featured", label: "Featured First" },
  { value: "stars", label: "Most Stars" },
  { value: "recent", label: "Most Recent" },
  { value: "name", label: "Alphabetical" }
]

export function EpicProjects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentShowcase, setCurrentShowcase] = useState(0)

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesCategory = selectedCategory === "all" || project.category === selectedCategory
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesCategory && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "featured":
          return b.featured ? 1 : a.featured ? -1 : 0
        case "stars":
          return b.stats.stars - a.stats.stars
        case "recent":
          return b.stats.commits - a.stats.commits
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const featuredProjects = projects.filter(p => p.featured)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".projects-section", { opacity: 0, y: 100 })
      gsap.set(".project-card", { opacity: 0, scale: 0.8, rotationY: -30 })
      gsap.set(".filter-item", { opacity: 0, x: -50 })
      gsap.set(".showcase-item", { opacity: 0, scale: 0.9 })

      // Section entrance
      ScrollTrigger.batch(".projects-section", {
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

      // Filter items animation
      gsap.to(".filter-item", {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
      })

      // Project cards animation
      ScrollTrigger.batch(".project-card", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
          })
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0.6,
            scale: 0.95,
            duration: 0.3
          })
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.5
          })
        }
      })

      // Showcase animation
      gsap.to(".showcase-item", {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1
      })

      // Continuous floating animations
      gsap.to(".floating-project", {
        y: -10,
        rotationX: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [filteredProjects])

  // Auto-showcase rotation
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentShowcase((prev) => (prev + 1) % featuredProjects.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay, featuredProjects.length])

  // Handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    
    // Animate project cards out and in
    gsap.to(".project-card", {
      opacity: 0,
      scale: 0.8,
      rotationY: 15,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.fromTo(".project-card", 
          {
            opacity: 0,
            scale: 0.8,
            rotationY: -15
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.2,
            ease: "power3.out"
          }
        )
      }
    })
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.08) 0%, transparent 60%),
          radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 70%),
          linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #020617 100%)
        `
      }}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4ff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float-pattern 20s ease-in-out infinite'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="projects-section text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-blue-400/30 bg-blue-400/10 backdrop-blur-sm mb-6">
              <Rocket className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-mono text-sm tracking-wide">
                PROJECT_SHOWCASE.LOAD()
              </span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #00d4ff 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-wave 4s ease-in-out infinite'
              }}
            >
              Featured
            </span>
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #4ecdc4 50%, #ffe66d 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-wave 5s ease-in-out infinite reverse'
              }}
            >
              Projects
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Explore my portfolio of 
            <span className="text-cyan-400 font-semibold mx-2">cutting-edge projects</span>
            spanning DevOps, blockchain, AI, and more. Each project represents innovation,
            <span className="text-purple-400 font-semibold mx-2">technical excellence</span>,
            and real-world impact.
          </p>
        </div>

        {/* Featured Projects Showcase */}
        <div className="projects-section mb-20">
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                Featured Showcase
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="text-sm">{autoPlay ? 'Pause' : 'Play'}</span>
                </button>
                <div className="flex gap-2">
                  {featuredProjects.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentShowcase(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentShowcase === index
                          ? 'bg-cyan-400 w-6'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="showcase-item relative overflow-hidden rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
              {featuredProjects.length > 0 && (
                <div 
                  className="p-8 lg:p-12"
                  style={{
                    background: `linear-gradient(135deg, ${featuredProjects[currentShowcase].color.primary}05, ${featuredProjects[currentShowcase].color.secondary}05)`
                  }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    
                    {/* Project Info */}
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        {(() => {
                          const IconComponent = featuredProjects[currentShowcase].icon
                          return <IconComponent 
                            className="w-10 h-10" 
                            style={{ color: featuredProjects[currentShowcase].color.primary }}
                          />
                        })()}
                        <Badge
                          variant="secondary"
                          className="text-sm"
                          style={{
                            background: `${featuredProjects[currentShowcase].color.primary}20`,
                            color: featuredProjects[currentShowcase].color.primary
                          }}
                        >
                          {featuredProjects[currentShowcase].category}
                        </Badge>
                      </div>

                      <h3 className="text-4xl font-bold text-white mb-4">
                        {featuredProjects[currentShowcase].title}
                      </h3>
                      
                      <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                        {featuredProjects[currentShowcase].longDescription}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-3">Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {featuredProjects[currentShowcase].tech.map((tech) => (
                            <Badge
                              key={tech}
                              variant="outline"
                              className="text-sm border-slate-600 text-slate-300"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-4">
                        <Button
                          className="group"
                          style={{
                            background: `linear-gradient(135deg, ${featuredProjects[currentShowcase].color.primary}, ${featuredProjects[currentShowcase].color.secondary})`
                          }}
                          asChild
                        >
                          <a href={featuredProjects[currentShowcase].demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                            Live Demo
                          </a>
                        </Button>
                        
                        <Button
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-800"
                          asChild
                        >
                          <a href={featuredProjects[currentShowcase].github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Stats & Achievements */}
                    <div className="space-y-8">
                      
                      {/* Project Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Star, label: "Stars", value: featuredProjects[currentShowcase].stats.stars },
                          { icon: GitBranch, label: "Forks", value: featuredProjects[currentShowcase].stats.forks },
                          { icon: Eye, label: "Views", value: featuredProjects[currentShowcase].stats.views },
                          { icon: Code, label: "Commits", value: featuredProjects[currentShowcase].stats.commits }
                        ].map((stat, index) => (
                          <div 
                            key={index}
                            className="p-4 rounded-xl border border-slate-700/50 bg-slate-800/50 backdrop-blur-sm text-center"
                          >
                            <stat.icon 
                              className="w-6 h-6 mx-auto mb-2" 
                              style={{ color: featuredProjects[currentShowcase].color.primary }}
                            />
                            <div className="text-2xl font-bold text-white">
                              {stat.value.toLocaleString()}
                            </div>
                            <div className="text-sm text-slate-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-yellow-400" />
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {featuredProjects[currentShowcase].achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-green-400 rounded-full" />
                              <span className="text-slate-300">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Project Meta */}
                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Timeline: {featuredProjects[currentShowcase].timeline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Team: {featuredProjects[currentShowcase].team} members</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="projects-section mb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Categories */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`filter-item group relative px-6 py-3 rounded-xl font-medium transition-all duration-500 backdrop-blur-sm border ${
                      selectedCategory === category.id
                        ? "border-cyan-400/50 bg-cyan-400/20 scale-105"
                        : "border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50 hover:scale-102"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon 
                        className="w-5 h-5 transition-colors duration-300" 
                        style={{
                          color: selectedCategory === category.id ? category.color : '#94a3b8'
                        }}
                      />
                      <span 
                        className="transition-colors duration-300"
                        style={{
                          color: selectedCategory === category.id ? category.color : '#cbd5e1'
                        }}
                      >
                        {category.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs ml-1"
                        style={{
                          background: selectedCategory === category.id ? `${category.color}20` : '#374151',
                          color: selectedCategory === category.id ? category.color : '#9ca3af'
                        }}
                      >
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Search & Controls */}
            <div className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400"
                />
              </div>

              {/* View Controls */}
              <div className="flex items-center justify-between gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-600/50 text-white text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex rounded-lg border border-slate-600/50 bg-slate-800/50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-l-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-cyan-400/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-r-lg transition-colors ${
                      viewMode === 'list' ? 'bg-cyan-400/20 text-cyan-400' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid/List */}
        <div className="projects-section">
          <div className={`${
            viewMode === 'grid' 
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
              : 'space-y-6'
          }`}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card floating-project group cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center gap-6 p-6' : 'block'
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => setSelectedProject(project)}
              >
                <div 
                  className={`relative overflow-hidden backdrop-blur-sm border transition-all duration-500 group-hover:scale-105 ${
                    viewMode === 'list' ? 'rounded-xl flex-1' : 'rounded-2xl h-full'
                  }`}
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        ${project.color.primary}08 0%, 
                        rgba(30, 41, 59, 0.8) 50%, 
                        ${project.color.secondary}08 100%
                      )
                    `,
                    borderColor: hoveredProject === project.id ? `${project.color.primary}60` : '#374151',
                    boxShadow: hoveredProject === project.id ? `0 0 40px ${project.color.primary}30` : 'none'
                  }}
                >
                  
                  {/* Project Header */}
                  {viewMode === 'grid' && (
                    <div className="relative h-48 overflow-hidden">
                      
                      {/* Background Pattern */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `
                            radial-gradient(circle at 30% 30%, ${project.color.primary}40 0%, transparent 50%),
                            radial-gradient(circle at 70% 70%, ${project.color.secondary}40 0%, transparent 50%)
                          `
                        }}
                      />

                      {/* Project Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div 
                          className="relative p-6 rounded-2xl border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12"
                          style={{
                            background: `linear-gradient(135deg, ${project.color.primary}20, ${project.color.secondary}20)`,
                            borderColor: `${project.color.primary}40`,
                            boxShadow: `0 0 30px ${project.color.primary}30`
                          }}
                        >
                          <project.icon 
                            className="w-12 h-12"
                            style={{ color: project.color.primary }}
                          />
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge 
                          className={`px-3 py-1 text-xs font-medium border backdrop-blur-sm ${
                            project.status === 'completed' 
                              ? 'bg-green-400/20 border-green-400/40 text-green-400'
                              : project.status === 'in-progress'
                              ? 'bg-yellow-400/20 border-yellow-400/40 text-yellow-400'
                              : 'bg-blue-400/20 border-blue-400/40 text-blue-400'
                          }`}
                        >
                          {project.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      {/* Hover Actions */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Button>
                        
                        {project.demo && (
                          <Button
                            size="sm"
                            className="backdrop-blur-sm"
                            style={{
                              background: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})`
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className={`${viewMode === 'grid' ? 'p-6' : 'flex-1'}`}>
                    
                    {/* List View Icon */}
                    {viewMode === 'list' && (
                      <div className="flex items-center gap-4 mr-6">
                        <div 
                          className="p-4 rounded-xl border"
                          style={{
                            background: `${project.color.primary}20`,
                            borderColor: `${project.color.primary}40`
                          }}
                        >
                          <project.icon 
                            className="w-8 h-8"
                            style={{ color: project.color.primary }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-slate-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" style={{ color: project.color.primary }} />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitBranch className="w-4 h-4" style={{ color: project.color.secondary }} />
                        <span>{project.stats.forks}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" style={{ color: project.color.accent }} />
                        <span>{project.stats.views}</span>
                      </div>
                      {project.featured && (
                        <Badge variant="secondary" className="text-xs bg-yellow-400/20 text-yellow-400">
                          Featured
                        </Badge>
                      )}
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-3 mb-4">
                      <h3 
                        className="text-xl font-bold transition-colors duration-300"
                        style={{
                          color: hoveredProject === project.id ? project.color.primary : '#ffffff'
                        }}
                      >
                        {project.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, viewMode === 'list' ? 4 : 6).map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1"
                          style={{
                            background: `${project.color.primary}15`,
                            borderColor: `${project.color.primary}30`,
                            color: '#cbd5e1'
                          }}
                        >
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > (viewMode === 'list' ? 4 : 6) && (
                        <Badge variant="secondary" className="text-xs">
                          +{project.tech.length - (viewMode === 'list' ? 4 : 6)} more
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs border-slate-600/50 text-slate-300 hover:border-slate-500/50"
                      >
                        <Code className="w-3 h-3 mr-2" />
                        View Code
                      </Button>
                      
                      {project.demo && (
                        <Button
                          size="sm"
                          className="flex-1 text-xs"
                          style={{
                            background: `linear-gradient(135deg, ${project.color.primary}, ${project.color.secondary})`
                          }}
                        >
                          <Globe className="w-3 h-3 mr-2" />
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Scanning Effect */}
                  <div 
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      style={{
                        animation: hoveredProject === project.id ? 'scan-project 2s ease-in-out infinite' : 'none',
                        transform: 'translateX(-100%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No projects found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your search terms or category filter
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("all")
                }}
                className="bg-gradient-to-r from-cyan-400 to-purple-400"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="projects-section text-center mt-20">
          <div 
            className="inline-block p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(59, 130, 246, 0.1) 0%, 
                  rgba(30, 41, 59, 0.8) 50%, 
                  rgba(139, 92, 246, 0.1) 100%
                )
              `
            }}
          >
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Want to see more?
            </h3>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Check out my complete portfolio on GitHub for all projects, experiments, and contributions.
            </p>
            <Button
              size="lg"
              className="group px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-400 to-purple-400 hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href="https://github.com/Kartikvyas1604" target="_blank" rel="noopener noreferrer">
                <Github className="w-6 h-6 mr-3 group-hover:animate-spin" />
                View GitHub Profile
                <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Dynamic Styles */}
      <style>{`
        @keyframes gradient-wave {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float-pattern {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes scan-project {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}