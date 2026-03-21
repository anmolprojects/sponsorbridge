"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "$12M+", label: "Deals Facilitated" },
  { value: "10%", label: "Commission Rate", highlight: true },
  { value: "98.5%", label: "Delivery Rate" },
  { value: "2,500+", label: "Verified Creators" },
]

export function StatsBar() {
  return (
    <section className="py-12 bg-[#0D0D0B]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <p className={`font-serif text-3xl sm:text-4xl font-semibold ${stat.highlight ? "text-[#C9943A]" : "text-[#FAFAF7]"}`}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-[#FAFAF7]/70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
