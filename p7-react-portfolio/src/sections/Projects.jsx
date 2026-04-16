import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { fadeUp, staggerContainer, scaleIn } from "../utils/animations";

const projects = [
  {
    title: "Movie Rental Service",
    description:
      "A Node.js console app simulating a movie rental service. Demonstrates arrays, objects, and control flow managing movie availability and customer rentals.",
    image: "/project-1.png",
    tags: ["Node.js", "JavaScript", "CLI"],
    code: "https://github.com/kleintrigger/uplift-code-camp-projects/tree/main/p1-js-console-app",
  },
  {
    title: "HTML/CSS Portfolio",
    description:
      "A responsive personal portfolio built with HTML and CSS, showcasing personal branding and modern design principles.",
    image: "/project-2.png",
    tags: ["HTML5", "CSS3", "Responsive"],
    live: "https://roberts-html-css-portfolio.onrender.com",
    code: "https://github.com/kleintrigger/uplift-code-camp-projects/tree/main/p2-web-dev-portfolio",
  },
  {
    title: "Movie Guessing Game",
    description:
      "An interactive movie guessing game integrating TMDB API fetching and dynamic UI updates using vanilla JavaScript.",
    image: "/project-3.png",
    tags: ["JavaScript", "REST API", "DOM"],
    live: "https://movie-guessing-game-javascript-app.onrender.com",
    code: "https://github.com/kleintrigger/uplift-code-camp-projects/tree/main/p3-js-api-app",
  },
  {
    title: "Job Application Tracker",
    description:
      "A RESTful Node.js and Express application for managing job applications with full CRUD functionality and a clean UI.",
    image: "/project-4.png",
    tags: ["Node.js", "Express", "REST"],
    live: "https://roberts-job-application-tracking-node-app.onrender.com",
    code: "https://github.com/kleintrigger/uplift-code-camp-projects/tree/main/p4-node-app",
  },
  {
    title: "Nerd Tracker",
    description:
      "A React-based app for tracking personal entries with JWT authentication and client-side state management.",
    image: "/project-5.png",
    tags: ["React", "JWT", "Context API"],
    live: "https://p5-react-app-ezyn.onrender.com/",
    code: "https://github.com/kleintrigger/uplift-code-camp-projects/tree/main/p5-react-app",
  },
  {
    title: "GreenLoop Garbage Pickup (Team Project)",
    description:
      "A full-stack MERN application developed as part of a collaborative team project to streamline garbage pickup scheduling in local barangays. I worked as the Backend / Authentication Developer, responsible for designing and implementing secure JWT-based authentication, user management systems, and scalable REST API endpoints to support the application’s core functionality.",
    image: "/project-6.png",
    tags: ["MERN", "JWT Auth", "REST API", "MongoDB"],
    live: "https://greenloop-qhq7.onrender.com/",
  },
];

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // ESC key to close modal
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section
      id="projects"
      className="relative py-[100px] border-t border-[#1a2540]"
    >
      {/* Background glow */}
      <div
        className="absolute top-[20%] left-[-5%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 flex justify-between items-end flex-wrap gap-4"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold tracking-[0.12em] text-[#7c3aed] uppercase mb-3"
            >
              03 / Projects
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display font-black leading-[1.1] tracking-[-0.025em] text-[#dde8f8]"
              style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
            >
              Things I've
              <br />
              <span className="grad-text">built.</span>
            </motion.h2>
          </div>

          <motion.a
            variants={fadeUp}
            whileHover={{ scale: 1.04, color: "#06b6d4" }}
            href="https://github.com/kleintrigger"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-[13px] font-semibold text-[#6b82a8] flex items-center gap-1.5 transition-colors duration-200 pb-1 border-b border-[#263358]"
          >
            View all on GitHub →
          </motion.a>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-5 projects-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={scaleIn}>
              <ProjectCard
                {...project}
                onClick={() => setSelectedImage(project.image)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Viewer */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.img
            src={selectedImage}
            alt="Full preview"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90%] max-h-[85%] rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close Button */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white text-2xl font-bold bg-black/40 px-3 py-1 rounded-lg hover:bg-black/70 transition"
          >
            ✕
          </button>
        </div>
      )}

      {/* Responsive Grid */}
      <style>{`
        .projects-grid { grid-template-columns: repeat(3, 1fr) !important; }
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;