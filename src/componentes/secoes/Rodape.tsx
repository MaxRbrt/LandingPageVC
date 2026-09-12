import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BRAND, FOOTER, INSTAGRAM, waLink } from "@/dados/conteudo";
import Assinatura from "@/componentes/ui/animacoes/Assinatura";

export default function Rodape() {
  return (
    <footer className="border-t border-ink-500/60 bg-ink-900 py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Marca */}
          <div>
            <span className="font-display text-2xl uppercase tracking-wide text-cream">
              Vinicio<span className="text-blood">.</span>Campos
            </span>
            <p className="mt-2 max-w-xs text-sm text-cream/60">
              {BRAND.role}. {BRAND.tagline}.
            </p>
            <Assinatura className="mt-4" size="text-4xl" />
            <div className="mt-5 flex items-center gap-4">
              <a
                href={INSTAGRAM.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-lg text-cream/80 transition-colors hover:border-blood hover:text-blood"
              >
                <FaInstagram />
              </a>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-cta="rodape"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-500 text-lg text-cream/80 transition-colors hover:border-blood hover:text-blood"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Valores */}
          <div className="flex gap-8">
            {FOOTER.values.map((v) => (
              <span key={v} className="text-xs uppercase tracking-[0.25em] text-cream/50">
                {v}
              </span>
            ))}
          </div>
        </div>

        <div className="hairline my-8" />

        <div className="flex flex-col gap-3 text-xs text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl">{FOOTER.disclaimer}</p>
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
