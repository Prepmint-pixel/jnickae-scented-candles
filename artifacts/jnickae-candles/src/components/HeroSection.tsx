import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,8%,4%)] via-[hsl(30,8%,6%)] to-[hsl(30,8%,6%)]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.25, 0.35, 0.25],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(36,52%,57%,0.15) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-px h-48"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(36,52%,57%), transparent)" }}
        />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-[9px] md:text-[10px] tracking-[0.45em] uppercase text-[hsl(36,52%,57%)] mb-10 md:mb-14"
        >
          Artisan · Luxury · Handcrafted
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-[0.9] text-[hsl(36,40%,92%)] mb-8"
          style={{ textShadow: "0 0 80px hsl(36,52%,57%,0.12)" }}
        >
          Light the
          <br />
          <em className="italic text-[hsl(36,52%,57%)]">memory.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-[15px] text-[hsl(36,12%,52%)] leading-relaxed max-w-md mx-auto mb-14 md:mb-20 font-light tracking-wide"
        >
          Each candle is a story rendered in smoke and wax —
          rare botanicals, aged wood, and the alchemy of scent
          that lingers long after the flame is gone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#collection"
            className="group inline-flex items-center gap-3 bg-[hsl(36,52%,57%)] text-[hsl(30,8%,6%)] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:bg-[hsl(36,60%,65%)] transition-all duration-300"
          >
            Discover the Collection
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#story"
            className="inline-flex items-center gap-3 border border-[hsl(36,10%,28%)] text-[hsl(36,12%,52%)] px-10 py-4 text-[10px] tracking-[0.3em] uppercase font-medium hover:border-[hsl(36,52%,57%)] hover:text-[hsl(36,52%,57%)] transition-all duration-300"
          >
            Our Ritual
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-transparent via-[hsl(36,52%,57%,0.5)] to-transparent"
        />
        <span className="text-[8px] tracking-[0.35em] uppercase text-[hsl(36,12%,38%)]">Scroll</span>
      </motion.div>
    </section>
  );
}
