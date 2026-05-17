import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  {
    number: "01",
    title: "Slow Craft",
    description:
      "Each vessel is hand-poured in small batches. No shortcuts. No machines. Just patience, wax, and intention.",
    detail: "Small batch · Hand-poured",
  },
  {
    number: "02",
    title: "Rare Ingredients",
    description:
      "Oud from Assam. Violet leaf absolute. Black amber resin. We source only what cannot be replicated.",
    detail: "Single-origin botanicals",
  },
  {
    number: "03",
    title: "Clean Burn",
    description:
      "100% natural coconut-soy wax. Cotton wicks. Zero paraffin, zero compromise. Your air deserves better.",
    detail: "Coconut-soy · Cotton wick",
  },
];

export default function PromiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <section
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
        style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), rgba(212,175,55,0.15), transparent)" }}
      />

      {/* Background purple blob */}
      <div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"
        style={{
          background: "radial-gradient(circle, rgba(63,10,87,0.6) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={titleRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-28 md:mb-40">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
                <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
                  The J'Nickae Promise
                </p>
              </div>
              <h2
                className="font-display font-light leading-[0.95]"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", color: "#F8F4EC" }}
              >
                Made for those
                <br />
                who{" "}
                <em className="italic" style={{ color: "#D4AF37" }}>
                  notice
                </em>
                <br />
                everything.
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:flex items-end">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[13px] md:text-[15px] leading-[1.9] font-light max-w-md lg:ml-auto"
              style={{ color: "rgba(248,244,236,0.5)" }}
            >
              We hold the belief that a candle is not a commodity. It is a ritual
              object — chosen with intention, lit with purpose, and remembered long
              after the last wisp of smoke.
            </motion.p>
          </div>
        </div>

        {/* Pillar grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-px"
          style={{ background: "rgba(212,175,55,0.08)" }}
        >
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-12 md:p-14 xl:p-16 overflow-hidden"
              style={{ background: "#3F0A57" }}
            >
              {/* Watermark number */}
              <span
                className="absolute top-6 right-8 font-display font-light select-none pointer-events-none"
                style={{
                  fontSize: "clamp(5rem, 10vw, 9rem)",
                  color: "rgba(212,175,55,0.05)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {pillar.number}
              </span>

              {/* Hover top border */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "#D4AF37" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              <p
                className="font-display font-light mb-10 text-sm tracking-widest"
                style={{ color: "rgba(212,175,55,0.4)" }}
              >
                — {pillar.number}
              </p>

              <h3
                className="font-display font-light leading-[1.05] mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#F8F4EC" }}
              >
                {pillar.title}
              </h3>

              <p
                className="text-[13px] md:text-[14px] leading-[1.85] font-light mb-10"
                style={{ color: "rgba(248,244,236,0.5)" }}
              >
                {pillar.description}
              </p>

              <div className="flex items-center gap-3">
                <div className="w-4 h-px" style={{ background: "rgba(212,175,55,0.45)" }} />
                <span
                  className="text-[9px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(248,244,236,0.3)" }}
                >
                  {pillar.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-px mt-px"
          style={{ background: "rgba(212,175,55,0.08)" }}
        >
          {[
            { stat: "100%", label: "Natural wax" },
            { stat: "55–70", label: "Burn hours" },
            { stat: "∞", label: "Memories made" },
          ].map((item) => (
            <div
              key={item.stat}
              className="py-8 px-10 flex items-center gap-5"
              style={{ background: "#3F0A57" }}
            >
              <span
                className="font-display font-light"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)", color: "#D4AF37" }}
              >
                {item.stat}
              </span>
              <span
                className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "rgba(248,244,236,0.35)" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
