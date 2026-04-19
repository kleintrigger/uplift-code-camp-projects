import { motion } from "framer-motion";

const ProjectCard = ({
  title,
  description,
  image,
  live,
  code,
  tags = [],
  onClick,
}) => (
  <motion.div
    whileHover={{ y: -6, borderColor: "rgba(124,58,237,0.4)" }}
    transition={{ duration: 0.25 }}
    className="bg-[#0f1628] border border-[#1a2540] rounded-2xl overflow-hidden flex flex-col cursor-default transition-colors duration-200"
  >
    {/* Image */}
    <div
      onClick={onClick}
      className="relative h-[180px] overflow-hidden bg-[#070b18] cursor-pointer group"
    >
      <motion.img
        src={image}
        alt={`${title} preview`}
        className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 60%, rgba(4,6,15,0.7) 100%)",
        }}
      />

      {/* Hover hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <span className="text-xs text-white bg-black/50 px-3 py-1 rounded-lg">
          Click to view
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5 pb-[22px] flex flex-col flex-grow">
      <h3 className="font-display font-bold text-[15px] text-[#dde8f8] mb-2 leading-snug">
        {title}
      </h3>

      <p className="text-[13px] text-[#6b82a8] leading-[1.65] flex-grow mb-4">
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-bold tracking-[0.04em] px-2 py-[3px] rounded border border-[#263358] text-[#2e4060] uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        {live && (
          <motion.a
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 18px rgba(124,58,237,0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // prevent modal trigger
            className="flex-1 text-center no-underline py-2.5 rounded-lg bg-[#7c3aed] text-white text-[12px] font-bold tracking-[0.02em] transition-all duration-200"
          >
            Live Demo
          </motion.a>
        )}

        {code && (
          <motion.a
            whileHover={{
              scale: 1.04,
              borderColor: "#06b6d4",
              color: "#06b6d4",
            }}
            whileTap={{ scale: 0.97 }}
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // prevent modal trigger
            className="flex-1 text-center no-underline py-2.5 rounded-lg border-2 border-[#263358] text-[#6b82a8] text-[12px] font-semibold transition-all duration-200"
          >
            Source Code
          </motion.a>
        )}
      </div>
    </div>
  </motion.div>
);

export default ProjectCard;