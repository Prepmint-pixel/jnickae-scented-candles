import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Prepare",
    body: "Find stillness. Clear your space, dim the lights, and set an intention. The ritual begins before the flame.",
  },
  {
    num: "02",
    title: "Light",
    body: "Strike a match and meet the wick with care. Watch the flame bloom — a small act of creation, entirely your own.",
  },
  {
    num: "03",
    title: "Breathe",
    body: "Close your eyes. Let the fragrance unfold — top notes first, then the slow, warm heart. Inhale. Exhale. Arrive.",
  },
  {
    num: "04",
    title: "Release",
    body: "Let the scent carry what you carry. Burn time is your time. Guard it like the luxury it is.",
  },
];

export default function RitualSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="ritual"
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "#2B003B" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }}
      />

      {/* Ambient glow */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[700px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at right, rgba(212,175,55,0.05) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Two-column header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-20 md:mb-28">
          {/* Left — eyebrow + headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
              <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
                The Ritual
              </p>
            </motion.div>

            <motion.h2
              className="font-display font-light leading-[0.92]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: "#F8F4EC" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Slow Down.{" "}
              <em className="not-italic" style={{ color: "#D4AF37" }}>Light</em>{" "}
              Something.
            </motion.h2>
          </div>

          {/* Right — prose */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14px] md:text-[15px] leading-[2] font-light max-w-md lg:ml-auto"
            style={{ color: "rgba(248,244,236,0.5)" }}
          >
            In a world that demands more, a J'Nickae candle asks only that you
            arrive. Our ritual is not about productivity — it is about presence.
            Four steps. A few minutes. Entirely yours.
          </motion.p>
        </div>

        {/* Step cards + image */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 items-start">
          {/* Steps — 3 cols */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative pl-7"
                style={{ borderLeft: "1px solid rgba(212,175,55,0.12)" }}
              >
                {/* Number */}
                <p
                  className="font-display font-light mb-3 leading-none"
                  style={{ fontSize: "2.8rem", color: "rgba(212,175,55,0.12)" }}
                >
                  {step.num}
                </p>
                <p
                  className="text-[9px] tracking-[0.35em] uppercase mb-4 font-medium"
                  style={{ color: "#D4AF37" }}
                >
                  {step.title}
                </p>
                <p
                  className="text-[13px] leading-[1.85] font-light"
                  style={{ color: "rgba(248,244,236,0.45)" }}
                >
                  {step.body}
                </p>
                {/* hover accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-px origin-top"
                  initial={{ scaleY: 0 }}
                  whileHover={{ scaleY: 1 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: "#D4AF37" }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mood image — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 relative overflow-hidden"
            style={{ aspectRatio: "3/4", minHeight: "420px" }}
          >
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background: "linear-gradient(to bottom, rgba(43,0,59,0.15) 0%, rgba(43,0,59,0.6) 100%)",
              }}
            />
            {/* Parallax image */}
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-[-10%] w-[120%] h-[120%]"
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/hero-lifestyle.webp`}
                alt="Ritual mood"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ filter: "saturate(0.8) brightness(0.75)" }}
              />
            </motion.div>
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
              <div className="w-8 h-px mb-4" style={{ background: "rgba(212,175,55,0.5)" }} />
              <p
                className="font-display font-light italic"
                style={{ fontSize: "1.3rem", color: "rgba(248,244,236,0.75)", lineHeight: 1.4 }}
              >
                "A candle is a small sun
                <br />you get to hold."
              </p>
              <p className="mt-3 text-[9px] tracking-[0.3em] uppercase" style={{ color: "rgba(212,175,55,0.5)" }}>
                J'Nickae, Est. 2022
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom banner — burn care tips */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 md:mt-28 grid grid-cols-1 sm:grid-cols-3 gap-0"
          style={{ border: "1px solid rgba(212,175,55,0.1)" }}
        >
          {[
            { label: "First burn", value: "2–3 hours", note: "Allow full melt pool to form" },
            { label: "Trim wick to", value: "¼ inch", note: "Before every lighting" },
            { label: "Burn time", value: "Up to 50 hrs", note: "10 oz · coconut-soy wax" },
          ].map((tip, i) => (
            <div
              key={tip.label}
              className="px-8 py-8 flex flex-col gap-1"
              style={{
                borderRight: i < 2 ? "1px solid rgba(212,175,55,0.1)" : "none",
              }}
            >
              <p className="text-[9px] tracking-[0.35em] uppercase mb-2" style={{ color: "rgba(212,175,55,0.45)" }}>
                {tip.label}
              </p>
              <p
                className="font-display font-light"
                style={{ fontSize: "1.9rem", color: "#F8F4EC" }}
              >
                {tip.value}
              </p>
              <p className="text-[11px] font-light mt-1" style={{ color: "rgba(248,244,236,0.3)" }}>
                {tip.note}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.3), transparent)" }}
      />
    </section>
  );
}
