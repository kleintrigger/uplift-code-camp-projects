import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

const NavBar = () => {
  const [active, setActive]   = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const ids = NAV_LINKS.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-[#1a2540] bg-[rgba(4,6,15,0.88)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav("#home"); }}
            whileHover={{ scale: 1.04 }}
            className="no-underline flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-lg border-2 border-[#7c3aed] flex items-center justify-center font-display font-black text-sm text-[#7c3aed] tracking-tight">
              RH
            </div>
            <span className="font-display font-bold text-[15px] text-[#dde8f8] tracking-tight">
              Robert Hao
            </span>
          </motion.a>

          {/* Desktop nav */}
          <nav className="hide-mobile flex gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <motion.a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href); }}
                  whileHover={{ color: "#06b6d4" }}
                  className={`no-underline px-[14px] py-1.5 rounded-md text-[13px] font-medium tracking-[0.01em] transition-all duration-200 ${
                    isActive
                      ? "text-[#06b6d4] bg-[rgba(6,182,212,0.10)] border border-[rgba(6,182,212,0.2)]"
                      : "text-[#6b82a8] bg-transparent border border-transparent"
                  }`}
                >
                  {label}
                </motion.a>
              );
            })}
          </nav>

          {/* Resume btn — desktop */}
          <motion.a
            href="/Robert_Byron_Hao_Resume_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 0 22px rgba(124,58,237,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="hide-mobile no-underline px-[18px] py-[7px] rounded-lg border-2 border-[#7c3aed] text-[#7c3aed] text-xs font-bold tracking-[0.06em] uppercase transition-all duration-200 hover:bg-[rgba(124,58,237,0.1)]"
          >
            Resume
          </motion.a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile bg-transparent border-none cursor-pointer text-[#dde8f8] p-1.5"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="3" y1="13" x2="19" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[rgba(4,6,15,0.97)] backdrop-blur-2xl border-t border-[#1a2540] px-6 pb-6 pt-4"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                className={`block py-3 border-b border-[#1a2540] no-underline text-[15px] font-medium font-display ${
                  active === href.slice(1) ? "text-[#06b6d4]" : "text-[#6b82a8]"
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="/Robert_Byron_Hao_Resume_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-2.5 rounded-lg border-2 border-[#7c3aed] text-[#7c3aed] no-underline text-sm font-bold uppercase tracking-[0.04em]"
            >
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default NavBar;
