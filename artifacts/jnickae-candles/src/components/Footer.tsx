import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  Shop: ["All Candles", "New Arrivals", "Bestsellers", "Gift Sets"],
  Brand: ["Our Story", "Ingredients", "Sustainability", "Press"],
  Support: ["Shipping", "Returns", "FAQ", "Contact"],
};

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {/* Top gold divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-px origin-left"
        style={{ background: "linear-gradient(to right, hsl(36,52%,57%,0.4), hsl(36,52%,57%,0.15), transparent)" }}
      />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-10 relative z-10">
        {/* Brand + links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 mb-24">
          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4"
          >
            <p
              className="font-display font-light tracking-[0.12em] text-[hsl(36,40%,92%)] mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              J'Nickae
            </p>
            <p className="text-[12px] md:text-[13px] text-[hsl(36,12%,40%)] leading-[1.9] font-light mb-10 max-w-[220px]">
              Artisan luxury candles for those
              who live with intention.
              New Orleans, Louisiana.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-6">
              {[
                { name: "Instagram", icon: "IG" },
                { name: "Pinterest", icon: "PT" },
                { name: "TikTok", icon: "TK" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href="#"
                  className="group relative flex items-center justify-center w-9 h-9 border border-[hsl(36,10%,18%)] text-[8px] tracking-widest text-[hsl(36,12%,38%)] hover:border-[hsl(36,52%,57%,0.4)] hover:text-[hsl(36,52%,57%)] transition-all duration-400"
                  aria-label={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], colIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 + colIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-7">
                <div className="w-4 h-px bg-[hsl(36,52%,57%,0.5)]" />
                <p className="text-[8px] tracking-[0.4em] uppercase text-[hsl(36,52%,57%)]">
                  {category}
                </p>
              </div>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group text-[12px] md:text-[13px] text-[hsl(36,10%,40%)] hover:text-[hsl(36,25%,72%)] transition-colors duration-300 font-light flex items-center gap-0 hover:gap-2"
                    >
                      <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[hsl(36,52%,57%,0.5)] text-[8px]">→</span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Large brand watermark */}
        <div className="relative mb-16">
          <div
            className="font-display font-light text-center select-none pointer-events-none overflow-hidden"
            style={{
              fontSize: "clamp(5rem, 18vw, 18rem)",
              color: "hsl(36,52%,57%,0.025)",
              lineHeight: 0.85,
              letterSpacing: "0.04em",
            }}
          >
            J'Nickae
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8"
          style={{ borderTop: "1px solid hsl(36,10%,11%)" }}
        >
          <p className="text-[9px] tracking-[0.2em] text-[hsl(36,8%,28%)]">
            © {new Date().getFullYear()} J'Nickae Candles. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] tracking-[0.2em] text-[hsl(36,8%,28%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
