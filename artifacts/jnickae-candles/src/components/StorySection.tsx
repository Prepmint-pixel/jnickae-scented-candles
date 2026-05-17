import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const details = [
  { label: "Founded", value: "2019" },
  { label: "Origin", value: "New Orleans, LA" },
  { label: "Wax", value: "Coconut Soy" },
  { label: "Burn time", value: "Up to 70 hrs" },
];

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="story" ref={ref} className="relative py-28 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(36,10%,18%)] to-transparent" />

      <motion.div
        style={{
          y: glowY,
          background: "radial-gradient(circle, hsl(36,52%,57%,0.06) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[hsl(36,52%,57%)] mb-8">
              The Ritual
            </p>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-[hsl(36,40%,92%)] leading-[0.95] mb-10">
              Born from
              <br />
              <em className="italic text-[hsl(36,52%,57%)]">ceremony</em>
              <br />
              and memory.
            </h2>

            <div className="space-y-6 mb-12">
              <p className="text-[14px] md:text-[15px] text-[hsl(36,12%,52%)] leading-relaxed font-light">
                J'Nickae began in a New Orleans kitchen — a daughter learning her
                grandmother's ritual of lighting a candle before dinner. The scent
                of orange blossom and cedarwood became the smell of belonging.
              </p>
              <p className="text-[14px] md:text-[15px] text-[hsl(36,12%,52%)] leading-relaxed font-light">
                We don't make candles to fill a room. We make them to fill
                a moment — the kind that stays with you for years after the
                flame has gone cold.
              </p>
            </div>

            <blockquote className="border-l border-[hsl(36,52%,57%,0.4)] pl-6 mb-12">
              <p className="font-display text-xl md:text-2xl italic text-[hsl(36,30%,75%)] font-light leading-relaxed">
                "Scent is the only sense that bypasses thought
                and goes straight to feeling."
              </p>
            </blockquote>

            <a
              href="#"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[hsl(36,52%,57%)] hover:text-[hsl(36,60%,70%)] transition-colors group"
            >
              Read Our Story
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div
              className="relative h-80 md:h-96 rounded overflow-hidden"
              style={{ background: "linear-gradient(135deg, hsl(30,10%,12%) 0%, hsl(30,8%,8%) 100%)" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 -m-16 rounded-full"
                    style={{
                      background: "radial-gradient(circle, hsl(36,52%,57%,0.2) 0%, transparent 70%)",
                      filter: "blur(20px)",
                    }}
                  />
                  <svg width="120" height="180" viewBox="0 0 120 180" fill="none" className="relative z-10">
                    <ellipse cx="60" cy="155" rx="32" ry="10" fill="hsl(36,10%,10%)" />
                    <rect x="36" y="70" width="48" height="95" rx="3" fill="hsl(36,12%,15%)" />
                    <rect x="36" y="70" width="48" height="95" rx="3" fill="url(#storyJar)" />
                    <rect x="30" y="145" width="60" height="14" rx="2" fill="hsl(36,12%,13%)" />
                    <rect x="38" y="73" width="5" height="89" rx="2" fill="white" opacity="0.05" />
                    <rect x="44" y="78" width="32" height="1" rx="0.5" fill="hsl(36,30%,40%)" opacity="0.4" />
                    <rect x="44" y="100" width="32" height="1" rx="0.5" fill="hsl(36,30%,40%)" opacity="0.3" />
                    <rect x="44" y="122" width="32" height="1" rx="0.5" fill="hsl(36,30%,40%)" opacity="0.2" />
                    <rect x="52" y="62" width="16" height="9" rx="1" fill="hsl(36,10%,18%)" />
                    <line x1="60" y1="62" x2="60" y2="30" stroke="hsl(36,20%,30%)" strokeWidth="1" />
                    <motion.g
                      animate={{ scaleX: [1, 1.1, 0.9, 1], scaleY: [1, 0.95, 1.05, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "60px 30px" }}
                    >
                      <path d="M60 30C60 30 54 22 54 16C54 11 57 7 60 4C63 7 66 11 66 16C66 22 60 30 60 30Z" fill="hsl(36,80%,60%)" opacity="0.9" />
                      <path d="M60 28C60 28 57 22 57 17C57 13 58 10 60 8C62 10 63 13 63 17C63 22 60 28 60 28Z" fill="hsl(45,95%,78%)" opacity="0.7" />
                    </motion.g>
                    <defs>
                      <linearGradient id="storyJar" x1="36" y1="70" x2="84" y2="165" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="hsl(36,15%,18%)" />
                        <stop offset="100%" stopColor="hsl(36,8%,10%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[hsl(36,52%,57%)]" />
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[hsl(36,12%,45%)]">
                    Handcrafted in small batches
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[hsl(36,10%,14%)]">
              {details.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  className="bg-[hsl(30,8%,7%)] p-6"
                >
                  <p className="text-[8px] tracking-[0.35em] uppercase text-[hsl(36,12%,40%)] mb-2">
                    {detail.label}
                  </p>
                  <p className="font-display text-xl text-[hsl(36,40%,88%)] font-light">
                    {detail.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
