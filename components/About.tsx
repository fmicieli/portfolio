"use client";

import { motion } from "framer-motion";
import { AboutCards } from "@/components/AboutCards";

export function About() {
  return (
    <section id="sobre-mi" className="relative py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl px-6 text-center"
      >
        <h2 className="font-display text-3xl font-semibold text-fg sm:text-4xl">
          TODO: título sección
        </h2>
        <p className="mt-4 leading-relaxed text-fg-secondary">TODO: bajada sección</p>
      </motion.div>

      <div className="mt-16">
        <AboutCards />
      </div>
    </section>
  );
}
