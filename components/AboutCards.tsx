"use client";

import { motion } from "framer-motion";

const testimonials = [
  { quote: "TODO: testimonio placeholder uno.", name: "TODO: Nombre", role: "TODO: Empresa" },
  { quote: "TODO: testimonio placeholder dos.", name: "TODO: Nombre", role: "TODO: Empresa" },
  { quote: "TODO: testimonio placeholder tres.", name: "TODO: Nombre", role: "TODO: Empresa" },
];

export function AboutCards() {
  return (
    <div className="mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
      {testimonials.map((item, i) => (
        <motion.div
          key={item.name + i}
          initial={{ opacity: 0, y: 80, rotate: (i - 1) * 7 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom center" }}
          className="flex flex-col gap-6 rounded-xl border border-white/10 bg-white/5 p-6"
        >
          <span className="font-display text-3xl leading-none text-fg">&ldquo;</span>
          <p className="text-sm leading-relaxed text-fg-secondary">{item.quote}</p>
          <div className="mt-auto">
            <p className="text-sm font-medium text-fg">{item.name}</p>
            <p className="text-sm text-fg-secondary">{item.role}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
