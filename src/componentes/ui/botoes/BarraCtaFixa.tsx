import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { waLink } from "@/dados/conteudo";

/**
 * Barra de CTA fixa no rodapé — só mobile. Aparece depois do hero.
 * No desktop usamos o botão flutuante (FloatingWhatsApp).
 */
export default function BarraCtaFixa() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-ink-500/60 bg-ink-900/90 px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-cream">Bora começar?</p>
          <p className="truncate text-xs text-cream/55">Resposta no WhatsApp, sem compromisso.</p>
        </div>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-blood px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white glow-red active:scale-95"
        >
          <FaWhatsapp className="text-base" /> Falar
        </a>
      </div>
    </div>
  );
}
