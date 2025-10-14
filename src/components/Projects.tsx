import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Filter, Star, TrendingUp, Code2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "NeuraOS",
    description: "Revolutionary AI-powered web-based operating system featuring virtual desktop environment, intelligent code editor, terminal with AI assistance, and full blockchain wallet integration. A complete OS experience in your browser!",
    tech: ["React", "TypeScript", "Supabase", "GSAP", "AI Integration", "PWA", "WebRTC"],
    github: "https://github.com/Kartikvyas1604/NeuraOS",
    demo: "https://neura-os.vercel.app/",
    image: "🧠",
    featured: true,
    category: "AI/OS",
    stats: { stars: "⭐ 15+", users: "👥 1K+", commits: "📝 200+" }
  },
  {
    id: 2,
    title: "DEX 2.0",
    description: "Advanced decentralized exchange built on Solana with Token-2022 features, including confidential transfers, transfer hooks, mobile wallet integration, and comprehensive analytics dashboard.",
    tech: ["React Native", "Solana", "Rust", "Token-2022", "Anchor", "TypeScript", "Mobile Wallet Adapter"],
    github: "https://github.com/Kartikvyas1604/dex2_0",
    demo: "https://dex2-demo.vercel.app/",
    image: "🔄",
    featured: true,
    category: "DeFi/Blockchain",
    stats: { tvl: "💰 $2M+", trades: "📊 10K+", volume: "💎 $50M+" }
  },
  {
    id: 3,
    title: "Fit-Pro",
    description: "AI-powered personalized fitness application with custom workout generation, progress tracking, nutrition planning, and social features. Uses advanced ML algorithms for personalized recommendations.",
    tech: ["React", "Firebase", "OpenAI API", "Tailwind CSS", "Progressive Web App"],
    github: "https://github.com/Kartikvyas1604/Fitpro",
    demo: "https://fitpro-six.vercel.app/",
    image: "�",
    featured: true,
    category: "AI/Health",
    stats: { users: "👤 5K+", workouts: "💪 25K+", rating: "⭐ 4.8/5" }
  },
  {
    id: 4,
    title: "Scroll Fund",
    description: "Decentralized crowdfunding platform built on Scroll L2, enabling creators to receive crypto donations with built-in profile management and transparent fund tracking.",
    tech: ["React", "Scroll L2", "Ethereum", "Smart Contracts", "Web3.js", "IPFS"],
    github: "https://github.com/Kartikvyas1604/Scroll-Fund",
    demo: "https://scrollfund.vercel.app/",
    image: "💝",
    featured: false,
    category: "DeFi/Web3",
    stats: { funds: "💸 $100K+", creators: "👨‍💻 500+", backers: "🤝 2K+" }
  },
  {
    id: 5,
    title: "Blitzy App",
    description: "Next-generation social media platform with real-time messaging, content sharing, and blockchain-based reward system. Features advanced UI/UX and performance optimizations.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Redis", "Docker"],
    github: "https://github.com/Kartikvyas1604/Blitzy-App",
    demo: "https://blitzy-demo.vercel.app/",
    image: "⚡",
    featured: false,
    category: "Social/Web3",
    stats: { messages: "💬 1M+", users: "👥 10K+", uptime: "🟢 99.9%" }
  },
  {
    id: 6,
    title: "PhantomPool",
    description: "Advanced liquidity pool management system with automated strategies, yield farming optimization, and comprehensive analytics for DeFi protocols.",
    tech: ["Solana", "Anchor", "React", "Chart.js", "WebSocket", "Python"],
    github: "https://github.com/Kartikvyas1604/PhantomPool",
    demo: "https://phantompool.vercel.app/",
    image: "🌊",
    featured: false,
    category: "DeFi/Analytics",
    stats: { pools: "🏊 50+", apy: "📈 25% AVG", liquidity: "💧 $5M+" }
  },
  {
    id: 7,
    title: "OpsFlow Guardian",
    description: "Enterprise-grade DevOps monitoring and alerting system with AI-powered anomaly detection, automated incident response, and comprehensive dashboard.",
    tech: ["Python", "Docker", "Kubernetes", "Prometheus", "Grafana", "ML Models"],
    github: "https://github.com/Kartikvyas1604/opsflow-guardian",
    demo: "https://opsflow-demo.vercel.app/",
    image: "🛡️",
    featured: false,
    category: "DevOps/AI",
    stats: { uptime: "⏱️ 99.99%", alerts: "🚨 10K+", servers: "🖥️ 1K+" }
  },
  {
    id: 8,
    title: "C.Y.P.H.E.R",
    description: "Cutting-edge cybersecurity toolkit with advanced encryption, vulnerability scanning, and threat intelligence. Built for security professionals and ethical hackers.",
    tech: ["Python", "C++", "Cryptography", "Network Security", "AI/ML", "Docker"],
    github: "https://github.com/Kartikvyas1604/C.Y.P.H.E.R",
    demo: "https://cypher-security.vercel.app/",
    image: "�",
    featured: false,
    category: "Security/Tools",
    stats: { scans: "🔍 100K+", threats: "⚠️ 5K+", security: "🛡️ A+" }
  }
]

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState(6)

  const categories = ["all", "AI/OS", "DeFi/Blockchain", "AI/Health", "DeFi/Web3", "Social/Web3", "DeFi/Analytics", "DevOps/AI", "Security/Tools"]
  
  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter)

  const displayedProjects = filteredProjects.slice(0, visibleProjects)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced scroll animations
      gsap.fromTo(
        ".project-title",
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".project-filters",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".project-card",
        { y: 120, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.8,
            from: "start"
          },
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Hover animations for cards
      gsap.set(".project-card", { transformPerspective: 1000 })
      
    }, projectsRef)

    return () => ctx.revert()
  }, [displayedProjects])

  const handleFilterChange = (category: string) => {
    setFilter(category)
    setVisibleProjects(6)
    
    // Animate filter change
    gsap.to(".project-card", {
      opacity: 0,
      y: 30,
      duration: 0.3,
      stagger: 0.05,
      onComplete: () => {
        gsap.fromTo(".project-card", 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        )
      }
    })
  }

  return (
    <section id="projects" ref={projectsRef} className="py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Clean Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-32 w-80 h-80 bg-slate-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="project-title space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Code2 className="h-8 w-8 text-blue-600" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white">
                Featured Projects
              </h2>
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Showcase of innovative solutions spanning AI, blockchain, web development, and beyond. 
              Each project represents cutting-edge technology and creative problem-solving.
            </p>
          </div>

          {/* Project Stats */}
          <div className="project-title grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">100K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Lines of Code</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 dark:text-white mb-2">25+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Technologies</div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="project-filters flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(category)}
              className={`transition-all duration-300 ${
                filter === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                  : "border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm"
              }`}
            >
              <Filter className="mr-2 h-4 w-4" />
              {category === "all" ? "All Projects" : category}
            </Button>
          ))}
        </div>
        
        {/* Enhanced Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedProjects.map((project, index) => (
            <Card 
              key={project.id} 
              className={`project-card group relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md hover:from-white/10 hover:to-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                project.featured ? 'ring-2 ring-blue-400/30' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                    <Star className="mr-1 h-3 w-3" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="text-7xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">{project.category}</Badge>
                  </div>
                  <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                    {project.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-2 text-center py-3 border border-white/10 rounded-lg bg-white/5">
                  {Object.entries(project.stats).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <div className="text-white font-semibold">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 text-blue-300 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-200"
                      style={{ animationDelay: `${techIndex * 0.05}s` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group/btn"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Code
                    </a>
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group/btn"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center">
            <Button
              onClick={() => setVisibleProjects(prev => prev + 6)}
              variant="outline"
              size="lg"
              className="border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm text-white hover:scale-105 transition-all duration-300"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}