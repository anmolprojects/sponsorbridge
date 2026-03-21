"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Finally, a platform where companies can see my real stats. I closed 3 deals in my first month because brands trusted my numbers.",
    author: "Sarah Chen",
    role: "Tech Reviewer",
    stats: "1.2M subscribers",
    avatar: "SC",
    rating: 5,
  },
  {
    quote: "The escrow system changed everything. I no longer have to chase payments or worry about creators disappearing. It just works.",
    author: "Marcus Williams",
    role: "Marketing Director",
    stats: "TechStartup Inc.",
    avatar: "MW",
    rating: 5,
  },
  {
    quote: "I was skeptical about the AI matching, but it found me brands I never would have discovered myself. All perfect fits for my audience.",
    author: "Emma Rodriguez",
    role: "Lifestyle Creator",
    stats: "680K subscribers",
    avatar: "ER",
    rating: 5,
  },
  {
    quote: "We've worked with 15 creators through SponsorBridge. Every single one delivered on time. The reputation system really works.",
    author: "David Park",
    role: "Brand Manager",
    stats: "FreshMeals Co.",
    avatar: "DP",
    rating: 5,
  },
  {
    quote: "The 10% commission is incredible compared to what we were paying elsewhere. We've redirected that savings into more creator partnerships.",
    author: "Lisa Thompson",
    role: "CMO",
    stats: "GreenTech Solutions",
    avatar: "LT",
    rating: 5,
  },
  {
    quote: "As a smaller creator, I struggled to find sponsors. SponsorBridge's AI actually helped companies find ME. Game changer.",
    author: "James Miller",
    role: "Gaming Creator",
    stats: "245K subscribers",
    avatar: "JM",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#C9943A]/30 text-[#C9943A] bg-[#C9943A]/5">
            <Star className="w-3 h-3 mr-1 fill-[#C9943A]" />
            Testimonials
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-foreground text-balance">
            Loved by creators and companies
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Don't just take our word for it. Here's what our community says about SponsorBridge.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-[#C9943A]/30 transition-colors"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9943A] text-[#C9943A]" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#C9943A]/10" />
                <p className="text-foreground leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9943A] to-[#8B6914] flex items-center justify-center">
                  <span className="text-[#0D0D0B] font-bold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role} • {testimonial.stats}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
