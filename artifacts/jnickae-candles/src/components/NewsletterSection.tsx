import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.1, 0.9]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section
      ref={ref}
      className="relative py-40 md:py-64 px-6 md:px-12 overflow-hidden"
      style={{ background: "#3F0A57" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-center"
        style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4), transparent)" }}
      />

      {/* Background ambient glow */}
      <motion.div
        style={{ scale: glowScale }}
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
      >
        <div
          className="w-[900px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(212,175,55,0.07) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
      </motion.div>

      {/* Pulsing center glow */}
      <motion.div
        animate={{ opacity: [0.06, 0.13, 0.06] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)",
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
          <div
            className="w-12 md:w-24 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.4))" }}
          />
          <p className="text-[8px] md:text-[9px] tracking-[0.5em] uppercase" style={{ color: "#D4AF37" }}>
            The Inner Circle
          </p>
          <div
            className="w-12 md:w-24 h-px"
            style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.4))" }}
          />
        </motion.div>

        {/* Headline */}
        <h2
          className="font-display font-light leading-[0.9] mb-8"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)", color: "#F8F4EC" }}
        >
          {["Scent before", "everyone else."].map((line, i) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${i === 1 ? "italic" : ""}`}
              style={
                i === 1
                  ? { color: "#D4AF37", textShadow: "0 0 60px rgba(212,175,55,0.2)" }
                  : {}
              }
            >
              {line}
            </motion.span>
          ))}
        </h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[13px] md:text-[15px] mb-16 leading-[1.9] font-light max-w-sm mx-auto"
          style={{ color: "rgba(248,244,236,0.5)" }}
        >
          First access to new collections. Exclusive rituals. Notes from the studio.
          Join the few who notice everything.
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
                    className="w-full px-7 py-5 text-[13px] font-light tracking-wide outline-none transition-colors duration-400"
                    style={{
                      background: "rgba(43,0,59,0.6)",
                      borderTop: `1px solid ${focused ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.15)"}`,
                      borderLeft: `1px solid ${focused ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.15)"}`,
                      borderBottom: `1px solid ${focused ? "rgba(212,175,55,0.55)" : "rgba(212,175,55,0.15)"}`,
                      borderRight: "none",
                      color: "#F8F4EC",
                    }}
                    required
                  />
                  <motion.div
                    animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
                    className="absolute bottom-0 left-0 right-0 h-px origin-left"
                    style={{ background: "#D4AF37" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <button
                  type="submit"
                  className="px-10 py-5 text-[9px] tracking-[0.4em] uppercase font-medium whitespace-nowrap transition-colors duration-300"
                  style={{ background: "#D4AF37", color: "#2B003B", border: "1px solid #D4AF37" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#e2c04a")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
                >
                  Enter
                </button>
              </div>
              <p
                className="mt-5 text-[8px] tracking-[0.3em] uppercase"
                style={{ color: "rgba(248,244,236,0.25)" }}
              >
                No noise. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-sm mx-auto py-8 px-10 relative"
              style={{ border: "1px solid rgba(212,175,55,0.3)" }}
            >
              <p
                className="font-display italic font-light mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  color: "#D4AF37",
                  textShadow: "0 0 40px rgba(212,175,55,0.25)",
                }}
              >
                You're in.
              </p>
              <p
                className="text-[11px] tracking-wide font-light"
                style={{ color: "rgba(248,244,236,0.45)" }}
              >
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
        <div
          className="w-16 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.2))" }}
        />
        <div className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,55,0.3)" }} />
        <div
          className="w-16 h-px"
          style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.2))" }}
        />
      </motion.div>
    </section>
  );
}
