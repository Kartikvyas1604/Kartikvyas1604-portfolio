import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Send, Mail, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const contactRef = useRef<HTMLDivElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: ""
  })
  const { toast } = useToast()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        ".contact-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, contactRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // First, save to Supabase database
      const { error: dbError } = await supabase
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            topic: formData.topic,
            message: formData.message,
          },
        ])

      if (dbError) throw dbError

      // Then, send emails via edge function
      const { error: emailError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
        },
      })

      if (emailError) {
        console.error("Email sending failed:", emailError)
        // Don't throw error here - we still want to show success since data was saved
      }

      toast({
        title: "Message Sent! ✅",
        description: "Thank you for reaching out. I'll get back to you soon!",
      })

      setFormData({ name: "", email: "", topic: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <section id="contact" ref={contactRef} className="py-20 bg-background">
      <div className="container px-4 mx-auto max-w-4xl">
        <h2 className="contact-title text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Get In Touch
        </h2>
        
        <Card className="contact-card glass border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <MessageSquare className="h-6 w-6" />
              Let's Work Together
            </CardTitle>
            <p className="text-muted-foreground">
              Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="bg-background/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Select value={formData.topic} onValueChange={(value) => handleInputChange("topic", value)}>
                  <SelectTrigger className="bg-background/50 border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="blockchain">Blockchain Development</SelectItem>
                    <SelectItem value="fullstack">Full Stack Project</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  rows={6}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                  placeholder="Tell me about your project or what you have in mind..."
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-accent hover:scale-[1.02] transition-transform"
                size="lg"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            Or reach out directly at{" "}
            <a
              href="mailto:kartik@example.com"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              <Mail className="h-4 w-4" />
              vkartik013@gmail.com
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}