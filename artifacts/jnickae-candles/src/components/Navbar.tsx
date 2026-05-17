import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollY = useMotionValue(0);
  const bgOpacity = useSpring(useTransform(scrollY, [0, 80], [0, 1]), {
    stiffness: 120,
    damping: 24,
  });

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  const links = ["Collection", "Story", "Ritual", "Journal"];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "hsl(30,8%,5%,0.92)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            opacity: bgOpacity as any,
            borderBottom: "1px solid hsl(36,10%,14%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Left links */}
          <motion.nav
            className="hidden md:flex items-center gap-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {links.slice(0, 2).map((link, i) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="group relative text-[9px] tracking-[0.3em] uppercase text-[hsl(36,10%,48%)] hover:text-[hsl(36,40%,80%)] transition-colors duration-400 font-medium py-1"
              >
                {link}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(36,52%,57%)] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </button>
            ))}
          </motion.nav>

          {/* Centered brand mark */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span
              className="font-display font-light tracking-[0.18em] text-[hsl(36,40%,92%)] select-none hover:text-[hsl(36,52%,57%)] transition-colors duration-500"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)" }}
            >
              J'Nickae
            </span>
          </motion.div>

          {/* Right links */}
          <motion.div
            className="hidden md:flex items-center gap-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {links.slice(2).map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="group relative text-[9px] tracking-[0.3em] uppercase text-[hsl(36,10%,48%)] hover:text-[hsl(36,40%,80%)] transition-colors duration-400 font-medium py-1"
              >
                {link}
                <span className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(36,52%,57%)] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </button>
            ))}
            <button className="text-[9px] tracking-[0.3em] uppercase border border-[hsl(36,52%,57%,0.35)] text-[hsl(36,52%,57%)] hover:bg-[hsl(36,52%,57%)] hover:text-[hsl(30,8%,6%)] transition-all duration-400 px-5 py-2.5 font-medium">
              Shop Now
            </button>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[hsl(36,25%,75%)] p-2 relative z-10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px bg-current w-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px bg-current w-3"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px bg-current w-full"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{
              background: "hsl(30,8%,5%,0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link)}
                  className="font-display text-3xl font-light text-[hsl(36,30%,78%)] hover:text-[hsl(36,52%,57%)] transition-colors duration-400 tracking-wide"
                >
                  {link}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-16 h-px bg-[hsl(36,52%,57%,0.3)] my-2"
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] tracking-[0.35em] uppercase border border-[hsl(36,52%,57%,0.5)] text-[hsl(36,52%,57%)] px-10 py-4"
              >
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
