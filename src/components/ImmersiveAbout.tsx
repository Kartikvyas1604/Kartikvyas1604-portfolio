import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { 
  Brain, 
  Calendar, 
  Code, 
  Database, 
  Globe, 
  Heart, 
  Lightbulb, 
  Rocket, 
  Shield, 
  Star, 
  Target, 
  Trophy, 
  User, 
  Zap,
  ChevronRight,
  Download,
  MapPin,
  Coffee,
  Music,
  Camera,
  Gamepad2,
  Book,
  Plane,
  Mountain,
  Palette,
  Cpu,
  Server,
  Cloud,
  Lock,
  Smartphone,
  Monitor,
  Settings,
  GitBranch,
  Users,
  Award,
  Activity,
  LucideIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

interface TimelineEvent {
  year: string
  title: string
  company: string
  description: string
  type: 'education' | 'work' | 'project' | 'achievement'
  color: string
  icon: LucideIcon
  skills: string[]
  impact: string
}

interface Skill {
  name: string
  category: string
  level: number
  color: string
  icon: LucideIcon
  description: string
  projects: number
}

interface PersonalityTrait {
  trait: string
  description: string
  icon: LucideIcon
  color: string
  strength: number
}

const timelineData: TimelineEvent[] = [
  {
    year: "2024",
    title: "Senior Full Stack Developer",
    company: "Tech Innovation Corp",
    description: "Leading development of cutting-edge web applications using modern technologies. Architected microservices, implemented CI/CD pipelines, and mentored junior developers.",
    type: "work",
    color: "#00d4ff",
    icon: Rocket,
    skills: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
    impact: "Increased team productivity by 40% and reduced deployment time by 60%"
  },
  {
    year: "2023",
    title: "DevOps & Cloud Architecture Mastery",
    company: "AWS Certified",
    description: "Achieved advanced certifications in cloud computing and DevOps practices. Specialized in containerization, orchestration, and automated deployment strategies.",
    type: "achievement",
    color: "#4ecdc4",
    icon: Cloud,
    skills: ["Kubernetes", "Docker", "Terraform", "AWS", "Jenkins"],
    impact: "Reduced infrastructure costs by 35% while improving scalability"
  },
  {
    year: "2022",
    title: "Blockchain Security Specialist",
    company: "CryptoSafe Solutions",
    description: "Developed advanced smart contract security scanners and auditing tools. Created automated vulnerability detection systems for DeFi protocols.",
    type: "project",
    color: "#ff6b6b",
    icon: Shield,
    skills: ["Solidity", "Python", "Security Auditing", "DeFi", "Web3"],
    impact: "Identified and prevented $2M+ in potential security vulnerabilities"
  },
  {
    year: "2021",
    title: "Computer Science Engineering",
    company: "University of Technology",
    description: "Graduated with honors, focusing on artificial intelligence, machine learning, and distributed systems. Led multiple research projects in computer vision.",
    type: "education",
    color: "#ffe66d",
    icon: Brain,
    skills: ["Machine Learning", "Python", "Computer Vision", "Algorithms"],
    impact: "Published 3 research papers in AI conferences"
  },
  {
    year: "2020",
    title: "Open Source Contributor",
    company: "Global Community",
    description: "Started contributing to major open source projects. Became a core maintainer of popular React libraries used by thousands of developers worldwide.",
    type: "achievement",
    color: "#8b5cf6",
    icon: GitBranch,
    skills: ["Open Source", "React", "JavaScript", "Community Building"],
    impact: "Contributions used by 100K+ developers globally"
  }
]

const skillCategories = [
  {
    name: "Frontend Mastery",
    icon: Monitor,
    color: "#00d4ff",
    skills: [
      { name: "React", level: 95, icon: "⚛️", projects: 45, description: "Advanced component architecture and state management" },
      { name: "Next.js", level: 92, icon: "▲", projects: 32, description: "Server-side rendering and full-stack applications" },
      { name: "TypeScript", level: 90, icon: "📘", projects: 38, description: "Type-safe JavaScript development" },
      { name: "Vue.js", level: 85, icon: "💚", projects: 28, description: "Progressive framework for modern UIs" }
    ]
  },
  {
    name: "Backend Excellence",
    icon: Server,
    color: "#4ecdc4",
    skills: [
      { name: "Node.js", level: 93, icon: "🟢", projects: 42, description: "Scalable server-side JavaScript applications" },
      { name: "Python", level: 88, icon: "🐍", projects: 35, description: "Data science, ML, and web development" },
      { name: "Go", level: 82, icon: "🔵", projects: 22, description: "High-performance concurrent applications" },
      { name: "PostgreSQL", level: 87, icon: "🐘", projects: 40, description: "Advanced database design and optimization" }
    ]
  },
  {
    name: "DevOps & Cloud",
    icon: Cloud,
    color: "#ff6b6b",
    skills: [
      { name: "AWS", level: 91, icon: "☁️", projects: 38, description: "Comprehensive cloud architecture and services" },
      { name: "Docker", level: 94, icon: "🐳", projects: 45, description: "Containerization and microservices" },
      { name: "Kubernetes", level: 86, icon: "☸️", projects: 25, description: "Container orchestration at scale" },
      { name: "Terraform", level: 83, icon: "🏗️", projects: 20, description: "Infrastructure as Code" }
    ]
  },
  {
    name: "Emerging Tech",
    icon: Zap,
    color: "#ffe66d",
    skills: [
      { name: "Machine Learning", level: 84, icon: "🧠", projects: 18, description: "AI model development and deployment" },
      { name: "Blockchain", level: 81, icon: "⛓️", projects: 15, description: "Smart contracts and DeFi protocols" },
      { name: "WebGL", level: 78, icon: "🎮", projects: 12, description: "3D graphics and interactive experiences" },
      { name: "WebRTC", level: 75, icon: "📹", projects: 10, description: "Real-time communication applications" }
    ]
  }
]

const personalityTraits: PersonalityTrait[] = [
  {
    trait: "Problem Solver",
    description: "Love tackling complex challenges with creative solutions",
    icon: Lightbulb,
    color: "#00d4ff",
    strength: 95
  },
  {
    trait: "Team Player",
    description: "Thrive in collaborative environments and mentoring others",
    icon: Users,
    color: "#4ecdc4",
    strength: 92
  },
  {
    trait: "Innovation Seeker",
    description: "Always exploring cutting-edge technologies and trends",
    icon: Rocket,
    color: "#ff6b6b",
    strength: 88
  },
  {
    trait: "Quality Focused",
    description: "Committed to writing clean, maintainable, and efficient code",
    icon: Target,
    color: "#ffe66d",
    strength: 90
  }
]

const interests = [
  { name: "Photography", icon: Camera, color: "#00d4ff" },
  { name: "Gaming", icon: Gamepad2, color: "#4ecdc4" },
  { name: "Music", icon: Music, color: "#ff6b6b" },
  { name: "Travel", icon: Plane, color: "#ffe66d" },
  { name: "Reading", icon: Book, color: "#8b5cf6" },
  { name: "Hiking", icon: Mountain, color: "#10b981" },
  { name: "Art", icon: Palette, color: "#f59e0b" },
  { name: "Coffee", icon: Coffee, color: "#84cc16" }
]

export function ImmersiveAbout() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [activeTimeline, setActiveTimeline] = useState<number>(0)
  const [activeSkillCategory, setActiveSkillCategory] = useState<number>(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'timeline' | 'skills' | 'personality'>('timeline')
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(".about-section", { opacity: 0, y: 100 })
      gsap.set(".timeline-item", { opacity: 0, x: -100, scale: 0.8 })
      gsap.set(".skill-card", { opacity: 0, y: 50, rotationY: -45 })
      gsap.set(".personality-trait", { opacity: 0, scale: 0, rotation: 180 })
      gsap.set(".interest-item", { opacity: 0, scale: 0 })
      gsap.set(".floating-element", { y: 20, opacity: 0 })

      // Main section entrance
      ScrollTrigger.batch(".about-section", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.2,
            ease: "power4.out",
            onComplete: () => setAnimationComplete(true)
          })
        }
      })

      // Timeline animation
      ScrollTrigger.batch(".timeline-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            stagger: 0.3,
            ease: "back.out(1.7)"
          })
        }
      })

      // Skills animation
      ScrollTrigger.batch(".skill-card", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out"
          })
        }
      })

      // Personality traits animation
      ScrollTrigger.batch(".personality-trait", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "elastic.out(1, 0.8)"
          })
        }
      })

      // Interests animation
      ScrollTrigger.batch(".interest-item", {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
          })
        }
      })

      // Floating elements
      gsap.to(".floating-element", {
        y: 0,
        opacity: 1,
        duration: 2,
        stagger: 0.3,
        ease: "power2.out",
        delay: 1
      })

      // Continuous animations
      gsap.to(".float-slow", {
        y: -15,
        rotation: 5,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 1
      })

      gsap.to(".pulse-glow", {
        boxShadow: "0 0 30px rgba(0, 212, 255, 0.6)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [viewMode])

  // Auto-cycle timeline
  useEffect(() => {
    if (!animationComplete) return

    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % timelineData.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [animationComplete])

  // Auto-cycle skill categories
  useEffect(() => {
    if (viewMode !== 'skills') return

    const interval = setInterval(() => {
      setActiveSkillCategory((prev) => (prev + 1) % skillCategories.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [viewMode])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, rgba(0, 212, 255, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse at bottom, rgba(139, 92, 246, 0.08) 0%, transparent 70%),
          radial-gradient(circle at center, rgba(255, 107, 107, 0.05) 0%, transparent 80%),
          linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e1b4b 50%, #0f172a 75%, #020617 100%)
        `
      }}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'grid-float 20s ease-in-out infinite'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="about-section text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-400/30 bg-purple-400/10 backdrop-blur-sm mb-6">
              <User className="w-5 h-5 text-purple-400" />
              <span className="text-purple-300 font-mono text-sm tracking-wide">
                ABOUT_ME.EXECUTE()
              </span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #00d4ff 50%, #4ecdc4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-flow 4s ease-in-out infinite'
              }}
            >
              Journey
            </span>
            <span 
              className="block"
              style={{
                background: 'linear-gradient(135deg, #ff6b6b 0%, #ffe66d 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 200%',
                animation: 'gradient-flow 5s ease-in-out infinite reverse'
              }}
            >
              & Vision
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Passionate about creating digital experiences that 
            <span className="text-cyan-400 font-semibold mx-2">inspire and innovate</span>. 
            My journey spans across cutting-edge technologies, from
            <span className="text-purple-400 font-semibold mx-2">full-stack development</span>
            to emerging tech frontiers.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="about-section flex justify-center mb-16">
          <div className="inline-flex rounded-2xl border border-slate-600/50 bg-slate-800/50 backdrop-blur-sm p-2">
            {[
              { mode: 'timeline', label: 'Journey', icon: Calendar },
              { mode: 'skills', label: 'Skills', icon: Code },
              { mode: 'personality', label: 'Personality', icon: Heart }
            ].map(({ mode, label, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as 'timeline' | 'skills' | 'personality')}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  viewMode === mode
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="about-section">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Timeline Navigation */}
              <div className="space-y-6">
                {timelineData.map((event, index) => (
                  <div
                    key={index}
                    className={`timeline-item cursor-pointer transition-all duration-500 ${
                      activeTimeline === index ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setActiveTimeline(index)}
                  >
                    <div 
                      className="p-6 rounded-2xl border backdrop-blur-sm"
                      style={{
                        background: activeTimeline === index 
                          ? `linear-gradient(135deg, ${event.color}15, rgba(30, 41, 59, 0.8))`
                          : 'rgba(30, 41, 59, 0.6)',
                        borderColor: activeTimeline === index ? `${event.color}60` : '#374151',
                        boxShadow: activeTimeline === index ? `0 0 40px ${event.color}30` : 'none'
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="p-3 rounded-xl"
                          style={{
                            background: `${event.color}20`,
                            border: `1px solid ${event.color}40`
                          }}
                        >
                          <event.icon className="w-6 h-6" style={{ color: event.color }} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge
                              variant="secondary"
                              className="text-xs"
                              style={{
                                background: `${event.color}20`,
                                color: event.color
                              }}
                            >
                              {event.year}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-600"
                            >
                              {event.type}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-bold text-white mb-1">
                            {event.title}
                          </h3>
                          <p className="text-sm text-slate-400 mb-2">
                            {event.company}
                          </p>
                          
                          {activeTimeline === index && (
                            <div className="mt-4 space-y-3 animate-fade-in">
                              <p className="text-slate-300 text-sm leading-relaxed">
                                {event.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {event.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                              <div 
                                className="text-xs font-medium"
                                style={{ color: event.color }}
                              >
                                💡 {event.impact}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Details */}
              <div className="floating-element float-slow">
                <div 
                  className="sticky top-8 p-8 rounded-3xl border backdrop-blur-sm"
                  style={{
                    background: `linear-gradient(135deg, ${timelineData[activeTimeline].color}10, rgba(30, 41, 59, 0.8))`,
                    borderColor: `${timelineData[activeTimeline].color}30`,
                    boxShadow: `0 0 50px ${timelineData[activeTimeline].color}20`
                  }}
                >
                  <div className="text-center mb-8">
                    <div 
                      className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                      style={{
                        background: `${timelineData[activeTimeline].color}20`,
                        border: `2px solid ${timelineData[activeTimeline].color}40`
                      }}
                    >
                      {(() => {
                        const IconComponent = timelineData[activeTimeline].icon
                        return <IconComponent 
                          className="w-10 h-10" 
                          style={{ color: timelineData[activeTimeline].color }}
                        />
                      })()}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {timelineData[activeTimeline].title}
                    </h3>
                    <p className="text-slate-400">
                      {timelineData[activeTimeline].company} • {timelineData[activeTimeline].year}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                      <p className="text-slate-300 leading-relaxed">
                        {timelineData[activeTimeline].description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Key Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {timelineData[activeTimeline].skills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="text-sm"
                            style={{
                              background: `${timelineData[activeTimeline].color}15`,
                              color: timelineData[activeTimeline].color
                            }}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Impact</h4>
                      <div 
                        className="p-4 rounded-xl border"
                        style={{
                          background: `${timelineData[activeTimeline].color}10`,
                          borderColor: `${timelineData[activeTimeline].color}30`
                        }}
                      >
                        <p className="text-slate-300 text-sm">
                          {timelineData[activeTimeline].impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills View */}
        {viewMode === 'skills' && (
          <div className="about-section">
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {skillCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSkillCategory(index)}
                    className={`skill-card cursor-pointer transition-all duration-500 transform ${
                      activeSkillCategory === index
                        ? 'scale-105 ring-2 ring-opacity-50'
                        : 'hover:scale-102'
                    }`}
                    style={{
                      background: activeSkillCategory === index 
                        ? `linear-gradient(135deg, ${category.color}15, rgba(30, 41, 59, 0.8))`
                        : 'rgba(30, 41, 59, 0.6)',
                      borderColor: activeSkillCategory === index ? `${category.color}60` : '#374151',
                      '--tw-ring-color': activeSkillCategory === index ? `${category.color}40` : 'transparent'
                    } as React.CSSProperties}
                  >
                    <div className="p-6">
                    <category.icon 
                      className="w-8 h-8 mx-auto mb-3" 
                      style={{ color: category.color }}
                    />
                    <h3 className="text-lg font-bold text-white text-center">
                      {category.name}
                    </h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Category Skills */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillCategories[activeSkillCategory].skills.map((skill, index) => (
                  <div
                    key={index}
                    className="skill-card group"
                    onMouseEnter={() => setHoveredSkill(`${activeSkillCategory}-${index}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div 
                      className="p-6 rounded-2xl border backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
                      style={{
                        background: `${skillCategories[activeSkillCategory].color}08`,
                        borderColor: hoveredSkill === `${activeSkillCategory}-${index}` 
                          ? `${skillCategories[activeSkillCategory].color}60` 
                          : '#374151'
                      }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-3xl">{skill.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">
                            {skill.name}
                          </h4>
                          <p className="text-slate-400 text-sm mb-3">
                            {skill.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-slate-300">
                              {skill.projects} projects
                            </span>
                            <span 
                              className="font-semibold"
                              style={{ color: skillCategories[activeSkillCategory].color }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Skill Progress */}
                      <div className="relative h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, ${skillCategories[activeSkillCategory].color}, ${skillCategories[activeSkillCategory].color}80)`,
                            boxShadow: hoveredSkill === `${activeSkillCategory}-${index}` 
                              ? `0 0 20px ${skillCategories[activeSkillCategory].color}60` 
                              : 'none'
                          }}
                        />
                        
                        {/* Animated particles on hover */}
                        {hoveredSkill === `${activeSkillCategory}-${index}` && (
                          <div className="absolute inset-0 overflow-hidden">
                            {Array.from({ length: 8 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                                style={{
                                  left: `${Math.random() * skill.level}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 1}s`
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Personality View */}
        {viewMode === 'personality' && (
          <div className="about-section">
            <div className="grid lg:grid-cols-2 gap-16">
              
              {/* Personality Traits */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-8">Personality Traits</h3>
                
                <div className="grid gap-6">
                  {personalityTraits.map((trait, index) => (
                    <div key={index} className="personality-trait">
                      <div 
                        className="p-6 rounded-2xl border backdrop-blur-sm pulse-glow"
                        style={{
                          background: `${trait.color}08`,
                          borderColor: `${trait.color}30`
                        }}
                      >
                        <div className="flex items-start gap-4 mb-4">
                          <div 
                            className="p-3 rounded-xl"
                            style={{
                              background: `${trait.color}20`,
                              border: `1px solid ${trait.color}40`
                            }}
                          >
                            <trait.icon className="w-6 h-6" style={{ color: trait.color }} />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-2">
                              {trait.trait}
                            </h4>
                            <p className="text-slate-400 text-sm">
                              {trait.description}
                            </p>
                          </div>
                        </div>

                        {/* Strength indicator */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-400">Strength:</span>
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-1000"
                              style={{
                                width: `${trait.strength}%`,
                                background: `linear-gradient(90deg, ${trait.color}, ${trait.color}80)`
                              }}
                            />
                          </div>
                          <span 
                            className="text-sm font-semibold"
                            style={{ color: trait.color }}
                          >
                            {trait.strength}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interests & Hobbies */}
              <div className="floating-element">
                <h3 className="text-3xl font-bold text-white mb-8">Interests & Hobbies</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {interests.map((interest, index) => (
                    <div key={index} className="interest-item">
                      <div 
                        className="group p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-110 cursor-pointer"
                        style={{
                          background: `${interest.color}08`,
                          borderColor: `${interest.color}30`
                        }}
                      >
                        <interest.icon 
                          className="w-8 h-8 mx-auto mb-3 group-hover:animate-bounce" 
                          style={{ color: interest.color }}
                        />
                        <p className="text-center text-white font-medium">
                          {interest.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Personal Quote */}
                <div className="p-8 rounded-3xl border border-slate-600/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm text-center">
                  <div className="text-4xl mb-4">💭</div>
                  <blockquote className="text-xl text-slate-300 italic mb-4">
                    "Code is like humor. When you have to explain it, it's bad."
                  </blockquote>
                  <p className="text-slate-400">- Cory House</p>
                </div>

                {/* Download CV */}
                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    className="group px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-500 transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #00d4ff)',
                      boxShadow: '0 20px 40px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                    Download Resume
                    <ChevronRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dynamic Styles */}
      <style>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes grid-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(0) translateX(10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        
        @keyframes animate-fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: animate-fade-in 0.5s ease-out;
        }
      `}</style>
    </section>
  )
}