import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Noir de Bois",
    tagline: "A walk through a damp forest at dusk.",
    notes: ["Aged Cedar", "Black Musk", "Smoked Amber"],
    price: "$68",
    volume: "8 oz",
    burnTime: "55 hrs",
    badge: "Bestseller",
    hue: "hsl(20,25%,11%)",
    flame: { outer: "hsl(36,70%,52%)", inner: "hsl(45,95%,78%)" },
    accent: "hsl(36,50%,52%)",
  },
  {
    id: 2,
    name: "Fleur Obscure",
    tagline: "The ghost of a garden never visited.",
    notes: ["Violet Leaf", "Iris Root", "White Labdanum"],
    price: "$74",
    volume: "8 oz",
    burnTime: "55 hrs",
    badge: "Limited",
    hue: "hsl(270,12%,11%)",
    flame: { outer: "hsl(300,35%,58%)", inner: "hsl(310,60%,85%)" },
    accent: "hsl(290,30%,65%)",
  },
  {
    id: 3,
    name: "Brûlé",
    tagline: "Sunday mornings. Slow. Sweet. Unhurried.",
    notes: ["Vanilla Accord", "Tonka Bean", "Sandalwood"],
    price: "$68",
    volume: "8 oz",
    burnTime: "55 hrs",
    badge: null,
    hue: "hsl(38,22%,12%)",
    flame: { outer: "hsl(36,75%,56%)", inner: "hsl(48,95%,80%)" },
    accent: "hsl(36,60%,58%)",
  },
  {
    id: 4,
    name: "Sel & Cendre",
    tagline: "Coastal air. Ash. The tide at 4 a.m.",
    notes: ["Sea Salt", "Vetiver", "Grey Amber"],
    price: "$76",
    volume: "10 oz",
    burnTime: "70 hrs",
    badge: "New",
    hue: "hsl(200,12%,11%)",
    flame: { outer: "hsl(200,45%,58%)", inner: "hsl(210,60%,88%)" },
    accent: "hsl(200,40%,62%)",
  },
];

