import { Briefcase, GraduationCap, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const experienceData = [
  {
    year: "2024 - Present",
    title: "Senior Full Stack Developer",
    company: "Tech Innovation Corp",
    description: "Leading development of cutting-edge web applications using modern technologies. Architected microservices, implemented CI/CD pipelines, and mentored junior developers.",
    skills: ["React", "Node.js", "AWS", "Docker", "TypeScript"],
    type: "work"
  },
  {
    year: "2023",
    title: "DevOps & Cloud Architecture",
    company: "AWS Certified",
    description: "Specialized in containerization, orchestration, and automated deployment strategies. Optimized infrastructure for scalability and cost-efficiency.",
    skills: ["Kubernetes", "Docker", "Terraform", "AWS"],
    type: "education"
  },
  {
    year: "2022",
    title: "Blockchain Developer",
    company: "DeFi Protocol",
    description: "Developed smart contracts and decentralized applications on Solana and Ethereum. Implemented secure token standards and yield farming strategies.",
    skills: ["Solidity", "Rust", "Web3.js", "Smart Contracts"],
    type: "work"
  },
  {
    year: "2021",
    title: "Full Stack Developer",
    company: "StartUp Inc",
    description: "Built scalable web applications from scratch. Handled both frontend and backend development, ensuring high performance and user experience.",
    skills: ["React", "Python", "PostgreSQL", "Redis"],
    type: "work"
  }
]

export function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Experience & Education</h2>
          <p className="text-muted-foreground text-lg">
            My professional journey and milestones in the tech industry.
          </p>
        </div>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
          {experienceData.map((item, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {item.type === 'work' ? (
                  <Briefcase className="w-5 h-5 text-primary" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-primary" />
                )}
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="secondary" className="mb-2">{item.company}</Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.year}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
