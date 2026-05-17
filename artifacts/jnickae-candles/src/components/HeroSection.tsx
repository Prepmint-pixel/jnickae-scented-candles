import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words1 = ["Light", "the"];
const word2 = "memory.";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,10%,3%)] via-[hsl(30,8%,6%)] to-[hsl(30,8%,7%)]" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />

        {/* Outer atmospheric halo */}
        <motion.div
          animate={{ opacity: [0.18, 0.3, 0.18], scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(36,52%,57%,0.12) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        {/* Inner warm candle glow */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(36,70%,57%,0.1) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Vertical light thread */}
        <motion.div
          animate={{ opacity: [0, 0.18, 0], scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[15%] left-1/2 -translate-x-1/2 w-px h-64 origin-top"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(36,52%,57%), transparent)" }}
        />

        {/* Horizontal vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(30,8%,5%)] via-transparent to-[hsl(30,8%,5%)] opacity-70" />
        {/* Top vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,10%,4%)] via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Side editorial text — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[hsl(36,52%,57%,0.3)]" />
        <span
          className="text-[8px] tracking-[0.4em] uppercase text-[hsl(36,12%,35%)] font-light"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          New Orleans · Est. 2019
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[hsl(36,52%,57%,0.3)] to-transparent" />
      </motion.div>

      {/* Side editorial text — right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-[hsl(36,52%,57%,0.3)]" />
        <span
          className="text-[8px] tracking-[0.4em] uppercase text-[hsl(36,12%,35%)] font-light"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-[hsl(36,52%,57%,0.3)] to-transparent" />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-5 mb-14 md:mb-20"
        >
          <div className="w-10 md:w-16 h-px bg-gradient-to-r from-transparent to-[hsl(36,52%,57%,0.5)]" />
          <p className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase text-[hsl(36,52%,57%)]">
            Artisan · Luxury · Handcrafted
          </p>
          <div className="w-10 md:w-16 h-px bg-gradient-to-l from-transparent to-[hsl(36,52%,57%,0.5)]" />
        </motion.div>

        {/* Headline — word by word stagger */}
        <motion.h1
          className="font-display font-light leading-[0.88] text-[hsl(36,40%,92%)] mb-10 md:mb-14"
          style={{
            fontSize: "clamp(4rem, 12vw, 10.5rem)",
            textShadow: "0 0 120px hsl(36,52%,57%,0.08)",
          }}
        >
          <span className="block">
            {words1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 1.2,
                  delay: 0.5 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.2, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="block italic text-[hsl(36,52%,57%)]"
            style={{ textShadow: "0 0 80px hsl(36,52%,57%,0.2)" }}
          >
            {word2}
          </motion.span>
        </motion.h1>

        {/* Decorative ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <div className="w-20 md:w-32 h-px bg-gradient-to-r from-transparent to-[hsl(36,52%,57%,0.4)]" />
          <div className="w-1 h-1 rounded-full bg-[hsl(36,52%,57%,0.6)]" />
          <div className="w-20 md:w-32 h-px bg-gradient-to-l from-transparent to-[hsl(36,52%,57%,0.4)]" />
        </motion.div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-[15px] text-[hsl(36,12%,50%)] leading-[1.9] max-w-sm mx-auto mb-14 md:mb-20 font-light tracking-wide"
        >
          Each candle is a story rendered in smoke and wax —
          rare botanicals, aged wood, and the alchemy of scent
          that lingers long after the flame is gone.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <a
            href="#collection"
            className="group relative inline-flex items-center gap-4 bg-[hsl(36,52%,57%)] text-[hsl(30,8%,6%)] px-10 md:px-14 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[hsl(36,60%,64%)]"
          >
            <span className="relative z-10">Discover the Collection</span>
            <svg className="w-3 h-3 relative z-10 group-hover:translate-x-1 transition-transform duration-400" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#story"
            className="group relative inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-medium text-[hsl(36,20%,60%)] overflow-hidden"
          >
            <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(36,10%,28%)] group-hover:bg-[hsl(36,52%,57%)] transition-colors duration-400" />
            <span className="group-hover:text-[hsl(36,52%,57%)] transition-colors duration-400">Our Ritual</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0], originY: "top" }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          className="w-px h-14 bg-gradient-to-b from-[hsl(36,52%,57%,0.6)] to-transparent"
        />
        <span className="text-[7px] tracking-[0.5em] uppercase text-[hsl(36,10%,32%)]">Scroll</span>
      </motion.div>
    </section>
  );
}
