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
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const commands = {
    help: () => [
      "Available commands:",
      "  about     - Learn about Kartik",
      "  skills    - View technical skills",
      "  projects  - See featured projects",
      "  cv        - Download resume",
      "  contact   - Go to contact form",
      "  photo     - Toggle avatar image",
      "  clear     - Clear terminal",
      "  sudo hire-me - Send hire request",
    ],
    about: () => [
      "Kartik Vyas - Full Stack & Blockchain Developer",
      "",
      "🚀 Passionate about solving complex problems",
      "💻 Expert in JavaScript, TypeScript, Python, Solidity, Rust",
      "⛓️ Blockchain specialist (EVM, Solana, Arweave)",
      "🌐 Full-stack developer (React, Node.js, Next.js)",
      "🤝 Open source contributor and community builder",
    ],
    skills: () => {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
      return ["Scrolling to skills section..."]
    },
    projects: () => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
      return ["Scrolling to projects section..."]
    },
    contact: () => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      return ["Scrolling to contact form..."]
    },
    cv: () => {
      // Create a temporary link to download CV
      const link = document.createElement("a")
      link.href = "/Kartik-Vyas-CV.pdf"
      link.download = "Kartik-Vyas-CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return ["📄 CV downloaded successfully!"]
    },
    photo: () => {
      // Trigger photo toggle in hero section
      const heroImage = document.querySelector('.hero-image') as HTMLElement
      if (heroImage) {
        heroImage.dispatchEvent(new Event('mouseenter'))
        setTimeout(() => {
          heroImage.dispatchEvent(new Event('mouseleave'))
        }, 2000)
      }
      return ["📸 Toggled avatar photo in hero section!"]
    },
    clear: () => {
      setOutput([])
      return []
    },
    "sudo hire-me": () => {
      toast({
        title: "Offer Sent! ✅",
        description: "Your hire request has been sent to Kartik's Gmail.",
      })
      return ["📧 Offer sent to Gmail ✅", "Thank you for your interest!"]
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

  const handleCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim()
    const newOutput = [...output, `$ ${cmd}`]
    
    if (command in commands) {
      const result = commands[command as keyof typeof commands]()
      newOutput.push(...result)
    } else if (command === "") {
      // Do nothing for empty command
    } else {
      newOutput.push(`Command not found: ${cmd}. Type 'help' for available commands.`)
    }
    
    setOutput(newOutput)
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={terminalRef}
        className="terminal-window w-full max-w-2xl h-96 max-h-[80vh] flex flex-col"
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
          <div ref={outputRef} className="flex-1 overflow-y-auto mb-4 space-y-1">
            {output.map((line, index) => (
              <div key={index} className="text-sm">
                {line}
              </div>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-green-400 font-mono"
              placeholder="Type a command..."
              autoFocus
            />
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