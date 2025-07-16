import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Meteors } from "./Meteors"
import avatarImg from "@/assets/avatar.jpg"
import realImg from "@/assets/real.jpg"

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.fromTo(
        ".hero-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      )

      gsap.fromTo(
        ".hero-image",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "back.out(1.7)", delay: 0.3 }
      )

      gsap.fromTo(
        ".hero-button",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background to-background/80"
    >
      <Meteors number={15} />
      
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="hero-text text-4xl md:text-6xl font-bold">
              Hello, I'm{" "}
              <span className="gradient-text">Kartik Vyas</span> 👋
            </h1>
            
            <h2 className="hero-text text-xl md:text-2xl text-muted-foreground">
              Full Stack & Blockchain Developer
            </h2>
            
            <p className="hero-text text-lg text-muted-foreground max-w-2xl">
              Passionate developer who loves solving complex problems and building 
              innovative digital experiences with cutting-edge technologies.
            </p>
            
            <div className="hero-button flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-transform"
                asChild
              >
                <a href="/Kartik-Vyas-CV.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-transform"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Get In Touch
              </Button>
            </div>
          </div>

          {/* Right side - Avatar with hover effect */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="hero-image relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden group cursor-pointer hover-lift"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={avatarImg}
                alt="Kartik Vyas - Avatar"
                className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={realImg}
                alt="Kartik Vyas - Real"
                className={`absolute w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="absolute inset-0 ring-4 ring-primary/20 rounded-full group-hover:ring-primary/40 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}