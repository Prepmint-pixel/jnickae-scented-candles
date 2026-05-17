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
    <footer
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "#2B003B" }}
    >
      {/* Top gold divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="h-px origin-left"
        style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), rgba(212,175,55,0.15), transparent)" }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
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
              className="font-display font-light tracking-[0.12em] mb-5"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#F8F4EC" }}
            >
              J'Nickae
            </p>
            <p
              className="text-[12px] md:text-[13px] leading-[1.9] font-light mb-10 max-w-[220px]"
              style={{ color: "rgba(248,244,236,0.4)" }}
            >
              Artisan luxury candles for those who live with intention.
              Georgia.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/jnickae_scented_candles/",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  name: "TikTok",
                  href: "https://www.tiktok.com/@jnickae_scented_candles",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                    </svg>
                  ),
                },
                {
                  name: "Facebook",
                  href: "https://www.facebook.com/tantanevabless",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[17px] h-[17px]">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  ),
                },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={platform.name}
                  className="group relative flex items-center justify-center w-10 h-10 transition-all duration-500"
                  style={{
                    border: "1px solid rgba(212,175,55,0.18)",
                    color: "rgba(212,175,55,0.45)",
                    borderRadius: "2px",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.65)";
                    el.style.color = "#D4AF37";
                    el.style.boxShadow = "0 0 18px rgba(212,175,55,0.18), inset 0 0 14px rgba(212,175,55,0.05)";
                    el.style.background = "rgba(212,175,55,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(212,175,55,0.18)";
                    el.style.color = "rgba(212,175,55,0.45)";
                    el.style.boxShadow = "none";
                    el.style.background = "transparent";
                  }}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </motion.div>

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
                <div className="w-4 h-px" style={{ background: "rgba(212,175,55,0.5)" }} />
                <p className="text-[8px] tracking-[0.4em] uppercase" style={{ color: "#D4AF37" }}>
                  {category}
                </p>
              </div>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12px] md:text-[13px] font-light transition-colors duration-300"
                      style={{ color: "rgba(248,244,236,0.38)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.75)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.38)")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Large brand watermark */}
        <div className="relative mb-16 overflow-hidden">
          <div
            className="font-display font-light text-center select-none pointer-events-none"
            style={{
              fontSize: "clamp(5rem, 18vw, 18rem)",
              color: "rgba(212,175,55,0.03)",
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
          style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}
        >
          <p className="text-[9px] tracking-[0.2em]" style={{ color: "rgba(248,244,236,0.25)" }}>
            © {new Date().getFullYear()} J'Nickae Candles. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[9px] tracking-[0.2em] transition-colors duration-300"
                style={{ color: "rgba(248,244,236,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.25)")}
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
