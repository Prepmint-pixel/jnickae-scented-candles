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
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="relative py-36 md:py-56 px-6 md:px-12 overflow-hidden">
      {/* Top section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, hsl(36,52%,57%,0.25), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div ref={titleRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-28 md:mb-40">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-7">
                <div className="w-8 h-px bg-[hsl(36,52%,57%,0.5)]" />
                <p className="text-[9px] tracking-[0.45em] uppercase text-[hsl(36,52%,57%)]">
                  The J'Nickae Promise
                </p>
              </div>
              <h2 className="font-display font-light text-[hsl(36,40%,92%)] leading-[0.95]"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)" }}>
                Made for those
                <br />
                who <em className="italic text-[hsl(36,52%,57%)]">notice</em>
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
              className="text-[13px] md:text-[15px] text-[hsl(36,12%,46%)] leading-[1.9] font-light max-w-md lg:ml-auto"
            >
              We hold the belief that a candle is not a commodity.
              It is a ritual object — chosen with intention, lit with purpose,
              and remembered long after the last wisp of smoke.
            </motion.p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[hsl(36,10%,13%)]">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.15 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[hsl(30,8%,6%)] p-12 md:p-14 xl:p-16 overflow-hidden"
            >
              {/* Background watermark number */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.14 }}
                className="absolute top-6 right-8 font-display font-light select-none pointer-events-none"
                style={{
                  fontSize: "clamp(6rem, 12vw, 10rem)",
                  color: "hsl(36,52%,57%,0.04)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                }}
              >
                {pillar.number}
              </motion.span>

              {/* Animated gold top border on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-[hsl(36,52%,57%)]"
                initial={{ scaleX: 0, originX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Number */}
              <p className="font-display text-[hsl(36,52%,57%,0.35)] font-light mb-10 text-sm tracking-widest">
                — {pillar.number}
              </p>

              {/* Title */}
              <h3
                className="font-display font-light text-[hsl(36,40%,92%)] leading-[1.05] mb-6"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
              >
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-[hsl(36,12%,48%)] leading-[1.85] font-light mb-10">
                {pillar.description}
              </p>

              {/* Detail tag */}
              <div className="flex items-center gap-3">
                <div className="w-4 h-px bg-[hsl(36,52%,57%,0.4)]" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[hsl(36,12%,38%)]">
                  {pillar.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 gap-px bg-[hsl(36,10%,13%)] border-t-0 mt-px"
        >
          {[
            { stat: "100%", label: "Natural wax" },
            { stat: "55–70", label: "Burn hours" },
            { stat: "∞", label: "Memories made" },
          ].map((item) => (
            <div
              key={item.stat}
              className="bg-[hsl(30,8%,6%)] py-8 px-10 flex items-center gap-5"
            >
              <span className="font-display text-2xl md:text-3xl text-[hsl(36,52%,57%)] font-light">
                {item.stat}
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[hsl(36,10%,38%)]">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
