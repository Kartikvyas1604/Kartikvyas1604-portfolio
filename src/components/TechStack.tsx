import { 
  Code2, Database, Globe, Layout, Server, Smartphone, Terminal, Cpu, Cloud, Shield 
} from "lucide-react"

const technologies = [
  {
    category: "Frontend",
    icon: Layout,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux", "Vue.js"]
  },
  {
    category: "Backend",
    icon: Server,
    skills: ["Node.js", "Python", "Express", "Django", "FastAPI", "GraphQL", "REST APIs"]
  },
  {
    category: "Database",
    icon: Database,
    skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Firebase", "Prisma"]
  },
  {
    category: "Blockchain",
    icon: Cpu,
    skills: ["Solidity", "Rust", "Solana", "Ethereum", "Hardhat", "Anchor", "Web3.js"]
  },
  {
    category: "DevOps",
    icon: Cloud,
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "Linux", "Nginx"]
  },
  {
    category: "Tools",
    icon: Terminal,
    skills: ["VS Code", "Postman", "Figma", "Jest", "Webpack", "Vite"]
  }
]

export function TechStack() {
  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Technical Arsenal</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit that enables me to build scalable, secure, and high-performance applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div 
              key={index}
              className="group p-6 bg-background rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <tech.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{tech.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tech.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md border border-transparent hover:border-primary/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
