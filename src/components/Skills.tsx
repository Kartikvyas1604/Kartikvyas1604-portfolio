import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "Java", "Solidity", "Rust"],
    icon: "💻"
  },
  {
    title: "Frameworks/Libraries",
    skills: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Anchor"],
    icon: "⚛️"
  },
  {
    title: "Blockchain",
    skills: ["EVM", "Solana", "SVM", "Arweave", "Web3.js", "Ethers.js"],
    icon: "⛓️"
  },
  {
    title: "Infrastructure/Platforms",
    skills: ["Supabase", "Firebase", "GitHub", "Vercel", "AWS", "Docker"],
    icon: "☁️"
  },
  {
    title: "Tools",
    skills: ["Git", "Figma", "VS Code", "Postman", "Jest", "Hardhat"],
    icon: "🛠️"
  }
]

export function Skills() {
  const skillsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        ".skill-category",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, skillsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-section-bg">
      <div className="container px-4 mx-auto">
        <h2 className="skills-title text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Skills & Technologies
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className="skill-category glass rounded-xl p-6 hover-lift"
            >
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill}
                    className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium text-center hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}