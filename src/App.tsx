import { useEffect } from "react";
import { usarRolagemSuave } from "@/ganchos/usarRolagemSuave";
import { ScrollTrigger } from "@/nucleo/gsap";
import { FAQ } from "@/dados/conteudo";

import BarraNavegacao from "@/componentes/secoes/BarraNavegacao";
import Destaque from "@/componentes/secoes/Destaque";
import Letreiro from "@/componentes/secoes/Letreiro";
import Dores from "@/componentes/secoes/Dores";
import Solucao from "@/componentes/secoes/Solucao";
import DivisorCinetico from "@/componentes/secoes/DivisorCinetico";
import Comparativo from "@/componentes/secoes/Comparativo";
import Beneficios from "@/componentes/secoes/Beneficios";
import Manifesto from "@/componentes/secoes/Manifesto";
import Sobre from "@/componentes/secoes/Sobre";
import Metodo from "@/componentes/secoes/Metodo";
import Servicos from "@/componentes/secoes/Servicos";
import Motivacao from "@/componentes/secoes/Motivacao";
import Resultados from "@/componentes/secoes/Resultados";
import Transformacao from "@/componentes/secoes/Transformacao";
import PerguntasFrequentes from "@/componentes/secoes/PerguntasFrequentes";
import ComoComecar from "@/componentes/secoes/ComoComecar";
import ChamadaFinal from "@/componentes/secoes/ChamadaFinal";
import Rodape from "@/componentes/secoes/Rodape";
import WhatsAppFlutuante from "@/componentes/ui/botoes/WhatsAppFlutuante";
import BarraCtaFixa from "@/componentes/ui/botoes/BarraCtaFixa";
import ProgressoRolagem from "@/componentes/ui/animacoes/ProgressoRolagem";
import Granulado from "@/componentes/ui/efeitos/Granulado";
import Precarregador from "@/componentes/ui/efeitos/Precarregador";

/** Injeta JSON-LD de FAQ (rich results / AI SEO) a partir do conteúdo. */
function useFaqSchema() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
}

export default function App() {
  usarRolagemSuave();
  useFaqSchema();

  // Recalcula posições do ScrollTrigger depois que imagens/layout assentam.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return (
    <>
      <Precarregador />
      <ProgressoRolagem />
      <Granulado />
      <BarraNavegacao />
      <main>
        <Destaque />
        <Letreiro />
        <Resultados />
        <Dores />
        <Solucao />
        <DivisorCinetico />
        <Comparativo />
        <Beneficios />
        <Manifesto />
        <Sobre />
        <Metodo />
        <Servicos />
        <Motivacao />
        <Transformacao />
        <PerguntasFrequentes />
        <ComoComecar />
        <ChamadaFinal />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <BarraCtaFixa />
    </>
  );
}
