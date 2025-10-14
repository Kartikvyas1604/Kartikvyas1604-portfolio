import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code, Database, Zap, Cloud, Wrench, Sparkles, Brain, Gamepad2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-yellow-600", experience: "4+ years" },
      { name: "TypeScript", level: 90, color: "from-blue-400 to-blue-600", experience: "3+ years" },
      { name: "Python", level: 88, color: "from-green-400 to-green-600", experience: "3+ years" },
      { name: "Rust", level: 82, color: "from-orange-400 to-orange-600", experience: "2+ years" },
      { name: "Solidity", level: 85, color: "from-purple-400 to-purple-600", experience: "2+ years" },
      { name: "C#", level: 75, color: "from-indigo-400 to-indigo-600", experience: "2+ years" }
    ],
    icon: Code,
    description: "Mastery in modern programming languages for diverse applications"
  },
  {
    title: "Frontend & Frameworks",
    skills: [
      { name: "React", level: 95, color: "from-cyan-400 to-cyan-600", experience: "4+ years" },
      { name: "Next.js", level: 90, color: "from-gray-700 to-gray-900", experience: "3+ years" },
      { name: "React Native", level: 85, color: "from-blue-400 to-blue-600", experience: "2+ years" },
      { name: "Vue.js", level: 80, color: "from-green-400 to-green-600", experience: "2+ years" },
      { name: "Three.js", level: 75, color: "from-purple-400 to-purple-600", experience: "1+ years" },
      { name: "GSAP", level: 85, color: "from-pink-400 to-pink-600", experience: "2+ years" }
    ],
    icon: Sparkles,
    description: "Modern frontend technologies and animation libraries"
  },
  {
    title: "Blockchain & Web3",
    skills: [
      { name: "Solana", level: 92, color: "from-purple-400 to-purple-600", experience: "2+ years" },
      { name: "Ethereum", level: 88, color: "from-blue-400 to-blue-600", experience: "3+ years" },
      { name: "Web3.js", level: 90, color: "from-orange-400 to-orange-600", experience: "3+ years" },
      { name: "Anchor", level: 85, color: "from-red-400 to-red-600", experience: "2+ years" },
      { name: "Smart Contracts", level: 87, color: "from-green-400 to-green-600", experience: "2+ years" },
      { name: "DeFi Protocols", level: 83, color: "from-yellow-400 to-yellow-600", experience: "2+ years" }
    ],
    icon: Zap,
    description: "Cutting-edge blockchain development and DeFi expertise"
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 92, color: "from-green-400 to-green-600", experience: "4+ years" },
      { name: "Express.js", level: 90, color: "from-gray-600 to-gray-800", experience: "4+ years" },
      { name: "FastAPI", level: 85, color: "from-teal-400 to-teal-600", experience: "2+ years" },
      { name: "PostgreSQL", level: 88, color: "from-blue-400 to-blue-600", experience: "3+ years" },
      { name: "MongoDB", level: 85, color: "from-green-400 to-green-600", experience: "3+ years" },
      { name: "Supabase", level: 90, color: "from-emerald-400 to-emerald-600", experience: "2+ years" }
    ],
    icon: Database,
    description: "Robust backend systems and database management"
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 82, color: "from-orange-400 to-orange-600", experience: "2+ years" },
      { name: "Docker", level: 85, color: "from-blue-400 to-blue-600", experience: "3+ years" },
      { name: "Kubernetes", level: 75, color: "from-purple-400 to-purple-600", experience: "1+ years" },
      { name: "Vercel", level: 90, color: "from-gray-700 to-gray-900", experience: "3+ years" },
      { name: "GitHub Actions", level: 80, color: "from-gray-600 to-gray-800", experience: "2+ years" },
      { name: "Redis", level: 78, color: "from-red-400 to-red-600", experience: "2+ years" }
    ],
    icon: Cloud,
    description: "Scalable cloud infrastructure and deployment automation"
  },
  {
    title: "AI/ML & Game Development",
    skills: [
      { name: "TensorFlow", level: 80, color: "from-orange-400 to-orange-600", experience: "2+ years" },
      { name: "PyTorch", level: 75, color: "from-red-400 to-red-600", experience: "1+ years" },
      { name: "OpenAI API", level: 88, color: "from-green-400 to-green-600", experience: "2+ years" },
      { name: "Unity", level: 78, color: "from-purple-400 to-purple-600", experience: "2+ years" },
      { name: "Blender", level: 70, color: "from-blue-400 to-blue-600", experience: "1+ years" },
      { name: "Machine Learning", level: 82, color: "from-pink-400 to-pink-600", experience: "2+ years" }
    ],
    icon: Brain,
    description: "Artificial intelligence and immersive game experiences"
  }
]

export function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced title animation
      gsap.fromTo(
        ".skills-title",
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Staggered category animations
      gsap.fromTo(
        ".skill-category",
        { y: 100, opacity: 0, rotationX: 15 },
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
            trigger: ".skills-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Individual skill animations
      gsap.fromTo(
        ".skill-item",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={skillsRef} className="py-32 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="skills-title space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wrench className="h-8 w-8 text-cyan-400" />
              <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
              <Gamepad2 className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive arsenal of cutting-edge technologies and frameworks, 
              honed through years of hands-on experience and continuous learning.
            </p>
          </div>
        </div>
        
        {/* Enhanced Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="skill-category group relative overflow-hidden border-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md hover:from-white/10 hover:to-white/15 transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-cyan-400" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {category.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                
                <CardContent className="relative z-10 space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="skill-item space-y-2 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium text-sm">{skill.name}</span>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-cyan-400/30 text-cyan-300"
                        >
                          {skill.experience}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Proficiency</span>
                          <span className="text-white font-semibold">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={hoveredCategory === categoryIndex ? skill.level : 0} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Hover border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400" />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Skills Summary */}
        <div className="skills-title mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Technologies Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">4+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Learning Mindset</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}