import React, { useState, useEffect } from "react";
import { Leaf, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";

const navLinks = [
  { label: "Sobre mim", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Agende sua consulta", href: "#contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scroll } = useScroll();

  const handleNavigate = (event, href, closeMobile = false) => {
    if (!href?.startsWith("#")) return;

    event.preventDefault();
    const target = document.querySelector(href);

    if (target && scroll) {
      scroll.scrollTo(target, { offset: -24, duration: 900 });
    } else if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (closeMobile) {
      setMobileOpen(false);
    }
  };

  useEffect(() => {
		if (!scroll) return;

		const onScroll = args => {
      const sectionTrigger = window.innerHeight * 0.9;
      setScrolled(args.scroll.y >= sectionTrigger);
		};

		scroll.on("scroll", onScroll);

		return () => {
			scroll.off("scroll", onScroll);
		};
	}, [scroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "justify-between px-2 items-center h-16 bg-white/10 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-5 md:px-8 lg:px-14 xl:px-20 2xl:px-28 py-8 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(event) => handleNavigate(event, "#inicio")}
          className="flex items-center gap-2 group"
        >
          <Leaf className="w-5 h-5 text-primary text-green-700 transition-transform group-hover:rotate-12" />
          {scrolled && <span className="font-raleway text-xl text-green-700 font-semibold tracking-tight text-foreground">
            Lory Cavalcante
          </span>}
        </a>

        <div className="hidden md:flex items-center gap-8 ">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => handleNavigate(event, link.href)}
              className={`text-sm font-poppins font-medium transition-colors hover:text-gray-300 ${scrolled ? 'text-green-700' : 'text-white'}`}
            >
              {link.label}
            </a>
          ))}
          
        </div>

        <button
          className="md:hidden text-foreground text-green-900 focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-sm text-green-700 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => handleNavigate(event, link.href, true)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}