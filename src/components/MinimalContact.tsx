import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin } from "lucide-react"

export function MinimalContact() {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-secondary/20 border-none shadow-none">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-medium mb-1">Email</h3>
                <a href="mailto:vkartik013@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  vkartik013@gmail.com
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary/20 border-none shadow-none">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-medium mb-1">Location</h3>
                <p className="text-sm text-muted-foreground">
                  India (Remote Available)
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
              <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="Project Inquiry" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="Tell me about your project..." className="min-h-[150px]" />
                </div>
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
