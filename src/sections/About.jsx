import { motion } from "framer-motion";
import { fadeUp, staggerContainer, scaleIn } from "../utils/animations";

const transferable = [
  { label: "Communication",       detail: "Clear explanation of technical concepts to diverse audiences." },
  { label: "Problem-Solving",     detail: "Efficient diagnosis and resolution of complex technical issues." },
  { label: "User-Centric Design", detail: "Building solutions with empathy and accessibility in mind." },
  { label: "Adaptability",        detail: "Quickly learning and applying new technologies in practice." },
];

const timeline = [
  { period: "2026",        title: "Full Stack Web Dev Program",                            org: "Uplift Code Camp · Batch 28",      type: "education" },
  { period: "2023–Present",title: "MERN Stack Developer",                                  org: "Freelance / Self-directed",         type: "work" },
  { period: "2021–2023",   title: "Fraud Analyst · Social Media Associate · Tech Support", org: "Concentrix · PCMOR · Alorica",      type: "work" },
  { period: "2021",        title: "B.S. Computer Science",                                 org: "Arellano University",               type: "education" },
];

const About = () => (
  <section
    id="about"
    className="relative py-[100px] border-t border-[#1a2540]"
  >
    {/* Accent orb */}
    <div className="absolute top-0 right-0 w-72 h-72 pointer-events-none rounded-full"
      style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

    <div className="max-w-[1100px] mx-auto px-6">

      {/* Section header */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.12em] text-[#7c3aed] uppercase mb-3">
          01 / About
        </motion.p>
        <motion.h2 variants={fadeUp}
          className="font-display font-black leading-[1.1] tracking-[-0.025em] text-[#dde8f8]"
          style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
        >
          From call centers<br />
          <span className="grad-text">to codebases.</span>
        </motion.h2>
      </motion.div>

      {/* Two-column: bio + timeline */}
      <div className="grid gap-12 mb-16 about-cols" style={{ gridTemplateColumns: "1fr 1fr" }}>

        {/* Bio */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUp} className="text-[#6b82a8] leading-[1.8] text-[15px] mb-5">
            I hold a{" "}
            <strong className="text-[#dde8f8]">B.S. in Computer Science</strong> from Arellano University
            and graduated from Uplift Code Camp's Full Stack Web Development program in 2026.
            My background spans BPO and IT, giving me a unique combination of communication skills
            and technical depth.
          </motion.p>
          <motion.p variants={fadeUp} className="text-[#6b82a8] leading-[1.8] text-[15px] mb-8">
            I transitioned into full-stack development driven by a genuine passion for building things
            that work elegantly. I specialize in the{" "}
            <strong className="text-[#06b6d4]">MERN stack</strong> — crafting RESTful APIs,
            implementing JWT authentication, and building responsive React UIs.
          </motion.p>

          <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
              whileTap={{ scale: 0.97 }}
              href="https://drive.google.com/file/d/1D2zMczpRA6wRBWD6UOePLEzMPrLUBeWV/view?usp=sharing/Robert_Byron_Hao_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline px-[22px] py-2.5 rounded-lg bg-[#7c3aed] text-white text-[13px] font-bold"
            >
              View Resume
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04, borderColor: "#06b6d4", color: "#06b6d4" }}
              whileTap={{ scale: 0.97 }}
              href="/Robert_Byron_Hao_Resume_2026.pdf"
              download
              className="no-underline px-[22px] py-2.5 rounded-lg border-2 border-[#263358] text-[#6b82a8] text-[13px] font-semibold transition-all duration-200"
            >
              Download PDF
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex gap-4 mb-6 pb-6 ${i < timeline.length - 1 ? "border-b border-[#1a2540]" : ""}`}
            >
              <div className="flex flex-col items-center pt-1">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={
                    item.type === "education"
                      ? { background: "#06b6d4", boxShadow: "0 0 8px #06b6d4" }
                      : { background: "transparent", border: "2px solid #7c3aed" }
                  }
                />
              </div>
              <div>
                <p className="text-[11px] text-[#7c3aed] font-bold tracking-[0.06em] mb-0.5">{item.period}</p>
                <p className="text-[14px] font-semibold text-[#dde8f8] mb-0.5 font-display leading-snug">{item.title}</p>
                <p className="text-[12px] text-[#6b82a8]">{item.org}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Transferable skills grid */}
      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 skills-grid-4"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {transferable.map(({ label, detail }) => (
          <motion.div
            key={label}
            variants={scaleIn}
            whileHover={{ y: -4, borderColor: "rgba(124,58,237,0.4)" }}
            className="p-5 rounded-xl border border-[#1a2540] bg-[#0f1628] transition-all duration-200 cursor-default"
          >
            <p className="text-[13px] font-bold text-[#7c3aed] mb-1.5 font-display">{label}</p>
            <p className="text-[12px] text-[#6b82a8] leading-[1.6]">{detail}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <style>{`
      .about-cols    { grid-template-columns: 1fr 1fr !important; }
      .skills-grid-4 { grid-template-columns: repeat(4, 1fr) !important; }
      @media (max-width: 800px) {
        .about-cols    { grid-template-columns: 1fr !important; }
        .skills-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
      }
      @media (max-width: 480px) {
        .skills-grid-4 { grid-template-columns: 1fr !important; }
      }
    `}</style>
  </section>
);

export default About;
