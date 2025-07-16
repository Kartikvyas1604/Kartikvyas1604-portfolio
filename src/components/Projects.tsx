import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: 1,
    title: "Fit-Pro",
    description: "A personalized fitness app that uses AI to create custom workout plans.",
    tech: ["React", "Firebase", "Tailwind CSS", "OpenAI API"],
    github: "https://github.com/Kartikvyas1604/Fitpro",
    demo: "https://fitpro-six.vercel.app/",
    image: "🏋️‍♂️"
  },
  {
    id: 2,
    title: "NeuraOS",
    description: "AI-powered web-based operating system with virtual desktop environment and integrated AI assistant.",
    tech: ["React", "TypeScript", "OpenAI API", "WebRTC", "PWA"],
    github: "https://github.com/Kartikvyas1604/NeuraOS",
    demo: "https://neura-os.vercel.app/",
    image: "🧠"
  },
  {
    id: 3,
    title: "Scroll Fund",
    description: "A onchain profile making like buy me a coffee.",
    tech: ["Scroll", "Ethereum", "EVM", "React", "WebSocket"],
    github: "https://github.com/Kartikvyas1604/Scroll-Fund",
    demo: "https://scrollfund.vercel.app/",
    image: "💰"
  }
]

export function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".project-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, projectsRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" ref={projectsRef} className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h2 className="project-title text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="project-card group hover-lift glass border-border/50">
              <CardHeader className="text-center">
                <div className="text-6xl mb-4">{project.image}</div>
                <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}