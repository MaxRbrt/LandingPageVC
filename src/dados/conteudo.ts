/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL DA LANDING PAGE — Vinicio Campos
 * ============================================================
 *  Tudo que muda (textos, links, imagens, depoimentos) fica
 *  AQUI. Edite este arquivo, não os componentes.
 *
 *  >>> AÇÕES OBRIGATÓRIAS ANTES DE PUBLICAR <<<
 *   1. Troque WHATSAPP.phone pelo número real (formato 55 + DDD + número).
 *   2. Confirme o @ e a URL do Instagram.
 *   3. Substitua/aprove as imagens em /public/img (uso autorizado).
 *   4. Preencha os depoimentos reais (ou mantenha desativado).
 * ============================================================
 */

/* ----------------------- CONTATO ----------------------- */
export const WHATSAPP = {
  // número real (DDI 55 + DDD 14 + número), somente dígitos
  phone: "5514996384316",
  defaultMessage:
    "Oi Vinicio! Vim pela landing page e quero saber como funciona a consultoria online.",
};

export const INSTAGRAM = {
  handle: "@viniciotreinador",
  url: "https://www.instagram.com/viniciotreinador/",
};

/** Monta o link wa.me com mensagem pré-preenchida. */
export const waLink = (message: string = WHATSAPP.defaultMessage) =>
  `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(message)}`;

/* ----------------------- MARCA ----------------------- */
export const BRAND = {
  name: "Vinicio Campos",
  role: "Consultoria Online de Treino",
  tagline: "Treino inteligente • Suporte real",
};

