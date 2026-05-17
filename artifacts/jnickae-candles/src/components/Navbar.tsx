import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Collection", "Story", "Ritual", "Journal"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[hsl(30,8%,6%)/95] backdrop-blur-md border-b border-[hsl(36,10%,16%)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <motion.nav
            className="hidden md:flex items-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {links.slice(0, 2).map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-[10px] tracking-[0.25em] uppercase text-[hsl(36,12%,52%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300 font-medium"
              >
                {link}
              </button>
            ))}
          </motion.nav>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-display text-xl md:text-2xl font-light tracking-[0.15em] text-[hsl(36,40%,92%)] cursor-pointer select-none"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              J'Nickae
            </span>
          </motion.div>

          <motion.div
            className="hidden md:flex items-center gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {links.slice(2).map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="text-[10px] tracking-[0.25em] uppercase text-[hsl(36,12%,52%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300 font-medium"
              >
                {link}
              </button>
            ))}
            <button className="text-[10px] tracking-[0.25em] uppercase border border-[hsl(36,52%,57%,0.4)] text-[hsl(36,52%,57%)] hover:bg-[hsl(36,52%,57%)] hover:text-[hsl(30,8%,6%)] transition-all duration-300 px-5 py-2 font-medium">
              Shop Now
            </button>
          </motion.div>

          <button
            className="md:hidden text-[hsl(36,25%,85%)] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5 w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-px bg-current"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-px bg-current"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-[hsl(30,6%,8%)] border-b border-[hsl(36,10%,16%)] md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-10">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link)}
                  className="text-[11px] tracking-[0.3em] uppercase text-[hsl(36,25%,85%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-300"
                >
                  {link}
                </motion.button>
              ))}
              <button className="text-[11px] tracking-[0.3em] uppercase border border-[hsl(36,52%,57%,0.5)] text-[hsl(36,52%,57%)] px-8 py-3 mt-2">
                Shop Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
