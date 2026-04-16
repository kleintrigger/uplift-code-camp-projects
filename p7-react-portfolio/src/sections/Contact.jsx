import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { fadeUp, staggerContainer } from "../utils/animations";

// ---------------------------------------------------------------------------
// Replace with your real EmailJS credentials → https://emailjs.com
// ---------------------------------------------------------------------------
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
// ---------------------------------------------------------------------------

const socials = [
  { icon: <FaEnvelope />, label: "rbhao2006@gmail.com",      href: "mailto:rbhao2006@gmail.com" },
  { icon: <FaGithub />,   label: "github.com/kleintrigger",  href: "https://github.com/kleintrigger",  external: true },
  { icon: <FaLinkedin />, label: "linkedin.com/in/robert",   href: "https://www.linkedin.com/",        external: true },
];

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async () => {
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputCls = (err) =>
    `w-full px-4 py-3 rounded-xl bg-[#0f1628] text-[#dde8f8] text-[14px] outline-none transition-colors duration-200 font-[Outfit] ${
      err
        ? "border border-red-400/70 focus:border-red-400"
        : "border border-[#263358] focus:border-[#7c3aed]"
    }`;

  return (
    <section
      id="contact"
      className="relative py-[100px] pb-16 border-t border-[#1a2540] bg-[#070b18] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)" }} />

      <div className="relative max-w-[1100px] mx-auto px-6">

        {/* Header */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 text-center"
        >
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.12em] text-[#7c3aed] uppercase mb-3">
            04 / Contact
          </motion.p>
          <motion.h2 variants={fadeUp}
            className="font-display font-black leading-[1.1] tracking-[-0.025em] text-[#dde8f8] mb-4"
            style={{ fontSize: "clamp(30px, 5vw, 50px)" }}
          >
            Let's work<br />
            <span className="grad-text">together.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[15px] text-[#6b82a8] max-w-[480px] mx-auto leading-[1.7]">
            Have a project in mind or just want to say hello? My inbox is always open.
          </motion.p>
        </motion.div>

        {/* Two-column */}
        <div className="grid gap-12 items-start contact-cols" style={{ gridTemplateColumns: "1fr 1.4fr" }}>

          {/* Socials */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={fadeUp} className="text-[13px] text-[#6b82a8] leading-[1.7] mb-8">
              Based in the Philippines and open to remote opportunities worldwide.
              Whether you have a project, collaboration, or just want to connect — reach out!
            </motion.p>

            {socials.map(({ icon, label, href, external }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                whileHover={{ x: 4, color: "#06b6d4" }}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3.5 py-3.5 border-b border-[#1a2540] no-underline text-[#6b82a8] text-[13px] font-medium transition-all duration-200"
              >
                <span className="text-base text-[#7c3aed] flex-shrink-0">{icon}</span>
                {label}
                <span className="ml-auto text-xs opacity-50">↗</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0f1628] border border-[rgba(124,58,237,0.3)] rounded-2xl px-8 py-12 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] flex items-center justify-center mx-auto mb-4 text-[22px] text-[#7c3aed]">
                    ✓
                  </div>
                  <p className="font-display font-bold text-[18px] text-[#dde8f8] mb-2">Message sent!</p>
                  <p className="text-[13px] text-[#6b82a8] mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    onClick={() => setStatus("idle")}
                    className="bg-transparent border border-[#263358] text-[#6b82a8] px-5 py-2 rounded-lg cursor-pointer text-[12px] font-semibold tracking-[0.04em]"
                  >
                    Send another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit(onSubmit)}
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="bg-[#0f1628] border border-[#1a2540] rounded-2xl p-8 flex flex-col gap-5"
                >
                  <motion.div variants={fadeUp}>
                    <label className="block text-[12px] font-bold text-[#6b82a8] tracking-[0.05em] uppercase mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Robert Hao"
                      className={inputCls(errors.user_name)}
                      {...register("user_name", { required: "Name is required" })}
                    />
                    {errors.user_name && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.user_name.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="block text-[12px] font-bold text-[#6b82a8] tracking-[0.05em] uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className={inputCls(errors.user_email)}
                      {...register("user_email", {
                        required: "Email is required",
                        pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                      })}
                    />
                    {errors.user_email && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.user_email.message}</p>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="block text-[12px] font-bold text-[#6b82a8] tracking-[0.05em] uppercase mb-2">
                      Message
                    </label>
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`${inputCls(errors.message)} resize-none`}
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 10, message: "At least 10 characters" },
                      })}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-[11px] text-red-400">{errors.message.message}</p>
                    )}
                  </motion.div>

                  {status === "error" && (
                    <p className="text-[12px] text-red-400 text-center">
                      Something went wrong. Please try again or email me directly.
                    </p>
                  )}

                  <motion.div variants={fadeUp}>
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ scale: status === "sending" ? 1 : 1.02, boxShadow: "0 0 24px rgba(124,58,237,0.35)" }}
                      whileTap={{ scale: 0.97 }}
                      className={`w-full py-3.5 rounded-xl border-none bg-[#7c3aed] text-white text-[14px] font-bold tracking-[0.02em] font-[Outfit] transition-opacity duration-200 ${
                        status === "sending" ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                      }`}
                    >
                      {status === "sending" ? "Sending…" : "Send Message"}
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .contact-cols { grid-template-columns: 1fr 1.4fr !important; }
        @media (max-width: 700px) {
          .contact-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
