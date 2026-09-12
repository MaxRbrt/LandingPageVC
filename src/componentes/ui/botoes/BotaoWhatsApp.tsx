import { FaWhatsapp } from "react-icons/fa";
import Botao from "@/componentes/ui/botoes/Botao";
import { waLink } from "@/dados/conteudo";

interface Props {
  children: React.ReactNode;
  message?: string;
  variant?: "primary" | "ghost";
  className?: string;
  /**
   * OBRIGATÓRIO: identifica de qual seção veio o clique no relatório de
   * conversão (Meta/GA4). Sem isso todos os CTAs colapsam numa linha só e
   * não dá pra saber o que converte.
   */
  origem: string;
}

/** CTA principal de conversão: abre o WhatsApp com mensagem pré-preenchida. */
export default function BotaoWhatsApp({
  children,
  message,
  variant = "primary",
  className,
  origem,
}: Props) {
  return (
    <Botao
      href={waLink(message)}
      external
      variant={variant}
      className={className}
      icon={<FaWhatsapp className="text-lg" />}
      ariaLabel="Falar no WhatsApp"
      dataCta={origem}
    >
      {children}
    </Botao>
  );
}
