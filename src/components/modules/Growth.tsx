import React from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { AppState } from '../../types';
import { 
  TrendingUp, 
  Target, 
  Award, 
  Rocket, 
  ArrowRight,
  Zap,
  Star
} from 'lucide-react';
import { cn } from '../../lib/utils';

const growthData = [
  { day: 'Jour 1', f: 400, v: 2400 },
  { day: 'Jour 2', f: 600, v: 3600 },
  { day: 'Jour 3', f: 1200, v: 8000 },
  { day: 'Jour 4', f: 2100, v: 12000 },
  { day: 'Jour 5', f: 3500, v: 18000 },
  { day: 'Jour 6', f: 4800, v: 24000 },
  { day: 'Jour 7', f: 5500, v: 32000 },
];

export default function Growth({ state }: { state: AppState }) {
  const account = state.currentAccount;
  if (!account) return null;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">ANALYSE DE CROISSANCE</h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Suivi granulaire des performances et projections algorithmiques.</p>
        </div>
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-tiktok-pink/10 border border-tiktok-pink/20">
          <Rocket className="w-10 h-10 text-tiktok-pink" />
          <div>
            <p className="text-[10px] font-black text-tiktok-pink uppercase tracking-widest">Vitesse Turbo</p>
            <p className="text-2xl font-black italic italic tracking-tighter">+45.2%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Next Milestone Card */}
        <div className="lg:col-span-1 glass-card p-10 flex flex-col justify-between h-full bg-gradient-to-b from-white/5 to-transparent">
          <div>
            <h3 className="uppercase-label mb-8 italic opacity-100">PROCHAIN PALIER</h3>
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative">
                <Star className="w-10 h-10 text-tiktok-cyan fill-tiktok-cyan/20" />
                <motion.div 
                  className="absolute inset-0 border border-tiktok-cyan rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <h4 className="text-5xl font-black italic tracking-tighter mb-1 leading-none text-white">10.0K</h4>
              <p className="uppercase-label tracking-[0.3em] font-black">FOLLOWERS</p>
            </div>
          </div>

          <div className="space-y-4 mt-12 pt-6 border-t border-white/5">
            <div className="flex justify-between uppercase-label opacity-100">
              <span className="text-white/40">Progression</span>
              <span className="text-tiktok-cyan">{Math.round((account.followers / 10000) * 100)}%</span>
            </div>
            <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, (account.followers / 10000) * 100)}%` }}
                className="h-full bg-tiktok-cyan rounded-full shadow-[0_0_10px_rgba(37,244,238,0.4)]"
              />
            </div>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight italic text-center">Estimation : Dans 12 jours</p>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="lg:col-span-3 glass-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl bold-heading italic flex items-center gap-4 uppercase">
              <TrendingUp className="w-6 h-6 text-tiktok-pink" />
              ANALYSE PRÉDICTIVE
            </h3>
            <div className="flex gap-6 uppercase-label italic opacity-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-tiktok-pink" />
                <span>Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white/10" />
                <span>Vues</span>
              </div>
            </div>
          </div>
          
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 900 }} 
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F0F12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="f" 
                  stroke="#FE2C55" 
                  strokeWidth={5} 
                  dot={{ r: 6, fill: '#FE2C55', strokeWidth: 0 }} 
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="v" 
                  stroke="rgba(255,255,255,0.1)" 
                  strokeWidth={3} 
                  strokeDasharray="8 8"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategies Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-10 group overflow-hidden relative">
          <div className="relative z-10">
            <Target className="w-12 h-12 text-tiktok-pink mb-8" />
            <h3 className="text-2xl bold-heading italic mb-3 uppercase">MODE SNIPER VIRAL</h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed font-bold tracking-tight uppercase">
              Ciblage chirurgical des pics d'engagement. Simulation cloud pour un anonymat total.
            </p>
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-tiktok-pink group-hover:gap-5 transition-all">
              DÉMARRER OPTIMISATION
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <Zap className="absolute -bottom-10 -right-10 w-48 h-48 text-tiktok-pink/5 group-hover:scale-110 transition-transform" />
        </div>

        <div className="glass-card p-10 group overflow-hidden relative">
          <div className="relative z-10">
            <Award className="w-12 h-12 text-tiktok-cyan mb-8" />
            <h3 className="text-2xl bold-heading italic mb-3 uppercase">CERTIFICATION STEALTH</h3>
            <p className="text-sm text-white/50 mb-8 leading-relaxed font-bold tracking-tight uppercase">
              Badge de conformité algorithmique v13. Débloquez des limites de boost extrêmes.
            </p>
            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-tiktok-cyan group-hover:gap-5 transition-all">
              PASSER LE TEST
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <Star className="absolute -bottom-10 -right-10 w-48 h-48 text-tiktok-cyan/5 group-hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}
