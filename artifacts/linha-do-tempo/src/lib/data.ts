export type Period = "Pré-História" | "Idade Antiga" | "Idade Média" | "Idade Moderna" | "Idade Contemporânea";
export type Category = "Exata" | "Marco convencional" | "Aproximada" | "Intervalo";

export interface HistoricalEvent {
  id: string;
  date: number;
  label: string;
  title: string;
  category: Category;
  explanation_pre: string;
  explanation_post: string;
  period: Period;
  segmentId: string;
}

export interface Segment {
  id: string;
  label: string;
  start: number;
  end: number;
  period: Period;
  step: number;
}

export const periods: Period[] = [
  "Pré-História",
  "Idade Antiga",
  "Idade Média",
  "Idade Moderna",
  "Idade Contemporânea"
];

export const segments: Segment[] = [
  { id: "s1", label: "100000–10000 a.C.", start: -100000, end: -10000, period: "Pré-História", step: 500 },
  { id: "s2", label: "10000–3500 a.C.", start: -10000, end: -3500, period: "Pré-História", step: 100 },
  { id: "s3", label: "3500–1000 a.C.", start: -3500, end: -1000, period: "Idade Antiga", step: 10 },
  { id: "s4", label: "1000 a.C.–1 d.C.", start: -1000, end: 1, period: "Idade Antiga", step: 10 },
  { id: "s5", label: "1–476", start: 1, end: 476, period: "Idade Antiga", step: 1 },
  { id: "s6", label: "476–1000", start: 476, end: 1000, period: "Idade Média", step: 1 },
  { id: "s7", label: "1000–1453", start: 1000, end: 1453, period: "Idade Média", step: 1 },
  { id: "s8", label: "1453–1600", start: 1453, end: 1600, period: "Idade Moderna", step: 1 },
  { id: "s9", label: "1600–1789", start: 1600, end: 1789, period: "Idade Moderna", step: 1 },
  { id: "s10", label: "1789–1900", start: 1789, end: 1900, period: "Idade Contemporânea", step: 1 },
  { id: "s11", label: "1900–2000", start: 1900, end: 2000, period: "Idade Contemporânea", step: 1 },
];