function CandleIllustration({
  flame,
  hue,
  accent,
  isHovered,
}: {
  flame: { outer: string; inner: string };
  hue: string;
  accent: string;
  isHovered: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Wide atmospheric glow */}
      <motion.div
        animate={{ opacity: isHovered ? 0.35 : 0.18, scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 65%, ${flame.outer} 0%, transparent 70%)`,
          filter: "blur(35px)",
        }}
      />

      {/* Candle group */}
      <div className="relative">
        {/* Flame */}
        <motion.div
          animate={{
            scaleX: [1, 1.08, 0.95, 1.04, 1],
            scaleY: [1, 0.94, 1.06, 0.97, 1],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: "calc(100% + 2px)" }}
        >
          {/* Flame glow */}
          <motion.div
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 -m-6 rounded-full"
            style={{
              background: `radial-gradient(circle, ${flame.outer} 0%, transparent 70%)`,
              filter: "blur(8px)",
            }}
          />
          <svg width="22" height="38" viewBox="0 0 22 38" fill="none">
            <path
              d="M11 37C11 37 2 28 2 18C2 11 6.5 4 11 1C15.5 4 20 11 20 18C20 28 11 37 11 37Z"
              fill={flame.outer}
              opacity="0.92"
            />
            <path
              d="M11 33C11 33 6 26 6 19C6 14.5 8 10 11 8C14 10 16 14.5 16 19C16 26 11 33 11 33Z"
              fill={flame.inner}
              opacity="0.75"
            />
            <path
              d="M11 28C11 28 9 24 9 20.5C9 18 10 16 11 15C12 16 13 18 13 20.5C13 24 11 28 11 28Z"
              fill="white"
              opacity="0.45"
            />
          </svg>
        </motion.div>

        {/* Vessel */}
        <svg width="110" height="144" viewBox="0 0 110 144" fill="none">
          {/* Wick */}
          <rect x="53" y="8" width="4" height="16" rx="2" fill="hsl(30,20%,30%)" />

          {/* Lid */}
          <rect x="18" y="92" width="74" height="14" rx="3" fill={hue} />
          <rect x="22" y="92" width="66" height="7" rx="2" fill="hsl(36,20%,22%,0.3)" />

          {/* Jar body */}
          <rect x="22" y="24" width="66" height="70" rx="4" fill={hue} />

          {/* Glass shimmer left */}
          <rect x="24" y="26" width="6" height="66" rx="2" fill="white" opacity="0.04" />

          {/* Label area */}
          <rect x="30" y="40" width="50" height="38" rx="2" fill="hsl(36,15%,18%,0.5)" />

          {/* Decorative label lines */}
          <rect x="36" y="48" width="38" height="0.75" rx="0.5" fill={accent} opacity="0.5" />
          <rect x="36" y="54" width="22" height="0.75" rx="0.5" fill={accent} opacity="0.3" />
          <rect x="36" y="68" width="38" height="0.75" rx="0.5" fill={accent} opacity="0.2" />

          {/* Label brand mark diamond */}
          <rect
            x="53.5"
            y="58"
            width="6"
            height="6"
            rx="0.5"
            fill={accent}
            opacity="0.6"
            transform="rotate(45 56.5 61)"
          />

          {/* Base shadow */}
          <ellipse cx="55" cy="140" rx="28" ry="6" fill="hsl(30,8%,4%)" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="collection" ref={ref} className="relative py-36 md:py-56 overflow-hidden">
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(to right, transparent, hsl(36,52%,57%,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 md:mb-32 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="w-8 h-px bg-[hsl(36,52%,57%,0.5)]" />
              <p className="text-[9px] tracking-[0.45em] uppercase text-[hsl(36,52%,57%)]">
                The Collection
              </p>
            </div>
            <h2
              className="font-display font-light text-[hsl(36,40%,92%)] leading-[0.92]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
            >
              Scents that
              <br />
              <em className="italic">don't apologize.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="self-start md:self-auto flex flex-col items-start md:items-end gap-3"
          >
            <a
              href="#"
              className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[hsl(36,52%,57%)] hover:text-[hsl(36,60%,70%)] transition-colors"
            >
              View All Scents
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="text-[8px] tracking-[0.25em] text-[hsl(36,10%,35%)]">
              Free shipping on orders over $95
            </span>
          </motion.div>
        </div>
      </div>

      {/* Product grid — edge-to-edge with side padding */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(36,10%,13%)]">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-[hsl(30,8%,6%)] cursor-pointer flex flex-col"
            >
              {/* Accent top border on hover */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{ background: product.flame.outer }}
                animate={{ opacity: hovered === product.id ? 0.7 : 0, scaleX: hovered === product.id ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Image area */}
              <div
                className="relative overflow-hidden flex-shrink-0"
                style={{ height: "clamp(280px, 28vw, 340px)" }}
              >
                {/* Background color */}
                <div className="absolute inset-0" style={{ backgroundColor: product.hue }} />

                {/* Top vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-[hsl(30,8%,4%,0.6)] via-transparent to-transparent" />

                {/* Candle illustration */}
                <motion.div
                  animate={{ y: hovered === product.id ? -6 : 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <CandleIllustration
                    flame={product.flame}
                    hue={product.hue}
                    accent={product.accent}
                    isHovered={hovered === product.id}
                  />
                </motion.div>

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-5 left-5 z-10">
                    <span
                      className="text-[7px] tracking-[0.35em] uppercase px-3 py-1.5 font-medium"
                      style={{
                        color: product.accent,
                        border: `1px solid ${product.accent}40`,
                        background: "hsl(30,8%,6%,0.7)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Card content */}
              <div className="p-7 md:p-8 flex flex-col gap-4 border-t border-[hsl(36,10%,12%)] flex-1">
                {/* Name + tagline */}
                <div>
                  <h3
                    className="font-display font-light text-[hsl(36,40%,92%)] leading-tight mb-2"
                    style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[hsl(36,10%,40%)] italic font-light leading-relaxed">
                    {product.tagline}
                  </p>
                </div>

                {/* Scent notes */}
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="text-[8px] tracking-[0.2em] uppercase px-2.5 py-1.5 text-[hsl(36,10%,42%)] border border-[hsl(36,10%,16%)]"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Price row */}
                <div className="flex items-center justify-between pt-1">
                  <span
                    className="font-display font-light"
                    style={{ fontSize: "1.4rem", color: product.accent }}
                  >
                    {product.price}
                  </span>
                  <span className="text-[8px] tracking-[0.25em] uppercase text-[hsl(36,10%,35%)]">
                    {product.volume} · {product.burnTime}
                  </span>
                </div>

                {/* Add to cart — reveals on hover */}
                <motion.button
                  animate={{
                    opacity: hovered === product.id ? 1 : 0,
                    y: hovered === product.id ? 0 : 10,
                    pointerEvents: hovered === product.id ? "auto" : "none",
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full py-3.5 text-[9px] tracking-[0.3em] uppercase font-medium text-[hsl(30,8%,6%)] transition-colors duration-200"
                  style={{ background: product.accent }}
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
