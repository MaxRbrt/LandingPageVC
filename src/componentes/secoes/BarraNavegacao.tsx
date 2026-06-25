import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { gsap } from "@/nucleo/gsap";
import { BRAND, INSTAGRAM, NAV_LINKS, waLink } from "@/dados/conteudo";

/**
 * Nav fixa que se esconde ao rolar para baixo e reaparece ao subir,
 * ganhando fundo sólido fora do topo. Menu mobile em overlay.
 */
export default function BarraNavegacao() {
  const navRef = useRef<HTMLElement | null>(null);
  const lastY = useRef(0);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      const goingDown = y > lastY.current && y > 200;
      gsap.to(navRef.current, {
        y: goingDown && !open ? -120 : 0,
        duration: 0.4,
        ease: "power2.out",
      });
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return (
    <header
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-ink-500/60 bg-ink-900/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#topo" className="flex flex-col leading-none">
          <span className="font-display text-xl uppercase tracking-wide text-cream">
            Vinicio<span className="text-blood">.</span>Campos
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-ash">{BRAND.role}</span>
        </a>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative text-sm font-medium text-cream/80 transition-colors hover:text-cream after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-blood after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Ações */}
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden text-xl text-cream/80 transition-colors hover:text-blood sm:block"
          >
            <FaInstagram />
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-blood px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition-transform hover:scale-105 sm:inline-flex"
          >
            <FaWhatsapp /> Começar
          </a>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="text-2xl text-cream lg:hidden"
          >
            {open ? <HiX /> : <HiMenuAlt4 />}
          </button>
        </div>
      </nav>

      {/* Overlay mobile */}
      <div
        className={`overflow-hidden bg-ink-900/95 backdrop-blur-md transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-b border-ink-500/60" : "max-h-0"
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-lg font-medium text-cream/90"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-blood px-5 py-3 text-sm font-semibold uppercase text-white"
            >
              <FaWhatsapp /> Falar no WhatsApp
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
