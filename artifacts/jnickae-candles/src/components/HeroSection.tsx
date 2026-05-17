import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const base = import.meta.env.BASE_URL;

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Hero image */}
      <motion.div style={{ y: imgY }} className="absolute inset-0 z-0 scale-110">
        <img
          src={`${base}assets/hero-lifestyle.png`}
          alt="J'Nickae luxury candle lifestyle"
          className="w-full h-full object-cover object-center"
        />
        {/* Layered overlays */}
        {/* Dark purple base overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(43,0,59,0.72) 0%, rgba(43,0,59,0.55) 40%, rgba(43,0,59,0.80) 100%)" }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 30%, rgba(43,0,59,0.65) 100%)" }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to bottom, transparent, #2B003B)" }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px",
          }}
        />
      </motion.div>

      {/* Animated ambient glow */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.10) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* Side editorial text — left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.35))" }} />
        <span
          className="text-[8px] tracking-[0.4em] uppercase font-light"
          style={{ color: "rgba(248,244,236,0.3)", writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          New Orleans · Est. 2019
        </span>
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.35), transparent)" }} />
      </motion.div>

      {/* Side editorial text — right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.35))" }} />
        <span
          className="text-[8px] tracking-[0.4em] uppercase font-light"
          style={{ color: "rgba(248,244,236,0.3)", writingMode: "vertical-rl" }}
        >
          Scroll to explore
        </span>
        <div className="w-px h-16" style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.35), transparent)" }} />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Eyebrow with flanking lines */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-5 mb-14 md:mb-20"
        >
          <div className="w-10 md:w-20 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.55))" }} />
          <p className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase" style={{ color: "#D4AF37" }}>
            Artisan · Luxury · Handcrafted
          </p>
          <div className="w-10 md:w-20 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.55))" }} />
        </motion.div>

        {/* Main headline — word by word stagger */}
        <h1
          className="font-display font-light leading-[0.88] mb-10 md:mb-14"
          style={{ fontSize: "clamp(4rem, 12vw, 10.5rem)", color: "#F8F4EC" }}
        >
          <span className="block">
            {["Light", "the"].map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1.3, delay: 0.5 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block mr-[0.25em] last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.3, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="block italic"
            style={{
              color: "#D4AF37",
              textShadow: "0 0 100px rgba(212,175,55,0.25)",
            }}
          >
            memory.
          </motion.span>
        </h1>

        {/* Gold ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-10 md:mb-14"
        >
          <div className="w-16 md:w-28 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.45))" }} />
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,55,0.7)" }} />
          <div className="w-16 md:w-28 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.45))" }} />
        </motion.div>

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-[15px] leading-[1.95] max-w-sm mx-auto mb-14 md:mb-20 font-light tracking-wide"
          style={{ color: "rgba(248,244,236,0.6)" }}
        >
          Each candle is a story rendered in smoke and wax — rare botanicals,
          aged wood, and the alchemy of scent that lingers long after the flame
          is gone.
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
            className="group inline-flex items-center gap-4 px-10 md:px-14 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-medium transition-all duration-400"
            style={{ background: "#D4AF37", color: "#2B003B" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e2c04a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
          >
            Discover the Collection
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a
            href="#story"
            className="group relative inline-flex items-center gap-3 px-10 md:px-14 py-4 md:py-5 text-[9px] md:text-[10px] tracking-[0.35em] uppercase font-medium transition-all duration-400"
            style={{ color: "rgba(248,244,236,0.65)", border: "1px solid rgba(212,175,55,0.25)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#D4AF37";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(248,244,236,0.65)";
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
            }}
          >
            Our Ritual
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.6, 1] }}
          className="w-px h-14 origin-top"
          style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)" }}
        />
        <span className="text-[7px] tracking-[0.5em] uppercase" style={{ color: "rgba(212,175,55,0.45)" }}>
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
