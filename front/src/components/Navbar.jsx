import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";
import logoVerde from "../assets/logoVerde.png";

const navLinks = [
  { label: "Sobre mim", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Agende sua consulta", href: "/agendamento" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scroll } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const isAgendamentoPage = location.pathname === "/agendamento";

  const handleNavigate = (event, href, closeMobile = false) => {
    if (href?.startsWith("#")) {
      event.preventDefault();
      if (closeMobile) setMobileOpen(false);
      // Sempre navega via React Router para que o HashScroller seja o único responsável pelo scroll
      // Evita múltiplos timers acumulados e race conditions entre Navbar e HashScroller
      const doNavigate = () => navigate("/" + href);
      if (closeMobile) {
        setTimeout(doNavigate, 350);
      } else {
        doNavigate();
      }
    } else if (href?.startsWith("/")) {
      event.preventDefault();
      if (closeMobile) setMobileOpen(false);
      navigate(href);
    }
  };

  useEffect(() => {
		if (scroll) {
			const onScroll = args => {
				const sectionTrigger = window.innerHeight * 0.9;
				setScrolled(args.scroll.y >= sectionTrigger);
			};
			scroll.on("scroll", onScroll);
			return () => scroll.off("scroll", onScroll);
		} else {
			const onScroll = () => {
				const sectionTrigger = window.innerHeight * 0.9;
				setScrolled(window.scrollY >= sectionTrigger);
			};
			window.addEventListener("scroll", onScroll, { passive: true });
			return () => window.removeEventListener("scroll", onScroll);
		}
	}, [scroll]);

  return (
    <nav
      className={`${
        isAgendamentoPage ? "relative" : "fixed top-0 left-0 right-0 z-50"
      } transition-all duration-500 ${
        mobileOpen
          ? "bg-green-50 backdrop-blur-sm"
          : scrolled
          ? "justify-between px-2 items-center h-16 bg-white/10 backdrop-blur-sm"
          : isAgendamentoPage
          ? "bg-green-50"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-5 md:px-8 lg:px-14 xl:px-20 2xl:px-28 py-2 flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(event) => handleNavigate(event, "#inicio")}
          className="flex items-center gap-2 group"
        >
          <img src={logoVerde} alt="Lory Cavalcante" className="h-14 w-auto transition-transform group-hover:scale-105" />
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
              className={`text-sm font-poppins font-medium transition-colors ${
                isAgendamentoPage
                  ? 'text-green-900 hover:text-green-700'
                  : `${scrolled ? 'text-green-700' : 'text-white'} hover:text-gray-300`
              }`}
            >
              {link.label}
            </a>
          ))}
          
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className={`w-6 h-6 ${isAgendamentoPage || scrolled ? 'text-green-700' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${isAgendamentoPage || scrolled ? 'text-green-700' : 'text-white'}`} />}
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
                <button
                  key={link.href}
                  onClick={(event) => handleNavigate(event, link.href, true)}
                  className={`text-base font-medium transition-colors font-poppins text-left ${
                    isAgendamentoPage
                      ? 'text-green-700 hover:text-green-900'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}