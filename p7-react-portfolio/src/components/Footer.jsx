import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative z-10 border-t border-[#1a2540] py-7 px-6 bg-[#04060f]">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between flex-wrap gap-3">
        <p className="text-[12px] text-[#2e4060]">
          © {year}{" "}
          <span className="text-[#7c3aed] font-semibold">Robert Byron Hao</span>
          {" "}· Built with React &amp; Tailwind CSS
        </p>
        <div className="flex items-center gap-5">
          <p className="text-[11px] text-[#2e4060] tracking-[0.04em]">MERN · React · Node.js</p>
          <motion.button
            whileHover={{ scale: 1.1, color: "#7c3aed", borderColor: "#7c3aed" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollTop}
            aria-label="Back to top"
            className="bg-transparent border border-[#1a2540] text-[#2e4060] w-8 h-8 rounded-lg cursor-pointer text-[14px] flex items-center justify-center transition-all duration-200"
          >
            ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
