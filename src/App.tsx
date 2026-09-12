import { useEffect } from "react";
import { usarRolagemSuave } from "@/ganchos/usarRolagemSuave";
import { ScrollTrigger } from "@/lib/gsap";
import { iniciarRastreamento, observarCliquesWhatsApp } from "@/lib/rastreio";
import { FAQ } from "@/dados/conteudo";

import {
  BarraNavegacao,
  Destaque,
  Letreiro,
  Dores,
  Solucao,
  DivisorCinetico,
  Comparativo,
  Beneficios,
  Manifesto,
  Sobre,
  Metodo,
  Servicos,
  ParaQuem,
  Motivacao,
  Resultados,
  Transformacao,
  Investimento,
  PerguntasFrequentes,
  Escassez,
  ComoComecar,
  ChamadaFinal,
  Rodape,
} from "@/componentes/secoes";
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

  useEffect(() => {
    iniciarRastreamento();
    return observarCliquesWhatsApp();
  }, []);

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
        <ParaQuem />
        <Motivacao />
        <Transformacao />
        <Investimento />
        <PerguntasFrequentes />
        <Escassez />
        <ComoComecar />
        <ChamadaFinal />
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <BarraCtaFixa />
    </>
  );
}
