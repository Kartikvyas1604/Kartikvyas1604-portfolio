import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github, Star, Calendar, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "OPS-Flow Guardian",
    description: "Advanced DevOps monitoring and automation platform with real-time system health tracking, automated deployment pipelines, and intelligent alerting systems.",
    tech: ["React", "Node.js", "Docker", "Kubernetes", "Prometheus", "TypeScript"],
    github: "https://github.com/Kartikvyas1604/OPS-Flow-Guardian",
    demo: "https://ops-flow-guardian.vercel.app/",
    featured: true,
    category: "DevOps",
    date: "2024"
  },
  {
    id: 2,
    title: "Cypher Wallet",
    description: "Secure multi-chain cryptocurrency wallet with advanced encryption, DeFi integration, and seamless cross-chain transactions.",
    tech: ["React Native", "Solana", "Ethereum", "Web3.js", "Encryption", "TypeScript"],
    github: "https://github.com/Kartikvyas1604/Cypher-wallet",
    demo: "https://cypher-wallet-demo.vercel.app/",
    featured: true,
    category: "Blockchain",
    date: "2024"
  },
  {
      id: 9,
      title: "RUGGUARD",
      description: "DeFi security analysis tool that helps users identify potential rugpull risks in cryptocurrency projects through smart contract analysis and on-chain data monitoring.",
      image: "/placeholder.svg",
      category: "Security",
      tech: ["React", "TypeScript", "Web3.js", "Solana Web3", "Chart.js"],
      github: "https://github.com/Kartikvyas1604/RUGGUARD",
      demo: "https://rugguard-demo.vercel.app",
      featured: true
    },
    {
      id: 10,
      title: "Clovia",
      description: "Web3-based social media platform where users can stake cryptocurrency on their favorite creators and earn rewards. Features creator monetization, token staking mechanisms, and decentralized social interactions.",
      image: "/placeholder.svg",
      category: "Blockchain",
      tech: ["React", "Next.js", "Solana", "Web3.js", "TypeScript", "Tailwind CSS"],
      github: "https://github.com/Kartikvyas1604/Clovia",
      demo: "https://clovia-app.vercel.app",
      featured: true
    },
    {
    id: 4,
    title: "NeuraOS",
    description: "AI-powered web-based operating system with desktop environment, code editor, terminal, and blockchain wallet integration.",
    tech: ["React", "TypeScript", "Supabase", "GSAP", "PWA"],
    github: "https://github.com/Kartikvyas1604/NeuraOS",
    demo: "https://neura-os.vercel.app/",
    featured: true,
    category: "Web App",
    date: "2024"
  },
  {
    id: 5,
    title: "DEX 2.0",
    description: "Advanced decentralized exchange on Solana with Token-2022 features, mobile wallet integration, and analytics.",
    tech: ["React Native", "Solana", "Rust", "Anchor", "TypeScript"],
    github: "https://github.com/Kartikvyas1604/dex2_0",
    demo: "https://dex2-demo.vercel.app/",
    featured: false,
    category: "Blockchain",
    date: "2024"
  },
  {
    id: 6,
    title: "Fit-Pro",
    description: "AI-powered fitness app with personalized workout generation, progress tracking, and nutrition planning.",
    tech: ["React", "Firebase", "OpenAI API", "Tailwind CSS", "PWA"],
    github: "https://github.com/Kartikvyas1604/Fitpro",
    demo: "https://fitpro-six.vercel.app/",
    featured: false,
    category: "Web App",
    date: "2024"
  },
  {
    id: 7,
    title: "Scroll Fund",
    description: "Decentralized crowdfunding platform on Scroll L2 with transparent fund tracking and creator profiles.",
    tech: ["React", "Scroll L2", "Ethereum", "Smart Contracts", "IPFS"],
    github: "https://github.com/Kartikvyas1604/Scroll-Fund",
    demo: "https://scrollfund.vercel.app/",
    featured: false,
    category: "Blockchain",
    date: "2023"
  },
  {
    id: 8,
    title: "Blitzy App",
    description: "Social media platform with real-time messaging, content sharing, and blockchain-based rewards.",
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Docker"],
    github: "https://github.com/Kartikvyas1604/Blitzy-App",
    demo: "https://blitzy-demo.vercel.app/",
    featured: false,
    category: "Web App",
    date: "2023"
  },
  {
    id: 9,
    title: "PhantomPool",
    description: "Liquidity pool management system with automated strategies and comprehensive DeFi analytics.",
    tech: ["Solana", "Anchor", "React", "Chart.js", "Python"],
    github: "https://github.com/Kartikvyas1604/PhantomPool",
    demo: "https://phantompool.vercel.app/",
    featured: false,
    category: "Blockchain",
    date: "2023"
  }
]

const categories = ["All", "DevOps", "Blockchain", "Security", "Web App"]

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState("All")
  const [visibleProjects, setVisibleProjects] = useState(6)

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter)

  const displayedProjects = filteredProjects.slice(0, visibleProjects)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(
        ".projects-title",
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

      // Project cards animation
      gsap.fromTo(
        ".project-card",
        { y: 80, opacity: 0, rotationX: 15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, projectsRef)

    return () => ctx.revert()
  }, [displayedProjects])

  const handleFilterChange = (category: string) => {
    setFilter(category)
    setVisibleProjects(6)
  }

  return (
    <section 
      id="projects" 
      ref={projectsRef} 
      className="py-16 md:py-24 bg-slate-50 dark:bg-slate-800 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-32 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        
        {/* Header */}
        <div className="projects-title text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto px-4 md:px-0">
            A showcase of innovative solutions spanning DevOps automation, blockchain security, 
            DeFi protocols, and AI-powered applications that solve real-world problems.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12 px-4 md:px-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => handleFilterChange(category)}
              size="sm"
              className={`${
                filter === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              } transition-all duration-300 text-xs md:text-sm px-2 md:px-3`}
            >
              {category} ({category === "All" ? projects.length : projects.filter(p => p.category === category).length})
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedProjects.map((project, index) => (
            <Card 
              key={project.id}
              className={`project-card group relative overflow-hidden border-0 shadow-lg bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                project.featured ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <CardHeader className="relative z-10 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      {project.date}
                      <Badge variant="outline" className="ml-2">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.description}
                </CardDescription>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge 
                      key={techIndex} 
                      variant="secondary" 
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                    asChild
                  >
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    asChild
                  >
                    <a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {visibleProjects < filteredProjects.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => setVisibleProjects(prev => prev + 3)}
              className="border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Load More Projects
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="projects-title text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Interested in working together?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            I'm always open to discussing new opportunities and exciting projects.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>
      </div>
    </section>
  )
}