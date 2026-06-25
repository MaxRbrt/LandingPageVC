import TituloAnimado from "@/componentes/ui/animacoes/TituloAnimado";

interface Props {
  kicker?: string;
  /** título; aceita "<br/>" para quebra e "<b>" para destaque */
  title: string;
  align?: "left" | "center";
  className?: string;
}

/** Cabeçalho de seção: rótulo (kicker) + título animado por palavra. */
export default function CabecalhoSecao({ kicker, title, align = "left", className = "" }: Props) {
  const lines = title.split("<br/>");
  return (
    <div className={`${align === "center" ? "flex flex-col items-center text-center" : ""} ${className}`}>
      {kicker && <span className="kicker mb-4">{kicker}</span>}
      <TituloAnimado lines={lines} />
    </div>
  );
}
