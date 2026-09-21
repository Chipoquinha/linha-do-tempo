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
  { id: "e1", date: -70000, label: "c. 70.000 a.C.", title: "Expansão do Homo sapiens para fora da África", category: "Aproximada", explanation_pre: "O momento em que grupos humanos anatomicamente modernos começam a deixar o continente africano em direção à Eurásia.", explanation_post: "A expansão marca o início do povoamento global pelo Homo sapiens, adaptando-se a novos climas e sobrepondo-se a outras espécies humanas como os neandertais.", period: "Pré-História", segmentId: "s1" },
  { id: "e2", date: -10000, label: "c. 10.000 a.C.", title: "Revolução Neolítica", category: "Aproximada", explanation_pre: "A transição de sociedades caçadoras-coletoras para o sedentarismo e a agricultura.", explanation_post: "Ocorreu em vários locais do mundo de forma independente, permitindo o crescimento populacional e a base para as futuras civilizações.", period: "Pré-História", segmentId: "s2" },
  { id: "e3", date: -3500, label: "c. 3.500 a.C.", title: "Surgimento das primeiras cidades", category: "Aproximada", explanation_pre: "A formação de assentamentos urbanos complexos, como Uruk na Mesopotâmia.", explanation_post: "Esses centros trouxeram estratificação social, comércio e a necessidade de administração complexa que desaguou na invenção da escrita.", period: "Idade Antiga", segmentId: "s3" },
  { id: "e4", date: -3200, label: "c. 3.200 a.C.", title: "Invenção da escrita", category: "Marco convencional", explanation_pre: "O desenvolvimento dos primeiros sistemas de registro simbólico estruturado.", explanation_post: "A escrita permitiu o registro histórico, a contabilidade e as leis, dividindo tradicionalmente a Pré-História da História.", period: "Idade Antiga", segmentId: "s3" },
  { id: "e5", date: -500, label: "c. 500 a.C.", title: "Grécia Clássica / Democracia Ateniense", category: "Intervalo", explanation_pre: "O período de apogeu cultural e político das cidades-estado gregas, em especial Atenas.", explanation_post: "As reformas consolidaram a democracia, e o período viu florescer a filosofia, o teatro e as artes que fundamentaram a cultura ocidental.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e6", date: -221, label: "221 a.C.", title: "Unificação imperial da China", category: "Exata", explanation_pre: "A vitória do estado de Qin sobre os demais reinos combatentes.", explanation_post: "Qin Shi Huang tornou-se o primeiro imperador, padronizando a escrita, os pesos e construindo as fundações da Grande Muralha.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e7", date: -27, label: "27 a.C.", title: "Início do Império Romano", category: "Exata", explanation_pre: "Otávio recebe do senado o título de Augusto, encerrando o período republicano.", explanation_post: "Augusto centralizou o poder e iniciou a Pax Romana, um longo período de relativa estabilidade no mundo mediterrâneo.", period: "Idade Antiga", segmentId: "s4" },
  { id: "e8", date: 30, label: "c. 30", title: "Surgimento do cristianismo", category: "Marco convencional", explanation_pre: "Os ensinamentos e a crucificação de Jesus de Nazaré na província romana da Judeia.", explanation_post: "Uma seita judaica que rapidamente se expandiu pelo Império Romano, tornando-se mais tarde a religião dominante do ocidente.", period: "Idade Antiga", segmentId: "s5" },
  { id: "e9", date: 622, label: "622", title: "Hégira e consolidação inicial do Islã", category: "Exata", explanation_pre: "A fuga de Maomé e seus seguidores de Meca para Medina.", explanation_post: "Marca o ano 1 do calendário islâmico e o início da unificação política e religiosa da Península Arábica sob a nova fé.", period: "Idade Média", segmentId: "s6" },
  { id: "e10", date: 1206, label: "1206", title: "Formação do Império Mongol", category: "Exata", explanation_pre: "Temujin é aclamado Genghis Khan, unificando as tribos nômades da Ásia Central.", explanation_post: "O império cresceu até se tornar o maior em área contígua da história, conectando o oriente e ocidente através da Rota da Seda.", period: "Idade Média", segmentId: "s7" },
  { id: "e11", date: 1400, label: "c. 1400", title: "Renascimento", category: "Intervalo", explanation_pre: "Movimento cultural em cidades italianas que buscou inspiração na antiguidade clássica.", explanation_post: "Transformou a arte, ciência e filosofia europeia, marcando a transição para a modernidade.", period: "Idade Média", segmentId: "s7" },
  { id: "e12", date: 1492, label: "1492", title: "Chegada de Colombo à América", category: "Exata", explanation_pre: "A expedição financiada pela Espanha alcança as ilhas do Caribe buscando uma rota para as Índias.", explanation_post: "Iniciou o processo de colonização europeia das Américas e o intercâmbio global de populações, culturas e doenças.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e13", date: 1517, label: "1517", title: "Reforma Protestante", category: "Marco convencional", explanation_pre: "Martinho Lutero publica suas 95 Teses criticando práticas da Igreja Católica.", explanation_post: "Fragmentou a cristandade ocidental e catalisou profundas mudanças políticas e sociais na Europa.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e14", date: 1543, label: "1543", title: "Revolução Científica", category: "Marco convencional", explanation_pre: "A publicação de 'De revolutionibus', de Copérnico, propondo o heliocentrismo.", explanation_post: "Alterou radicalmente a visão da humanidade sobre o universo e o método de buscar o conhecimento natural.", period: "Idade Moderna", segmentId: "s8" },
  { id: "e15", date: 1760, label: "c. 1760", title: "Revolução Industrial", category: "Intervalo", explanation_pre: "A transição de métodos de produção artesanais para a manufatura por máquinas na Grã-Bretanha.", explanation_post: "Mecanizou a produção, utilizou o carvão e transformou permanentemente a relação humana com o trabalho e o meio ambiente.", period: "Idade Moderna", segmentId: "s9" },
  { id: "e16", date: 1789, label: "1789", title: "Revolução Francesa", category: "Exata", explanation_pre: "A Queda da Bastilha e o levante contra a monarquia absolutista e os privilégios aristocráticos.", explanation_post: "Os ideais de liberdade, igualdade e fraternidade redesenharam o mapa político da Europa e inspiraram movimentos republicanos globais.", period: "Idade Contemporânea", segmentId: "s10" },
  { id: "e17", date: 1914, label: "1914", title: "Primeira Guerra Mundial", category: "Exata", explanation_pre: "O assassinato do arquiduque Francisco Ferdinando desencadeia um conflito em escala global.", explanation_post: "Derrubou grandes impérios antigos e reconfigurou radicalmente as fronteiras e as relações internacionais.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e18", date: 1917, label: "1917", title: "Revolução Russa", category: "Exata", explanation_pre: "A derrubada do regime czarista seguida pela tomada do poder pelos bolcheviques.", explanation_post: "Levou à criação do primeiro Estado socialista e moldou grande parte da geopolítica do século XX.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e19", date: 1939, label: "1939", title: "Segunda Guerra Mundial", category: "Exata", explanation_pre: "A invasão da Polônia pela Alemanha nazista inicia o conflito mais letal da história.", explanation_post: "Culminou com o uso de armas nucleares, o Holocausto e a ascensão dos EUA e URSS como superpotências.", period: "Idade Contemporânea", segmentId: "s11" },
  { id: "e20", date: 1991, label: "1991", title: "Fim da União Soviética", category: "Exata", explanation_pre: "A dissolução formal do Estado socialista multinacional após uma série de crises econômicas e políticas.", explanation_post: "Marcou o fim da Guerra Fria e a independência de 15 novas repúblicas eurasiáticas.", period: "Idade Contemporânea", segmentId: "s11" }
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
