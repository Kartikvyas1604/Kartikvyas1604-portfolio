import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Terminal } from "lucide-react"

const projects = [
  {
    title: "NeuraOS",
    description: "Web-based OS with AI integration & blockchain wallet.",
    tech: ["React", "TypeScript", "Supabase", "AI"],
    github: "https://github.com/Kartikvyas1604/NeuraOS",
    demo: "https://neura-os.vercel.app/",
    stats: "⭐ 15+",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    title: "DEX 2.0",
    description: "Advanced Solana DEX with Token-2022 features.",
    tech: ["Solana", "Rust", "React Native"],
    github: "https://github.com/Kartikvyas1604/dex2_0",
    demo: "https://dex2-demo.vercel.app/",
    stats: "💰 $2M+ TVL",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    title: "Fit-Pro",
    description: "AI-powered personalized fitness application.",
    tech: ["React", "Firebase", "OpenAI"],
    github: "https://github.com/Kartikvyas1604/Fitpro",
    demo: "https://fitpro-six.vercel.app/",
    stats: "👤 5K+ Users",
    color: "bg-green-500/10 text-green-500"
  },
  {
    title: "Scroll Fund",
    description: "Decentralized crowdfunding on Scroll L2.",
    tech: ["Scroll L2", "Solidity", "React"],
    github: "https://github.com/Kartikvyas1604/Scroll-Fund",
    demo: "https://scrollfund.vercel.app/",
    stats: "💸 $100K+",
    color: "bg-orange-500/10 text-orange-500"
  },
  {
    title: "Blitzy App",
    description: "Real-time social media with crypto rewards.",
    tech: ["MERN Stack", "Socket.io"],
    github: "https://github.com/Kartikvyas1604/Blitzy-App",
    demo: "https://blitzy-demo.vercel.app/",
    stats: "💬 1M+ Msgs",
    color: "bg-yellow-500/10 text-yellow-500"
  },
  {
    title: "PhantomPool",
    description: "DeFi liquidity management & analytics.",
    tech: ["Solana", "Python", "React"],
    github: "https://github.com/Kartikvyas1604/PhantomPool",
    demo: "https://phantompool.vercel.app/",
    stats: "💧 $5M+ Liq",
    color: "bg-cyan-500/10 text-cyan-500"
  },
  {
    title: "OpsFlow Guardian",
    description: "DevOps monitoring with AI anomaly detection.",
    tech: ["Python", "K8s", "Prometheus"],
    github: "https://github.com/Kartikvyas1604/opsflow-guardian",
    demo: "https://opsflow-demo.vercel.app/",
    stats: "⏱️ 99.99% Uptime",
    color: "bg-red-500/10 text-red-500"
  },
  {
    title: "C.Y.P.H.E.R",
    description: "Advanced cybersecurity toolkit & scanner.",
    tech: ["Python", "C++", "Cryptography"],
    github: "https://github.com/Kartikvyas1604/C.Y.P.H.E.R",
    demo: "https://cypher-security.vercel.app/",
    stats: "🛡️ A+ Security",
    color: "bg-slate-500/10 text-slate-500"
  },
  {
    title: "Solana NFT Market",
    description: "High-speed NFT marketplace with instant minting.",
    tech: ["Solana", "Metaplex", "Next.js"],
    github: "https://github.com/Kartikvyas1604",
    demo: "#",
    stats: "🖼️ 10K+ NFTs",
    color: "bg-pink-500/10 text-pink-500"
  }
]

export function BentoGridProjects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Selected Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A collection of projects exploring the boundaries of Web3, AI, and modern web development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="group hover:border-primary/50 transition-colors duration-300 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className={`p-2 rounded-md ${project.color} w-fit`}>
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs font-normal">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {project.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
