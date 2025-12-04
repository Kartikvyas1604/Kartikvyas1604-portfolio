import { ThemeProvider } from "@/components/ThemeProvider"
import { MinimalHero } from "@/components/MinimalHero"
import { ModernNavbar } from "@/components/ModernNavbar"
import { CleanAbout } from "@/components/CleanAbout"
import { TechStack } from "@/components/TechStack"
import { ExperienceTimeline } from "@/components/ExperienceTimeline"
import { BentoGridProjects } from "@/components/BentoGridProjects"
import { Testimonials } from "@/components/Testimonials"
import { MinimalContact } from "@/components/MinimalContact"
import { Footer } from "@/components/Footer"
import { useEffect, useState } from "react"

const Index = () => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Quick load without complex loading screen
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <ModernNavbar />
        
        {/* Main content */}
        <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <main>
            <MinimalHero />
            <CleanAbout />
            <TechStack />
            <ExperienceTimeline />
            <BentoGridProjects />
            <Testimonials />
            <MinimalContact />
          </main>
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
