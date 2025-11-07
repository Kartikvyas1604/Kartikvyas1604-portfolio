import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const particlesRef = useRef<THREE.Points>()
  const frameIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return
    
    const mountElement = mountRef.current // Store the ref value

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = null // Transparent background
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // Transparent
    rendererRef.current = renderer

    mountElement.appendChild(renderer.domElement)

    // Create floating geometric particles
    const particleCount = 150
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)
    const velocities = new Float32Array(particleCount * 3)

    // Color palette
    const colorPalette = [
      new THREE.Color(0x3B82F6), // Blue
      new THREE.Color(0x6366F1), // Indigo
      new THREE.Color(0x8B5CF6), // Purple
      new THREE.Color(0x06B6D4), // Cyan
      new THREE.Color(0x10B981), // Emerald
    ]

    for (let i = 0; i < particleCount; i++) {
      // Random positions
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Random colors from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      // Random sizes
      sizes[i] = Math.random() * 3 + 1

      // Random velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }

    // Create particle geometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Create custom particle material
    const vertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `

    const fragmentShader = `
      varying vec3 vColor;
      
      void main() {
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        
        // Create a soft circular particle
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        
        // Add some glow effect
        alpha += 0.3 * (1.0 - smoothstep(0.0, 0.3, dist));
        
        gl_FragColor = vec4(vColor, alpha * 0.8);
      }
    `

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    // Create particles
    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    // Add some geometric shapes
    const shapes: THREE.Mesh[] = []
    
    // Create floating geometric shapes
    for (let i = 0; i < 8; i++) {
      let shapeGeometry: THREE.BufferGeometry
      
      switch (i % 4) {
        case 0:
          shapeGeometry = new THREE.OctahedronGeometry(0.5)
          break
        case 1:
          shapeGeometry = new THREE.TetrahedronGeometry(0.6)
          break
        case 2:
          shapeGeometry = new THREE.IcosahedronGeometry(0.4)
          break
        default:
          shapeGeometry = new THREE.DodecahedronGeometry(0.3)
      }

      const shapeMaterial = new THREE.MeshBasicMaterial({
        color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
        wireframe: true,
        transparent: true,
        opacity: 0.3
      })

      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      shape.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8
      )
      shape.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      )

      shapes.push(shape)
      scene.add(shape)
    }

    // Mouse interaction
    const mouse = { x: 0, y: 0 }
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Animate particles
      if (particlesRef.current) {
        const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
        
        for (let i = 0; i < particleCount; i++) {
          // Wave motion
          positions[i * 3] += Math.sin(time + i * 0.1) * 0.001
          positions[i * 3 + 1] += Math.cos(time + i * 0.1) * 0.001
          positions[i * 3 + 2] += velocities[i * 3 + 2]

          // Wrap particles around
          if (positions[i * 3 + 2] > 5) {
            positions[i * 3 + 2] = -5
          }
        }
        
        particlesRef.current.geometry.attributes.position.needsUpdate = true
        
        // Rotate particle system slightly
        particlesRef.current.rotation.y += 0.001
        particlesRef.current.rotation.x += 0.0005
      }

      // Animate geometric shapes
      shapes.forEach((shape, i) => {
        shape.rotation.x += 0.005 + i * 0.001
        shape.rotation.y += 0.003 + i * 0.0005
        shape.rotation.z += 0.007 + i * 0.0003
        
        // Float up and down
        shape.position.y += Math.sin(time + i) * 0.002
      })

      // Mouse influence on camera
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouse.x * 0.5 - cameraRef.current.position.x) * 0.02
        cameraRef.current.position.y += (mouse.y * 0.5 - cameraRef.current.position.y) * 0.02
        cameraRef.current.lookAt(0, 0, 0)
      }

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current)
      }
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current)
      }
      
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (mountElement && rendererRef.current) {
        mountElement.removeChild(rendererRef.current.domElement)
      }
      
      // Dispose of Three.js resources
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry?.dispose()
            if (object.material instanceof THREE.Material) {
              object.material.dispose()
            }
          }
        })
      }
      
      rendererRef.current?.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 opacity-60 dark:opacity-40"
      style={{ pointerEvents: 'none' }}
    />
  )
}