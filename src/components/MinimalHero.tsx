import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MinimalHero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-10 bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for new opportunities
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            Kartik Vyas
            <span className="block text-muted-foreground mt-2 text-3xl md:text-5xl lg:text-6xl font-medium">
              Full Stack & Blockchain Developer
            </span>
          </h1>

          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed">
            Building the future of the web with <span className="text-foreground font-semibold">Solana, Rust, & React</span>. 
            Specializing in high-performance dApps, scalable systems, and innovative digital experiences.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base rounded-full" asChild>
              <a href="#projects">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-full group" asChild>
              <a href="https://drive.google.com/uc?export=download&id=1fiJEIgaxR-oRDYSiFS20vcCvkfvfQL5l" target="_blank" rel="noopener noreferrer">
                Download Resume <Download className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="pt-12 flex items-center gap-6 text-muted-foreground">
            <a href="https://github.com/Kartikvyas1604" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Github className="h-6 w-6" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/kartik-vyas-7183b8238" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://x.com/0xKartikvyas" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="sr-only">X (Twitter)</span>
            </a>
            <a href="mailto:vkartik013@gmail.com" className="hover:text-foreground transition-colors">
              <Mail className="h-6 w-6" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
