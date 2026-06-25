import { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { INSTAGRAM, waLink } from "@/dados/conteudo";

/** Botão flutuante de WhatsApp, sempre acessível. Aparece após o hero. */
export default function WhatsAppFlutuante() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 hidden items-center gap-3 transition-all duration-300 sm:flex ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <a
        href={INSTAGRAM.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir Instagram"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FCAF45] text-2xl text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <FaInstagram />
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse-ring" aria-hidden />
        <FaWhatsapp className="relative z-10" />
      </a>
    </div>
  );
}
