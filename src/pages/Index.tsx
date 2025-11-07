import { ThemeProvider } from "@/components/ThemeProvider"
import { UltimateHero } from "@/components/UltimateHero"
import { ImmersiveAbout } from "@/components/ImmersiveAbout"
import { EpicProjects } from "@/components/EpicProjects"
import { NextLevelContact } from "@/components/NextLevelContact"
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
      <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden">
        {/* Main content */}
        <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <main>
            <UltimateHero />
            <ImmersiveAbout />
            <EpicProjects />
            <NextLevelContact />
          </main>
          
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
