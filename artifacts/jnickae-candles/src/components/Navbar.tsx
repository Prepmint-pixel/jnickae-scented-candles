import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollY = useMotionValue(0);
  const rawBg = useTransform(scrollY, [0, 80], [0, 1]);
  const bgOpacity = useSpring(rawBg, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const handleScroll = () => scrollY.set(window.scrollY);
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
            background: "rgba(43,0,59,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(212,175,55,0.12)",
            opacity: bgOpacity as any,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Left nav */}
          <motion.nav
            className="hidden md:flex items-center gap-9"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {links.slice(0, 2).map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="group relative text-[9px] tracking-[0.3em] uppercase font-medium py-1 transition-colors duration-300"
                style={{ color: "rgba(248,244,236,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.55)")}
              >
                {link}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                  style={{ background: "#D4AF37" }}
                />
              </button>
            ))}
          </motion.nav>

          {/* Brand mark */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer select-none"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span
              className="font-display font-light tracking-[0.18em] transition-colors duration-500"
              style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#F8F4EC" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#F8F4EC")}
            >
              J'Nickae
            </span>
          </motion.div>

          {/* Right nav */}
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
                className="group relative text-[9px] tracking-[0.3em] uppercase font-medium py-1 transition-colors duration-300"
                style={{ color: "rgba(248,244,236,0.55)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.55)")}
              >
                {link}
                <span
                  className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                  style={{ background: "#D4AF37" }}
                />
              </button>
            ))}
            <button
              className="text-[9px] tracking-[0.3em] uppercase font-medium px-5 py-2.5 transition-all duration-400"
              style={{ border: "1px solid rgba(212,175,55,0.4)", color: "#D4AF37" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#D4AF37";
                e.currentTarget.style.color = "#2B003B";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#D4AF37";
              }}
            >
              Shop Now
            </button>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 relative z-10"
            style={{ color: "rgba(248,244,236,0.8)" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-current"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="block h-px w-3 bg-current"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block h-px w-full bg-current"
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center"
            style={{ background: "rgba(43,0,59,0.98)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollTo(link)}
                  className="font-display font-light tracking-wide transition-colors duration-300"
                  style={{ fontSize: "2.2rem", color: "rgba(248,244,236,0.8)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.8)")}
                >
                  {link}
                </motion.button>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="w-16 h-px my-2"
                style={{ background: "rgba(212,175,55,0.3)" }}
              />
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-[10px] tracking-[0.35em] uppercase px-10 py-4 transition-all duration-300"
                style={{ border: "1px solid rgba(212,175,55,0.5)", color: "#D4AF37" }}
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