export const events: HistoricalEvent[] = [
  { id: "e1", date: -70000, label: "c. 70.000 a.C.", title: "Expansão do Homo sapiens para fora da África", category: "Aproximada", explanation_pre: "O momento em que grupos humanos anatomicamente modernos começam a deixar o continente africano em direção à Eurásia.", explanation_post: "Essa expansão foi parte de um processo longo de dispersão do Homo sapiens pela Eurásia e, posteriormente, por outras regiões do planeta, em contato com outras populações humanas, como os neandertais.", period: "Pré-História", segmentId: "s1" },
  { id: "e2", date: -10000, label: "c. 10.000 a.C.", title: "Revolução Neolítica", category: "Aproximada", explanation_pre: "A transição gradual de algumas sociedades caçadoras-coletoras para formas de vida baseadas na agricultura, domesticação e maior sedentarização.", explanation_post: "O processo ocorreu de forma independente em diferentes regiões e, ao longo de milênios, favoreceu assentamentos permanentes, crescimento populacional e novas formas de organização social.", period: "Pré-História", segmentId: "s2" },
  { id: "e3", date: -3500, label: "c. 3.500 a.C.", title: "Surgimento das primeiras cidades", category: "Aproximada", explanation_pre: "A formação de assentamentos urbanos complexos, como Uruk na Mesopotâmia.", explanation_post: "Esses centros concentraram população, especialização do trabalho, comércio e formas mais complexas de administração; na Mesopotâmia, esse processo esteve ligado ao desenvolvimento da escrita.", period: "Idade Antiga", segmentId: "s3" },
  { id: "e4", date: -3200, label: "c. 3.200 a.C.", title: "Invenção da escrita", category: "Marco convencional", explanation_pre: "O desenvolvimento dos primeiros sistemas de registro simbólico estruturado.", explanation_post: "Os primeiros sistemas de escrita conhecidos surgiram ligados a necessidades administrativas e contábeis. Convencionalmente, a escrita é usada como um dos marcos da passagem da Pré-História para a História.", period: "Idade Antiga", segmentId: "s3" },
  { id: "e5", date: -500, label: "c. 500 a.C.", title: "Grécia Clássica / Democracia Ateniense", category: "Intervalo", explanation_pre: "O período de apogeu cultural e político das cidades-estado gregas, em especial Atenas.", explanation_post: "Atenas desenvolveu instituições de participação política entre cidadãos, enquanto o mundo grego viveu um período marcante para a filosofia, o teatro, a historiografia, a arquitetura e as artes.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e6", date: -221, label: "221 a.C.", title: "Unificação imperial da China", category: "Exata", explanation_pre: "A vitória do estado de Qin sobre os demais reinos combatentes.", explanation_post: "Qin Shi Huang tornou-se o primeiro imperador de uma China politicamente unificada, promovendo padronizações administrativas, monetárias, de pesos e medidas e da escrita, além de conectar e ampliar fortificações anteriores.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e7", date: -27, label: "27 a.C.", title: "Início do Império Romano", category: "Exata", explanation_pre: "Otávio recebe do senado o título de Augusto, encerrando o período republicano.", explanation_post: "Augusto centralizou o poder e iniciou a Pax Romana, um longo período de relativa estabilidade no mundo mediterrâneo.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e8", date: 30, label: "c. 30", title: "Surgimento do cristianismo", category: "Marco convencional", explanation_pre: "Os ensinamentos e a crucificação de Jesus de Nazaré na província romana da Judeia.", explanation_post: "O movimento surgiu no contexto do judaísmo do século I e se difundiu gradualmente pelo Império Romano, tornando-se séculos depois uma força religiosa central na Europa e no Mediterrâneo.", period: "Idade Antiga", segmentId: "s5" },
  { id: "e9", date: 622, label: "622", title: "Hégira e consolidação inicial do Islã", category: "Exata", explanation_pre: "A migração de Maomé e seus seguidores de Meca para Medina, conhecida como Hégira.", explanation_post: "Marca o ano 1 do calendário islâmico e o início da unificação política e religiosa da Península Arábica sob a nova fé.", period: "Idade Média", segmentId: "s6" },
  { id: "e10", date: 1206, label: "1206", title: "Formação do Império Mongol", category: "Exata", explanation_pre: "Temujin é proclamado Gêngis Khan após consolidar a união de diversos grupos das estepes mongóis.", explanation_post: "Sob Gêngis Khan e seus sucessores, as conquistas formaram o maior império territorial contíguo da história e intensificaram conexões através da Eurásia.", period: "Idade Média", segmentId: "s7" },
  { id: "e11", date: 1400, label: "c. 1400", title: "Renascimento", category: "Intervalo", explanation_pre: "Processo cultural desenvolvido sobretudo nas cidades italianas e depois difundido por outras partes da Europa, marcado pela renovação do interesse pela Antiguidade clássica.", explanation_post: "O Renascimento se desenvolveu ao longo de séculos e transformou artes, letras e formas de investigação e representação na Europa; c. 1400 funciona aqui apenas como referência aproximada.", period: "Idade Média", segmentId: "s7" },
  { id: "e12", date: 1492, label: "1492", title: "Chegada de Colombo à América", category: "Exata", explanation_pre: "A expedição financiada pela Espanha alcança as ilhas do Caribe buscando uma rota para as Índias.", explanation_post: "A viagem de 1492 tornou-se um marco da expansão atlântica europeia e foi seguida pela conquista e colonização das Américas e pelo amplo intercâmbio de populações, plantas, animais e doenças entre continentes.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e13", date: 1517, label: "1517", title: "Reforma Protestante", category: "Marco convencional", explanation_pre: "Martinho Lutero publica suas 95 Teses criticando práticas da Igreja Católica.", explanation_post: "1517 é um marco convencional para um processo mais amplo que fragmentou a cristandade ocidental e produziu profundas transformações religiosas, políticas e sociais na Europa.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e14", date: 1543, label: "1543", title: "Revolução Científica", category: "Marco convencional", explanation_pre: "A publicação de 'De revolutionibus', de Copérnico, propondo o heliocentrismo.", explanation_post: "1543 é usado como marco convencional de um processo mais longo que transformou a astronomia e, junto a outros desenvolvimentos dos séculos XVI e XVII, as formas europeias de investigar a natureza.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e15", date: 1760, label: "c. 1760", title: "Revolução Industrial", category: "Intervalo", explanation_pre: "Processo de transformação da produção, inicialmente concentrado na Grã-Bretanha, marcado pela mecanização, novas fontes de energia e mudanças profundas na organização do trabalho.", explanation_post: "Desenvolvida ao longo de décadas, a industrialização ampliou o uso de máquinas e combustíveis fósseis, acelerou a urbanização e alterou profundamente a produção, o trabalho e o ambiente.", period: "Idade Moderna", segmentId: "s9" },
  { id: "e16", date: 1789, label: "1789", title: "Revolução Francesa", category: "Exata", explanation_pre: "Em 1789, a crise da monarquia francesa desembocou na Revolução; a Queda da Bastilha, em 14 de julho, tornou-se um de seus símbolos mais conhecidos.", explanation_post: "A Revolução aboliu privilégios do Antigo Regime, formulou novos princípios de cidadania e soberania política e desencadeou transformações e conflitos que repercutiram muito além da França.", period: "Idade Contemporânea", segmentId: "s10" },
  { id: "e17", date: 1914, label: "1914", title: "Primeira Guerra Mundial", category: "Exata", explanation_pre: "Após o assassinato do arquiduque Francisco Ferdinando, a crise entre as potências europeias levou às declarações de guerra de 1914 e à expansão do conflito em escala mundial.", explanation_post: "Derrubou grandes impérios antigos e reconfigurou radicalmente as fronteiras e as relações internacionais.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e18", date: 1917, label: "1917", title: "Revolução Russa", category: "Exata", explanation_pre: "A derrubada do regime czarista seguida pela tomada do poder pelos bolcheviques.", explanation_post: "Levou à criação do primeiro Estado socialista e moldou grande parte da geopolítica do século XX.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e19", date: 1939, label: "1939", title: "Segunda Guerra Mundial", category: "Exata", explanation_pre: "A invasão da Polônia pela Alemanha nazista inicia o conflito mais letal da história.", explanation_post: "A guerra incluiu o Holocausto e terminou em 1945, após a derrota das potências do Eixo e o uso de bombas atômicas pelos Estados Unidos contra Hiroshima e Nagasaki; EUA e URSS emergiram como superpotências.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e20", date: 1991, label: "1991", title: "Fim da União Soviética", category: "Exata", explanation_pre: "A dissolução formal do Estado socialista multinacional após uma série de crises econômicas e políticas.", explanation_post: "A dissolução da URSS, em dezembro de 1991, encerrou a existência do Estado soviético e consolidou a independência de suas quinze repúblicas constituintes.", period: "Idade Contemporânea", segmentId: "s11" }
];

