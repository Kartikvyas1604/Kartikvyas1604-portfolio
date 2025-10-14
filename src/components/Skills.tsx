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
      { name: "JavaScript", level: 95, color: "text-blue-600", experience: "4+ years" },
      { name: "TypeScript", level: 90, color: "text-blue-700", experience: "3+ years" },
      { name: "Python", level: 88, color: "text-slate-600", experience: "3+ years" },
      { name: "Rust", level: 82, color: "text-slate-700", experience: "2+ years" },
      { name: "Solidity", level: 85, color: "text-blue-800", experience: "2+ years" },
      { name: "C#", level: 75, color: "text-slate-800", experience: "2+ years" }
    ],
    icon: Code,
    description: "Mastery in modern programming languages for diverse applications"
  },
  {
    title: "Frontend & Frameworks",
    skills: [
      { name: "React", level: 95, color: "text-blue-600", experience: "4+ years" },
      { name: "Next.js", level: 90, color: "text-slate-700", experience: "3+ years" },
      { name: "React Native", level: 85, color: "text-blue-700", experience: "2+ years" },
      { name: "Vue.js", level: 80, color: "text-slate-600", experience: "2+ years" },
      { name: "Three.js", level: 75, color: "text-blue-800", experience: "1+ years" },
      { name: "GSAP", level: 85, color: "text-slate-800", experience: "2+ years" }
    ],
    icon: Sparkles,
    description: "Modern frontend technologies and animation libraries"
  },
  {
    title: "Blockchain & Web3",
    skills: [
      { name: "Solana", level: 92, color: "text-blue-600", experience: "2+ years" },
      { name: "Ethereum", level: 88, color: "text-blue-700", experience: "3+ years" },
      { name: "Web3.js", level: 90, color: "text-slate-600", experience: "3+ years" },
      { name: "Anchor", level: 85, color: "text-slate-700", experience: "2+ years" },
      { name: "Smart Contracts", level: 87, color: "text-blue-800", experience: "2+ years" },
      { name: "DeFi Protocols", level: 83, color: "text-slate-800", experience: "2+ years" }
    ],
    icon: Zap,
    description: "Cutting-edge blockchain development and DeFi expertise"
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Node.js", level: 92, color: "text-blue-600", experience: "4+ years" },
      { name: "Express.js", level: 90, color: "text-slate-700", experience: "4+ years" },
      { name: "FastAPI", level: 85, color: "text-blue-700", experience: "2+ years" },
      { name: "PostgreSQL", level: 88, color: "text-slate-600", experience: "3+ years" },
      { name: "MongoDB", level: 85, color: "text-blue-800", experience: "3+ years" },
      { name: "Supabase", level: 90, color: "text-slate-800", experience: "2+ years" }
    ],
    icon: Database,
    description: "Robust backend systems and database management"
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 82, color: "text-blue-600", experience: "2+ years" },
      { name: "Docker", level: 85, color: "text-blue-700", experience: "3+ years" },
      { name: "Kubernetes", level: 75, color: "text-slate-600", experience: "1+ years" },
      { name: "Vercel", level: 90, color: "text-slate-700", experience: "3+ years" },
      { name: "GitHub Actions", level: 80, color: "text-blue-800", experience: "2+ years" },
      { name: "Redis", level: 78, color: "text-slate-800", experience: "2+ years" }
    ],
    icon: Cloud,
    description: "Scalable cloud infrastructure and deployment automation"
  },
  {
    title: "AI/ML & Game Development",
    skills: [
      { name: "TensorFlow", level: 80, color: "text-blue-600", experience: "2+ years" },
      { name: "PyTorch", level: 75, color: "text-slate-700", experience: "1+ years" },
      { name: "OpenAI API", level: 88, color: "text-blue-700", experience: "2+ years" },
      { name: "Unity", level: 78, color: "text-slate-600", experience: "2+ years" },
      { name: "Blender", level: 70, color: "text-blue-800", experience: "1+ years" },
      { name: "Machine Learning", level: 82, color: "text-slate-800", experience: "2+ years" }
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
      // Professional title animation
      gsap.fromTo(
        ".skills-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Staggered category animations
      gsap.fromTo(
        ".skill-category",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
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
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.03,
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
    <section id="skills" ref={skillsRef} className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="skills-title space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
              Skills & Technologies
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4 md:px-0">
              A comprehensive overview of technologies and frameworks I work with, 
              developed through hands-on experience and continuous learning.
            </p>
          </div>
        </div>
        
        {/* Professional Skills Grid */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="skill-category group border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <CardHeader className="text-center pb-3 md:pb-4">
                  <div className="flex justify-center mb-3 md:mb-4">
                    <div className="p-2 md:p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors duration-300">
                      <IconComponent className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {category.title}
                  </CardTitle>
                  <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-2 md:space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skill.name}
                      className="skill-item space-y-1 md:space-y-2 p-2 md:p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-slate-900 dark:text-white font-medium text-xs md:text-sm">{skill.name}</span>
                        <Badge 
                          variant="outline" 
                          className="text-xs border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs"
                        >
                          {skill.experience}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500 dark:text-slate-400">Proficiency</span>
                          <span className="text-slate-900 dark:text-white font-semibold">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={hoveredCategory === categoryIndex ? skill.level : 0} 
                          className="h-1.5 md:h-2"
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Skills Summary */}
        <div className="skills-title mt-12 md:mt-16 text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="text-center p-3 md:p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">50+</div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Technologies Mastered</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">4+</div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">35+</div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Projects Completed</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg backdrop-blur-sm">
              <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 md:mb-2">∞</div>
              <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">Learning Mindset</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}