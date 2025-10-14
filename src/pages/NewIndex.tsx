import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Hero } from "@/components/NewHero"
import { About } from "@/components/NewAbout"
import { Projects } from "@/components/NewProjects"
import { Certifications } from "@/components/NewCertifications"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        
        {/* Theme Toggle */}
        <div className="fixed top-6 right-6 z-50">
          <ThemeToggle />
        </div>

        {/* Navigation */}
        <nav className="fixed top-6 left-6 z-50">
          <div className="flex items-center gap-6 px-6 py-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-lg">
            <a 
              href="#home" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Projects
            </a>
            <a 
              href="#certifications" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Certifications
            </a>
            <a 
              href="#contact" 
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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