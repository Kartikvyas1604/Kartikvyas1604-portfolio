import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursor || !cursorDot) return

    // Hide default cursor
    document.body.style.cursor = 'none'

    let mouseX = 0
    let mouseY = 0

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursor, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.3,
        ease: "power2.out"
      })

      gsap.to(cursorDot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    const handleMouseEnter = () => {
      setIsHovering(true)
      gsap.to(cursor, {
        scale: 1.5,
        opacity: 0.8,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      setIsHovering(false)
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.6,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    const handleMouseUp = () => {
      setIsClicking(false)
      gsap.to(cursor, {
        scale: isHovering ? 1.5 : 1,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    // Event listeners
    document.addEventListener('mousemove', moveCursor)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]')
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Cleanup
    return () => {
      document.body.style.cursor = 'auto'
      document.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isHovering])

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-50 hidden md:block"
        style={{ mixBlendMode: 'difference' }}
      >
        <div className="w-full h-full border-2 border-white rounded-full opacity-60 transition-all duration-300" />
      </div>

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-50 hidden md:block"
      >
        <div className="w-full h-full bg-white rounded-full" />
      </div>
    </>
  )
}