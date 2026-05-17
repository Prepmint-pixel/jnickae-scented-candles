import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const base = import.meta.env.BASE_URL;

const products = [
  {
    id: 1,
    name: "Sandalwood Oil",
    tagline: "Warm, earthy depth — a meditation in wood and smoke.",
    notes: ["Sandalwood", "Cedarwood", "Warm Musk"],
    price: "$76",
    volume: "12 oz · 70 hrs",
    badge: "Bestseller",
    featured: true,
    img: `${base}assets/sandalwood-12oz.png`,
  },
  {
    id: 2,
    name: "Lavender",
    tagline: "Soft fields at twilight. Stillness.",
    notes: ["True Lavender", "Bergamot", "Amber"],
    price: "$68",
    volume: "10 oz · 55 hrs",
    badge: null,
    featured: false,
    img: `${base}assets/lavender-10oz.png`,
  },
  {
    id: 3,
    name: "Peppermint",
    tagline: "Crisp. Awakening. Unapologetically bold.",
    notes: ["Peppermint", "Cool Eucalyptus", "Light Musk"],
    price: "$68",
    volume: "10 oz · 55 hrs",
    badge: "New",
    featured: false,
    img: `${base}assets/peppermint-10oz.png`,
  },
  {
    id: 4,
    name: "Mango & Coconut",
    tagline: "Sun-soaked skin. Golden hour. Never leaving.",
    notes: ["Ripe Mango", "Coconut Milk", "Vanilla"],
    price: "$68",
    volume: "10 oz · 55 hrs",
    badge: "Limited",
    featured: false,
    img: `${base}assets/mango-coconut-10oz.png`,
  },
  {
    id: 5,
    name: "Eucalyptus",
    tagline: "The forest right after rain. Breathe deeply.",
    notes: ["Eucalyptus", "Mint", "White Cedar"],
    price: "$68",
    volume: "10 oz · 55 hrs",
    badge: null,
    featured: false,
    img: `${base}assets/eucalyptus-10oz.png`,
  },
];

function ProductCard({
  product,
  featured,
  delay,
  inView,
}: {
  product: (typeof products)[0];
  featured: boolean;
  delay: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col cursor-pointer overflow-hidden"
      style={{
        background: "#3F0A57",
        border: hovered ? "1px solid rgba(212,175,55,0.35)" : "1px solid rgba(212,175,55,0.1)",
        transition: "border-color 0.4s ease",
      }}
    >
      {/* Gold top accent on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{ background: "#D4AF37" }}
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 0.8 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Image area */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: featured ? "clamp(380px, 42vw, 560px)" : "clamp(240px, 24vw, 310px)" }}
      >
        {/* Purple backdrop */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #3F0A57 0%, #2B003B 100%)" }} />

        {/* Product image */}
        <motion.img
          src={product.img}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain object-center"
          style={{ padding: featured ? "1.5rem" : "1rem" }}
          animate={{ scale: hovered ? 1.04 : 1, y: hovered ? -6 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Glow under product */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-32 rounded-full"
          animate={{ opacity: hovered ? 0.45 : 0.2 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.25) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-10">
            <span
              className="text-[7px] tracking-[0.35em] uppercase px-3 py-1.5 font-medium"
              style={{
                color: "#D4AF37",
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(43,0,59,0.75)",
                backdropFilter: "blur(4px)",
              }}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div
        className="flex flex-col p-6 md:p-7 gap-4"
        style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
      >
        {/* Name */}
        <div>
          <h3
            className="font-display font-light leading-tight mb-1"
            style={{
              fontSize: featured ? "clamp(1.6rem, 2.5vw, 2.2rem)" : "clamp(1.3rem, 2vw, 1.6rem)",
              color: "#F8F4EC",
            }}
          >
            {product.name}
          </h3>
          <p
            className="text-[11px] italic font-light leading-relaxed"
            style={{ color: "rgba(248,244,236,0.45)" }}
          >
            {product.tagline}
          </p>
        </div>

        {/* Scent notes */}
        <div className="flex flex-wrap gap-1.5">
          {product.notes.map((note) => (
            <span
              key={note}
              className="text-[8px] tracking-[0.2em] uppercase px-2.5 py-1.5"
              style={{
                color: "rgba(212,175,55,0.7)",
                border: "1px solid rgba(212,175,55,0.15)",
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price row */}
        <div className="flex items-center justify-between pt-1">
          <span
            className="font-display font-light"
            style={{ fontSize: "1.4rem", color: "#D4AF37" }}
          >
            {product.price}
          </span>
          <span
            className="text-[8px] tracking-[0.25em] uppercase"
            style={{ color: "rgba(248,244,236,0.3)" }}
          >
            {product.volume}
          </span>
        </div>

        {/* Add to cart */}
        <motion.button
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full py-3.5 text-[9px] tracking-[0.35em] uppercase font-medium transition-colors duration-200"
          style={{ background: "#D4AF37", color: "#2B003B" }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const featured = products[0];
  const supporting = products.slice(1);

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
            className="flex flex-col items-start md:items-end gap-2 self-start md:self-auto"
          >
            <a
              href="#"
              className="group flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase transition-colors"
              style={{ color: "#D4AF37" }}
            >
              View All Scents
              <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="text-[8px] tracking-[0.2em]" style={{ color: "rgba(248,244,236,0.3)" }}>
              Free shipping on orders over $95
            </span>
          </motion.div>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-px" style={{ background: "rgba(212,175,55,0.08)" }}>
          {/* Featured — large left card */}
          <div className="lg:col-span-5">
            <ProductCard product={featured} featured delay={0.15} inView={inView} />
          </div>

          {/* Supporting — 2x2 right grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-px" style={{ background: "rgba(212,175,55,0.08)" }}>
            {supporting.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                featured={false}
                delay={0.22 + i * 0.1}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
