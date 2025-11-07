import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useAdvancedScrollAnimations() {
  useEffect(() => {
    // Smooth scrolling setup
    gsap.registerPlugin(ScrollTrigger)

    // Create a master timeline
    const masterTl = gsap.timeline()

    // Parallax background elements
    gsap.utils.toArray('.parallax-bg').forEach((element: Element) => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      })
    })

    // Section reveal animations with stagger
    gsap.utils.toArray('section').forEach((section: Element, index) => {
      const isEven = index % 2 === 0
      
      gsap.fromTo(section, {
        opacity: 0,
        y: 100,
        scale: 0.95,
        rotationX: isEven ? 5 : -5,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Add morphing effect to section backgrounds
            const bgElement = section.querySelector('.section-bg')
            if (bgElement) {
              gsap.to(bgElement, {
                scale: 1.05,
                duration: 0.6,
                ease: "power2.out"
              })
            }
          },
          onLeave: () => {
            const bgElement = section.querySelector('.section-bg')
            if (bgElement) {
              gsap.to(bgElement, {
                scale: 1,
                duration: 0.6,
                ease: "power2.out"
              })
            }
          }
        }
      })
    })

    // Text reveal animations with typewriter effect
    gsap.utils.toArray('.text-reveal').forEach((text: Element) => {
      const htmlElement = text as HTMLElement
      if (htmlElement.textContent) {
        const chars = htmlElement.textContent.split('')
        htmlElement.innerHTML = chars.map((char: string) => 
          `<span class="char" style="opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('')

        gsap.to(htmlElement.querySelectorAll('.char'), {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: "power2.out",
          scrollTrigger: {
            trigger: text,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        })
      }
    })

    // Card animations with 3D transforms
    gsap.utils.toArray('.animated-card').forEach((card: Element, index) => {
      const isEven = index % 2 === 0
      
      gsap.fromTo(card, {
        opacity: 0,
        y: 60,
        rotationY: isEven ? -15 : 15,
        rotationX: 10,
        scale: 0.9
      }, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })

      // Hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          rotationY: isEven ? 5 : -5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // Magnetic cursor effect for buttons
    gsap.utils.toArray('.magnetic-btn').forEach((btn: Element) => {
      btn.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent
        const rect = btn.getBoundingClientRect()
        const x = mouseEvent.clientX - rect.left - rect.width / 2
        const y = mouseEvent.clientY - rect.top - rect.height / 2
        
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        })
      })
    })

    // Progress bar animations
    gsap.utils.toArray('.progress-bar').forEach((bar: Element) => {
      const htmlElement = bar as HTMLElement
      const progress = htmlElement.dataset.progress || '0'
      
      gsap.fromTo(bar, {
        width: '0%'
      }, {
        width: `${progress}%`,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Number counter animations
    gsap.utils.toArray('.counter').forEach((counter: Element) => {
      const htmlElement = counter as HTMLElement
      const target = parseInt(htmlElement.dataset.target || '0')
      const duration = parseFloat(htmlElement.dataset.duration || '2')
      
      gsap.fromTo(counter, {
        innerText: '0'
      }, {
        innerText: target.toString(),
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        onUpdate: function() {
          if (htmlElement.innerText) {
            htmlElement.innerText = Math.ceil(parseFloat(htmlElement.innerText)).toString()
          }
        }
      })
    })

    // Image reveal with clip-path
    gsap.utils.toArray('.image-reveal').forEach((img: Element) => {
      gsap.fromTo(img, {
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        scale: 1.2
      }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Badge/pill animations with bounce
    gsap.utils.toArray('.animated-badge').forEach((badge: Element, index) => {
      gsap.fromTo(badge, {
        opacity: 0,
        scale: 0,
        rotation: Math.random() * 360
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: badge,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      })
    })

    // Floating animation for decorative elements
    gsap.utils.toArray('.floating-element').forEach((element: Element, index) => {
      gsap.to(element, {
        y: -20,
        rotation: 360,
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    })

    // Page transitions
    const pageTransition = gsap.timeline({ paused: true })
    pageTransition.to('.page-transition', {
      x: '100%',
      duration: 0.8,
      ease: "power3.inOut"
    })

    // Scroll-triggered color changes
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const progress = self.progress
        const hue = Math.floor(progress * 60 + 200) // Blue to purple range
        document.documentElement.style.setProperty('--scroll-hue', hue.toString())
      }
    })

    // Mouse follower effect
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    document.addEventListener('mousemove', handleMouseMove)

    gsap.utils.toArray('.mouse-follower').forEach((follower: Element) => {
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    // Add animation classes to elements
    const addClassesToElements = (selector: string, className: string) => {
      document.querySelectorAll(selector).forEach(element => {
        element.classList.add(className)
      })
    }

    // Add classes to various elements
    addClassesToElements('h1, h2, h3', 'text-reveal')
    addClassesToElements('.card, .certification-card, .skill-category, .stat-card', 'animated-card')
    addClassesToElements('button', 'magnetic-btn')
    addClassesToElements('.badge', 'animated-badge')
    addClassesToElements('img', 'image-reveal')

    // Add perspective to containers
    document.querySelectorAll('.container').forEach(container => {
      const htmlElement = container as HTMLElement
      htmlElement.style.perspective = '1000px'
    })

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      gsap.killTweensOf('*')
    }
  }, [])
}