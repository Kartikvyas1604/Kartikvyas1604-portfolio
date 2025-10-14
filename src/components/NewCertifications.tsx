import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import s7BadgeImg from "@/assets/S7-graduate-badge.png"

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  {
    id: 1,
    title: "School of Solana by Ackee",
    issuer: "Ackee Blockchain Security",
    description: "Comprehensive blockchain development program focusing on Solana ecosystem, smart contracts, and DeFi protocols. Graduated in the top 13% of applicants.",
    date: "2024",
    credentialId: "4DtQ8GDwyPv8EdunScXoRLevFMM5RUKQmSz3FwuU3EHt33v6ToafyiMf5YNmoTT31Af5m654kwwa1Y7GG5qQX7M6",
    skills: ["Solana Development", "Rust Programming", "Smart Contracts", "DeFi Protocols", "Anchor Framework"],
    featured: true,
    image: s7BadgeImg,
    verificationUrl: "https://explorer.solana.com/tx/4DtQ8GDwyPv8EdunScXoRLevFMM5RUKQmSz3FwuU3EHt33v6ToafyiMf5YNmoTT31Af5m654kwwa1Y7GG5qQX7M6"
  },
  {
    id: 2,
    title: "Full Stack Web Development",
    issuer: "Self-Taught & Project-Based",
    description: "Comprehensive understanding of modern web development through building 25+ real-world projects and continuous learning.",
    date: "2021 - Present",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Database Design"],
    featured: false,
    verificationUrl: "https://github.com/Kartikvyas1604"
  },
  {
    id: 3,
    title: "Blockchain Development Specialization",
    issuer: "Practical Experience",
    description: "Hands-on experience building DeFi applications, smart contracts, and blockchain solutions across multiple networks.",
    date: "2022 - Present",
    skills: ["Ethereum", "Solana", "Smart Contracts", "Web3 Integration", "DApp Development"],
    featured: false,
    verificationUrl: "https://github.com/Kartikvyas1604"
  }
]

const achievements = [
  { label: "Certified Projects", value: "25+", icon: CheckCircle },
  { label: "Technologies Mastered", value: "30+", icon: Award },
  { label: "Years Learning", value: "3+", icon: Calendar }
]

export function Certifications() {
  const certificationsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        ".certifications-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: certificationsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Cards animation
      gsap.fromTo(
        ".certification-card",
        { y: 80, opacity: 0, rotationY: 10 },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".certifications-grid",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Achievement stats animation
      gsap.fromTo(
        ".achievement-stat",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".achievements-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

    }, certificationsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="certifications" 
      ref={certificationsRef} 
      className="py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        
        {/* Header */}
        <div className="certifications-title text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Certifications & Learning
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Continuous learning and professional development through formal education, 
            self-study, and hands-on project experience.
          </p>
        </div>

        {/* Achievement Stats */}
        <div className="achievements-grid grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-stat text-center">
              <achievement.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {achievement.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid space-y-8">
          {certifications.map((cert, index) => (
            <Card 
              key={cert.id}
              className={`certification-card group relative overflow-hidden border-0 shadow-lg bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm hover:shadow-xl transition-all duration-500 ${
                cert.featured ? 'ring-2 ring-blue-500/20' : ''
              }`}
            >
              {/* Featured Badge */}
              {cert.featured && (
                <div className="absolute top-6 right-6 z-10">
                  <Badge className="bg-blue-600 text-white">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-8 p-8">
                
                {/* Content */}
                <div className="space-y-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-2xl text-slate-900 dark:text-white mb-2">
                      {cert.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{cert.date}</span>
                      <span className="mx-2">•</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {cert.issuer}
                      </span>
                    </div>
                  </CardHeader>

                  <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                    {cert.description}
                  </CardDescription>

                  {/* Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, skillIndex) => (
                        <Badge 
                          key={skillIndex} 
                          variant="secondary" 
                          className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Credential ID for featured cert */}
                  {cert.credentialId && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                        Credential ID
                      </h4>
                      <code className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded break-all">
                        {cert.credentialId}
                      </code>
                    </div>
                  )}

                  <Button
                    variant="outline"
                    className="border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                    asChild
                  >
                    <a 
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Verify Certificate
                    </a>
                  </Button>
                </div>

                {/* Certificate Image */}
                {cert.image && (
                  <div className="flex justify-center items-center">
                    <div className="relative group-hover:scale-105 transition-transform duration-500">
                      <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl bg-white">
                        <img 
                          src={cert.image} 
                          alt={`${cert.title} Certificate`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-xl -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                )}

                {/* Placeholder for non-image certificates */}
                {!cert.image && (
                  <div className="flex justify-center items-center">
                    <div className="w-80 h-80 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl flex items-center justify-center border-2 border-blue-200 dark:border-blue-800">
                      <div className="text-center">
                        <Award className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                        <div className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                          {cert.title}
                        </div>
                        <div className="text-sm text-blue-600 dark:text-blue-400">
                          {cert.issuer}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="certifications-title text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Always Learning, Always Growing
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            I believe in continuous learning and staying updated with the latest technologies. 
            Currently exploring advanced AI/ML concepts and emerging blockchain technologies.
          </p>
        </div>
      </div>
    </section>
  )
}