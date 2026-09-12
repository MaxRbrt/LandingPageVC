import { TRACKING } from "@/dados/conteudo";

/**
 * Rastreamento para campanhas (Meta Ads / Google Ads).
 * Cada script só é injetado se o ID correspondente estiver preenchido
 * em TRACKING (conteudo.ts) — sem ID, nada carrega.
 */

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: Fbq;
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function injetarScript(src: string) {
  const el = document.createElement("script");
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

function iniciarMetaPixel(id: string) {
  /*
   * Stub OFICIAL da Meta. NÃO simplificar.
   *
   * O detalhe que importa é o `callMethod ? ... : queue.push`. O fbevents.js
   * NÃO substitui window.fbq — ele só pendura um `.callMethod` nela e conta
   * com esse if para despachar os eventos.
   *
   * A versão anterior sempre empilhava na fila. Efeito: o PageView funcionava
   * (a fila é drenada uma vez quando o script carrega) e TODO evento posterior
   * — inclusive o Contact, que é a conversão do site — ficava preso na fila e
   * nunca era enviado, sem erro nenhum no console.
   */
  const n = function (...args: unknown[]) {
    // Reflect.apply e não spread: o snippet oficial amarra o `this` ao
    // próprio fbq (`n.callMethod.apply(n, arguments)`) e o fbevents.js conta
    // com isso.
    if (n.callMethod) Reflect.apply(n.callMethod, n, args);
    else n.queue?.push(args);
  } as Fbq;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  injetarScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function iniciarGoogle(ids: string[]) {
  window.dataLayer = window.dataLayer || [];
  /*
   * O gtag.js espera receber o objeto `arguments` cru no dataLayer, não um
   * array. Por isso o `function` normal com `arguments` em vez de rest
   * params — `(...args) => dataLayer.push(args)` empurra um Array e o
   * gtag.js ignora.
   */
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  injetarScript(`https://www.googletagmanager.com/gtag/js?id=${ids[0]}`);
  window.gtag("js", new Date());
  ids.forEach((id) => window.gtag?.("config", id));
}

let iniciado = false;

/** Carrega os pixels configurados. Seguro chamar mais de uma vez. */
export function iniciarRastreamento() {
  if (iniciado) return;
  iniciado = true;

  if (TRACKING.metaPixelId) iniciarMetaPixel(TRACKING.metaPixelId);

  const idsGoogle = [TRACKING.ga4Id, TRACKING.googleAdsId].filter(Boolean);
  if (idsGoogle.length) iniciarGoogle(idsGoogle);
}

/**
 * Conversão principal do site: o visitante foi pro WhatsApp.
 * `origem` identifica qual CTA foi clicado, pra saber o que converte.
 */
export function rastrearContatoWhatsApp(origem: string) {
  window.fbq?.("track", "Contact", { content_name: origem });
  window.gtag?.("event", "contato_whatsapp", { origem });

  const { googleAdsId, googleAdsConversionLabel } = TRACKING;
  if (googleAdsId && googleAdsConversionLabel) {
    window.gtag?.("event", "conversion", {
      send_to: `${googleAdsId}/${googleAdsConversionLabel}`,
    });
  }
}

/**
 * Captura todo clique em link do WhatsApp na página, sem precisar
 * instrumentar cada botão.
 *
 * ORDEM DO FALLBACK IMPORTA: `aria-label` vem por ÚLTIMO de propósito.
 * Todo CTA passa por <BotaoWhatsApp>, que usa o mesmo aria-label
 * ("Falar no WhatsApp") em todos eles — com o aria-label na frente do texto,
 * 7 CTAs diferentes reportavam a MESMA origem e era impossível saber qual
 * seção converte. `data-cta` continua sendo o mais confiável.
 */
export function observarCliquesWhatsApp() {
  const onClick = (e: MouseEvent) => {
    const alvo = e.target as Element | null;
    const link = alvo?.closest?.('a[href*="wa.me"]');
    if (!link) return;

    const origem =
      link.getAttribute("data-cta") ||
      link.textContent?.trim().slice(0, 60) ||
      link.getAttribute("aria-label") ||
      "link WhatsApp";

    rastrearContatoWhatsApp(origem);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
