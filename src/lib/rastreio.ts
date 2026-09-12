import { TRACKING } from "@/dados/conteudo";

/**
 * Rastreamento para campanhas (Meta Ads / Google Ads).
 * Cada script só é injetado se o ID correspondente estiver preenchido
 * em TRACKING (conteudo.ts) — sem ID, nada carrega.
 */

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string };

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
  const fbq: Fbq = function (...args: unknown[]) {
    // antes do script carregar, as chamadas ficam na fila
    fbq.queue?.push(args);
  } as Fbq;
  fbq.queue = [];
  fbq.version = "2.0";
  window.fbq = fbq;
  window._fbq = fbq;

  injetarScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", id);
  window.fbq("track", "PageView");
}

function iniciarGoogle(ids: string[]) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (...args: unknown[]) {
    window.dataLayer?.push(args);
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
 * instrumentar cada botão. Usa o texto/aria-label do link como origem.
 */
export function observarCliquesWhatsApp() {
  const onClick = (e: MouseEvent) => {
    const alvo = e.target as Element | null;
    const link = alvo?.closest?.('a[href*="wa.me"]');
    if (!link) return;

    const origem =
      link.getAttribute("data-cta") ||
      link.getAttribute("aria-label") ||
      link.textContent?.trim().slice(0, 60) ||
      "link WhatsApp";

    rastrearContatoWhatsApp(origem);
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}
