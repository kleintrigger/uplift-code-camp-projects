import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/animations";

const Resume = () => {
  const resumeUrl = "/Robert_Byron_Hao_Resume_2026.pdf";

  return (
    <section
      id="resume"
      className="relative py-[100px] border-t border-[#1a2540] bg-[#070b18]"
    >
      <div className="max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-xs font-bold tracking-[0.12em] text-[#7c3aed] uppercase mb-3"
          >
            05 / Resume
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display font-black text-[#dde8f8]"
            style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
          >
            My <span className="grad-text">Resume</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-[#6b82a8] mt-3"
          >
            View my resume directly or download a copy.
          </motion.p>
        </motion.div>

        {/* PDF Viewer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border border-[#1a2540] bg-[#0f1628]"
        >
          <iframe
            src={resumeUrl}
            title="Resume"
            className="w-full"
            style={{ height: "700px" }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex justify-center gap-4 mt-6 flex-wrap"
        >
          {/* Open in new tab */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[#7c3aed] text-white text-sm font-bold no-underline hover:scale-105 transition"
          >
            Open Full Resume ↗
          </a>

          {/* Download */}
          <a
            href={resumeUrl}
            download="Robert_Byron_Hao_Resume_2026.pdf"
            className="px-6 py-3 rounded-lg border-2 border-[#263358] text-[#6b82a8] text-sm font-semibold no-underline hover:border-[#06b6d4] hover:text-[#06b6d4] transition"
          >
            Download PDF ⬇
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;