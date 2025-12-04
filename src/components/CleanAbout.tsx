import { Code2, Cpu, Globe, Layers } from "lucide-react"

export function CleanAbout() {
  return (
    <section id="about" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm <span className="text-foreground font-medium">Kartik Vyas</span>, a passionate Full Stack & Blockchain Developer based in India. 
                I bridge the gap between complex backend logic and intuitive frontend experiences.
              </p>
              <p>
                With deep expertise in <span className="text-foreground font-medium">Solana, Rust, and the EVM ecosystem</span>, 
                I build decentralized applications that are secure, scalable, and user-friendly. 
                My background in traditional full-stack development (React, Node.js, Python) allows me to create 
                comprehensive solutions that leverage the best of Web2 and Web3.
              </p>
              <p>
                When I'm not coding, I'm contributing to open-source projects, exploring new blockchain protocols, 
                or sharing knowledge with the developer community.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm">
              <Code2 className="w-8 h-8 text-blue-500 mb-4" />
              <h3 className="font-semibold mb-2">Frontend</h3>
              <p className="text-sm text-muted-foreground">React, Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm">
              <Layers className="w-8 h-8 text-purple-500 mb-4" />
              <h3 className="font-semibold mb-2">Backend</h3>
              <p className="text-sm text-muted-foreground">Node.js, Python, Supabase, PostgreSQL, Redis</p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm">
              <Cpu className="w-8 h-8 text-orange-500 mb-4" />
              <h3 className="font-semibold mb-2">Blockchain</h3>
              <p className="text-sm text-muted-foreground">Solidity, Rust, Solana, Anchor, Web3.js</p>
            </div>
            <div className="p-6 bg-background rounded-xl border border-border/50 shadow-sm">
              <Globe className="w-8 h-8 text-green-500 mb-4" />
              <h3 className="font-semibold mb-2">DevOps</h3>
              <p className="text-sm text-muted-foreground">Docker, AWS, CI/CD, Git</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
