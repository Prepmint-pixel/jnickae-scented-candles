import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const details = [
  { label: "Founded", value: "2019" },
  { label: "Origin", value: "New Orleans" },
  { label: "Wax", value: "Coconut Soy" },
  { label: "Burn time", value: "70 hrs" },
];

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowX = useTransform(scrollYProgress, [0, 1], ["30%", "-10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section id="story" ref={ref} className="relative py-36 md:py-56 px-6 md:px-12 overflow-hidden">
      {/* Top divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 h-px origin-left"
        style={{ background: "linear-gradient(to right, transparent, hsl(36,52%,57%,0.2), transparent)" }}
      />

      {/* Moving glow */}
      <motion.div
        style={{ x: glowX, y: bgY }}
        className="absolute -right-40 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(36,52%,57%,0.07) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-28 xl:gap-36 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-[hsl(36,52%,57%,0.5)]" />
              <p className="text-[9px] tracking-[0.45em] uppercase text-[hsl(36,52%,57%)]">
                The Ritual
              </p>
            </div>

            <h2
              className="font-display font-light text-[hsl(36,40%,92%)] leading-[0.92] mb-12"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            >
              Born from
              <br />
              <em className="italic" style={{ color: "hsl(36,52%,57%)" }}>ceremony</em>
              <br />
              and memory.
            </h2>

            <div className="space-y-7 mb-14">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14px] md:text-[15px] text-[hsl(36,12%,50%)] leading-[1.9] font-light"
              >
                J'Nickae began in a New Orleans kitchen — a daughter learning her
                grandmother's ritual of lighting a candle before dinner. The scent
                of orange blossom and cedarwood became the smell of belonging.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="text-[14px] md:text-[15px] text-[hsl(36,12%,50%)] leading-[1.9] font-light"
              >
                We don't make candles to fill a room. We make them to fill
                a moment — the kind that stays with you for years after the
                flame has gone cold.
              </motion.p>
            </div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -16 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-14 pl-8"
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[hsl(36,52%,57%,0.6)] to-transparent" />
              <p
                className="font-display italic text-[hsl(36,30%,72%)] font-light leading-[1.5]"
                style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)" }}
              >
                "Scent is the only sense that bypasses thought
                and goes straight to feeling."
              </p>
            </motion.blockquote>

            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.56 }}
              className="group inline-flex items-center gap-4 text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[hsl(36,52%,57%)] hover:text-[hsl(36,60%,70%)] transition-colors"
            >
              Read Our Story
              <svg className="w-3 h-3 group-hover:translate-x-1.5 transition-transform duration-400" viewBox="0 0 12 12" fill="none">
                <path d="M1 6h10M6 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right — Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4"
          >
            {/* Main image panel */}
            <div
              className="relative overflow-hidden"
              style={{
                height: "clamp(340px, 40vw, 520px)",
                background: "linear-gradient(160deg, hsl(30,10%,10%) 0%, hsl(30,8%,6%) 100%)",
              }}
            >
              {/* Grid texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "linear-gradient(hsl(36,52%,57%) 1px, transparent 1px), linear-gradient(90deg, hsl(36,52%,57%) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />

              {/* Center candle scene */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Outer glow ring */}
                  <motion.div
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 -m-24 rounded-full"
                    style={{
                      background: "radial-gradient(circle, hsl(36,52%,57%,0.15) 0%, transparent 65%)",
                      filter: "blur(25px)",
                    }}
                  />

                  <svg width="160" height="240" viewBox="0 0 160 240" fill="none" className="relative z-10">
                    {/* Shadow */}
                    <ellipse cx="80" cy="228" rx="38" ry="10" fill="hsl(30,8%,3%)" opacity="0.8" />

                    {/* Jar body */}
                    <rect x="46" y="90" width="68" height="128" rx="5" fill="hsl(30,10%,13%)" />
                    <rect x="46" y="90" width="68" height="128" rx="5" fill="url(#storyJarGrad)" />

                    {/* Glass highlight */}
                    <rect x="49" y="93" width="8" height="122" rx="4" fill="white" opacity="0.04" />

                    {/* Label panel */}
                    <rect x="54" y="112" width="52" height="66" rx="3" fill="hsl(36,12%,15%,0.6)" />

                    {/* Label ornament */}
                    <rect x="62" y="122" width="36" height="0.75" fill="hsl(36,52%,57%)" opacity="0.5" />
                    <text x="80" y="143" fontFamily="serif" fontSize="9" fill="hsl(36,52%,57%)" opacity="0.7" textAnchor="middle" letterSpacing="3">J'N</text>
                    <rect x="62" y="160" width="36" height="0.75" fill="hsl(36,52%,57%)" opacity="0.3" />

                    {/* Lid */}
                    <rect x="40" y="195" width="80" height="18" rx="4" fill="hsl(30,10%,11%)" />
                    <rect x="40" y="195" width="80" height="8" rx="3" fill="white" opacity="0.03" />

                    {/* Wick */}
                    <line x1="80" y1="90" x2="80" y2="50" stroke="hsl(36,20%,32%)" strokeWidth="1.5" />

                    {/* Flame */}
                    <motion.g
                      animate={{ scaleX: [1, 1.12, 0.9, 1.06, 1], scaleY: [1, 0.93, 1.08, 0.96, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      style={{ transformOrigin: "80px 36px" }}
                    >
                      <path
                        d="M80 50C80 50 68 38 68 26C68 18 73 10 80 6C87 10 92 18 92 26C92 38 80 50 80 50Z"
                        fill="hsl(36,75%,55%)"
                        opacity="0.92"
                      />
                      <path
                        d="M80 46C80 46 72 37 72 27C72 21 75 15 80 12C85 15 88 21 88 27C88 37 80 46 80 46Z"
                        fill="hsl(45,95%,78%)"
                        opacity="0.75"
                      />
                      <path
                        d="M80 40C80 40 76 34 76 28.5C76 25 78 22 80 20C82 22 84 25 84 28.5C84 34 80 40 80 40Z"
                        fill="white"
                        opacity="0.45"
                      />
                    </motion.g>

                    {/* Flame glow */}
                    <motion.ellipse
                      animate={{ opacity: [0.4, 0.7, 0.4], ry: [14, 18, 14] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      cx="80" cy="30" rx="20" ry="14" fill="hsl(36,70%,55%)" opacity="0.08"
                      style={{ filter: "blur(8px)" }}
                    />

                    <defs>
                      <linearGradient id="storyJarGrad" x1="46" y1="90" x2="114" y2="218" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="hsl(36,14%,17%)" />
                        <stop offset="100%" stopColor="hsl(36,8%,9%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[hsl(30,8%,6%,0.9)] to-transparent">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-[hsl(36,52%,57%)]"
                  />
                  <span className="text-[9px] tracking-[0.35em] uppercase text-[hsl(36,12%,42%)]">
                    Handcrafted in small batches · New Orleans, LA
                  </span>
                </div>
              </div>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-4 gap-px bg-[hsl(36,10%,13%)]">
              {details.map((detail, i) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.09 }}
                  className="bg-[hsl(30,8%,6%)] px-4 py-6 text-center"
                >
                  <p className="text-[7px] tracking-[0.35em] uppercase text-[hsl(36,10%,36%)] mb-2">
                    {detail.label}
                  </p>
                  <p className="font-display text-base md:text-lg text-[hsl(36,40%,85%)] font-light leading-tight">
                    {detail.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
