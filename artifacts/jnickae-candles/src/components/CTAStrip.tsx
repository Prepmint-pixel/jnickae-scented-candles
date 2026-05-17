import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const words = ["Transform", "Your", "Space", "With", "Luxury", "Fragrance"];

export default function CTAStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "#3F0A57" }}
    >
      {/* Animated gold dividers top + bottom */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, rgba(212,175,55,0.6), rgba(212,175,55,0.15), transparent)" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ background: "linear-gradient(to left, rgba(212,175,55,0.6), rgba(212,175,55,0.15), transparent)" }}
      />

      {/* Parallax background glow */}
      <motion.div
        style={{ x: bgX }}
        className="absolute inset-0 pointer-events-none"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.09) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      {/* Pulsing center radiance */}
      <motion.div
        animate={{ opacity: [0.4, 0.75, 0.4], scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left — headline */}
        <div className="flex-1 text-center lg:text-left">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 justify-center lg:justify-start mb-7"
          >
            <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
            <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
              J'Nickae Candles
            </p>
          </motion.div>

          {/* Word-by-word headline */}
          <h2
            className="font-display font-light leading-[0.92]"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "#F8F4EC" }}
          >
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 30, rotateX: 16 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{
                  duration: 1.1,
                  delay: 0.08 + i * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block mr-[0.22em] ${
                  word === "Luxury" ? "italic" : ""
                }`}
                style={word === "Luxury" ? { color: "#D4AF37", textShadow: "0 0 60px rgba(212,175,55,0.2)" } : {}}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-[13px] md:text-[14px] font-light leading-relaxed max-w-md mx-auto lg:mx-0"
            style={{ color: "rgba(248,244,236,0.48)" }}
          >
            Handcrafted in small batches. Scented for those who live with intention.
            Every candle, a ritual.
          </motion.p>
        </div>

        {/* Right — CTAs */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row lg:flex-col gap-4 flex-shrink-0"
        >
          <a
            href="#collection"
            className="group inline-flex items-center justify-center gap-4 px-10 py-5 text-[9px] tracking-[0.4em] uppercase font-medium transition-all duration-400 whitespace-nowrap"
            style={{ background: "#D4AF37", color: "#2B003B" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e2c04a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
          >
            Shop the Collection
            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href="#story"
            className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-[9px] tracking-[0.4em] uppercase font-medium transition-all duration-400 whitespace-nowrap"
            style={{ border: "1px solid rgba(212,175,55,0.35)", color: "rgba(248,244,236,0.65)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.7)";
              e.currentTarget.style.color = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.35)";
              e.currentTarget.style.color = "rgba(248,244,236,0.65)";
            }}
          >
            Discover Our Story
          </a>
        </motion.div>
      </div>

      {/* Scrolling marquee ticker */}
      <div className="relative mt-20 overflow-hidden" style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap pt-6"
        >
          {[...Array(2)].map((_, gi) => (
            <div key={gi} className="flex items-center gap-0 flex-shrink-0">
              {[
                "Slow Craft",
                "Rare Botanicals",
                "Clean Burn",
                "Coconut-Soy Wax",
                "Hand-Poured",
                "Est. 2022",
                "Georgia",
                "Luxury Fragrance",
                "Small Batches",
                "Cotton Wick",
              ].map((item) => (
                <span key={item} className="flex items-center gap-6 px-6">
                  <span
                    className="text-[9px] tracking-[0.4em] uppercase font-light"
                    style={{ color: "rgba(212,175,55,0.35)" }}
                  >
                    {item}
                  </span>
                  <span style={{ color: "rgba(212,175,55,0.18)", fontSize: "6px" }}>◆</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
