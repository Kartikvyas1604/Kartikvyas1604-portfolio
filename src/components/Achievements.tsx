import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, Award, Star, ExternalLink, Calendar, Users, Code, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    id: 1,
    title: "Solana Season 7 Graduate",
    description: "Successfully completed the prestigious Solana Season 7 program, mastering advanced blockchain development, smart contracts, and DeFi protocols on Solana.",
    date: "2024",
    category: "Blockchain",
    icon: "🚀",
    nftSignature: "4DtQ8GDwyPv8EdunScXoRLevFMM5RUKQmSz3FwuU3EHt33v6ToafyiMf5YNmoTT31Af5m654kwwa1Y7GG5qQX7M6",
    featured: true,
    color: "from-purple-500 to-blue-500",
    stats: { participants: "Only 100 selected globally", completion: "Top 10%", projects: "8 built" }
  },
  {
    id: 2,
    title: "GitHub Arctic Code Vault Contributor",
    description: "Contributed to open-source projects that were archived in the GitHub Arctic Code Vault for 1,000 years.",
    date: "2023",
    category: "Open Source",
    icon: "❄️",
    featured: false,
    color: "from-blue-500 to-cyan-500",
    stats: { repositories: "10+ preserved", impact: "Global", duration: "1000 years" }
  },
  {
    id: 3,
    title: "100+ Projects Built",
    description: "Successfully designed, developed, and deployed over 100 projects spanning web development, blockchain, AI, and mobile applications.",
    date: "2021-2024",
    category: "Development",
    icon: "💻",
    featured: true,
    color: "from-green-500 to-emerald-500",
    stats: { projects: "100+", technologies: "50+", users: "10K+ served" }
  },
  {
    id: 4,
    title: "DeFi Protocol Builder",
    description: "Built multiple DeFi protocols handling millions in transaction volume with advanced features like yield farming, liquidity pools, and governance tokens.",
    date: "2023-2024",
    category: "DeFi",
    icon: "🏦",
    featured: true,
    color: "from-yellow-500 to-orange-500",
    stats: { tvl: "$5M+ handled", protocols: "5 built", users: "1K+ active" }
  },
  {
    id: 5,
    title: "AI/ML Innovation Award",
    description: "Recognized for innovative applications of artificial intelligence and machine learning in real-world problem solving.",
    date: "2024",
    category: "AI/ML",
    icon: "🧠",
    featured: false,
    color: "from-pink-500 to-rose-500",
    stats: { models: "15+ trained", accuracy: "95%+ avg", applications: "Healthcare, Finance, Education" }
  },
  {
    id: 6,
    title: "Full-Stack Mastery",
    description: "Achieved mastery in full-stack development with expertise in modern frameworks, cloud technologies, and DevOps practices.",
    date: "2022-2024",
    category: "Web Development",
    icon: "🌐",
    featured: false,
    color: "from-indigo-500 to-purple-500",
    stats: { frameworks: "20+", cloud: "AWS, GCP, Azure", deployment: "Docker, K8s" }
  }
]

export function Achievements() {
  const achievementsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".achievements-title",
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards animation
      gsap.fromTo(
        ".achievement-card",
        { y: 100, opacity: 0, rotationY: 15 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1,
          ease: "power3.out",
          stagger: {
            amount: 0.6,
            from: "start"
          },
          scrollTrigger: {
            trigger: ".achievements-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // NFT card special animation
      gsap.fromTo(
        ".nft-card",
        { scale: 0.8, opacity: 0, rotation: -5 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          scrollTrigger: {
            trigger: ".nft-card",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, achievementsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="achievements" 
      ref={achievementsRef} 
      className="py-32 bg-gradient-to-b from-background/50 to-background relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="achievements-title space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-yellow-400" />
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Achievements
              </h2>
              <Award className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Milestones and recognitions that mark my journey in technology, innovation, and community impact.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid space-y-8">
          {/* Featured NFT Achievement */}
          <div className="nft-card mb-12">
            <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 backdrop-blur-md">
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 p-[2px] rounded-lg">
                <div className="w-full h-full bg-black/90 rounded-lg" />
              </div>
              
              <div className="relative z-10 p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="text-6xl">🚀</div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">
                          Solana Season 7 Graduate
                        </h3>
                        <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                          <Star className="mr-1 h-3 w-3" />
                          Elite Program
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-300 leading-relaxed">
                      Successfully completed the prestigious Solana Season 7 program, mastering advanced blockchain development, 
                      smart contracts, and DeFi protocols. One of only 100 developers selected globally.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(achievements[0].stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                          <div className="text-sm text-purple-300 font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="border-purple-400/50 hover:border-purple-400 hover:bg-purple-500/10 text-purple-300 hover:text-purple-200"
                      asChild
                    >
                      <a 
                        href={`https://explorer.solana.com/tx/${achievements[0].nftSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View NFT Certificate
                      </a>
                    </Button>
                  </div>

                  {/* NFT Display */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 rounded-2xl p-1 animate-spin-slow">
                        <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                          <div className="text-center text-white">
                            <div className="text-6xl mb-4">🏆</div>
                            <div className="text-lg font-bold">Solana S7</div>
                            <div className="text-sm text-slate-400">Graduate NFT</div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Other Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.slice(1).map((achievement, index) => (
              <Card 
                key={achievement.id}
                className={`achievement-card group relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md hover:from-white/10 hover:to-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                  achievement.featured ? 'ring-2 ring-yellow-400/30' : ''
                }`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Featured badge */}
                {achievement.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold">
                      <Trophy className="mr-1 h-3 w-3" />
                      Featured
                    </Badge>
                  </div>
                )}

                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                      {achievement.title}
                    </CardTitle>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {achievement.date}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4">
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </CardDescription>

                  {/* Achievement Stats */}
                  <div className="space-y-2">
                    {Object.entries(achievement.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 capitalize">{key}:</span>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Hover border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="achievements-title">
            <p className="text-lg text-muted-foreground mb-6">
              Want to build something amazing together?
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              <Zap className="mr-2 h-5 w-5" />
              Let's Collaborate
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}