# Checklist de produção — subir domínio e rodar AD

O que já está pronto no código e o que ainda depende de compra/conta do cliente.

---

## ✅ Já feito

- **Imagens em WebP** — 16,2 MB → 2,3 MB (-86%). Build total: 17,1 MB → 3,2 MB.
  Fotos novas? Jogue em `public/img/` e rode `npm run img:webp` (converte, redimensiona pra no máx. 1600px e apaga o original).
  Exceção: `public/og.jpg` fica em JPG de propósito — o preview de link do WhatsApp/Facebook não renderiza WebP.
- **Rastreamento plugado** — `src/lib/rastreio.ts`. Carrega Meta Pixel, GA4 e Google Ads.
  Sem ID preenchido, nenhum script de terceiro é carregado.
- **Conversão automática no WhatsApp** — todo clique em link `wa.me` dispara `Contact` (Meta) e `contato_whatsapp` (Google), identificando qual CTA foi clicado. Não precisa instrumentar botão novo: se usar `waLink()`, já entra.
- **Cache headers** (`firebase.json`) — JS/CSS com hash cacheiam 1 ano, imagens 30 dias, `index.html` sem cache. Corta transferência repetida e reduz custo.

---

## 🔲 Falta fazer (nesta ordem)

### 1. Comprar o domínio
- `.com.br` → [registro.br](https://registro.br) (~R$40/ano)
- `.com` → Cloudflare ou Namecheap (~R$60/ano)

Hospedagem **não** precisa comprar: o Firebase Hosting já é a hospedagem.

### 2. Ligar o domínio no Firebase
Console do Firebase → Hosting → **Adicionar domínio personalizado** → seguir os registros DNS que ele mostrar.
SSL é emitido automático e de graça. Propagação leva de minutos a algumas horas.

### 3. Trocar o plano para Blaze
Console → Configurações → Uso e faturamento → **Blaze (pagamento por uso)**.

Motivo: o plano grátis (Spark) corta em 360 MB de transferência por dia. Com a página em 3,2 MB isso dá ~110 visitas/dia — tráfego pago estoura isso rápido e o site sai do ar até a meia-noite. No Blaze o mesmo volume custa centavos, e dá pra colocar alerta de orçamento.

### 4. Atualizar as URLs do site
No `index.html`, trocar **todas** as ocorrências de `https://landingpage-1d1b2.firebaseapp.com` pelo domínio final. São 6 lugares: `canonical`, `og:url`, `og:image`, `twitter:image` e 2 dentro do JSON-LD.

> Importante: `og:image` precisa de URL **absoluta**. Scraper de rede social não resolve caminho relativo.

### 5. Preencher os IDs de rastreamento
Em `src/dados/conteudo.ts`, bloco `TRACKING`:

| Campo | Onde pegar | Formato |
|---|---|---|
| `metaPixelId` | Meta → Gerenciador de Eventos → Fontes de dados | `1234567890` |
| `ga4Id` | GA4 → Admin → Fluxos de dados | `G-XXXXXXX` |
| `googleAdsId` | Google Ads → Ferramentas → Tags | `AW-123456789` |
| `googleAdsConversionLabel` | Google Ads → ação de conversão | `AbC-D_efGh` |

Pode preencher só os que for usar. Campo vazio = script não carrega.

### 6. Verificar o domínio no Meta Business
Meta Business Manager → Central de Segurança → **Domínios** → adicionar e verificar (meta tag ou DNS).
Sem isso o cliente não consegue configurar prioridade de eventos, o que trava otimização por conversão no iOS.

### 7. Deploy e conferência
```bash
npm run build
firebase deploy --only hosting
```

Depois, confirmar:
- **Meta Pixel Helper** (extensão do Chrome) → PageView dispara ao abrir, `Contact` dispara ao clicar no WhatsApp
- **Google Tag Assistant** → mesma checagem
- Preview do link: colar a URL numa conversa do WhatsApp e ver se o card aparece com imagem
- [PageSpeed Insights](https://pagespeed.web.dev/) no mobile

---

## Pendências de conteúdo (continuam abertas)

Ver [`CLIENTE-PENDENCIAS.md`](./CLIENTE-PENDENCIAS.md) — preço, depoimentos e métricas das transformações.
Rodar anúncio sem preço definido e com só 1 depoimento derruba conversão e encarece o clique.
