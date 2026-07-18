import { AboutCards } from "@/components/AboutCards";

export function About() {
  return (
    <section id="sobre-mi" className="relative py-28">
      {/* The section heading + subtitle appear earlier, as the Hero's
          scroll-driven reveal — not repeated here. */}
      <AboutCards />
    </section>
  );
}
