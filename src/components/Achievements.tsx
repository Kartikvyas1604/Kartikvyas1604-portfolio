import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Trophy, Award, Star, ExternalLink, Calendar, Users, Code, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import s7BadgeImg from "@/assets/S7-graduate-badge.png"

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    id: 1,
    title: "School of Solana by Ackee",
    description: "Successfully graduated from the prestigious School of Solana by Ackee, mastering advanced blockchain development, smart contracts, and DeFi protocols on Solana.",
    date: "2024",
    category: "Blockchain",
    icon: "🎓",
    nftSignature: "4DtQ8GDwyPv8EdunScXoRLevFMM5RUKQmSz3FwuU3EHt33v6ToafyiMf5YNmoTT31Af5m654kwwa1Y7GG5qQX7M6",
    featured: true,
    color: "from-blue-600 to-blue-800",
    stats: { selectivity: "Top 13% graduated", program: "Elite Training", achievement: "Graduate Certificate" }
  },
  {
    id: 2,
    title: "GitHub Arctic Code Vault Contributor",
    description: "Contributed to open-source projects that were archived in the GitHub Arctic Code Vault for 1,000 years.",
    date: "2023",
    category: "Open Source",
    icon: "❄️",
    featured: false,
    color: "from-blue-600 to-slate-600",
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
    color: "from-blue-500 to-blue-700",
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
    color: "from-slate-600 to-slate-800",
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
    color: "from-blue-600 to-indigo-600",
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
    color: "from-slate-500 to-slate-700",
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
      {/* Clean Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-32 right-32 w-80 h-80 bg-slate-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="achievements-title space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-blue-600" />
              <h2 className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white">
                Achievements
              </h2>
              <Award className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Milestones and recognitions that mark my journey in technology, innovation, and community impact.
            </p>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid space-y-8">
          {/* Featured Achievement */}
          <div className="nft-card mb-12">
            <Card className="relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-2xl">
              <div className="relative z-10 p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="text-6xl">🎓</div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                          School of Solana by Ackee
                        </h3>
                        <Badge className="bg-blue-600 text-white">
                          <Star className="mr-1 h-3 w-3" />
                          Graduate Certificate
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Successfully graduated from the prestigious School of Solana by Ackee, mastering advanced blockchain development, 
                      smart contracts, and DeFi protocols. Achieved graduation in the top 13% of applicants.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(achievements[0].stats).map(([key, value]) => (
                        <div key={key} className="text-center p-3 bg-slate-100 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">
                          <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">{value}</div>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                      asChild
                    >
                      <a 
                        href={`https://explorer.solana.com/tx/${achievements[0].nftSignature}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Certificate on Solana
                      </a>
                    </Button>
                  </div>

                  {/* Certificate Badge Display */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white">
                        <img 
                          src={s7BadgeImg} 
                          alt="School of Solana by Ackee Graduate Certificate" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-xl -z-10" />
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
                className={`achievement-card group relative overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl ${
                  achievement.featured ? 'ring-2 ring-blue-400/30' : ''
                }`}
              >
                {/* Simple hover overlay */}
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Featured badge */}
                {achievement.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-blue-600 text-white font-semibold">
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
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                  <CardDescription className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {achievement.description}
                  </CardDescription>

                  {/* Achievement Stats */}
                  <div className="space-y-2">
                    {Object.entries(achievement.stats).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500 dark:text-slate-400 capitalize">{key}:</span>
                        <span className="text-slate-800 dark:text-white font-semibold">{value}</span>
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
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Want to build something amazing together?
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
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