/* ----------------------- NAV ----------------------- */
// Ordem segue a sequência vertical real das seções na página.
export const NAV_LINKS = [
  { label: "Resultados", href: "#resultados" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre", href: "#sobre" },
  { label: "Método", href: "#metodo" },
  { label: "FAQ", href: "#faq" },
  { label: "Começar", href: "#comecar" },
];

/* ----------------------- HERO ----------------------- */
export const HERO = {
  eyebrow: "Consultoria online • treino 1:1",
  // <b> destaca em vermelho (renderizado pelo componente)
  titleLines: ["Treino", "inteligente", "para quem", "quer", "<b>resultado</b>", "real"],
  subtitle:
    "Consultoria online com prescrição individual, suporte real e um processo pensado para a sua rotina, o seu corpo e o seu momento.",
  ctaPrimary: "Quero minha consultoria",
  ctaSecondary: "Ver o método",
  proof: "+500 alunos transformados",
  proofSub: "100% online e individual • acompanhamento 1:1",
  image: "/img/site-acervo/highlights-treinos/frames/treino-153_f2.jpg",
  imagePosition: "object-[50%_28%]",
  // Chips flutuantes sobre o retrato (prova rápida)
  badges: [
    { value: "+500", label: "alunos" },
    { value: "1:1", label: "acompanhamento" },
  ],
  whatsappMessage:
    "Oi Vinicio! Quero minha consultoria online. Pode me explicar como começar?",
};

/* Faixa em marquee abaixo do hero */
export const MARQUEE_ITEMS = [
  "Prescrição individual",
  "Progressão com critério",
  "Suporte real",
  "Treino masculino e feminino",
  "Emagrecimento com estratégia",
  "Hipertrofia",
  "Recomposição corporal",
  "Rotina real",
];

/* ----------------------- DORES ----------------------- */
export const PAINS = {
  kicker: "Por que você trava",
  title: "Não falta esforço.<br/>Falta um <b>processo certo</b>.",
  intro:
    "A maioria das pessoas não para de evoluir por preguiça. Para por seguir treinos aleatórios, dicas soltas e regras sem contexto.",
  items: [
    { icon: "shuffle", text: "Treinos aleatórios, sem objetivo nem progressão." },
    { icon: "noise", text: "Excesso de dicas soltas da internet, sem contexto." },
    { icon: "cardio", text: "Cardio em excesso achando que “mais” é melhor." },
    { icon: "swap", text: "Troca de treino toda semana, atrapalhando a adaptação." },
    { icon: "clock", text: "Rotina corrida ignorada por planilhas impossíveis." },
    { icon: "guilt", text: "Culpa por “falta de disciplina” que não é sua." },
  ],
  punch: "O efeito sanfona não é falha sua. É falta de método.",
};

/* ----------------------- SOLUÇÃO ----------------------- */
export const SOLUTION = {
  kicker: "A virada",
  title: "Um acompanhamento que <b>organiza o processo</b>",
  intro:
    "A consultoria online transforma tentativa e erro em direção. Em vez de mais um treino genérico, você ganha um processo conduzido do início ao resultado, seja homem ou mulher.",
  steps: [
    "Avalia sua rotina e seu nível atual de verdade.",
    "Prescreve um treino com objetivo claro para o seu momento.",
    "Ajusta a progressão na hora certa, sem trocar tudo à toa.",
    "Acompanha execução, adesão e evolução semana a semana.",
    "Corrige a rota antes de você pensar em desistir.",
  ],
};

/* ----------------------- SOZINHA x COM MÉTODO ----------------------- */
export const COMPARISON = {
  kicker: "A diferença na prática",
  title: "Por conta própria vs. <b>com método</b>",
  intro:
    "Não é falta de vontade. É a diferença entre tentar adivinhar e ter um processo te conduzindo.",
  leftLabel: "Por conta própria",
  rightLabel: "Com a consultoria",
  rows: [
    { left: "Treinos aleatórios da internet", right: "Treino prescrito pro seu nível e objetivo" },
    { left: "Troca tudo toda semana", right: "Progressão ajustada na hora certa" },
    { left: "Cardio em excesso por achismo", right: "Estratégia pra emagrecer com constância" },
    { left: "Dúvida na execução e ninguém pra perguntar", right: "Suporte real pra ajustar e tirar dúvida" },
    { left: "Motivação que some em duas semanas", right: "Constância porque o plano cabe na sua vida" },
    { left: "Efeito sanfona e recomeço eterno", right: "Resultado sustentável, sem recomeçar do zero" },
  ],
};

/* ----------------------- DIVISOR KINÉTICO ----------------------- */
export const KINETIC = {
  kicker: "A diferença",
  line1: "Menos achismo",
  line2: "Mais método",
};

/* ----------------------- BENEFÍCIOS ----------------------- */
export const BENEFITS = {
  kicker: "O que muda na prática",
  title: "Benefícios do <b>acompanhamento</b>",
  items: [
    {
      title: "Treino feito para a sua rotina",
      desc: "Nada de copiar planilha pronta. O treino parte do seu nível, tempo, objetivo e realidade.",
    },
    {
      title: "Progressão com critério",
      desc: "Você evolui com controle de carga, repetições, execução e ajustes no momento certo.",
    },
    {
      title: "Suporte real",
      desc: "Você não recebe só um treino. Recebe acompanhamento para entender o processo e manter constância.",
    },
    {
      title: "Menos tentativa e erro",
      desc: "Pare de seguir dicas soltas e comece a treinar com direção e clareza.",
    },
    {
      title: "Resultado sustentável",
      desc: "A meta não é só começar na empolgação. É construir um processo que você consiga manter.",
    },
    {
      title: "Mais constância",
      desc: "Quando o plano cabe na sua vida real, a constância deixa de depender só de força de vontade.",
    },
  ],
};

/* ----------------------- MANIFESTO ----------------------- */
export const MANIFESTO = {
  kicker: "A filosofia",
  // <b> destaca em vermelho
  lines: ["Treino não é punição.", "É <b>processo</b>: método,", "contexto e acompanhamento."],
  footer: "Pare de recomeçar do zero. Comece a evoluir com direção.",
};

/* ----------------------- SOBRE ----------------------- */
export const ABOUT = {
  kicker: "Quem te acompanha",
  title: "Eu já fui o aluno que <b>atendo hoje</b>",
  image: "/img/site-acervo/refeed_p03/2026-05-25_14-55-02_UTC_1.jpg",
  imagePosition: "object-[50%_38%]",
  paragraphs: [
    "Vinicio Campos é treinador e coach de consultoria online, com foco em treinos inteligentes, suporte real e transformações sustentáveis.",
    "Seu trabalho une conhecimento técnico, experiência prática e uma visão simples: a maioria das pessoas não precisa de mais culpa, precisa de um processo melhor.",
    "Depois de viver na própria pele os desafios de mudar o corpo, ele acompanha alunos e alunas que querem parar de recomeçar e evoluir com clareza, método e consistência.",
  ],
  stats: [
    { value: "+500", label: "alunos transformados" },
    { value: "100%", label: "online e individual" },
    { value: "1:1", label: "acompanhamento próximo" },
  ],
};

/* ----------------------- MÉTODO ----------------------- */
export const METHOD = {
  kicker: "Como funciona",
  title: "O método em <b>4 etapas</b>",
  steps: [
    {
      n: "01",
      title: "Diagnóstico",
      desc: "Entendemos rotina, objetivo, histórico e dificuldades reais antes de prescrever qualquer coisa.",
    },
    {
      n: "02",
      title: "Prescrição",
      desc: "Treino planejado para o seu nível atual e a sua meta, não uma planilha genérica.",
    },
    {
      n: "03",
      title: "Acompanhamento",
      desc: "Suporte, ajustes e orientação para você executar com técnica e manter constância.",
    },
    {
      n: "04",
      title: "Progressão",
      desc: "Evolução por carga, repetições, controle técnico e consistência, no momento certo.",
    },
  ],
};

/* ----------------------- SERVIÇOS ----------------------- */
export const SERVICES = {
  kicker: "Para o seu objetivo",
  title: "Consultoria <b>individual online</b>",
  intro:
    "Uma oferta, vários focos. O acompanhamento se adapta ao que você precisa agora.",
  // `thumb`: mini-foto que segue o cursor ao passar o mouse no item.
  items: [
    { tag: "Emagrecimento", desc: "Estratégia para emagrecer com consistência, sem efeito sanfona.", thumb: "/img/site-acervo/refeed_p08/2026-06-10_20-39-13_UTC_4.jpg" },
    { tag: "Hipertrofia", desc: "Ganho de massa e força com progressão bem conduzida.", thumb: "/img/site-acervo/highlights-treinos/frames/treino-75_f2.jpg" },
    { tag: "Treino feminino", desc: "Treino que respeita o corpo feminino, ciclo e recuperação.", thumb: "/img/site-acervo/refeed_p12/2026-06-05_14-02-08_UTC_10.jpg" },
    { tag: "Recomposição corporal", desc: "Reduzir gordura e construir músculo de forma sustentável.", thumb: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_1.jpg" },
    { tag: "Rotina corrida", desc: "Plano possível para trabalho, família e pouco tempo disponível.", thumb: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_5.jpg" },
    { tag: "Saúde e condicionamento", desc: "Mais disposição, força e qualidade de vida no dia a dia.", thumb: "/img/site-acervo/highlights-treinos/frames/treino-15_f2.jpg" },
  ],
};

/* ----------------------- RESULTADOS / PROVA SOCIAL ----------------------- */
export const RESULTS = {
  kicker: "Resultados reais",
  title: "Transformações com <b>contexto</b>",
  intro:
    "Fotos reais de alunas, bastidores de treino e conteúdos do próprio Vinicio. A prova aqui não é promessa: é contexto, rotina e método aplicado.",
  // Comparativos prontos (antes | depois lado a lado, estúdio limpo) — a prova mais fácil de ler num relance.
  comparativos: [
    {
      src: "/img/01_frente_comparativo.png",
      tag: "Frente",
      caption: "Mesma aluna, de frente. Antes e depois lado a lado.",
    },
    {
      src: "/img/04_lado_comparativo.png",
      tag: "Perfil",
      caption: "Mesma aluna, de perfil. Mudança de cintura e composição.",
    },
  ] as { src: string; tag: string; caption: string }[],
  // Mais transformações reais (recortadas dos posts "Resultados Team Campos", uso autorizado).
  // ➕ Novas: salve o antes|depois em /public/img/site-acervo/alunas/ e adicione aqui.
  transformacoes: [
    {
      src: "/img/site-acervo/alunas/card-hevila.jpg",
      name: "Hevila",
      context: "Venceu a obesidade",
      metric: "−27 kg",
      caption: "Perdeu 27 kg com método e constância — e hoje vive com mais saúde.",
    },
    {
      src: "/img/site-acervo/alunas/card-aluna01.jpg",
      context: "Emagrecimento com treino resistido",
      caption: "Emagrecimento sem flacidez, com treino resistido e plano individual.",
    },
    {
      src: "/img/site-acervo/alunas/card-erika.jpg",
      name: "Érika",
      context: "Voltou após a pandemia",
      caption: "Voltou após a pandemia e transformou corpo e mente.",
    },
    {
      src: "/img/site-acervo/alunas/card-karine.jpg",
      name: "Karine",
      context: "Pós-gestação",
      caption: "Pós-gestação: treino adaptado à rotina intensa de mãe.",
    },
    {
      src: "/img/site-acervo/alunas/card-igor.jpg",
      name: "Igor",
      context: "Hipertrofia e recomposição",
      caption: "Treino full body e constância: corpo mais seco, mais músculo e melhor postura.",
    },
    {
      src: "/img/site-acervo/alunas/card-vinicio.jpg",
      name: "Vinicio",
      context: "O próprio treinador",
      caption: "Antes de orientar, viveu o processo: de ~105 kg ao shape atual. Autoridade na prática.",
    },
  ] as { src: string; name?: string; context: string; metric?: string; caption: string }[],
  beforeAfter: [
    {
      tag: "Frontal",
      before: "/img/02_frente_antes.png",
      after: "/img/03_frente_depois.png",
      caption: "Aluna acompanhada de perto. Arraste e veja a evolução de frente.",
    },
    {
      tag: "Perfil",
      before: "/img/05_lado_antes.png",
      after: "/img/06_lado_depois.png",
      caption: "Mesma aluna em outro ângulo. Mudança de cintura e postura de perfil.",
    },
  ] as { tag?: string; before: string; after: string; caption: string }[],
  // FEED do Instagram — cards 4:5 INTEIROS (texto e marca do post aparecem; honesto, é post real).
  // ➕ NOVAS FOTOS: salve em /public/img/site-acervo/alunas/ e adicione aqui { src, caption }.
  //    Ideal 6+ posts de aluna. NÃO repetir imagens já usadas em caseStudies (refeed_p01_4, refeed_p08_4).
  instaFeed: [
    { src: "/img/site-acervo/refeed_p08/2026-06-10_20-39-13_UTC_5.jpg", caption: "“A cintura afinou, o corpo mudou.” Relato real da Vitória durante a consultoria." },
    { src: "/img/site-acervo/refeed_p03/2026-05-25_14-55-02_UTC_9.jpg", caption: "Mudança construída no tempo da vida dela, do início ao acompanhamento de perto." },
    { src: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_6.jpg", caption: "Treino que coube na rotina de mãe: três, quatro vezes na semana quando dava." },
    { src: "/img/site-acervo/refeed_p08/2026-06-10_20-39-13_UTC_1.jpg", caption: "Voltar a se reconhecer no espelho — a motivação que sustenta o processo." },
  ] as { src: string; caption?: string }[],
  caseStudies: [
    {
      tag: "Caso real",
      title: "Energia para viver melhor",
      src: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_4.jpg",
      caption: "Chegou cansada, sem energia pra brincar com a filha. O foco foi devolver disposição — não só mudar o número da balança.",
      pos: "object-[55%_35%]",
    },
    {
      tag: "Rotina real",
      title: "Plano construído para caber",
      src: "/img/site-acervo/refeed_p08/2026-06-10_20-39-13_UTC_4.jpg",
      caption: "O treino foi montado em cima da rotina real dela, não de uma versão ideal impossível de manter.",
      pos: "object-center",
    },
    {
      tag: "Vivência",
      title: "Autoridade por prática",
      src: "/img/site-acervo/refeed_p03/2026-05-25_14-55-02_UTC_1.jpg",
      caption: "Antes de orientar alunas, o Vinicio passou pela própria transformação. A metodologia nasceu da prática, não só da teoria.",
      pos: "object-[50%_38%]",
    },
  ] as { tag: string; title: string; src: string; caption: string; pos?: string }[],
  methodProof: [
    { src: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_2.jpg", caption: "Esforço no lugar certo: a tese da consultoria.", pos: "object-center" },
    { src: "/img/site-acervo/refeed_p01/2026-06-01_20-35-48_UTC_9.jpg", caption: "Platô existe quando o treino deixa de ser genérico.", pos: "object-center" },
    { src: "/img/site-acervo/refeed_p07/2026-06-11_14-52-16_UTC_2.jpg", caption: "Conteúdo técnico sobre ponto fraco e prescrição inteligente.", pos: "object-center" },
    { src: "/img/site-acervo/refeed_p07/2026-06-11_14-52-16_UTC_3.jpg", caption: "Exemplo de educação sobre execução e recrutamento muscular.", pos: "object-center" },
    { src: "/img/site-acervo/refeed_p12/2026-06-05_14-02-08_UTC_1.jpg", caption: "Performance muda conforme o ciclo: treino com contexto.", pos: "object-center" },
    { src: "/img/site-acervo/refeed_p12/2026-06-05_14-02-08_UTC_7.jpg", caption: "TPM e treino: ajuste de expectativa sem abandonar o plano.", pos: "object-center" },
  ] as { src: string; caption: string; pos?: string }[],
};

/* Depoimentos: SOMENTE com autorização explícita.
   Deixe enabled=false enquanto não houver autorização. */
export const TESTIMONIALS = {
  enabled: true,
  items: [
    // Transcrito do card publicado pelo próprio Vinicio (@viniciotreinador) — uso autorizado.
    // CONFIRMAR com o Vinicio antes de publicar e adicionar novos depoimentos aqui.
    {
      name: "Vitória",
      context: "Consultoria semestral",
      quote:
        "Hoje recebi um elogio e fiquei muito feliz: disseram que minha cintura está mais fina. Nossa, ganhei meu dia! Pra quem estava se sentindo travada uns anos atrás, isso é tudo.",
    },
  ] as { name: string; context: string; quote: string }[],
};

/* ----------------------- MOTIVAÇÃO ----------------------- */
export const MOTIVATION = {
  kicker: "Mentalidade",
  title: "O que move o <b>processo</b>",
  intro:
    "Treino não é punição e motivação não é sorte: é método, constância e acompanhamento de perto.",
  items: [
    { src: "/img/site-acervo/highlights-treinos/frames/treino-15_f2.jpg", caption: "Levantamento com controle e intenção.", pos: "object-[50%_20%]" },
    { src: "/img/site-acervo/highlights-treinos/frames/treino-25_f2.jpg", caption: "Treinar com método, não no automático.", pos: "object-[50%_28%]" },
    { src: "/img/site-acervo/highlights-treinos/frames/treino-55_f2.jpg", caption: "Execução real, foco real, ajuste real.", pos: "object-[50%_18%]" },
    { src: "/img/site-acervo/highlights-treinos/frames/treino-75_f2.jpg", caption: "Progressão conduzida, carga no tempo certo.", pos: "object-[50%_24%]" },
    { src: "/img/site-acervo/highlights-treinos/frames/treino-103_f2.jpg", caption: "Amplitude e técnica também fazem parte do resultado.", pos: "object-[50%_30%]" },
    { src: "/img/site-acervo/highlights-treinos/frames/treino-153_f2.jpg", caption: "Quem orienta treina de verdade.", pos: "object-[50%_22%]" },
  ],
};

/* ----------------------- TRANSFORMAÇÃO (antes/depois) ----------------------- */
export const TRANSFORMATION = {
  kicker: "Vivência própria",
  title: "Autoridade construída na <b>prática</b>",
  desc: "Antes de acompanhar alunas, Vinicio passou pelo mesmo processo de transformação. Ele entende frustração, efeito sanfona e a dificuldade de manter constância — de dentro para fora.",
  image: "/img/site-acervo/refeed_p03/2026-05-25_14-55-02_UTC_1.jpg",
  caption: "Vivência própria · do aluno ao treinador",
  quote: "Você não precisa fazer mais. Precisa fazer o certo, com método e acompanhamento.",
};

/* ----------------------- FAQ ----------------------- */
export const FAQ = {
  kicker: "Tirando dúvidas",
  title: "Perguntas <b>frequentes</b>",
  items: [
    {
      q: "A consultoria é online?",
      a: "Sim. O acompanhamento é feito de forma online, com treino estruturado e suporte para orientar sua evolução.",
    },
    {
      q: "Serve para quem tem rotina corrida?",
      a: "Sim. A proposta é montar um processo que respeite sua rotina real, não uma rotina ideal impossível de manter.",
    },
    {
      q: "Preciso treinar na academia?",
      a: "Não necessariamente. A estrutura é definida conforme disponibilidade, objetivo e equipamentos — inclusive treino em casa.",
    },
    {
      q: "O treino muda toda semana?",
      a: "Não como regra. A troca constante atrapalha a progressão. O treino muda quando o estímulo já foi bem explorado ou quando o plano precisa de ajuste.",
    },
    {
      q: "Em quanto tempo vejo resultado?",
      a: "Depende do ponto de partida, adesão, rotina e objetivo. A proposta é evolução consistente, não promessa rápida.",
    },
    {
      q: "Você trabalha com emagrecimento?",
      a: "Sim. O foco inclui emagrecimento, treino feminino, recomposição corporal e construção de hábitos.",
    },
    {
      q: "Como eu começo?",
      a: "Clique no botão de WhatsApp, envie uma mensagem e receba as orientações para iniciar a consultoria.",
    },
  ],
};

/* ----------------------- COMO COMEÇAR ----------------------- */
export const HOW_TO_START = {
  kicker: "Comece hoje",
  title: "Como <b>começar</b>",
  intro: "Sem burocracia. Três passos do primeiro “oi” ao seu treino sob medida.",
  steps: [
    {
      n: "01",
      title: "Manda mensagem",
      desc: "Toca no botão do WhatsApp e conta onde você está e onde quer chegar.",
    },
    {
      n: "02",
      title: "Diagnóstico",
      desc: "A gente entende sua rotina, histórico e objetivo para montar o plano certo.",
    },
    {
      n: "03",
      title: "Treina com direção",
      desc: "Você recebe o treino sob medida e começa com acompanhamento de verdade.",
    },
  ],
  cta: "Quero começar agora",
  whatsappMessage:
    "Oi Vinicio! Quero começar a consultoria. Pode me explicar os primeiros passos?",
};

/* ----------------------- CTA FINAL ----------------------- */
export const FINAL_CTA = {
  title: "Pare de tentar por conta própria.<br/>Comece a <b>acertar com direção</b>.",
  desc: "Se você se esforça e não vê resultado, talvez o problema não seja você. Talvez falte um processo feito para a sua vida real.",
  // Fundo cinematográfico (renderizado bem escuro p/ esconder overlay do print)
  image: "/img/site-acervo/highlights-treinos/frames/treino-15_f2.jpg",
  cta: "Falar com o Vinicio no WhatsApp",
  // Reforço de confiança (honesto, sem promessa de devolução de dinheiro)
  trust: [
    "Primeira conversa sem compromisso",
    "Plano sob medida pra sua rotina",
    "Ajustes inclusos no acompanhamento",
    "Suporte real, não robô",
  ],
  whatsappMessage:
    "Oi Vinicio! Quero parar de tentar por conta própria e começar a consultoria. Como funciona?",
};

/* ----------------------- FOOTER ----------------------- */
export const FOOTER = {
  disclaimer:
    "Resultados variam conforme adesão, rotina e individualidade. Esta página não substitui avaliação médica.",
  values: ["Coerência", "Técnica", "Ética"],
};
