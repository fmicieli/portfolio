"use client";

import { motion } from "framer-motion";

type Achievement = {
  text: string;
  tools: string[];
};

const achievements: Achievement[] = [
  {
    text: "Construí desde cero el sistema de diseño de RED Atlas en Figma (tokens de color, tipografía, componentes primitivos reutilizables), usando IA para acelerar documentación y generación de variantes.",
    tools: ["Figma (avanzado)", "Adobe Creative Suite"],
  },
  {
    text: "Adopté vibe coding (Claude Code + HTML/CSS/JS) para prototipar flujos funcionales de forma independiente del equipo de desarrollo, reduciendo ciclos de validación.",
    tools: ["Claude Code", "HTML5/CSS3 básico"],
  },
  {
    text: "Research: entrevistas a usuarios, usability testing, evaluación heurística (Nielsen), personas, journey mapping, WCAG AA.",
    tools: ["Miro", "Notion"],
  },
];

export function AboutCards() {
  return (
    <motion.div
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      whileInView={{ backgroundColor: "#000000" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative left-1/2 w-screen -translate-x-1/2 py-16"
    >
      <div className="mx-auto grid max-w-3xl gap-6 px-6 sm:grid-cols-3">
        {achievements.map((item, i) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 80, rotate: (i - 1) * 7 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "bottom center" }}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-sm leading-relaxed text-fg-secondary">{item.text}</p>
            <ul className="mt-auto flex flex-wrap gap-2">
              {item.tools.map((tool) => (
                <li
                  key={tool}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg-secondary"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
