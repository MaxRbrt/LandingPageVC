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

> Domínio personalizado + SSL **funcionam no plano Spark (grátis)**. Não é
> preciso subir para o Blaze só por causa do domínio.

### 3. Trocar o plano para Blaze (antes de ligar a campanha)

Console → Configurações → Uso e faturamento → **Blaze (pagamento por uso)**.

**Como o limite do Spark realmente funciona** (doc oficial do Hosting):

> "Data transfer from the CDN to your end users is at no cost up to 10 GB/month."
>
> "If you are _not_ on the Blaze plan, and you reach the 10 GB/month limit of
> no-cost data transfer, we offer a short grace period but then your sites will
> be disabled. Your sites will remain disabled until the start of the next month."
>
> "You can reenable your sites immediately by upgrading to the Blaze plan."

Ou seja: a cota é **mensal (10 GB)**, não diária. Os "360 MB/dia" que aparecem
na página de preços são a mesma cota dividida por 30 — um pico de um dia não
derruba nada, mas quando os 10 GB do mês acabam o site fica **fora do ar até o
dia 1º do mês seguinte**. O único jeito de voltar antes é subir para o Blaze,
o que religa na hora.

**Transferência real por visita** (medido, cache frio, build de produção, só o
que o Firebase entrega — o Google Fonts vem de outro domínio e não conta):

| Cenário | Transferência |
|---|---|
| Mobile, saiu na primeira dobra | 501 KB |
| Mobile, rolou a página toda | 1,39 MB |
| Desktop, rolou tudo | ~2,1 MB |

Média de tráfego pago (maioria mobile): **~0,87 MB por visita**.

> ⚠️ Não use os 3,4 MB do `dist/` para essa conta: é o peso de TODOS os
> arquivos do build somados, não o que um visitante baixa.

**Quanto tempo os 10 GB duram:**

| Visitas/dia | Consumo/mês | Resultado |
|---|---|---|
| 100 | 2,6 GB | 26% da cota |
| 200 | 5,2 GB | 52% da cota |
| 390 | 10,2 GB | estoura no fim do mês |
| 500 | 13 GB | **cai por volta do dia 23** |
| 1.000 | 26 GB | **cai por volta do dia 12** |

**No Blaze:** os mesmos 10 GB/mês continuam grátis; o excedente sai a
US$ 0,15/GB. A 1.000 visitas/dia (26 GB/mês) isso dá ~US$ 2,40/mês.

**Alerta de orçamento:** Google Cloud → Billing → Budgets & alerts.
Atenção: o alerta **avisa, não corta**. Para teto duro de gasto, a alternativa
é Cloudflare Pages (banda ilimitada, sem cartão).

**Se ficar no Spark:** confira Firebase Console → Hosting → **Uso** toda semana.
Passou de ~7 GB no mês, sobe para o Blaze antes de bater no teto.

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
