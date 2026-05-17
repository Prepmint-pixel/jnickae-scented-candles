import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const base = import.meta.env.BASE_URL;

const details = [
  { label: "Founded", value: "2019" },
  { label: "Origin", value: "New Orleans" },
  { label: "Wax", value: "Coconut Soy" },
  { label: "Burn time", value: "70 hrs" },
];

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1, 1.04]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-36 md:py-56 px-6 md:px-12 overflow-hidden"
      style={{ background: "#2B003B" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)" }}
      />

      {/* Atmospheric glow */}
      <motion.div
        style={{ x: glowX }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-28 xl:gap-36 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
              <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
                The Ritual
              </p>
            </div>

            <h2
              className="font-display font-light leading-[0.92] mb-12"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: "#F8F4EC" }}
            >
              Born from
              <br />
              <em className="italic" style={{ color: "#D4AF37" }}>ceremony</em>
              <br />
              and memory.
            </h2>

            <div className="space-y-7 mb-14">
              {[
                "J'Nickae began in a New Orleans kitchen — a daughter learning her grandmother's ritual of lighting a candle before dinner. The scent of orange blossom and cedarwood became the smell of belonging.",
                "We don't make candles to fill a room. We make them to fill a moment — the kind that stays with you for years after the flame has gone cold.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[14px] md:text-[15px] leading-[1.9] font-light"
                  style={{ color: "rgba(248,244,236,0.55)" }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-14 pl-8"
            >
              <div
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{ background: "linear-gradient(to bottom, rgba(212,175,55,0.6), transparent)" }}
              />
              <p
                className="font-display italic font-light leading-[1.5]"
                style={{ fontSize: "clamp(1.1rem, 2vw, 1.45rem)", color: "rgba(212,175,55,0.8)" }}
              >
                "Scent is the only sense that bypasses thought and goes straight to feeling."
              </p>
            </motion.blockquote>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.56 }}
              className="group inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.35em] uppercase transition-colors"
              style={{ color: "#D4AF37" }}
            >
              Read Our Story
              <svg className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-400" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Image panel */}
            <div
              className="relative overflow-hidden"
              style={{ height: "clamp(340px, 40vw, 500px)", background: "#3F0A57" }}
            >
              {/* Product image in story panel */}
              <motion.img
                src={`${base}assets/sandalwood-12oz.png`}
                alt="J'Nickae Sandalwood candle"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ scale: imgScale, padding: "2rem" }}
              />

              {/* Dark purple overlay at edges */}
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(43,0,59,0.7) 100%)",
                }}
              />

              {/* Ambient gold glow */}
              <motion.div
                animate={{ opacity: [0.2, 0.45, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-40"
                style={{
                  background: "radial-gradient(ellipse, rgba(212,175,55,0.2) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Bottom caption */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: "linear-gradient(to top, rgba(43,0,59,0.9), transparent)" }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: "#D4AF37" }}
                  />
                  <span
                    className="text-[9px] tracking-[0.35em] uppercase"
                    style={{ color: "rgba(248,244,236,0.4)" }}
                  >
                    Handcrafted in small batches · New Orleans, LA
                  </span>
                </div>
              </div>
            </div>

            {/* Stat tiles */}
            <div
              className="grid grid-cols-4 gap-px"
              style={{ background: "rgba(212,175,55,0.08)" }}
            >
              {details.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.09 }}
                  className="px-4 py-6 text-center"
                  style={{ background: "#3F0A57" }}
                >
                  <p
                    className="text-[7px] tracking-[0.35em] uppercase mb-2"
                    style={{ color: "rgba(248,244,236,0.3)" }}
                  >
                    {detail.label}
                  </p>
                  <p
                    className="font-display font-light leading-tight"
                    style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)", color: "#F8F4EC" }}
                  >
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
