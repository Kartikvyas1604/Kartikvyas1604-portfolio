import { Quote } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO at TechFlow",
    content: "Kartik is an exceptional developer who brings both technical expertise and creative problem-solving to every project. His work on our blockchain infrastructure was nothing short of transformative.",
    initials: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    content: "Working with Kartik was a breeze. He understands requirements quickly and delivers high-quality code that scales. His attention to detail in UI/UX is remarkable.",
    initials: "MC"
  },
  {
    name: "Elena Rodriguez",
    role: "Lead Engineer",
    content: "One of the most dedicated developers I've had the pleasure of working with. His deep knowledge of the Solana ecosystem helped us launch our dApp months ahead of schedule.",
    initials: "ER"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What People Say</h2>
          <p className="text-muted-foreground text-lg">
            Feedback from colleagues and clients I've had the privilege to work with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-secondary/10 border-none shadow-none relative overflow-hidden">
              <div className="absolute top-4 right-4 text-primary/10">
                <Quote className="w-12 h-12" />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.name}`} />
                    <AvatarFallback>{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{testimonial.name}</h3>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
