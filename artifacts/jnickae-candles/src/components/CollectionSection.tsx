import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const products = [
  {
    id: 1,
    name: "Noir de Bois",
    subtitle: "Aged cedar · Black musk · Smoked amber",
    price: "$68",
    volume: "8 oz · 55 hrs",
    badge: "Bestseller",
    color: "from-[hsl(20,15%,12%)] to-[hsl(30,8%,8%)]",
    flame: "hsl(36,60%,50%)",
  },
  {
    id: 2,
    name: "Fleur Obscure",
    subtitle: "Violet leaf · Iris root · White labdanum",
    price: "$74",
    volume: "8 oz · 55 hrs",
    badge: "Limited",
    color: "from-[hsl(280,10%,12%)] to-[hsl(30,8%,8%)]",
    flame: "hsl(300,30%,60%)",
  },
  {
    id: 3,
    name: "Brûlé",
    subtitle: "Vanilla accord · Tonka bean · Sandalwood",
    price: "$68",
    volume: "8 oz · 55 hrs",
    badge: null,
    color: "from-[hsl(40,20%,12%)] to-[hsl(30,8%,8%)]",
    flame: "hsl(36,70%,55%)",
  },
  {
    id: 4,
    name: "Sel & Cendre",
    subtitle: "Sea salt · Vetiver · Grey amber",
    price: "$76",
    volume: "10 oz · 70 hrs",
    badge: "New",
    color: "from-[hsl(200,10%,12%)] to-[hsl(30,8%,8%)]",
    flame: "hsl(200,40%,60%)",
  },
];

function CandleIllustration({ flame, gradient }: { flame: string; gradient: string }) {
  return (
    <div className="relative w-full h-full flex items-end justify-center pb-8">
      <div
        className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20"
        style={{
          background: `radial-gradient(circle, ${flame} 0%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />
      <motion.div
        animate={{ scaleX: [1, 1.05, 0.98, 1], scaleY: [1, 0.97, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute"
        style={{ bottom: "calc(30% + 72px)", left: "50%", transform: "translateX(-50%)" }}
      >
        <svg width="18" height="32" viewBox="0 0 18 32" fill="none">
          <path
            d="M9 31C9 31 2 24 2 16C2 10 6 4 9 1C12 4 16 10 16 16C16 24 9 31 9 31Z"
            fill={flame}
            opacity="0.9"
          />
          <path
            d="M9 28C9 28 5 23 5 17C5 13 7 9 9 7C11 9 13 13 13 17C13 23 9 28 9 28Z"
            fill="hsl(45,90%,82%)"
            opacity="0.7"
          />
        </svg>
      </motion.div>

      <div className="relative">
        <svg width="90" height="120" viewBox="0 0 90 120" fill="none">
          <rect x="25" y="0" width="40" height="2" rx="1" fill="hsl(36,20%,25%)" />
          <rect x="20" y="2" width="50" height="80" rx="2" fill="hsl(36,10%,16%)" />
          <rect x="20" y="2" width="50" height="80" rx="2" fill="url(#jarGrad)" />
          <rect x="22" y="4" width="4" height="76" rx="1" fill="white" opacity="0.04" />
          <rect x="14" y="75" width="62" height="12" rx="2" fill="hsl(36,10%,13%)" />
          <rect x="14" y="75" width="62" height="12" rx="2" fill="url(#lidGrad)" />
          <defs>
            <linearGradient id="jarGrad" x1="20" y1="0" x2="70" y2="82" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(36,15%,18%)" />
              <stop offset="100%" stopColor="hsl(36,8%,10%)" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="14" y1="75" x2="76" y2="87" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="hsl(36,20%,22%)" />
              <stop offset="100%" stopColor="hsl(36,10%,14%)" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute inset-0 rounded"
          style={{
            background: `linear-gradient(135deg, ${gradient.replace("from-[", "").replace("] to-[", ",").replace("]", "")})`,
            opacity: 0.3,
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </div>
  );
}

export default function CollectionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="collection" ref={ref} className="relative py-28 md:py-40 px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(36,10%,18%)] to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[9px] tracking-[0.4em] uppercase text-[hsl(36,52%,57%)] mb-5">
              The Collection
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-light text-[hsl(36,40%,92%)] leading-tight">
              Scents that
              <br />
              <em className="italic">don't apologize.</em>
            </h2>
          </motion.div>

          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[10px] tracking-[0.3em] uppercase text-[hsl(36,52%,57%)] hover:text-[hsl(36,60%,70%)] transition-colors flex items-center gap-3 self-start md:self-auto"
          >
            View All
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[hsl(36,10%,14%)]">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(product.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative bg-[hsl(30,8%,7%)] cursor-pointer overflow-hidden"
            >
              <motion.div
                animate={{ opacity: hovered === product.id ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-b from-transparent to-[hsl(36,52%,57%,0.04)]"
              />

              <div className="relative h-72 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-60`} />
                <motion.div
                  animate={{ scale: hovered === product.id ? 1.03 : 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <CandleIllustration flame={product.flame} gradient={product.color} />
                </motion.div>
              </div>

              <div className="p-7 border-t border-[hsl(36,10%,13%)]">
                {product.badge && (
                  <span className="inline-block text-[8px] tracking-[0.3em] uppercase text-[hsl(36,52%,57%)] border border-[hsl(36,52%,57%,0.3)] px-2.5 py-1 mb-4">
                    {product.badge}
                  </span>
                )}
                <h3 className="font-display text-xl font-light text-[hsl(36,40%,92%)] mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="text-[11px] text-[hsl(36,12%,45%)] mb-5 tracking-wide leading-relaxed">
                  {product.subtitle}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-[hsl(36,52%,57%)] font-light">
                    {product.price}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-[hsl(36,12%,38%)]">
                    {product.volume}
                  </span>
                </div>

                <motion.button
                  animate={{ opacity: hovered === product.id ? 1 : 0, y: hovered === product.id ? 0 : 8 }}
                  transition={{ duration: 0.3 }}
                  className="w-full mt-5 bg-[hsl(36,52%,57%)] text-[hsl(30,8%,6%)] py-3 text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[hsl(36,60%,65%)] transition-colors duration-200"
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