export const eventsSorted = [...events].sort((a, b) => a.date - b.date);

export function formatDate(year: number): string {
  if (year === 0) return "1 a.C.";
  if (year < 0) return `${Math.abs(year).toLocaleString('pt-BR')} a.C.`;
  return `${year.toLocaleString('pt-BR')}`;
}

export function getDailyEvent(): HistoricalEvent {
  const today = new Date();
  const num = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return eventsSorted[num % eventsSorted.length];
}

export function drawEvents(count: number): HistoricalEvent[] {
  const shuffled = [...events].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function calculateScore(event: HistoricalEvent, guessedDate: number): number {
  const correctSegment = segments.find(s => s.id === event.segmentId)!;
  const width = Math.max(1, correctSegment.end - correctSegment.start);
  const absoluteError = Math.abs(guessedDate - event.date);

  // Historical dates do not all have the same precision. Approximate dates and
  // intervals get a small "full-credit" zone before the temporal error starts
  // reducing the score.
  const precisionGrace: Record<Category, number> = {
    'Exata': 0,
    'Marco convencional': 0.01,
    'Aproximada': 0.03,
    'Intervalo': 0.05
  };

  const normalizedError = Math.max(
    0,
    (absoluteError / width) - precisionGrace[event.category]
  );

  // Continuous, piecewise-linear curve. The same absolute error therefore
  // matters much less in broad prehistoric scales than in recent history.
  const curve = [
    { error: 0.00, score: 100 },
    { error: 0.02, score: 98 },
    { error: 0.05, score: 92 },
    { error: 0.10, score: 82 },
    { error: 0.20, score: 65 },
    { error: 0.30, score: 50 },
    { error: 0.50, score: 30 },
    { error: 0.75, score: 15 },
    { error: 1.00, score: 5 },
    { error: 1.50, score: 0 }
  ];

  for (let i = 1; i < curve.length; i++) {
    if (normalizedError <= curve[i].error) {
      const previous = curve[i - 1];
      const next = curve[i];
      const progress =
        (normalizedError - previous.error) / (next.error - previous.error);
      return Math.round(
        previous.score + progress * (next.score - previous.score)
      );
    }
  }

  return 0;
}

export function getNeighbors(eventId: string) {
  const idx = eventsSorted.findIndex(e => e.id === eventId);
  return {
    prev: idx > 0 ? eventsSorted[idx - 1] : null,
    next: idx < eventsSorted.length - 1 ? eventsSorted[idx + 1] : null
  };
}
