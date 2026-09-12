<div align="center">

# 🔴 VINICIO CAMPOS — Consultoria Online de Treino

### _Treino inteligente • Suporte real • Resultado de verdade_

Landing page de alta conversão para consultoria online de treino — visual cinematográfico escuro, movimento conduzido por scroll e copy honesta de ponta a ponta.

<br/>

![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=black)
![Firebase Hosting](https://img.shields.io/badge/Deploy-Firebase_Hosting-FFCA28?logo=firebase&logoColor=black)

</div>

---

> _"Você não precisa fazer mais. Precisa fazer o **certo**, com método e acompanhamento."_

Página única (one-page) construída para um objetivo só: transformar visitante em conversa no WhatsApp. Sem promessa falsa, sem escassez inventada — prova real, enquadramento de valor e um caminho claro até o primeiro "oi".

---

## ⚡ Stack

| Camada | Ferramenta |
|---|---|
| Build / Dev | **Vite 5** |
| UI | **React 18** + **TypeScript** (strict, `noUnusedLocals`) |
| Estilo | **Tailwind CSS 3.4** (tema dark sob medida) |
| Animação | **GSAP 3** + **ScrollTrigger** (pin, scrub, reveal) |
| Rolagem suave | **Lenis** |
| Fundo 3D | **Three.js** (partículas, carregado sob demanda) |
| Ícones | **react-icons** |
| Hosting | **Firebase Hosting** (estático) |

---

## 🚀 Rodando localmente

```bash
# 1. instalar dependências
npm install

# 2. ambiente de desenvolvimento (hot reload)
npm run dev          # http://localhost:5173

# 3. build de produção (type-check + bundle em /dist)
npm run build

# 4. pré-visualizar o build
npm run preview

# 5. converter imagens novas de /public para WebP (roda depois de adicionar fotos)
npm run img:webp
```

> Requer **Node 18+**. O `build` roda `tsc --noEmit` antes do Vite — se o TypeScript reclamar, o build falha de propósito.

---

## 🧭 Estrutura

Todo o código é em **português** + alias `@/` → `src/`. **Conteúdo editável fica centralizado** em um único arquivo.

```
src/
├─ dados/conteudo.ts        ← ✍️  TODO O TEXTO/LINKS/IMAGENS DA PÁGINA
├─ App.tsx                  ← ordem das seções
├─ index.css               ← tema, tokens e utilitários Tailwind
├─ nucleo/gsap.ts          ← GSAP + ScrollTrigger + prefers-reduced-motion
├─ ganchos/
│  ├─ usarRolagemSuave.ts  ← Lenis
│  └─ usarLoopArrasto.ts   ← motor dos carrosséis (loop infinito + arraste + auto)
└─ componentes/
   ├─ secoes/              ← seções da página (Destaque, Resultados, Metodo…)
   ├─ ui/
   │  ├─ botoes/           ← CTAs, WhatsApp flutuante, barra fixa mobile
   │  ├─ animacoes/        ← Revelar, TituloAnimado, Contador, Assinatura
   │  ├─ efeitos/          ← Granulado, Partículas, Magnético, CartãoInclinado
   │  ├─ midia/            ← Comparador antes/depois, galerias, miniatura no cursor
   │  └─ layout/           ← CabecalhoSecao
   └─ mobile/              ← carrosséis específicos do celular
public/img/                ← imagens (acervo + before/after)
```

---

## ✍️ Editando o conteúdo (handoff do cliente)

**99% das mudanças de texto, links e fotos são feitas em `src/dados/conteudo.ts`** — não precisa mexer nos componentes. Principais blocos:

- `WHATSAPP` / `INSTAGRAM` — número (formato `55` + DDD + número) e perfil.
- `HERO`, `PAINS`, `SOLUTION`, `BENEFITS`, `METHOD`, `SERVICES`, `FOR_WHOM` — textos das seções.
- `RESULTS` — comparativos, transformações e before/after (provas reais).
- `TESTIMONIALS` — depoimentos (`enabled: false` desliga a seção).
- `PRICING` — preço (`revealPrice: false` = modo "sob consulta", manda pro WhatsApp).
- `SCARCITY` — faixa de vagas (`enabled: false` remove). **Nunca usar escassez falsa.**
- `FAQ`, `FINAL_CTA`, `FOOTER` — fechamento.

> As ações obrigatórias antes de publicar estão comentadas no topo do `conteudo.ts`. Pendências do cliente em [`CLIENTE-PENDENCIAS.md`](./CLIENTE-PENDENCIAS.md).

---

## 🎬 Detalhes de experiência

- **Scroll cinético** — a seção _Método_ prende na tela e as etapas correm na horizontal (GSAP pin + scrub) no desktop; no mobile vira carrossel que anda sozinho.
- **Carrosséis em loop infinito** — fotos e cards passam sozinhos e aceitam arraste (mouse e toque), sem "sumir" nas pontas (`usarLoopArrasto`).
- **Provas reais** — comparador antes/depois arrastável, transformações com métrica e depoimento.
- **Acabamento premium** — grão de filme, vinheta, partículas 3D no hero, cursor magnético, assinatura manuscrita e barra de progresso de leitura.
- **Acessibilidade** — respeita `prefers-reduced-motion` (animações congelam, conteúdo continua visível) e foco visível por teclado.
- **Mobile-first** — zero rolagem horizontal, CTAs fixos por breakpoint e interações adaptadas ao toque.
- **SEO / AI-SEO** — meta tags, Open Graph, canonical e JSON-LD (`ProfessionalService` + `FAQPage`).

---

## 🔥 Deploy (Firebase Hosting)

O build estático em `/dist` é publicado via Firebase Hosting (config em `firebase.json` / `.firebaserc`).

```bash
npm run build
firebase deploy --only hosting
```

> Precisa do **firebase-tools** (`npm i -g firebase-tools`) e de `firebase login`.

Para ativar o domínio próprio e rodar tráfego pago, siga [`PRODUCAO.md`](./PRODUCAO.md) — cobre domínio, plano Blaze, URLs absolutas e os IDs de Pixel/Ads.

---

## 🎨 Paleta

| Token | Cor | Uso |
|---|---|---|
| `blood` | `#e30613` | destaque / CTA / marca |
| `ink-900` | `#0b0b0d` | fundo base |
| `cream` | `#f4eedc` | texto |

Tipografia: **Anton** (display condensado), **Inter** (corpo), **Great Vibes** (assinatura).

---

<div align="center">

**Vinicio Campos** · Consultoria Online de Treino
_Coerência · Técnica · Ética_

</div>
