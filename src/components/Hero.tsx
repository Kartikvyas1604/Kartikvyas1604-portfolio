import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, Github, Linkedin, Code, Sparkles, Zap, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"

import { SplineWrapper } from "./SplineWrapper"
import avatarImg from "@/assets/avatar.jpg"
import realImg from "@/assets/real.jpg"

gsap.registerPlugin(ScrollTrigger)

// Twitter/X icon component since it's not in lucide-react
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Floating tech icons component
const FloatingTechIcons = () => {
  const iconRefs = useRef<HTMLDivElement[]>([])
  
  useEffect(() => {
    iconRefs.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: -20,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2
        })
        
        gsap.to(icon, {
          rotation: 360,
          duration: 8 + index * 2,
          repeat: -1,
          ease: "none"
        })
      }
    })
  }, [])

  const techIcons = [
    { icon: Code, color: "text-blue-400", position: "top-1/4 left-16" },
    { icon: Sparkles, color: "text-purple-400", position: "top-1/3 right-20" },
    { icon: Zap, color: "text-yellow-400", position: "bottom-1/3 left-12" },
    { icon: Trophy, color: "text-green-400", position: "bottom-1/4 right-16" }
  ]

  return (
    <>
      {techIcons.map((tech, index) => (
        <div
          key={index}
          ref={(el) => el && (iconRefs.current[index] = el)}
          className={`absolute ${tech.position} opacity-20 hidden lg:block`}
        >
          <tech.icon className={`h-12 w-12 ${tech.color}`} />
        </div>
      ))}
    </>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const splineRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [currentText, setCurrentText] = useState(0)
  const [showSpline, setShowSpline] = useState(true)
  const [splineLoaded, setSplineLoaded] = useState(false)

  const techStack = [
    "Full Stack Developer",
    "Blockchain Engineer", 
    "AI/ML Enthusiast",
    "Game Developer",
    "DeFi Builder"
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % techStack.length)
    }, 3000)

    return () => clearInterval(textInterval)
  }, [techStack.length])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Advanced hero animations
      gsap.set(".hero-text", { y: 100, opacity: 0 })
      gsap.set(".hero-image", { scale: 0.5, opacity: 0, rotation: -15 })
      gsap.set(".hero-button", { y: 50, opacity: 0 })
      gsap.set(".hero-stats", { x: -50, opacity: 0 })
      gsap.set(".floating-orb", { scale: 0, opacity: 0 })

      const tl = gsap.timeline()
      
      tl.to(".hero-text", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out"
      })
      .to(".hero-image", {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
      }, "-=0.8")
      .to(".hero-button", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6")
      .to(".hero-stats", {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4")
      .to(".floating-orb", {
        scale: 1,
        opacity: 0.6,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out"
      }, "-=0.5")

      // Continuous floating animation for image
      gsap.to(imageRef.current, {
        y: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(".hero-bg", { y: progress * 200, duration: 0.3 })
          gsap.to(".floating-orb", { 
            y: progress * 100, 
            rotation: progress * 180,
            duration: 0.3 
          })
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Clean Professional Background */}
      <div className="hero-bg absolute inset-0 bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-32 left-32 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-slate-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      <FloatingTechIcons />
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Enhanced Text content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="hero-text text-5xl md:text-7xl font-black leading-tight">
                Hey, I'm{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  Kartik Vyas
                </span>
              </h1>
              
              <div className="hero-text relative h-16 md:h-20 flex items-center justify-center lg:justify-start">
                <h2 className="text-2xl md:text-4xl font-bold text-slate-300">
                  {techStack.map((text, index) => (
                    <span
                      key={index}
                      className={`absolute inset-0 transition-all duration-1000 ${
                        index === currentText 
                          ? "opacity-100 transform translate-y-0" 
                          : "opacity-0 transform translate-y-4"
                      }`}
                    >
                      {text}
                    </span>
                  ))}
                </h2>
              </div>
            </div>

            <p className="hero-text text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Passionate developer crafting innovative solutions at the intersection of{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">Web3</span>,{" "}
              <span className="text-slate-700 dark:text-slate-200 font-semibold">AI</span>, and{" "}
              <span className="text-blue-700 dark:text-blue-300 font-semibold">cutting-edge tech</span>.
              Building the future, one line of code at a time.
            </p>

            {/* Stats */}
            <div className="hero-stats grid grid-cols-3 gap-8 py-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-slate-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">3+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
              <div className="hero-button flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-blue-500/25 text-white font-semibold px-8 py-4 text-lg"
                  asChild
                >
                  <a href="https://drive.google.com/uc?export=download&id=1fiJEIgaxR-oRDYSiFS20vcCvkfvfQL5l" download>

                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </a>
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 dark:border-slate-600 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 text-slate-700 dark:text-slate-200 font-semibold px-8 py-4 text-lg"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Let's Connect
                </Button>
              </div>
            </div>

            {/* Enhanced Social Media Icons */}
            <div className="hero-button flex gap-4 justify-center lg:justify-start pt-4">
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300"
                asChild
              >
                <a
                  href="https://github.com/Kartikvyas1604"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-6 w-6 text-white" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/kartik-vyas-7183b8238"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-6 w-6 text-white" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="w-14 h-14 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-sm hover:scale-110 transition-all duration-300"
                asChild
              >
                <a
                  href="https://x.com/0xKartikvyas"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter Profile"
                >
                  <TwitterIcon className="h-6 w-6 text-white" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Right side - Enhanced Profile with 3D */}
          <div className="flex justify-center lg:justify-end relative">
            {/* Spline 3D Background */}
            <div 
              ref={splineRef}
              className="absolute inset-0 w-full h-full opacity-30"
              style={{ zIndex: 1 }}
            >
              <SplineWrapper 
                scene="https://prod.spline.design/6Ej1mL8GMZyYd8O8/scene.splinecode"
                onLoad={() => {
                  console.log('3D model loaded successfully')
                  setSplineLoaded(true)
                }}
                onError={() => {
                  console.warn('3D model failed to load, showing fallback animation')
                  setShowSpline(false)
                  setSplineLoaded(true) // Stop loading state
                }}
              />
            </div>
            
            <div
              ref={imageRef}
              className="hero-image relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden group cursor-pointer"
              style={{ zIndex: 2 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Professional border */}
              <div className="absolute inset-0 rounded-full bg-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900" />
              </div>
              
              {/* Image container */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img
                  src={avatarImg}
                  alt="Kartik Vyas - Avatar"
                  className={`absolute w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
                  }`}
                />
                <img
                  src={realImg}
                  alt="Kartik Vyas - Real"
                  className={`absolute w-full h-full object-cover transition-all duration-700 ${
                    isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
                  }`}
                />
              </div>
              
              {/* Hover effects */}
              <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}