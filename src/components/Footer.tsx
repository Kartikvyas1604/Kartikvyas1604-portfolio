import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Meteors } from "./Meteors"

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/kartikvyas", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/kartikvyas", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com/kartikvyas", label: "Twitter" },
    { icon: Mail, href: "mailto:kartik@example.com", label: "Email" },
  ]

  return (
    <footer className="relative bg-section-bg border-t border-border/50 py-12">
      <Meteors number={8} />
      
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-6">
          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="outline"
                size="icon"
                className="hover:scale-110 transition-transform glass"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
          
          {/* Quote */}
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground italic">
              "Code is like humor. When you have to explain it, it's bad."
            </p>
            <p className="text-sm text-muted-foreground mt-2">- Cory House</p>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-border/50 pt-6">
            <p className="text-muted-foreground flex items-center justify-center gap-2">
              © 2024 Kartik Vyas. Built with
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              using React, TypeScript & Supabase
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}