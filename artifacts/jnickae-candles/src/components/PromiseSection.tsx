import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Slow Craft",
    description:
      "Each vessel is hand-poured in small batches. No shortcuts. No machines. Just patience, wax, and intention.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Rare Ingredients",
    description:
      "Oud from Assam. Violet leaf absolute. Black amber resin. We source only what cannot be replicated.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 6c0 0-8 6-8 13a8 8 0 0016 0c0-7-8-13-8-13z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M16 14v8M12 18h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Clean Burn",
    description:
      "100% natural coconut-soy wax. Cotton wicks. Zero paraffin, zero compromise. Your air deserves better.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 28V10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M16 10c0-4-4-4-4-8 4 0 6 2 8 4s2 6-4 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M10 28h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PromiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-12">
      <div className="absolute inset-0 border-t border-[hsl(36,10%,12%)]" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 md:mb-28"
        >
          <p className="text-[9px] tracking-[0.4em] uppercase text-[hsl(36,52%,57%)] mb-5">
            The J'Nickae Promise
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light text-[hsl(36,40%,92%)] max-w-lg leading-tight">
            Made for those who
            <em className="italic"> notice everything.</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[hsl(36,10%,14%)]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-10 md:p-12 border-b md:border-b-0 md:border-r border-[hsl(36,10%,14%)] last:border-0 hover:bg-[hsl(36,52%,57%,0.03)] transition-colors duration-500"
            >
              <div className="text-[hsl(36,52%,57%)] mb-8 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                {pillar.icon}
              </div>

              <div className="flex items-start gap-4 mb-5">
                <span className="font-display text-4xl text-[hsl(36,52%,57%,0.2)] font-light leading-none mt-1">
                  {pillar.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-light text-[hsl(36,40%,92%)] leading-tight">
                  {pillar.title}
                </h3>
              </div>

              <p className="text-[13px] text-[hsl(36,12%,50%)] leading-relaxed font-light">
                {pillar.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(36,52%,57%,0)] to-transparent group-hover:via-[hsl(36,52%,57%,0.3)] transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
