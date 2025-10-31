import { useState, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { X, Minus, Square, Terminal as TerminalIcon, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface TerminalProps {
  isOpen: boolean
  onClose: () => void
}

export function Terminal({ isOpen, onClose }: TerminalProps) {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>(["Welcome to Kartik's Terminal! Type 'help' for available commands."])
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Typing animation function
  const typeText = async (lines: string[], delay = 30) => {
    setIsTyping(true)
    
    for (const line of lines) {
      if (line === "") {
        setOutput(prev => [...prev, ""])
        await new Promise(resolve => setTimeout(resolve, 100))
        continue
      }
      
      let currentText = ""
      for (let i = 0; i <= line.length; i++) {
        currentText = line.substring(0, i)
        setOutput(prev => {
          const newOutput = [...prev]
          newOutput[newOutput.length - 1] = currentText
          return newOutput
        })
        await new Promise(resolve => setTimeout(resolve, delay))
      }
      
      if (line !== lines[lines.length - 1]) {
        setOutput(prev => [...prev, ""])
      }
    }
    
    setIsTyping(false)
  }

  const commands = {
    help: () => [
      "Available commands:",
      "",
      "  help        Show this help message",
      "  about       Display full bio and background",
      "  skills      List technical skills by category", 
      "  projects    Show featured projects with details",
      "  cv          Download resume PDF",
      "  contact     Display contact information",
      "  photo       Toggle hero avatar image",
      "  clear       Clear terminal screen",
      "  sudo hire-me Send hiring request",
      "",
      "Type any command to get started!"
    ],
    
    about: () => [
      "╔══════════════════════════════════════════════════════════════╗",
      "║                    KARTIK VYAS - ABOUT ME                   ║",
      "╚══════════════════════════════════════════════════════════════╝",
      "",
      "👋 Hello! I'm Kartik Vyas, a passionate Full Stack & Blockchain Developer",
      "",
      "🚀 EXPERTISE:",
      "   • Solving complex problems with innovative digital solutions",
      "   • Building scalable web applications and decentralized systems",
      "   • Leading projects from concept to deployment",
      "",
      "💻 TECHNICAL FOCUS:",
      "   • Languages: JavaScript, TypeScript, Python, Solidity, Rust",
      "   • Frontend: React, Next.js, Modern UI/UX Design",
      "   • Backend: Node.js, Express, FastAPI, Microservices",
      "   • Blockchain: EVM, Solana, Arweave, Smart Contracts",
      "   • Database: Supabase, Firebase, PostgreSQL, MongoDB",
      "",
      "🌟 BEYOND CODE:",
      "   • Active open-source contributor",
      "   • Tech community builder and mentor",
      "   • Always exploring cutting-edge technologies",
      "   • Passionate about sharing knowledge and best practices",
      "",
      "🎯 MISSION:",
      "   Building the future of web and blockchain technology,",
      "   one innovative project at a time.",
    ],
    
    skills: () => [
      "╔══════════════════════════════════════════════════════════════╗",
      "║                    TECHNICAL SKILLS                         ║",
      "╚══════════════════════════════════════════════════════════════╝",
      "",
      "💻 PROGRAMMING LANGUAGES:",
      "   ▸ JavaScript        ▸ TypeScript       ▸ Python",
      "   ▸ Java              ▸ Solidity         ▸ Rust",
      "",
      "⚛️  FRAMEWORKS & LIBRARIES:",
      "   ▸ React             ▸ Next.js          ▸ Node.js",
      "   ▸ Express           ▸ FastAPI          ▸ Anchor",
      "",
      "⛓️  BLOCKCHAIN TECHNOLOGIES:",
      "   ▸ EVM (Ethereum)    ▸ Solana           ▸ SVM",
      "   ▸ Arweave          ▸ Web3.js          ▸ Ethers.js",
      "",
      "☁️  INFRASTRUCTURE & PLATFORMS:",
      "   ▸ Supabase         ▸ Firebase         ▸ GitHub",
      "   ▸ Vercel           ▸ AWS              ▸ Docker",
      "",
      "🛠️  DEVELOPMENT TOOLS:",
      "   ▸ Git              ▸ Figma            ▸ VS Code",
      "   ▸ Postman          ▸ Jest             ▸ Hardhat",
      "",
      "📊 PROFICIENCY LEVELS: Expert ████████████ Advanced ████████ Proficient ████",
    ],
    
    projects: () => [
      "╔══════════════════════════════════════════════════════════════╗",
      "║                    FEATURED PROJECTS                        ║",
      "╚══════════════════════════════════════════════════════════════╝",
      "",
      "🎓 PROJECT #1: PRAMAN",
      "   Description: Blockchain certificate generator & verifier",
      "   Tech Stack:  Solidity • React • Web3.js • IPFS • Ethereum",
      "   Features:    Smart contract verification, fraud prevention",
      "   Demo:        https://praman-demo.vercel.app",
      "   GitHub:      https://github.com/kartikvyas/praman",
      "",
      "🧠 PROJECT #2: NEURAOS", 
      "   Description: AI-powered web-based operating system",
      "   Tech Stack:  React • TypeScript • OpenAI API • WebRTC • PWA",
      "   Features:    Virtual desktop, integrated AI assistant",
      "   Demo:        https://neuraos.vercel.app",
      "   GitHub:      https://github.com/kartikvyas/neuraos",
      "",
      "👻 PROJECT #3: SOLANA GHOST GAME",
      "   Description: Multiplayer ghost hunting game on Solana",
      "   Tech Stack:  Rust • Solana • Anchor • React • WebSocket",
      "   Features:    Real-time gameplay, NFT rewards system",
      "   Demo:        https://ghost-game-solana.vercel.app", 
      "   GitHub:      https://github.com/kartikvyas/solana-ghost-game",
      "",
      "💡 Want to see more? Check out my GitHub profile!",
    ],
    
    cv: () => {
      // Trigger actual CV download
      const link = document.createElement("a")
      link.href = "https://drive.google.com/uc?export=download&id=1fiJEIgaxR-oRDYSiFS20vcCvkfvfQL5l"
      link.download = "Kartik-Vyas-Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      return [
        "📄 DOWNLOADING RESUME...",
        "",
        "████████████████████████████████████████ 100%",
        "",
        "✅ Download completed: Kartik-Vyas-CV.pdf",
        "",
        "📋 RESUME SUMMARY:",
        "   • Full Stack & Blockchain Developer",
        "   • 3+ years of professional experience",
        "   • Expert in React, Node.js, and Solidity",
        "   • Multiple successful project launches",
        "   • Strong focus on scalable architecture",
        "",
        "📧 For opportunities: kartik@example.com"
      ]
    },
    
    contact: () => [
      "╔══════════════════════════════════════════════════════════════╗",
      "║                    CONTACT INFORMATION                      ║",
      "╚══════════════════════════════════════════════════════════════╝",
      "",
      "📧 EMAIL:     kartik@example.com",
      "🔗 LINKEDIN:  linkedin.com/in/kartikvyas1604",
      "🐙 GITHUB:    github.com/Kartikvyas1604",
      "🐦 TWITTER:   twitter.com/Kartikvyas1604",
      "",
      "💬 CONTACT FORM:",
      "   Navigate to the contact section on the website",
      "   for a detailed form with topic selection.",
      "",
      "⚡ QUICK RESPONSE:",
      "   I typically respond within 24 hours.",
      "   For urgent matters, please mention it in the subject.",
      "",
      "🤝 OPEN TO:",
      "   • Full-time opportunities",
      "   • Freelance projects",
      "   • Technical consulting",
      "   • Collaboration proposals",
    ],
    
    photo: () => {
      // Trigger photo toggle in hero section
      const heroImage = document.querySelector('.hero-image') as HTMLElement
      if (heroImage) {
        heroImage.dispatchEvent(new Event('mouseenter'))
        setTimeout(() => {
          heroImage.dispatchEvent(new Event('mouseleave'))
        }, 3000)
      }
      
      return [
        "📸 TOGGLING HERO AVATAR...",
        "",
        "🔄 Switching from avatar to real photo...",
        "⏱️  Displaying for 3 seconds...",
        "✅ Photo toggle completed!",
        "",
        "💡 TIP: Hover over the avatar in the hero section",
        "    to see this effect anytime!"
      ]
    },
    
    clear: () => {
      setOutput([])
      return []
    },
    
    "sudo hire-me": () => {
      toast({
        title: "Hiring Request Sent! ✅",
        description: "Your offer has been forwarded to Kartik's email.",
      })
      
      return [
        "🔐 EXECUTING SUDO COMMAND...",
        "",
        "sudo: processing hire request...",
        "sudo: validating credentials...",
        "sudo: preparing offer package...",
        "",
        "📧 Offer sent to Gmail ✅",
        "",
        "🎉 SUCCESS! Your hiring request has been submitted.",
        "📬 Kartik will review your offer and respond promptly.",
        "",
        "Thank you for considering Kartik for your team! 🚀"
      ]
    }
  }

  useEffect(() => {
    if (isOpen && terminalRef.current) {
      gsap.fromTo(
        terminalRef.current,
        { scale: 0.8, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      )
    }
  }, [isOpen])

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = async (cmd: string) => {
    if (isTyping) return // Prevent new commands while typing
    
    const command = cmd.toLowerCase().trim()
    setOutput(prev => [...prev, `$ ${cmd}`])
    
    if (command in commands) {
      const result = commands[command as keyof typeof commands]()
      if (result.length > 0) {
        setOutput(prev => [...prev, ""])
        await typeText(result, command === "sudo hire-me" ? 50 : 20)
      }
    } else if (command === "") {
      // Do nothing for empty command
    } else {
      await typeText([`Command not found: ${cmd}`, "Type 'help' for available commands."], 20)
    }
    
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isTyping) {
      handleCommand(input)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={terminalRef}
        className="terminal-window w-full max-w-4xl h-[600px] max-h-[80vh] flex flex-col"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="flex items-center gap-2">
            <div className="terminal-dot bg-red-500"></div>
            <div className="terminal-dot bg-yellow-500"></div>
            <div className="terminal-dot bg-green-500"></div>
          </div>
          <div className="flex-1 text-center text-sm text-gray-300">
            kartik@portfolio:~$
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
              <Minus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-white">
              <Maximize2 className="h-3 w-3" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-400 hover:text-red-400"
              onClick={onClose}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-hidden flex flex-col">
          <div ref={outputRef} className="flex-1 overflow-y-auto mb-4 space-y-1 font-mono text-sm">
            {output.map((line, index) => (
              <div key={index} className={`${
                line.startsWith('$') ? 'text-yellow-400' : 
                line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚') ? 'text-cyan-400' :
                line.includes('▸') ? 'text-green-400' :
                line.includes('🎓') || line.includes('🧠') || line.includes('👻') ? 'text-blue-400' :
                line.includes('ERROR') || line.includes('not found') ? 'text-red-400' :
                line.includes('✅') || line.includes('SUCCESS') ? 'text-green-400' :
                line.includes('📄') || line.includes('📧') || line.includes('📸') ? 'text-yellow-400' :
                'text-green-400'
              }`}>
                {line}
              </div>
            ))}
            {isTyping && (
              <div className="text-green-400">
                <span className="animate-pulse">▋</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-mono">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-green-400 font-mono"
              placeholder="Type a command..."
              autoFocus
              disabled={isTyping}
            />
            {isTyping && (
              <span className="text-yellow-400 text-xs">typing...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function TerminalButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-black text-green-400 hover:bg-gray-900 border border-green-400/50"
        size="lg"
      >
        <TerminalIcon className="mr-2 h-5 w-5" />
        Terminal
      </Button>
      
      <Terminal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}