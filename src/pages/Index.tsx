import { ThemeProvider } from "@/components/ThemeProvider"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Achievements } from "@/components/Achievements"
import { Skills } from "@/components/Skills"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { TerminalButton } from "@/components/Terminal"

const Index = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground">
        <ThemeToggle />
        <TerminalButton />
        
        <main>
          <Hero />
          <About />
          <Projects />
          <Achievements />
          <Skills />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
