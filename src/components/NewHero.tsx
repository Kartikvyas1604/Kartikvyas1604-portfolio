import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Download, Github, Linkedin, Mail, MapPin, Code2, Database, Cloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import avatarImg from "@/assets/avatar.jpg"

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced entrance animations
      gsap.set(".hero-content > *", { y: 60, opacity: 0 })
      gsap.set(".hero-image", { scale: 0.8, opacity: 0 })
      
      const tl = gsap.timeline()
      
      tl.to(".hero-content > *", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
      })
      .to(".hero-image", {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")

      // Floating animation for profile image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Scroll parallax
      gsap.to(".hero-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="hero-bg absolute inset-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-800/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100/20 to-indigo-100/20 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 pt-20 md:pt-0">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Content */}
          <div className="hero-content space-y-6 md:space-y-8 text-center lg:text-left">
            
            {/* Status Badge */}
            <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Available for opportunities
            </Badge>

            {/* Main Heading */}
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="text-slate-900 dark:text-white">Hi, I'm </span>
                <span className="text-blue-600 dark:text-blue-400">Kartik Vyas</span>
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-slate-700 dark:text-slate-300">
                Full Stack Developer & Blockchain Engineer
              </h2>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed px-2 lg:px-0">
              Passionate about building innovative web applications and blockchain solutions. 
              Specialized in modern JavaScript frameworks, smart contract development, and scalable cloud architectures.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Frontend</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
                <Database className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Backend</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
                <Cloud className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Blockchain</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start px-4 lg:px-0">
              <Button 
                size="default"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <a href="#projects">
                  <Code2 className="w-4 h-4 mr-2" />
                  View My Work
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="default"
                className="border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 w-full sm:w-auto"
                asChild
              >
                <a href="https://drive.google.com/uc?export=download&id=1uXK69tJRSrsZDC4sq6viDhkSmLChdIJY" download>
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Contact Links */}
            <div className="flex gap-3 md:gap-4 justify-center lg:justify-start">
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 md:w-12 md:h-12 p-0 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                asChild
              >
                <a
                  href="https://github.com/Kartikvyas1604"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 md:w-12 md:h-12 p-0 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/kartik-vyas-7183b8238"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="w-10 h-10 md:w-12 md:h-12 p-0 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                asChild
              >
                <a href="mailto:kartikvyas1604@gmail.com" aria-label="Send Email">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              </Button>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 justify-center lg:justify-start text-slate-600 dark:text-slate-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Available Worldwide (Remote)</span>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div 
              ref={imageRef}
              className="hero-image relative group"
            >
              {/* Main Image */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
                <div className="absolute inset-2 bg-white rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={avatarImg}
                    alt="Kartik Vyas"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                
                {/* Floating Elements - Hidden on mobile */}
                <div className="hidden md:block absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-bounce delay-1000"></div>
                <div className="hidden md:block absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full animate-bounce delay-2000"></div>
                <div className="hidden md:block absolute top-1/2 -right-8 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-400 dark:border-slate-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 dark:bg-slate-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}