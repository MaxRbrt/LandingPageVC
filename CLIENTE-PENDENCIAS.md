# Pendências do cliente (Vinicio) — pra fechar conversão

Tudo abaixo é o que falta **do Vinicio** pra página converter no máximo.
Cada item diz **onde** mexer em `src/dados/conteudo.ts`.

## 🔴 Alta prioridade (mais impacto em venda)

### 1. Preço / investimento
- **Onde:** `PRICING` em `conteudo.ts`.
- **O que pedir:** valor da consultoria (mensal ou pacote).
- **Como aplicar:**
  - Definiu o valor e quer exibir → `revealPrice: true` e preencha `amount`, `period`, `anchor`.
  - Prefere "valor sob consulta" → deixe `revealPrice: false` (a seção já funciona: mostra enquadramento + manda pro WhatsApp).
- **Status:** seção **Investimento** já no ar, sem número (modo sob consulta).

### 2. Depoimentos (4–6 reais)
- **Onde:** `TESTIMONIALS.items`.
- **O que pedir:** 4–6 prints/áudios de alunos **com autorização**.
- **Como aplicar:** copie o template comentado dentro de `items` e preencha `name`, `context`, `quote`.
- **Status:** só 1 hoje (Vitória). 1 depoimento converte pouco — meta é 4+.

### 3. Números nas transformações
- **Onde:** `RESULTS.transformacoes` (campo `metric`).
- **O que pedir:** métrica real de cada aluna — ex.: `−12 kg`, `−8 cm cintura`, `5 meses`.
- **Como aplicar:** preencha `metric` em cada card. Número converte mais que foto sozinha.
- **Status:** só Hevila tem (`−27 kg`).

## 🟡 Confirmar (honestidade / legal)

### 4. Escassez é real?
- **Onde:** `SCARCITY`.
- **Confirmar:** o atendimento 1:1 tem mesmo teto de vagas/mês?
  - Sim → ajuste o texto pro número real, mantenha `enabled: true`.
  - Não → `enabled: false` (some a faixa). **Nunca usar escassez falsa.**

### 5. Autorização de imagem
- Confirmar uso autorizado de TODAS as fotos de aluna em `/public/img`.

### 6. Política de garantia / cancelamento
- **Onde:** `FINAL_CTA.guarantee` e FAQ "E se não funcionar pra mim?".
- **Confirmar:** tem fidelidade? Como funciona cancelamento? Ajuste de texto pra bater com a realidade. Nada de prometer o que não cumpre.

## ✅ Já feito nesta rodada
- Seção **Pra quem é / não é** (qualifica o lead).
- Faixa de **Escassez 1:1** (push pro agora).
- Seção **Investimento** (preço, com modo "sob consulta" enquanto não há valor).
- Link "Investimento" no menu.
- **Selo de prova social no topo do hero** (estrelas + link Instagram) e **+500 animado** (count-up).
- **Garantia / risco-zero** no CTA final (card com escudo).
- **FAQ de objeção**: "Quanto custa", "E se eu não tiver tempo", "E se não funcionar / tem garantia".
