import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function WorldClassHero() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 60
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x4f46e5, // Indigo-600
      transparent: true,
      opacity: 0.8,
    })
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    // Geometric Shape (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(10, 2)
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x6366f1, // Indigo-500
      wireframe: true,
      transparent: true,
      opacity: 0.3
    })
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0

    const animateParticles = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    document.addEventListener('mousemove', animateParticles)

    // Animation Loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      sphere.rotation.y = elapsedTime * 0.1
      sphere.rotation.x = elapsedTime * 0.05

      particlesMesh.rotation.y = -elapsedTime * 0.05
      particlesMesh.rotation.x = -elapsedTime * 0.02

      if (mouseX > 0) {
        particlesMesh.rotation.x = mouseY * 0.0001
        particlesMesh.rotation.y = mouseX * 0.0001
      }

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousemove', animateParticles)
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pointer-events-auto"
        >
          <span className="inline-block px-3 py-1 mb-4 text-sm font-medium tracking-wider text-indigo-400 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20 backdrop-blur-sm">
            Available for work
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
            Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Developer</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed">
            I build immersive web experiences with cutting-edge technologies.
            Specializing in 3D interactions, modern UI/UX, and performant applications.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 h-12 text-lg group">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full px-8 h-12 text-lg">
              Contact Me
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-indigo-400 transition-colors transform hover:scale-110 duration-200">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors transform hover:scale-110 duration-200">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors transform hover:scale-110 duration-200">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
        <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-slate-500 rounded-full animate-scroll" />
        </div>
      </div>
    </div>
  )
}
