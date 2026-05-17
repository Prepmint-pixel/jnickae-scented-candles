import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const posts = [
  {
    tag: "Craft",
    date: "May 2025",
    title: "Why We Use Coconut-Soy Wax (And Why It Matters)",
    excerpt:
      "Most candles you love are made with paraffin — a petroleum byproduct that releases toxins as it burns. We chose differently. Here's the science behind our clean burn.",
    readTime: "4 min read",
    accent: "#D4AF37",
  },
  {
    tag: "Ritual",
    date: "April 2025",
    title: "The Art of Scent Memory: How Fragrance Shapes Our Spaces",
    excerpt:
      "Fragrance is the fastest path to memory. A single note — sandalwood, eucalyptus, warm vanilla — can transport you across years. We explore the neuroscience of scent.",
    readTime: "6 min read",
    accent: "#D4AF37",
  },
  {
    tag: "Founder",
    date: "March 2025",
    title: "Small Batches, Big Intentions: The J'Nickae Story",
    excerpt:
      "Born in Georgia in 2022, J'Nickae was never meant to be a brand. It was meant to be a feeling — the one you get when a space finally feels like yours.",
    readTime: "5 min read",
    accent: "#D4AF37",
  },
];

export default function JournalSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <section
      id="journal"
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40"
      style={{ background: "#3F0A57" }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, rgba(212,175,55,0.5), rgba(212,175,55,0.15), transparent)" }}
      />

      {/* Left glow */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at left, rgba(212,175,55,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-7"
            >
              <div className="w-8 h-px" style={{ background: "rgba(212,175,55,0.55)" }} />
              <p className="text-[9px] tracking-[0.45em] uppercase" style={{ color: "#D4AF37" }}>
                The Journal
              </p>
            </motion.div>

            <motion.h2
              className="font-display font-light leading-[0.92]"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", color: "#F8F4EC" }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Stories of{" "}
              <em style={{ color: "#D4AF37", fontStyle: "italic" }}>Scent</em>
              <br />
              & Slow Living
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13px] font-light leading-relaxed max-w-xs md:text-right"
            style={{ color: "rgba(248,244,236,0.38)" }}
          >
            Craft, ritual, and the art of making a space feel like home.
          </motion.p>
        </div>

        {/* Post cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0"
          style={{ border: "1px solid rgba(212,175,55,0.1)" }}
        >
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col p-8 md:p-10 cursor-pointer transition-colors duration-500"
              style={{
                borderRight: i < 2 ? "1px solid rgba(212,175,55,0.1)" : "none",
                borderBottom: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Top meta row */}
              <div className="flex items-center justify-between mb-7">
                <span
                  className="text-[8px] tracking-[0.4em] uppercase px-3 py-1.5"
                  style={{
                    border: "1px solid rgba(212,175,55,0.22)",
                    color: "#D4AF37",
                  }}
                >
                  {post.tag}
                </span>
                <span
                  className="text-[9px] tracking-[0.2em]"
                  style={{ color: "rgba(248,244,236,0.25)" }}
                >
                  {post.date}
                </span>
              </div>

              {/* Issue number watermark */}
              <div
                className="font-display font-light select-none pointer-events-none mb-4"
                style={{
                  fontSize: "4.5rem",
                  lineHeight: 1,
                  color: "rgba(212,175,55,0.06)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3
                className="font-display font-light leading-[1.2] mb-5 group-hover:text-[#D4AF37] transition-colors duration-400"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.4rem)", color: "#F8F4EC" }}
              >
                {post.title}
              </h3>

              {/* Divider */}
              <div
                className="w-8 h-px mb-5 group-hover:w-16 transition-all duration-500"
                style={{ background: "rgba(212,175,55,0.35)" }}
              />

              {/* Excerpt */}
              <p
                className="text-[12px] md:text-[13px] leading-[1.85] font-light flex-1"
                style={{ color: "rgba(248,244,236,0.4)" }}
              >
                {post.excerpt}
              </p>

              {/* Footer row */}
              <div className="flex items-center justify-between mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}
              >
                <span className="text-[10px] tracking-[0.2em]" style={{ color: "rgba(248,244,236,0.22)" }}>
                  {post.readTime}
                </span>
                <div
                  className="flex items-center gap-2 text-[9px] tracking-[0.3em] uppercase font-medium group-hover:gap-3 transition-all duration-300"
                  style={{ color: "#D4AF37" }}
                >
                  Read
                  <svg
                    className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M1 6h10M6 1l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mt-14"
        >
          <button
            className="group flex items-center gap-4 text-[9px] tracking-[0.4em] uppercase font-medium transition-colors duration-400"
            style={{ color: "rgba(248,244,236,0.35)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,236,0.35)")}
          >
            <span
              className="w-10 h-px transition-all duration-400 group-hover:w-16"
              style={{ background: "currentColor", display: "inline-block" }}
            />
            View All Stories
            <span
              className="w-10 h-px transition-all duration-400 group-hover:w-16"
              style={{ background: "currentColor", display: "inline-block" }}
            />
          </button>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px origin-right"
        style={{ background: "linear-gradient(to left, rgba(212,175,55,0.5), rgba(212,175,55,0.15), transparent)" }}
      />
    </section>
  );
}
