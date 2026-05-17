import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const base = import.meta.env.BASE_URL;

const scents = [
  {
    slug: "eucalyptus",
    name: "Eucalyptus",
    description: "Fresh herbal notes that create a calming spa-like atmosphere.",
    notes: ["Eucalyptus", "Cool Mint", "White Cedar"],
  },
  {
    slug: "lavender",
    name: "Lavender",
    description: "Soft floral relaxation crafted for calm evenings and peaceful spaces.",
    notes: ["True Lavender", "Bergamot", "Amber"],
  },
  {
    slug: "mango-coconut",
    name: "Mango & Coconut",
    description: "Creamy tropical sweetness blended with smooth island warmth.",
    notes: ["Ripe Mango", "Coconut Milk", "Vanilla"],
  },
  {
    slug: "peppermint",
    name: "Peppermint",
    description: "Crisp and refreshing with cool invigorating clarity.",
    notes: ["Peppermint", "Eucalyptus", "Light Musk"],
  },
  {
    slug: "sandalwood",
    name: "Sandalwood Oil",
    description: "Warm earthy richness with deep grounding elegance.",
    notes: ["Sandalwood", "Cedarwood", "Warm Musk"],
  },
];

const collections = [
  {
    size: "10 oz",
    price: "$10",
    burnTime: "55 hrs",
    label: "10 oz Collection",
    suffix: "10oz",
  },
  {
    size: "12 oz",
    price: "$12",
    burnTime: "70 hrs",
    label: "12 oz Collection",
    suffix: "12oz",
  },
];

function ProductCard({
  name,
  slug,
  description,
  notes,
  size,
  price,
  burnTime,
  suffix,
  delay,
  inView,
}: {
  name: string;
  slug: string;
  description: string;
  notes: string[];
  size: string;
  price: string;
  burnTime: string;
  suffix: string;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const imgSrc = `${base}assets/${slug}-${suffix}.webp`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col cursor-pointer overflow-hidden"
      style={{
        background: "#3F0A57",
        border: `1px solid ${hovered ? "rgba(212,175,55,0.4)" : "rgba(212,175,55,0.1)"}`,
        transition: "border-color 0.4s ease",
      }}
    >
      {/* Gold top accent on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{ background: "#D4AF37" }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.9 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Image area */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: "clamp(200px, 20vw, 280px)" }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #3F0A57 0%, #2B003B 100%)" }}
        />

        <motion.img
          src={imgSrc}
          alt={`${name} ${size} candle`}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ padding: "1rem" }}
          animate={{ scale: hovered ? 1.05 : 1, y: hovered ? -5 : 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Ambient glow under product */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full"
          animate={{ opacity: hovered ? 0.5 : 0.2 }}
          transition={{ duration: 0.7 }}
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.22) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
        />

        {/* Size badge */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-[7px] tracking-[0.3em] uppercase px-2.5 py-1"
            style={{
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.3)",
              background: "rgba(43,0,59,0.7)",
              backdropFilter: "blur(4px)",
            }}
          >
            {size}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div
        className="flex flex-col p-5 gap-3 flex-1"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        {/* Name */}
        <h3
          className="font-display font-light leading-tight"
          style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", color: "#F8F4EC" }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className="text-[11px] font-light leading-relaxed flex-1"
          style={{ color: "rgba(248,244,236,0.45)" }}
        >
          {description}
        </p>

        {/* Scent notes */}
        <div className="flex flex-wrap gap-1">
          {notes.map((note) => (
            <span
              key={note}
              className="text-[7px] tracking-[0.18em] uppercase px-2 py-1"
              style={{
                color: "rgba(212,175,55,0.65)",
                border: "1px solid rgba(212,175,55,0.13)",
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div
          className="flex items-center justify-between pt-2"
          style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}
        >
          <span
            className="font-display font-light"
            style={{ fontSize: "1.3rem", color: "#D4AF37" }}
          >
            {price}
          </span>
          <span
            className="text-[8px] tracking-[0.2em] uppercase"
            style={{ color: "rgba(248,244,236,0.28)" }}
          >
            {burnTime}
          </span>
        </div>

        {/* Add to cart — hover reveal */}
        <motion.button
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-3 text-[8px] tracking-[0.35em] uppercase font-medium transition-colors duration-200"
          style={{ background: "#D4AF37", color: "#2B003B" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#e2c04a")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <section
      id="collection"
      ref={ref}
      className="relative py-36 md:py-56 overflow-hidden"
      style={{ background: "#2B003B" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-7">
              <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
              <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
                The Collection
              </p>
            </div>
            <h2
              className="font-display font-light leading-[0.92]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", color: "#F8F4EC" }}
            >
              Scents that
              <br />
              <em className="italic" style={{ color: "#D4AF37" }}>don't apologize.</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="self-start md:self-auto flex flex-col items-start md:items-end gap-2"
          >
            <a
              href="#"
              className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: "#D4AF37" }}
            >
              Shop All
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="text-[8px] tracking-[0.2em]" style={{ color: "rgba(248,244,236,0.3)" }}>
              Free shipping on orders over $50
            </span>
          </motion.div>
        </div>

        {/* Two collection groups */}
        {collections.map((col, colIdx) => (
          <div key={col.suffix} className={colIdx === 1 ? "mt-20 md:mt-28" : ""}>
            {/* Collection label */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: colIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-5 mb-8 md:mb-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-px" style={{ background: "rgba(212,175,55,0.5)" }} />
                <span
                  className="text-[9px] tracking-[0.4em] uppercase font-medium"
                  style={{ color: "#D4AF37" }}
                >
                  {col.label}
                </span>
              </div>
              <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.07)" }} />
              <span
                className="font-display font-light text-xl"
                style={{ color: "rgba(212,175,55,0.5)" }}
              >
                {col.price}
              </span>
            </motion.div>

            {/* 5-column product grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px"
              style={{ background: "rgba(212,175,55,0.07)" }}
            >
              {scents.map((scent, i) => (
                <ProductCard
                  key={`${scent.slug}-${col.suffix}`}
                  name={scent.name}
                  slug={scent.slug}
                  description={scent.description}
                  notes={scent.notes}
                  size={col.size}
                  price={col.price}
                  burnTime={col.burnTime}
                  suffix={col.suffix}
                  delay={colIdx * 0.1 + i * 0.08}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
