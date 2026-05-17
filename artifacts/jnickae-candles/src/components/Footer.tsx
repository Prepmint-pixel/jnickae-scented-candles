import { motion } from "framer-motion";

const footerLinks = {
  Shop: ["All Candles", "New Arrivals", "Bestsellers", "Gift Sets"],
  Brand: ["Our Story", "Ingredients", "Sustainability", "Press"],
  Support: ["Shipping", "Returns", "FAQ", "Contact"],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-[hsl(36,10%,12%)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 mb-20">
          <div className="md:col-span-1">
            <p className="font-display text-2xl font-light tracking-[0.12em] text-[hsl(36,40%,92%)] mb-5">
              J'Nickae
            </p>
            <p className="text-[12px] text-[hsl(36,12%,44%)] leading-relaxed font-light max-w-[200px]">
              Artisan candles for those who live with intention.
            </p>
            <div className="flex items-center gap-5 mt-8">
              {["Instagram", "Pinterest", "TikTok"].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-[8px] tracking-[0.25em] uppercase text-[hsl(36,12%,38%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[hsl(36,52%,57%)] mb-6">
                {category}
              </p>
              <ul className="space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-[hsl(36,12%,44%)] hover:text-[hsl(36,25%,75%)] transition-colors duration-300 font-light"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[hsl(36,10%,12%)] pt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.15em] text-[hsl(36,10%,32%)]">
            © {new Date().getFullYear()} J'Nickae Candles. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[10px] tracking-[0.15em] text-[hsl(36,10%,32%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300"
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
