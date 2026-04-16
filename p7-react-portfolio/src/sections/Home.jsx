import { Link } from "react-router";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { fadeUp, staggerContainer } from "../utils/animations";

const Home = () => {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        {/* Avatar */}
        <motion.div variants={fadeUp} className="relative mb-6">
          <img
            src="/profile.jpg"
            alt="Robert Hao"
            className="w-36 h-36 mx-auto rounded-full object-cover ring-4 ring-emerald-500 ring-offset-4 ring-offset-slate-50"
          />
          <span className="absolute bottom-1 right-1 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
            Available
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          className="text-5xl font-bold text-slate-900 tracking-tight"
        >
          Robert <span className="text-emerald-600">Hao</span>
        </motion.h1>

        {/* Typewriter cycling roles */}
        <motion.div variants={fadeUp} className="mt-3 h-7">
          <TypeAnimation
            sequence={[
              "Full-Stack MERN Developer", 2200,
              "Backend Engineer", 2200,
              "React Developer", 2200,
              "API Builder", 2200,
            ]}
            repeat={Infinity}
            className="text-sm font-semibold text-emerald-600 uppercase tracking-widest"
          />
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-base text-slate-600 max-w-xl leading-relaxed"
        >
          Passionate about building scalable, user-focused web applications with
          secure authentication and responsive design. Currently based in the Philippines.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="/Robert_Byron_Hao_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition shadow-sm"
          >
            View Resume
          </motion.a>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/projects"
              className="inline-block bg-white text-slate-700 border border-slate-300 px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-50 transition shadow-sm"
            >
              See My Work
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/contact"
              className="inline-block bg-slate-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-900 transition shadow-sm"
            >
              Contact Me
            </Link>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div variants={fadeUp} className="mt-16 flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400 tracking-widest uppercase">Scroll to explore</p>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-4 rounded-full bg-emerald-300"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
