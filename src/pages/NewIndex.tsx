import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Hero } from "@/components/NewHero"
import { About } from "@/components/NewAbout"
import { Skills } from "@/components/Skills"
import { Projects } from "@/components/NewProjects"
import { Certifications } from "@/components/NewCertifications"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="fixed top-4 left-4 right-4 md:top-6 md:left-6 md:right-auto z-50">
          <div className="flex items-center justify-center md:justify-start gap-2 md:gap-6 px-3 md:px-6 py-2 md:py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-lg overflow-x-auto">
            <a 
              href="#home" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              About
            </a>
            <a 
              href="#skills" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              Projects
            </a>
            <a 
              href="#certifications" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              Certs
            </a>
            <a 
              href="#contact" 
              className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap px-2 md:px-0"
            >
              Contact
            </a>
          </div>
        </nav>

        <main>
          <section id="home">
            <Hero />
          </section>
          
          <About />
          <Skills />
          <Projects />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default Index