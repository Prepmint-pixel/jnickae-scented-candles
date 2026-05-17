import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-64 px-6 md:px-12 overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(30,8%,6%) 0%, hsl(30,10%,5%) 100%)" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(to right, transparent, hsl(36,52%,57%,0.3), transparent)" }}
      />

      {/* Background large ambient glow */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, hsl(36,52%,57%,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Pulsing center glow */}
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, hsl(36,52%,57%,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-5 mb-12"
        >
          <div className="w-12 md:w-24 h-px bg-gradient-to-r from-transparent to-[hsl(36,52%,57%,0.4)]" />
          <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase text-[hsl(36,52%,57%)]">
            The Inner Circle
          </p>
          <div className="w-12 md:w-24 h-px bg-gradient-to-l from-transparent to-[hsl(36,52%,57%,0.4)]" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-display font-light text-[hsl(36,40%,92%)] leading-[0.9] mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          {["Scent before", "everyone else."].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 1 ? "italic text-[hsl(36,52%,57%)]" : ""}`}
              style={i === 1 ? { textShadow: "0 0 60px hsl(36,52%,57%,0.15)" } : {}}
            >
              {line}
            </motion.span>
          ))}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-[15px] text-[hsl(36,12%,48%)] mb-16 leading-[1.9] font-light max-w-sm mx-auto"
        >
          First access to new collections. Exclusive rituals.
          Notes from the studio. Join the few who notice everything.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-0">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border border-[hsl(36,10%,20%)] border-r-0 sm:border-r-0 px-7 py-5 text-[13px] text-[hsl(36,25%,80%)] placeholder:text-[hsl(36,8%,32%)] outline-none transition-colors duration-400 focus:border-[hsl(36,52%,57%,0.6)] font-light tracking-wide"
                    required
                  />
                  {/* Focus underline */}
                  <motion.div
                    animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(36,52%,57%)] origin-left"
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <button
                  type="submit"
                  className="relative overflow-hidden bg-[hsl(36,52%,57%)] text-[hsl(30,8%,6%)] px-10 py-5 text-[9px] tracking-[0.4em] uppercase font-medium whitespace-nowrap hover:bg-[hsl(36,60%,64%)] transition-colors duration-300 border border-[hsl(36,52%,57%)]"
                >
                  Enter
                </button>
              </div>
              <p className="mt-5 text-[8px] tracking-[0.3em] uppercase text-[hsl(36,8%,30%)]">
                No noise. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-sm mx-auto py-8 px-10 border border-[hsl(36,52%,57%,0.25)] relative"
            >
              <div className="absolute inset-0 bg-[hsl(36,52%,57%,0.03)] rounded" />
              <p
                className="font-display italic text-[hsl(36,52%,57%)] font-light mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", textShadow: "0 0 40px hsl(36,52%,57%,0.2)" }}
              >
                You're in.
              </p>
              <p className="text-[11px] text-[hsl(36,12%,42%)] tracking-wide font-light">
                Expect something beautiful in your inbox.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom ornament */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none"
      >
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[hsl(36,52%,57%,0.2)]" />
        <div className="w-1 h-1 rounded-full bg-[hsl(36,52%,57%,0.3)]" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-[hsl(36,52%,57%,0.2)]" />
      </motion.div>
    </section>
  );
}
