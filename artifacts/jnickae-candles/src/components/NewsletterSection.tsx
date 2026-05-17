import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section ref={ref} className="relative py-28 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(36,10%,18%)] to-transparent" />

      <motion.div
        animate={{ opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 50%, hsl(36,52%,57%,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[9px] tracking-[0.45em] uppercase text-[hsl(36,52%,57%)] mb-8">
            The Inner Circle
          </p>

          <h2 className="font-display text-4xl md:text-6xl font-light text-[hsl(36,40%,92%)] mb-6 leading-tight">
            Scent before
            <br />
            <em className="italic">everyone else.</em>
          </h2>

          <p className="text-[13px] md:text-[15px] text-[hsl(36,12%,50%)] mb-14 leading-relaxed font-light max-w-md mx-auto">
            First access to new collections. Exclusive rituals.
            Notes from the studio. Join the few who notice everything.
          </p>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="your@email.com"
                  className="w-full bg-[hsl(30,6%,10%)] border border-[hsl(36,10%,18%)] border-r-0 px-6 py-4 text-[13px] text-[hsl(36,25%,80%)] placeholder:text-[hsl(36,10%,35%)] outline-none transition-colors duration-300 focus:border-[hsl(36,52%,57%,0.5)]"
                  required
                />
                <motion.div
                  animate={{ scaleX: focused ? 1 : 0 }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-[hsl(36,52%,57%)] origin-left"
                  transition={{ duration: 0.3 }}
                />
              </div>
              <button
                type="submit"
                className="bg-[hsl(36,52%,57%)] text-[hsl(30,8%,6%)] px-8 py-4 text-[9px] tracking-[0.3em] uppercase font-medium hover:bg-[hsl(36,60%,65%)] transition-colors duration-300 whitespace-nowrap border border-[hsl(36,52%,57%)]"
              >
                Join
              </button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md mx-auto py-5 border border-[hsl(36,52%,57%,0.3)] px-8"
            >
              <p className="font-display text-xl text-[hsl(36,52%,57%)] font-light italic mb-1">
                You're in.
              </p>
              <p className="text-[12px] text-[hsl(36,12%,45%)] tracking-wide">
                Expect something beautiful in your inbox soon.
              </p>
            </motion.div>
          )}

          <p className="mt-6 text-[9px] tracking-[0.2em] uppercase text-[hsl(36,10%,32%)]">
            No noise. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
