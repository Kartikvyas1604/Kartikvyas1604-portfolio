import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import codingImg from "@/assets/coding.jpg"

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const aboutRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-image",
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".about-text",
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, aboutRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={aboutRef} className="py-20 bg-section-bg">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="about-image">
            <img
              src={codingImg}
              alt="Kartik coding"
              className="w-full max-w-4xl h-auto rounded-xl shadow-xl object-cover hover-lift"
            />
          </div>

          {/* Right side - Text content */}
          <div className="space-y-6">
            <h2 className="about-text text-3xl md:text-4xl font-bold gradient-text">
              About Me
            </h2>
            
            <div className="about-text space-y-4 text-lg text-muted-foreground">
              <p>
                I'm <strong className="text-foreground">Kartik Vyas</strong>, a passionate full stack & blockchain developer 
                who loves solving complex problems and building innovative digital experiences.
              </p>
              
              <p>
                I specialize in scalable applications using <strong className="text-foreground">JavaScript, TypeScript, Python, 
                Solidity, and Rust</strong>. I've worked with React, Next.js, Node.js, Firebase, Supabase, 
                and built dApps using EVM, Solana, Arweave, and SVM.
              </p>
              
              <p>
                Beyond code, I explore new tech, contribute to open-source, and share knowledge 
                in dev communities. I'm always excited to take on new challenges and learn 
                cutting-edge technologies.
              </p>
            </div>

            <div className="about-text flex flex-wrap gap-3">
              {["Problem Solver", "Tech Enthusiast", "Open Source Contributor", "Community Builder"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}