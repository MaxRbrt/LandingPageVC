# Landing Page — Vinicio Campos

Landing page de conversão para a consultoria online do treinador **Vinicio Campos**
(@viniciotreinador). Foco: público feminino, treino inteligente, suporte real,
conversão para **WhatsApp**.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS** (tema escuro premium: preto/grafite + vermelho `#E30613` + off-white)
- **GSAP + ScrollTrigger** (animações de entrada, parallax, contadores, linha de progresso)
- **Lenis** (smooth scroll sincronizado com o ScrollTrigger)
- **Three.js** (campo de partículas no hero — carregado sob demanda / lazy)

## Rodar

```bash
npm install
npm run dev       # desenvolvimento  -> http://localhost:5173
npm run build     # type-check + build de produção (dist/)
npm run preview   # serve o build
```

## Onde editar (importante)

**Todo o conteúdo fica em um único arquivo:** [`src/dados/conteudo.ts`](src/dados/conteudo.ts).
Textos, links, imagens, serviços, FAQ e depoimentos. Não é preciso mexer nos componentes.

### Antes de publicar — checklist

1. **WhatsApp:** conferir `WHATSAPP.phone` em `src/dados/conteudo.ts`
   (formato `55` + DDD + número, só dígitos). Hoje está `5514996384316` (DDD 14) — confirmar se é o número final.
2. **Instagram:** confirmar `INSTAGRAM` (handle/url).
3. **Imagens:** as fotos ficam em `public/img/` e `public/img/site-acervo/` (acervo do Instagram).
   Usar **apenas imagens autorizadas**. Para trocar, edite os caminhos em `src/dados/conteudo.ts`.
4. **Depoimentos:** preencher `TESTIMONIALS.items` e mudar `enabled: true`
   **somente com autorização explícita** das alunas.
5. **Domínio:** atualizar as URLs em `index.html` (canonical, og:image, JSON-LD).

## Estrutura de pastas

Tudo em `src/`, com nomes em **português** para facilitar a manutenção. O alias `@/`
aponta para `src/` (ex.: `import Botao from "@/componentes/ui/botoes/Botao"`).

- `dados/conteudo.ts` — todo o conteúdo editável (textos, links, imagens, FAQ, depoimentos)
- `nucleo/gsap.ts` — configuração central do GSAP/ScrollTrigger
- `ganchos/usarRolagemSuave.ts` — hook de smooth scroll (Lenis)
- `componentes/secoes/` — as seções da página (Destaque, Letreiro, Dores, Solucao, Sobre, Metodo, Resultados, …)
- `componentes/ui/` — peças reutilizáveis, agrupadas por função:
  - `botoes/` — Botao, BotaoWhatsApp, WhatsAppFlutuante, BarraCtaFixa
  - `animacoes/` — Revelar, TituloAnimado, Contador, ProgressoRolagem, Assinatura
  - `efeitos/` — Granulado, Precarregador, EfeitoMagnetico, CartaoInclinado, FundoParticulas
  - `midia/` — GaleriaArrastar, CarrosselFotos, ComparadorAntesDepois, FeedInstagram, FundoImagem, MiniaturaCursor
  - `layout/` — CabecalhoSecao

## Estrutura das seções

Hero → faixa (marquee) → Dores → Solução → Benefícios → Sobre → Método (4 etapas)
→ Serviços → Resultados → Transformação → FAQ → CTA final → Footer.
Botão flutuante de WhatsApp aparece após o hero.

## Acessibilidade / performance

- Respeita `prefers-reduced-motion` (desliga smooth scroll, partículas 3D e animações).
- Three.js sai do bundle principal (code-split) e pausa quando a aba fica oculta.
- Imagens com `loading="lazy"`.
- SEO: meta tags, Open Graph e JSON-LD (`ProfessionalService` + `FAQPage`).

> Aviso: resultados variam conforme adesão, rotina e individualidade.
> A página não substitui avaliação médica.
