import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { fadeUp, fadeRight, staggerContainer } from "../utils/animations";

const TECH_MARQUEE = [
  "JavaScript", "React", "Node.js", "Express", "MongoDB",
  "HTML5", "CSS3", "Tailwind CSS", "Git", "REST APIs",
  "JWT Auth", "MERN Stack", "Vite", "Postman",
];

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
  >
    {/* Violet orb — left */}
    <div className="absolute top-[12%] left-[-12%] w-[480px] h-[480px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, transparent 70%)" }} />
    {/* Cyan orb — right */}
    <div className="absolute bottom-[8%] right-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)" }} />

    <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full">

      {/* Two-column */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
        className="grid items-center gap-12 hero-grid"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        {/* ── Left: Text ─────────────────────────────── */}
        <div>
          {/* Status badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[rgba(6,182,212,0.3)] bg-[rgba(6,182,212,0.06)] text-xs font-medium text-[#06b6d4] tracking-[0.04em]">
              <span className="pulse-dot" />
              Available for work
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.div variants={fadeUp}>
            <p className="text-[clamp(14px,2vw,16px)] text-[#6b82a8] font-normal mb-3 tracking-[0.02em]">
              Hey there 👋 I'm
            </p>
            {/* NAME — Orbitron font */}
            <h1 className="font-display font-black leading-[1.05] tracking-[-0.02em] text-[#dde8f8] mb-2"
              style={{ fontSize: "clamp(40px, 7vw, 78px)" }}>
              Robert<br />
              <span className="grad-text">Hao</span>
            </h1>
          </motion.div>

          {/* Typewriter */}
          <motion.div variants={fadeUp} className="mb-5 h-8">
            <TypeAnimation
              sequence={[
                "Full-Stack MERN Developer", 2500,
                "Backend Engineer", 2500,
                "React Developer", 2500,
                "API Architect", 2500,
              ]}
              repeat={Infinity}
              className="font-display font-semibold text-[#06b6d4] tracking-[-0.01em]"
              style={{ fontSize: "clamp(15px, 2.5vw, 21px)" }}
            />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUp}
            className="text-[#6b82a8] max-w-[520px] leading-[1.8] mb-9"
            style={{ fontSize: "clamp(13px, 1.5vw, 15px)" }}
          >
            Frontend Engineer using HTML, CSS, JavaScript &amp; React.
            Backend using Node, Express, MongoDB &amp; JWT Auth.
            Building scalable, user-focused web apps based in the Philippines.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(124,58,237,0.45)" }}
              whileTap={{ scale: 0.97 }}
              href="/Robert_Byron_Hao_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline px-7 py-3 rounded-lg bg-[#7c3aed] text-white text-sm font-bold tracking-[0.02em] transition-all duration-200"
            >
              Open Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, borderColor: "#06b6d4", color: "#06b6d4" }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
              className="no-underline px-7 py-3 rounded-lg border-2 border-[#263358] text-[#6b82a8] text-sm font-semibold transition-all duration-200"
            >
              See My Work
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right: Profile image ──────────────────── */}
       <motion.div
  variants={fadeRight}
  className="relative hero-image-wrap flex justify-center items-center"
>
  {/* Glow behind image */}
  <div
    className="absolute w-[320px] h-[320px] rounded-full blur-3xl opacity-40"
    style={{
      background: "radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%)",
    }}
  />

  {/* Profile Image */}
  <img
    src="/profile-pic.png"
    alt="Robert Hao"
    className="relative z-10 w-[280px] h-[280px] object-contain drop-shadow-[0_0_25px_rgba(124,58,237,0.35)]"
  />
</motion.div>
      </motion.div>

      {/* Tech marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-12 border-t border-[#1a2540] pt-7 overflow-hidden"
        style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}
      >
        <div className="marquee-track">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mr-12 text-[13px] font-medium text-[#2e4060] tracking-[0.03em] whitespace-nowrap"
            >
              <span className="text-[10px] text-[#7c3aed]">◆</span>
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
    >
      <span className="text-[10px] tracking-[0.12em] text-[#2e4060] uppercase">scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        className="w-px h-8"
        style={{ background: "linear-gradient(to bottom, #7c3aed, transparent)" }}
      />
    </motion.div>

    <style>{`
      .hero-grid { grid-template-columns: 1fr auto !important; }
      .hero-image-wrap { display: block; }
      @media (max-width: 700px) {
        .hero-grid { grid-template-columns: 1fr !important; }
        .hero-image-wrap { display: none !important; }
      }
    `}</style>
  </section>
);

export default Hero;
