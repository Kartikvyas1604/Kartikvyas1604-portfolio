import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useMegaAnimations() {
  useEffect(() => {
    // Create floating elements
    const createFloatingElements = () => {
      const container = document.body
      const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981']
      
      for (let i = 0; i < 10; i++) {
        const element = document.createElement('div')
        element.className = 'fixed pointer-events-none z-[9999] w-2 h-2 rounded-full opacity-30'
        element.style.background = colors[Math.floor(Math.random() * colors.length)]
        element.style.left = Math.random() * 100 + 'vw'
        element.style.top = Math.random() * 100 + 'vh'
        
        container.appendChild(element)
        
        gsap.to(element, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2
        })
        
        // Remove after 30 seconds to prevent memory leaks
        setTimeout(() => {
          container.removeChild(element)
        }, 30000)
      }
    }

    // Mega scroll timeline
    const megaTl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          
          // Dynamic background color shift
          const colors = [
            { r: 2, g: 6, b: 23 },      // slate-950
            { r: 15, g: 23, b: 42 },    // slate-800
            { r: 2, g: 6, b: 23 },      // back to slate-950
          ]
          
          const currentColor = colors[0]
          const targetColor = colors[Math.floor(progress * (colors.length - 1)) + 1] || colors[colors.length - 1]
          
          const r = Math.round(currentColor.r + (targetColor.r - currentColor.r) * progress)
          const g = Math.round(currentColor.g + (targetColor.g - currentColor.g) * progress)
          const b = Math.round(currentColor.b + (targetColor.b - currentColor.b) * progress)
          
          document.body.style.background = `rgb(${r}, ${g}, ${b})`
        }
      }
    })

    // Section reveal animations
    gsap.utils.toArray('section').forEach((section: Element, index) => {
      const elements = section.querySelectorAll('h1, h2, h3, p, div, button')
      
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        onEnter: () => {
          gsap.fromTo(elements, 
            {
              opacity: 0,
              y: 50,
              scale: 0.95,
              filter: 'blur(10px)'
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1,
              stagger: 0.05,
              ease: 'power3.out'
            }
          )
          
          // Create floating elements on section entry
          if (index % 2 === 0) {
            createFloatingElements()
          }
        },
        onLeave: () => {
          gsap.to(elements, {
            opacity: 0.3,
            scale: 0.98,
            duration: 0.5
          })
        },
        onEnterBack: () => {
          gsap.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.5
          })
        }
      })
    })

    // Mouse tracking effects
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 50
      targetY = (e.clientY / window.innerHeight - 0.5) * 50
    }

    const animateParallax = () => {
      mouseX += (targetX - mouseX) * 0.05
      mouseY += (targetY - mouseY) * 0.05

      gsap.set('.parallax-element', {
        x: mouseX,
        y: mouseY,
      })

      gsap.set('.parallax-bg', {
        x: mouseX * 0.5,
        y: mouseY * 0.5,
      })

      requestAnimationFrame(animateParallax)
    }

    window.addEventListener('mousemove', handleMouseMove)
    animateParallax()

    // Intersection observer for advanced effects
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up')
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('h1, h2, h3').forEach(el => {
      observer.observe(el)
    })

    // Scroll progress indicator
    const progressBar = document.createElement('div')
    progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-[10000] transition-all duration-300'
    document.body.appendChild(progressBar)

    const updateProgress = () => {
      const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      progressBar.style.width = (progress * 100) + '%'
    }

    window.addEventListener('scroll', updateProgress)

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', updateProgress)
      observer.disconnect()
      if (progressBar.parentNode) {
        progressBar.parentNode.removeChild(progressBar)
      }
    }
  }, [])
}

// Additional utility for section-based mega animations
export function useSectionMegaAnimations() {
  useEffect(() => {
    const sections = document.querySelectorAll('section')
    
    sections.forEach((section, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      })

      // Dynamic section transformations
      timeline
        .from(section, {
          scale: 0.95,
          filter: 'brightness(0.7)',
          duration: 1
        })
        .to(section, {
          scale: 1,
          filter: 'brightness(1)',
          duration: 1
        })
        .to(section, {
          scale: 0.98,
          filter: 'brightness(0.8)',
          duration: 1
        })

      // Add glitch effect to every 3rd section
      if (index % 3 === 0) {
        gsap.to(section, {
          filter: 'hue-rotate(10deg)',
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          scrollTrigger: {
            trigger: section,
            start: 'center center',
            toggleActions: 'play none none reverse'
          }
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
}