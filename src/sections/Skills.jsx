import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt } from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiPostman } from "react-icons/si";
import { fadeUp, staggerContainer, scaleIn } from "../utils/animations";

const barData = [
  { name: "JavaScript", level: 90 },
  { name: "React",      level: 85 },
  { name: "Node.js",    level: 85 },
  { name: "MongoDB",    level: 80 },
  { name: "HTML/CSS",   level: 90 },
  { name: "Express",    level: 82 },
];

const radarData = [
  { subject: "Frontend",      A: 88 },
  { subject: "Backend",       A: 85 },
  { subject: "Database",      A: 80 },
  { subject: "Auth/Security", A: 82 },
  { subject: "API Design",    A: 87 },
  { subject: "Deployment",    A: 75 },
];

const techStack = [
  { icon: <FaJs />,          label: "JavaScript", color: "#F7DF1E" },
  { icon: <FaReact />,       label: "React",      color: "#61DAFB" },
  { icon: <FaNodeJs />,      label: "Node.js",    color: "#68A063" },
  { icon: <SiExpress />,     label: "Express",    color: "#7a9bb5" },
  { icon: <SiMongodb />,     label: "MongoDB",    color: "#06b6d4" },
  { icon: <FaHtml5 />,       label: "HTML5",      color: "#E34F26" },
  { icon: <FaCss3Alt />,     label: "CSS3",       color: "#1572B6" },
  { icon: <SiTailwindcss />, label: "Tailwind",   color: "#38BDF8" },
  { icon: <FaGitAlt />,      label: "Git",        color: "#F05032" },
  { icon: <SiPostman />,     label: "Postman",    color: "#FF6C37" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f1628] border border-[#263358] rounded-lg px-3.5 py-2 text-[13px]">
      <p className="text-[#dde8f8] font-semibold">{label}</p>
      <p className="text-[#06b6d4]">{payload[0].value}%</p>
    </div>
  );
};

const Skills = () => (
  <section
    id="skills"
    className="relative py-[100px] border-t border-[#1a2540] bg-[#070b18] overflow-hidden"
  >
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none rounded-full"
      style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 70%)" }} />

    <div className="relative max-w-[1100px] mx-auto px-6">

      {/* Header */}
      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.12em] text-[#7c3aed] uppercase mb-3">
          02 / Skills
        </motion.p>
        <motion.h2 variants={fadeUp}
          className="font-display font-black leading-[1.1] tracking-[-0.025em] text-[#dde8f8]"
          style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
        >
          Technologies I<br />
          <span className="grad-text">work with.</span>
        </motion.h2>
      </motion.div>

      {/* Tech icon grid */}
      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-3 mb-12 tech-grid"
        style={{ gridTemplateColumns: "repeat(5, 1fr)" }}
      >
        {techStack.map(({ icon, label, color }) => (
          <motion.div
            key={label}
            variants={scaleIn}
            whileHover={{ y: -5, borderColor: color + "55", background: "#141d35" }}
            className="bg-[#0f1628] border border-[#1a2540] rounded-xl py-[18px] px-3 flex flex-col items-center gap-2 cursor-default transition-all duration-200"
          >
            <span className="text-[28px] leading-none" style={{ color }}>{icon}</span>
            <span className="text-[11px] text-[#6b82a8] font-semibold tracking-[0.02em]">{label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 charts-grid"
        style={{ gridTemplateColumns: "1fr 1fr" }}
      >
        {/* Bar */}
        <motion.div
          variants={fadeUp}
          className="bg-[#0f1628] border border-[#1a2540] rounded-2xl p-6"
        >
          <p className="font-display font-bold text-[14px] text-[#dde8f8] mb-5">Proficiency Levels</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barCategoryGap="35%">
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#6b82a8" }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#2e4060" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124,58,237,0.05)" }} />
              <Bar dataKey="level" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={900}>
                {barData.map((_, i) => (
                  <Cell key={i} fill={i % 2 === 0 ? "#7c3aed" : "#06b6d4"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Radar */}
        <motion.div
          variants={fadeUp}
          className="bg-[#0f1628] border border-[#1a2540] rounded-2xl p-6"
        >
          <p className="font-display font-bold text-[14px] text-[#dde8f8] mb-5">Skill Coverage</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1a2540" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "#6b82a8" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "#2e4060" }} tickCount={3} />
              <Radar
                name="Skills" dataKey="A"
                stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.15}
                isAnimationActive animationDuration={900}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>

    <style>{`
      .tech-grid   { grid-template-columns: repeat(5, 1fr) !important; }
      .charts-grid { grid-template-columns: 1fr 1fr !important; }
      @media (max-width: 800px) {
        .charts-grid { grid-template-columns: 1fr !important; }
      }
      @media (max-width: 500px) {
        .tech-grid { grid-template-columns: repeat(4, 1fr) !important; }
      }
    `}</style>
  </section>
);

export default Skills;
