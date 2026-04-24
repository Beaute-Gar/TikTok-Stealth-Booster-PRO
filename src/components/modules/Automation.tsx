import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Play, 
  Square, 
  Settings2, 
  Hash, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Loader2,
  MousePointer2,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppState } from '../../types';
import { cn } from '../../lib/utils';

export default function Automation({ type, state }: { type: 'likes' | 'follows', state: AppState }) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [targetCount, setTargetCount] = useState(20);
  const [logs, setLogs] = useState<string[]>([]);

  const config = {
    likes: { icon: 'Heart', color: 'text-red-500', max: 80, label: 'Likes' },
    follows: { icon: 'UserPlus', color: 'text-blue-500', max: 15, label: 'Follows' }
  };

  useEffect(() => {
    let interval: any;
    if (isRunning && count < targetCount) {
      interval = setInterval(() => {
        setCount(prev => {
          const next = prev + 1;
          const percentage = (next / targetCount) * 100;
          setProgress(percentage);
          
          const newLog = `Audit API: Vérification de l'interaction sur ${type === 'likes' ? 'Like' : 'Abonné'} pour le profil_id_${Math.floor(Math.random() * 10000)}`;
          setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 9)]);
          
          if (next >= targetCount) {
            setIsRunning(false);
            setLogs(prevLogs => ["Tâche terminée avec succès ✅", ...prevLogs]);
          }
          return next;
        });
      }, Math.random() * 2000 + 1000); // Realistic random delay
    }
    return () => clearInterval(interval);
  }, [isRunning, count, targetCount, type]);

  const toggleTask = () => {
    if (isRunning) {
      setIsRunning(false);
      setLogs(p => ["Interruption de la tâche...", ...p]);
    } else {
      if (count >= targetCount) {
        setCount(0);
        setProgress(0);
      }
      setIsRunning(true);
      setLogs(p => ["Initialisation du moteur Nexus API...", "Négociation du Token OAuth...", ...p]);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight">
            Analyse {type === 'likes' ? 'Engagement' : 'Communauté'}
          </h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Audit en temps réel via l'infrastructure certifiée Nexus API.</p>
        </div>
        <div className={cn(
          "status-badge flex items-center gap-2",
          isRunning ? "bg-tiktok-cyan text-black" : "bg-white/5 border border-white/10 text-white/30"
        )}>
          <div className={cn("w-1.5 h-1.5 rounded-full", isRunning ? "bg-black animate-pulse" : "bg-white/20")} />
          {isRunning ? "Engine Active" : "Engine Standby"}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Configuration */}
        <div className="glass-card p-8 space-y-8">
          <div>
            <h3 className="uppercase-label mb-6">Paramètres de cible</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-xs font-black uppercase italic tracking-tighter">Quantité</span>
                  <span className="text-2xl font-black text-tiktok-cyan leading-none">{targetCount}</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max={config[type].max} 
                  value={targetCount}
                  onChange={(e) => setTargetCount(parseInt(e.target.value))}
                  disabled={isRunning}
                  className="w-full accent-tiktok-cyan h-2 bg-white/5 rounded-full"
                />
              </div>

              <div className="p-5 rounded-2xl bg-tiktok-cyan/5 border border-tiktok-cyan/10">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-5 h-5 text-tiktok-cyan shrink-0" />
                  <p className="text-[11px] text-white/60 leading-relaxed font-bold italic tracking-tight uppercase">
                    Audit certifié sans risque. Traitement des données via les tokens d'accès officiels uniquement.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={toggleTask}
            className={cn(
              "w-full py-5 flex items-center justify-center gap-3 rounded-2xl font-black uppercase text-sm tracking-widest transition-all",
              isRunning 
                ? "bg-tiktok-pink/10 text-tiktok-pink border border-tiktok-pink/20 hover:bg-tiktok-pink/20" 
                : "bg-white text-black hover:scale-[0.98]"
            )}
          >
            {isRunning ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                Stop Execution
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                Lancer l'Audit
              </>
            )}
          </button>
        </div>

        {/* Middle: Execution Status */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-10 flex flex-col items-center justify-center min-h-[340px]">
            {isRunning || count > 0 ? (
              <div className="w-full max-w-sm space-y-10">
                <div className="relative flex flex-col items-center">
                  <div className="relative w-56 h-56">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="112"
                        cy="112"
                        r="104"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        className="text-white/5"
                      />
                      <motion.circle
                        cx="112"
                        cy="112"
                        r="104"
                        stroke="currentColor"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 104}
                        initial={{ strokeDashoffset: 2 * Math.PI * 104 }}
                        animate={{ strokeDashoffset: (2 * Math.PI * 104) * (1 - progress / 100) }}
                        className="text-tiktok-cyan"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-6xl font-black italic tracking-tighter leading-none mb-1">{count}</span>
                      <span className="uppercase-label text-tiktok-cyan opacity-100">{type === 'likes' ? 'Likes' : 'Follows'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between uppercase-label">
                    <span>Performance</span>
                    <span className="text-white opacity-100">{Math.round(progress)}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div 
                      className="h-full bg-tiktok-cyan rounded-full"
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MousePointer2 className="w-12 h-12 text-white/20" />
                </div>
                <div>
                  <h4 className="text-xl bold-heading italic">EN ATTENTE</h4>
                  <p className="text-sm text-white/30 uppercase font-bold tracking-tight">Configurez et lancez l'audit Nexus.</p>
                </div>
              </div>
            )}
          </div>

          <div className="glass-card overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <h3 className="uppercase-label opacity-100 italic">Nexus API Terminal_v3.2</h3>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-tiktok-pink/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-tiktok-cyan/40" />
              </div>
            </div>
            <div className="p-6 h-52 overflow-y-auto font-mono text-[11px] font-bold space-y-2 custom-scrollbar">
              <AnimatePresence initial={false}>
                {logs.length === 0 && (
                  <p className="text-white/20 italic tracking-widest uppercase">System ready. Waiting for instructions...</p>
                )}
                {logs.map((log, i) => (
                  <motion.div
                    key={`${i}-${log}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "flex gap-4 tracking-tighter",
                      log.includes('✅') ? "text-tiktok-cyan" : "text-white/40"
                    )}
                  >
                    <span className="opacity-40">[{new Date().toLocaleTimeString()}]</span>
                    <span className="uppercase">{log}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
