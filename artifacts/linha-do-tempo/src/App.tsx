import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ArrowRight, Share2, Target, BookOpen, Clock, 
  RotateCcw, ShieldCheck, Map
} from 'lucide-react';
import { 
  HistoricalEvent, Period, periods, segments, Segment, 
  eventsSorted, formatDate, getDailyEvent, drawEvents, 
  calculateScore, getNeighbors 
} from './lib/data';

type AppState = 
  | 'HOME' 
  | 'PLAYING' 
  | 'RESULT' 
  | 'SUMMARY' 
  | 'DAILY_NEIGHBOR' 
  | 'DAILY_SUMMARY';

export interface RoundResult {
  event: HistoricalEvent;
  guessedPeriod: string;
  guessedSegment: string;
  guessedDate: number;
  score: number;
  periodCorrect: boolean;
  segmentCorrect: boolean;
  timeDiff: number;
}

const PageWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className={`w-full max-w-2xl mx-auto p-4 sm:p-8 ${className}`}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [appState, setAppState] = useState<AppState>('HOME');
  
  // Game State
  const [queue, setQueue] = useState<HistoricalEvent[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [isDaily, setIsDaily] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
  // Play Step State
  type PlayStep = 'PERIOD' | 'SEGMENT' | 'DATE';
  const [playStep, setPlayStep] = useState<PlayStep>('PERIOD');
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [guessDate, setGuessDate] = useState<number>(0);

  // Daily Challenge State
  const [dailyNeighborBefore, setDailyNeighborBefore] = useState<string>('');
  const [dailyNeighborAfter, setDailyNeighborAfter] = useState<string>('');
  const [dailyNeighborResult, setDailyNeighborResult] = useState<{beforeCorrect: boolean, afterCorrect: boolean} | null>(null);

  const currentEvent = queue[currentIndex];

  const startGame = (count: number) => {
    setQueue(drawEvents(count));
    setCurrentIndex(0);
    setResults([]);
    setIsDaily(false);
    setPlayStep('PERIOD');
    setAppState('PLAYING');
  };

  const startDaily = () => {
    setQueue([getDailyEvent()]);
    setCurrentIndex(0);
    setResults([]);
    setIsDaily(true);
    setPlayStep('PERIOD');
    setAppState('PLAYING');
  };

  const handleSelectPeriod = (period: Period) => {
    setSelectedPeriod(period);
    setPlayStep('SEGMENT');
  };

  const handleSelectSegment = (segment: Segment) => {
    setSelectedSegment(segment);
    // Set slider initial to middle of segment
    setGuessDate(Math.round((segment.start + segment.end) / 2));
    setPlayStep('DATE');
  };

  const handleConfirmDate = () => {
    if (!currentEvent || !selectedPeriod || !selectedSegment) return;
    
    const score = calculateScore(currentEvent, guessDate);
    const periodCorrect = selectedPeriod === currentEvent.period;
    const segmentCorrect = selectedSegment.id === currentEvent.segmentId;
    const timeDiff = Math.abs(guessDate - currentEvent.date);

    setResults(prev => [...prev, {
      event: currentEvent,
      guessedPeriod: selectedPeriod,
      guessedSegment: selectedSegment.label,
      guessedDate: guessDate,
      score,
      periodCorrect,
      segmentCorrect,
      timeDiff
    }]);

    setAppState('RESULT');
  };

  const handleNext = () => {
    if (currentIndex < queue.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setPlayStep('PERIOD');
      setSelectedPeriod(null);
      setSelectedSegment(null);
      setAppState('PLAYING');
    } else {
      if (isDaily) {
        setAppState('DAILY_NEIGHBOR');
      } else {
        setAppState('SUMMARY');
      }
    }
  };

  const handleConfirmNeighbors = () => {
    if (!currentEvent) return;
    const { prev, next } = getNeighbors(currentEvent.id);
    const correctBefore = prev ? prev.id : 'none';
    const correctAfter = next ? next.id : 'none';
    
    setDailyNeighborResult({
      beforeCorrect: dailyNeighborBefore === correctBefore,
      afterCorrect: dailyNeighborAfter === correctAfter
    });
    setAppState('DAILY_SUMMARY');
  };

  const handleShare = async () => {
    const r = results[0];
    const n = dailyNeighborResult;
    const neighborhoodScore = (n?.beforeCorrect ? 1 : 0) + (n?.afterCorrect ? 1 : 0);
    
    const text = `Linha do Tempo 🕰️\nDesafio Diário: ${r.event.title}\nData: ${r.score} pts\nVizinhança: Acertou ${neighborhoodScore}/2!\n\nJogue em: `;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Linha do Tempo',
          text: text,
          url: window.location.href,
        });
        return;
      } catch (e) {
        // Fallback
      }
    }
    await navigator.clipboard.writeText(text + window.location.href);
    alert("Resultado copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 relative overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* --- HOME SCREEN --- */}
        {appState === 'HOME' && (
          <PageWrapper key="home" className="text-center">
            <div className="atlas-masthead mb-12">
              <div className="atlas-compass" aria-hidden="true"><span>✦</span></div>
              <div className="atlas-kicker">Atlas histórico</div>
              <BookOpen className="w-10 h-10 text-[var(--accent-red)] mx-auto mb-4" />
              <h1 className="text-5xl sm:text-6xl font-serif text-[var(--text-main)] mb-3 tracking-tight">
                Linha do Tempo
              </h1>
              <div className="atlas-rule" aria-hidden="true"><span>◆</span></div>
              <p className="text-[var(--text-muted)] max-w-md mx-auto text-base sm:text-lg leading-relaxed mt-4">
                Desenvolva sua intuição histórica. Posicione eventos no tempo, encontre conexões e desafie sua memória.
              </p>
            </div>

            <div className="max-w-sm mx-auto mb-8">
              <button
                onClick={() => setShowHowToPlay(prev => !prev)}
                aria-expanded={showHowToPlay}
                className="w-full border border-[var(--border-color)] bg-[var(--card-bg)] py-3 px-4 rounded-sm font-serif text-lg text-[var(--text-main)] hover:border-[var(--accent-green)] transition-colors flex items-center justify-between"
              >
                <span>Como jogar</span>
                <ChevronRight className={`w-5 h-5 text-[var(--text-muted)] transition-transform ${showHowToPlay ? 'rotate-90' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {showHowToPlay && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 bg-[var(--card-bg)] border border-[var(--border-color)] p-5 rounded-sm editorial-shadow text-left">
                      <ol className="space-y-3 text-sm text-[var(--text-main)] font-sans leading-relaxed">
                        <li><strong>1.</strong> Escolha o período histórico em que acredita que o evento ocorreu.</li>
                        <li><strong>2.</strong> Aproxime a escala, escolhendo um recorte dentro daquele período.</li>
                        <li><strong>3.</strong> Posicione o evento na linha do tempo.</li>
                        <li><strong>4.</strong> Veja o resultado e compare seu palpite com a data de referência.</li>
                        <li><strong>5.</strong> No <strong>Desafio Diário</strong>, há ainda a Vizinhança: identifique qual dos 20 eventos vem imediatamente antes e depois.</li>
                      </ol>

                      <div className="mt-5 pt-4 border-t border-[var(--border-color)]">
                        <h3 className="font-serif text-lg text-[var(--text-main)] mb-3">Precisão das datas</h3>
                        <div className="space-y-3 text-sm text-[var(--text-muted)] leading-relaxed">
                          <p><strong className="text-[var(--text-main)]">Exata:</strong> evento associado a uma data histórica específica.</p>
                          <p><strong className="text-[var(--text-main)]">Marco convencional:</strong> uma data usada como referência para representar uma transformação histórica mais ampla.</p>
                          <p><strong className="text-[var(--text-main)]">Aproximada:</strong> a documentação não permite fixar um único ano com segurança, ou o fenômeno ocorreu gradualmente em torno da data indicada.</p>
                          <p><strong className="text-[var(--text-main)]">Intervalo:</strong> processo ou acontecimento representado por um período de tempo, e não por um único ponto.</p>
                          <p className="pt-1">A pontuação considera essas diferenças: datas menos precisas recebem uma margem maior antes que o erro temporal reduza a pontuação.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-8 max-w-sm mx-auto">
              <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-sm editorial-shadow">
                <h2 className="text-xl font-serif mb-4 flex items-center justify-center gap-2 text-[var(--text-main)]">
                  <Clock className="w-5 h-5 text-[var(--accent-red)]" />
                  Desafio Diário
                </h2>
                <p className="text-sm text-[var(--text-muted)] mb-6">
                  Um evento por dia, igual para todos. Inclui desafio extra de vizinhança histórica.
                </p>
                <button 
                  onClick={startDaily}
                  className="w-full bg-[var(--accent-red)] text-white py-3 font-medium hover:bg-red-800 transition-colors rounded-sm"
                >
                  Jogar Desafio Diário
                </button>
              </div>

              <div className="border-t border-[var(--border-color)] pt-8">
                <h2 className="text-lg font-serif mb-2 text-[var(--text-main)] flex items-center justify-center gap-2">
                  <Target className="w-5 h-5 text-[var(--text-muted)]" />
                  Treino Livre
                </h2>
                <div className="text-center mb-5">
                  <div className="font-serif text-[var(--text-main)]">História Geral</div>
                  <div className="mt-1 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--accent-red)]">
                    <span className="inline-block w-5 h-px bg-[var(--border-color)]" />
                    Nível 20
                    <span className="inline-block w-5 h-px bg-[var(--border-color)]" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 20].map(num => (
                    <button 
                      key={num}
                      onClick={() => startGame(num)}
                      className="border border-[var(--border-color)] py-3 hover:border-[var(--accent-green)] hover:bg-[var(--text-main)] hover:text-white transition-all rounded-sm font-sans"
                    >
                      {num} cartas
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </PageWrapper>
        )}

        {/* --- PLAYING SCREEN --- */}
        {appState === 'PLAYING' && currentEvent && (
          <PageWrapper key="playing">
            <div className="mb-6 flex items-center justify-between font-mono text-sm text-[var(--text-muted)]">
              <span>{isDaily ? 'Desafio Diário' : `Treino: Carta ${currentIndex + 1} de ${queue.length}`}</span>
              <span>Passo {playStep === 'PERIOD' ? '1/3' : playStep === 'SEGMENT' ? '2/3' : '3/3'}</span>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] editorial-shadow p-6 sm:p-8 rounded-sm relative mb-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-red)]" />
              <div className="text-xs font-mono tracking-widest text-[var(--accent-red)] uppercase mb-4">
                {currentEvent.category}
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif text-[var(--text-main)] mb-4 leading-tight">
                {currentEvent.title}
              </h2>
              <p className="text-[var(--text-main)] font-sans leading-relaxed opacity-90">
                {currentEvent.explanation_pre}
              </p>
            </div>

            {playStep !== 'PERIOD' && selectedPeriod && (
              <div className="mb-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-[var(--text-muted)]">
                <button
                  onClick={() => {
                    setPlayStep('PERIOD');
                    setSelectedSegment(null);
                  }}
                  className="hover:text-[var(--accent-red)] transition-colors"
                >
                  {selectedPeriod}
                </button>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                {playStep === 'SEGMENT' ? (
                  <span className="text-[var(--text-main)]">Escolher recorte</span>
                ) : selectedSegment ? (
                  <>
                    <button
                      onClick={() => setPlayStep('SEGMENT')}
                      className="hover:text-[var(--accent-red)] transition-colors"
                    >
                      {selectedSegment.label}
                    </button>
                    <ChevronRight className="w-3.5 h-3.5 opacity-50" />
                    <span className="text-[var(--accent-red)] font-bold">{formatDate(guessDate)}</span>
                  </>
                ) : null}
              </div>
            )}

            <AnimatePresence mode="wait">
              {playStep === 'PERIOD' && (
                <motion.div 
                  key="step-period"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                >
                  <div className="atlas-section-heading">
                    <span className="atlas-section-number">I</span>
                    <div>
                      <div className="atlas-section-kicker">Escala geral</div>
                      <h3 className="font-serif text-xl text-[var(--text-main)]">Em qual período ocorreu?</h3>
                    </div>
                  </div>
                  <div className="grid gap-3 atlas-choice-list">
                    {periods.map((p, index) => (
                      <button 
                        key={p} 
                        onClick={() => handleSelectPeriod(p)}
                        className="atlas-choice w-full text-left p-4 border border-[var(--border-color)] hover:border-[var(--accent-green)] transition-colors rounded-sm font-serif text-lg flex justify-between items-center group bg-[var(--card-bg)]"
                      >
                        <span className="flex items-center gap-3"><span className="atlas-index">{String(index + 1).padStart(2, '0')}</span>{p}</span>
                        <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-green)] transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {playStep === 'SEGMENT' && selectedPeriod && (
                <motion.div 
                  key="step-segment"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                >
                  <div className="atlas-section-heading">
                    <button onClick={() => setPlayStep('PERIOD')} className="atlas-section-number hover:text-[var(--accent-red)] transition-colors" aria-label="Voltar aos períodos">
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                      <div className="atlas-section-kicker">Escala intermediária · {selectedPeriod}</div>
                      <h3 className="font-serif text-xl text-[var(--text-main)]">Qual é o recorte temporal?</h3>
                    </div>
                  </div>
                  <div className="grid gap-3 atlas-choice-list">
                    {segments.filter(s => s.period === selectedPeriod).map(s => (
                      <button 
                        key={s.id} 
                        onClick={() => handleSelectSegment(s)}
                        className="atlas-choice w-full text-left p-4 border border-[var(--border-color)] hover:border-[var(--accent-green)] transition-colors rounded-sm font-mono text-base flex justify-between items-center group bg-[var(--card-bg)]"
                      >
                        {s.label}
                        <ChevronRight className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-green)] transition-colors" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {playStep === 'DATE' && selectedSegment && (
                <motion.div 
                  key="step-date"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                >
                  <div className="atlas-section-heading">
                    <button onClick={() => setPlayStep('SEGMENT')} className="atlas-section-number hover:text-[var(--accent-red)] transition-colors" aria-label="Voltar aos recortes">
                      <ChevronRight className="w-5 h-5 rotate-180" />
                    </button>
                    <div>
                      <div className="atlas-section-kicker">Escala detalhada · {selectedSegment.label}</div>
                      <h3 className="font-serif text-xl text-[var(--text-main)]">Posicione na linha do tempo</h3>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-6 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-sm editorial-shadow">
                    <div className="text-center font-mono text-3xl sm:text-4xl text-[var(--accent-red)] mb-8 font-bold">
                      {formatDate(guessDate)}
                    </div>
                    
                    <div className="relative pt-2 pb-6">
                      <input 
                        type="range" 
                        min={selectedSegment.start} 
                        max={selectedSegment.end} 
                        step={selectedSegment.step}
                        value={guessDate}
                        onChange={(e) => setGuessDate(Number(e.target.value))}
                      />
                      <div className="flex justify-between mt-3 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                        <span>{formatDate(selectedSegment.start)}</span>
                        <span>{formatDate(selectedSegment.end)}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={handleConfirmDate} 
                      className="w-full mt-6 bg-[var(--text-main)] text-[var(--bg-color)] py-4 font-sans font-medium hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2"
                    >
                      Confirmar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PageWrapper>
        )}

        {/* --- RESULT SCREEN --- */}
        {appState === 'RESULT' && currentEvent && (
          <PageWrapper key="result">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] editorial-shadow p-6 sm:p-8 rounded-sm relative mb-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent-green)]" />
              
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <div className="text-xs font-mono tracking-widest text-[var(--accent-red)] uppercase mb-2">
                     {currentEvent.category}
                   </div>
                   <h2 className="text-2xl font-serif text-[var(--text-main)] leading-tight">
                     {currentEvent.title}
                   </h2>
                 </div>
                 <div className="timeline-stamp ml-4 shrink-0 bg-[var(--bg-color)]">
                   {currentEvent.label}
                 </div>
              </div>
              
              <p className="text-[var(--text-main)] font-sans leading-relaxed opacity-90 mb-6">
                {currentEvent.explanation_pre}
              </p>
              
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="pt-6 border-t border-[var(--border-color)]"
              >
                <p className="text-[var(--text-main)] font-serif text-lg leading-relaxed italic border-l-4 border-[var(--accent-green)] pl-4">
                  {currentEvent.explanation_post}
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-sm text-center">
                 <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">Precisão da Data</div>
                 <div className="text-4xl font-serif text-[var(--accent-red)]">{results[results.length-1].score}<span className="text-lg text-[var(--text-muted)]">/100</span></div>
                 <div className="text-xs font-mono text-[var(--text-muted)] mt-2">Diferença: {results[results.length-1].timeDiff} anos</div>
               </div>
               <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-sm flex flex-col justify-center gap-3">
                 <div className="flex items-center justify-between text-sm">
                   <span className="font-mono text-[var(--text-muted)]">Período</span>
                   <ShieldCheck className={`w-5 h-5 ${results[results.length-1].periodCorrect ? 'text-[var(--accent-green)]' : 'text-red-300'}`} />
                 </div>
                 <div className="flex items-center justify-between text-sm">
                   <span className="font-mono text-[var(--text-muted)]">Segmento</span>
                   <ShieldCheck className={`w-5 h-5 ${results[results.length-1].segmentCorrect ? 'text-[var(--accent-green)]' : 'text-red-300'}`} />
                 </div>
               </div>
            </div>

            {(() => {
              const result = results[results.length - 1];
              const correctSegment = segments.find(s => s.id === currentEvent.segmentId);
              const guessedSegment = segments.find(s => s.label === result.guessedSegment);
              if (!correctSegment || !guessedSegment) return null;

              const sameSegment = guessedSegment.id === correctSegment.id;
              const span = Math.max(1, correctSegment.end - correctSegment.start);
              const clamp = (value: number) => Math.min(100, Math.max(0, ((value - correctSegment.start) / span) * 100));
              const guessPosition = clamp(result.guessedDate);
              const correctPosition = clamp(currentEvent.date);

              return (
                <>
                  <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-5 sm:p-6 rounded-sm editorial-shadow mb-4">
                    <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4">Seu caminho temporal</div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">Seu palpite</div>
                        <div className="font-serif text-[var(--text-main)]">
                          {result.guessedPeriod} <span className="text-[var(--text-muted)]">›</span> {result.guessedSegment} <span className="text-[var(--text-muted)]">›</span> <strong>{formatDate(result.guessedDate)}</strong>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[var(--border-color)]">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--accent-red)] mb-1">Referência</div>
                        <div className="font-serif text-[var(--text-main)]">
                          {currentEvent.period} <span className="text-[var(--text-muted)]">›</span> {correctSegment.label} <span className="text-[var(--text-muted)]">›</span> <strong className="text-[var(--accent-red)]">{currentEvent.label}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {sameSegment ? (
                    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-5 sm:p-6 rounded-sm editorial-shadow mb-8">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Comparação dentro do recorte</div>
                          <div className="text-sm font-serif text-[var(--text-main)] mt-1">{correctSegment.label}</div>
                        </div>
                        <div className="text-right text-xs font-mono text-[var(--text-muted)]">
                          erro de {result.timeDiff} anos
                        </div>
                      </div>

                      <div className="relative mx-2 pt-12 pb-24">
                        <div className="absolute left-0 right-0 top-16 h-[3px] bg-[var(--border-color)] rounded-full" />

                        <div className="absolute top-0 -translate-x-1/2 text-center" style={{ left: `${guessPosition}%` }}>
                          <div className="text-[10px] sm:text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">Seu palpite</div>
                          <div className="text-xs sm:text-sm font-mono font-bold text-[var(--text-main)] whitespace-nowrap">{formatDate(result.guessedDate)}</div>
                          <div className="w-[2px] h-8 bg-[var(--text-main)] mx-auto mt-1" />
                          <div className="w-3 h-3 rounded-full bg-[var(--text-main)] mx-auto -mt-[7px] ring-2 ring-[var(--card-bg)]" />
                        </div>

                        <div className="absolute top-16 -translate-x-1/2 text-center" style={{ left: `${correctPosition}%` }}>
                          <div className="w-4 h-4 rounded-full bg-[var(--accent-red)] mx-auto -mt-[7px] ring-2 ring-[var(--card-bg)]" />
                          <div className="w-[2px] h-6 bg-[var(--accent-red)] mx-auto" />
                          <div className="text-[10px] sm:text-xs font-mono text-[var(--accent-red)] whitespace-nowrap mt-1">Data correta</div>
                          <div className="text-xs sm:text-sm font-mono font-bold text-[var(--accent-red)] whitespace-nowrap">{currentEvent.label}</div>
                        </div>

                        <div className="absolute left-0 right-0 top-[132px] flex justify-between text-[10px] sm:text-xs font-mono text-[var(--text-muted)]">
                          <span>{formatDate(correctSegment.start)}</span>
                          <span>{formatDate(correctSegment.end)}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-4 rounded-sm mb-8 text-sm text-[var(--text-muted)] font-sans">
                      O palpite ficou em outro recorte temporal. A comparação acima mostra as duas escalas escolhidas sem projetar artificialmente uma data sobre o recorte correto.
                    </div>
                  )}
                </>
              );
            })()}

            <button 
              onClick={handleNext} 
              className="w-full bg-[var(--text-main)] text-[var(--bg-color)] py-4 font-sans font-medium hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              {currentIndex < queue.length - 1 ? 'Próxima Carta' : isDaily ? 'Desafio de Vizinhança' : 'Ver Resumo Final'} 
              <ArrowRight className="w-4 h-4" />
            </button>
          </PageWrapper>
        )}

        {/* --- SUMMARY SCREEN --- */}
        {appState === 'SUMMARY' && (
          <PageWrapper key="summary">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-[var(--text-main)] mb-2">Resumo do Treino</h2>
              <p className="text-[var(--text-muted)] font-mono text-sm">{results.length} cartas analisadas</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
               <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-sm text-center col-span-3 sm:col-span-1 editorial-shadow">
                 <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">Média de Data</div>
                 <div className="text-4xl font-serif text-[var(--accent-red)]">
                   {Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)}
                 </div>
               </div>
               <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-sm text-center col-span-3 sm:col-span-1 editorial-shadow">
                 <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">Acertos Período</div>
                 <div className="text-4xl font-serif text-[var(--accent-green)]">
                   {results.filter(r => r.periodCorrect).length}<span className="text-lg text-[var(--text-muted)]">/{results.length}</span>
                 </div>
               </div>
               <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 rounded-sm text-center col-span-3 sm:col-span-1 editorial-shadow">
                 <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">Acertos Segmento</div>
                 <div className="text-4xl font-serif text-[var(--text-main)]">
                   {results.filter(r => r.segmentCorrect).length}<span className="text-lg text-[var(--text-muted)]">/{results.length}</span>
                 </div>
               </div>
            </div>

            <div className="space-y-3 mb-10">
              <h3 className="font-serif text-xl mb-4 text-[var(--text-main)]">Revisão</h3>
              {results.map((r, i) => (
                <div key={i} className="bg-[var(--card-bg)] border border-[var(--border-color)] p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-serif text-lg text-[var(--text-main)]">{r.event.title}</div>
                    <div className="font-mono text-xs text-[var(--text-muted)] mt-1">Real: {r.event.label} | Seu palpite: {formatDate(r.guessedDate)}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold text-[var(--accent-red)] text-xl">{r.score} pts</div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setAppState('HOME')} 
              className="w-full bg-[var(--text-main)] text-[var(--bg-color)] py-4 font-sans font-medium hover:bg-black transition-colors rounded-sm flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Voltar ao Início
            </button>
          </PageWrapper>
        )}

        {/* --- DAILY NEIGHBOR SCREEN --- */}
        {appState === 'DAILY_NEIGHBOR' && currentEvent && (
          <PageWrapper key="daily-neighbor">
            <div className="text-center mb-8">
              <Map className="w-10 h-10 text-[var(--accent-red)] mx-auto mb-4" />
              <h2 className="text-3xl font-serif text-[var(--text-main)] mb-2">Desafio de Vizinhança</h2>
              <p className="text-[var(--text-muted)] font-sans text-sm">Identifique o evento imediatamente anterior e posterior a este na história (dentre as 20 cartas do jogo).</p>
            </div>
            
            <div className="relative mb-10 max-w-lg mx-auto">
              <div className="absolute left-6 top-8 bottom-8 w-[2px] bg-[var(--border-color)] z-0" />
              
              <div className="relative z-10 pl-16 mb-8">
                <div className="absolute left-[20px] top-4 w-3 h-3 rounded-full bg-[var(--bg-color)] border-2 border-[var(--border-color)]" />
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Imediatamente Antes</div>
                <select 
                  value={dailyNeighborBefore} 
                  onChange={e => setDailyNeighborBefore(e.target.value)}
                  className="w-full p-3 bg-[var(--card-bg)] border border-[var(--border-color)] font-serif text-[var(--text-main)] focus:border-[var(--accent-green)] outline-none rounded-sm shadow-sm"
                >
                  <option value="">Selecione o evento...</option>
                  <option value="none">Nenhum (Extremo cronológico)</option>
                  {eventsSorted
                    .filter(e => e.id !== currentEvent.id)
                    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
                    .map(e => (
                    <option key={`before-${e.id}`} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>

              <div className="relative z-10 pl-16 mb-8">
                <div className="absolute left-[17px] top-6 w-4 h-4 rounded-full bg-[var(--accent-red)] ring-4 ring-[var(--bg-color)]" />
                <div className="bg-[var(--card-bg)] border-2 border-[var(--accent-red)] p-4 rounded-sm editorial-shadow">
                  <div className="text-xs font-mono text-[var(--accent-red)] mb-1">{currentEvent.label}</div>
                  <div className="font-serif text-lg text-[var(--text-main)]">{currentEvent.title}</div>
                </div>
              </div>

              <div className="relative z-10 pl-16">
                <div className="absolute left-[20px] top-4 w-3 h-3 rounded-full bg-[var(--bg-color)] border-2 border-[var(--border-color)]" />
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Imediatamente Depois</div>
                <select 
                  value={dailyNeighborAfter} 
                  onChange={e => setDailyNeighborAfter(e.target.value)}
                  className="w-full p-3 bg-[var(--card-bg)] border border-[var(--border-color)] font-serif text-[var(--text-main)] focus:border-[var(--accent-green)] outline-none rounded-sm shadow-sm"
                >
                  <option value="">Selecione o evento...</option>
                  <option value="none">Nenhum (Extremo cronológico)</option>
                  {eventsSorted
                    .filter(e => e.id !== currentEvent.id)
                    .sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
                    .map(e => (
                    <option key={`after-${e.id}`} value={e.id}>{e.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <button 
              onClick={handleConfirmNeighbors}
              disabled={!dailyNeighborBefore || !dailyNeighborAfter}
              className="w-full bg-[var(--text-main)] text-[var(--bg-color)] py-4 font-sans font-medium hover:bg-black transition-colors rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verificar Respostas
            </button>
          </PageWrapper>
        )}

        {/* --- DAILY SUMMARY SCREEN --- */}
        {appState === 'DAILY_SUMMARY' && dailyNeighborResult && currentEvent && (
          <PageWrapper key="daily-summary">
             <div className="text-center mb-8">
              <h2 className="text-4xl font-serif text-[var(--text-main)] mb-2">Desafio Concluído</h2>
            </div>
            
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] p-6 sm:p-8 rounded-sm editorial-shadow mb-8 text-center">
               <div className="font-serif text-xl mb-6">{currentEvent.title}</div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="border-r border-[var(--border-color)] pr-4">
                   <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Data</div>
                   <div className="text-4xl font-serif text-[var(--accent-red)]">{results[0].score}<span className="text-lg text-[var(--text-muted)]">/100</span></div>
                 </div>
                 <div className="pl-4">
                   <div className="text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Vizinhança</div>
                   <div className="text-4xl font-serif text-[var(--accent-green)]">
                     {(dailyNeighborResult.beforeCorrect ? 1 : 0) + (dailyNeighborResult.afterCorrect ? 1 : 0)}<span className="text-lg text-[var(--text-muted)]">/2</span>
                   </div>
                 </div>
               </div>
            </div>

            <div className="bg-[var(--bg-color)] border border-[var(--border-color)] p-5 rounded-sm mb-8 space-y-4">
              <h3 className="font-serif text-lg border-b border-[var(--border-color)] pb-2">Gabarito da Vizinhança</h3>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Antes</div>
                  <div className="font-serif">{getNeighbors(currentEvent.id).prev?.title || 'Nenhum'}</div>
                </div>
                {dailyNeighborResult.beforeCorrect ? 
                  <span className="text-[var(--accent-green)] font-mono text-sm bg-green-50 px-2 py-1 rounded">Correto</span> : 
                  <span className="text-red-500 font-mono text-sm bg-red-50 px-2 py-1 rounded">Incorreto</span>}
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-[var(--border-color)]/50">
                <div>
                  <div className="text-xs font-mono text-[var(--text-muted)] uppercase">Depois</div>
                  <div className="font-serif">{getNeighbors(currentEvent.id).next?.title || 'Nenhum'}</div>
                </div>
                {dailyNeighborResult.afterCorrect ? 
                  <span className="text-[var(--accent-green)] font-mono text-sm bg-green-50 px-2 py-1 rounded">Correto</span> : 
                  <span className="text-red-500 font-mono text-sm bg-red-50 px-2 py-1 rounded">Incorreto</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleShare} 
                className="bg-[var(--accent-red)] text-white py-4 font-sans font-medium hover:bg-red-800 transition-colors rounded-sm flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
              <button 
                onClick={() => setAppState('HOME')} 
                className="bg-transparent border border-[var(--border-color)] text-[var(--text-main)] py-4 font-sans font-medium hover:bg-black/5 transition-colors rounded-sm"
              >
                Voltar ao Início
              </button>
            </div>
          </PageWrapper>
        )}
      </AnimatePresence>
    </div>
  );
}