import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Code2, Briefcase, GraduationCap, Award, Users, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Code2, label: "Projects Completed", value: "35+", color: "text-blue-600" },
  { icon: Users, label: "Clients Satisfied", value: "15+", color: "text-green-600" },
  { icon: Award, label: "Certifications", value: "5+", color: "text-purple-600" },
  { icon: Globe, label: "Years Experience", value: "3+", color: "text-orange-600" }
]

const experience = [
  {
    period: "2023 - Present",
    role: "Full Stack Developer & DevOps Engineer",
    company: "Freelance",
    description: "Building modern web applications, blockchain solutions, and DevOps automation tools for clients worldwide. Specialized in security-focused development.",
    technologies: ["React", "Next.js", "Node.js", "Solana", "Docker", "Kubernetes"]
  },
  {
    period: "2022 - 2023",
    role: "Blockchain Security Developer",
    company: "Web3 Projects",
    description: "Developed DeFi protocols, security analysis tools, and decentralized applications with focus on rugpull detection and smart contract security.",
    technologies: ["Solidity", "Rust", "Anchor", "Web3.js", "Security Analysis", "Python"]
  },
  {
    period: "2021 - 2022",
    role: "Frontend Developer",
    company: "Various Projects",
    description: "Created responsive web applications with modern JavaScript frameworks.",
    technologies: ["React", "Vue.js", "JavaScript", "Tailwind CSS", "GSAP"]
  }
]

export function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stats animation
      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Experience timeline animation
      gsap.fromTo(
        ".experience-item",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Section title animation
      gsap.fromTo(
        ".about-title",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={aboutRef} 
      className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="about-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Passionate developer with expertise in modern web technologies and blockchain development.
            I create scalable solutions that bridge the gap between traditional web and decentralized systems.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="stat-card text-center border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Professional Journey
          </h3>
          
          <div className="space-y-8">
            {experience.map((exp, index) => (
              <Card key={index} className="experience-item border-l-4 border-l-blue-500 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl text-slate-900 dark:text-white">
                        {exp.role}
                      </CardTitle>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold">
                        {exp.company}
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Core Competencies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            
            <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Code2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Frontend Development
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  React, Next.js, TypeScript, Tailwind CSS, GSAP animations
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Backend & DevOps
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Node.js, Python, Docker, Kubernetes, CI/CD, Monitoring
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Blockchain Development
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Solana, Ethereum, Smart Contracts, DeFi, Multi-chain
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-red-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Security & Analysis
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  Smart Contract Auditing, Rugpull Detection, Risk Assessment
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}