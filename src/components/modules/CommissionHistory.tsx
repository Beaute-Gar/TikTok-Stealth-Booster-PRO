import React from 'react';
import { motion } from 'motion/react';
import { 
  Receipt, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  ArrowRight, 
  AlertCircle,
  CreditCard,
  Ban,
  Clock,
  Youtube,
  Video,
  Instagram
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AppState, CommissionRecord } from '../../types';

interface CommissionHistoryProps {
  state: AppState;
}

export default function CommissionHistory({ state }: CommissionHistoryProps) {
  const account = state.currentAccount;
  if (!account) return null;

  const totalPaid = state.commissions
    .filter(c => c.status === 'paid')
    .reduce((acc, c) => acc + c.amount, 0);

  const totalPending = state.commissions
    .filter(c => c.status === 'pending')
    .reduce((acc, c) => acc + c.amount, 0);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'youtube': return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      default: return <Video className="w-4 h-4 text-tiktok-pink" />;
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">SYSTÈME DE COMMISSIONS</h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Gestion des prélèvements sur revenus générés via l'optimisation Stealth.</p>
        </div>
        <div className="status-badge bg-tiktok-pink text-white flex items-center gap-2">
          <Receipt className="w-3 h-3" />
          Facturation Dynamique
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card p-10 bg-gradient-to-br from-tiktok-cyan/10 to-transparent">
          <h3 className="uppercase-label italic opacity-100 mb-6">En Attente de Règlement</h3>
          <div className="flex flex-col mb-8">
            <span className="text-6xl font-black italic tracking-tighter text-white leading-none">{totalPending.toLocaleString()}</span>
            <span className="text-xl font-black text-tiktok-cyan tracking-widest mt-2 uppercase">FCFA</span>
          </div>
          <button className="w-full py-4 bg-white text-black font-black uppercase text-xs tracking-widest rounded-xl hover:scale-[0.98] transition-all">
            Régler via MTN MoMo
          </button>
        </div>

        <div className="glass-card p-10 bg-gradient-to-br from-white/5 to-transparent">
          <h3 className="uppercase-label italic opacity-100 mb-6">Total Commissions Payées</h3>
          <div className="flex flex-col mb-8">
            <span className="text-6xl font-black italic tracking-tighter text-white/40 leading-none">{totalPaid.toLocaleString()}</span>
            <span className="text-xl font-black text-white/20 tracking-widest mt-2 uppercase">FCFA</span>
          </div>
          <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight">Statut de compte : Prioritaire</p>
        </div>

        <div className="glass-card p-10 bg-gradient-to-br from-tiktok-pink/10 to-transparent flex flex-col justify-between">
          <div>
            <h3 className="uppercase-label italic opacity-100 mb-6">Taux de Commission Actuel</h3>
            <div className="flex flex-col">
              <span className="text-6xl font-black italic tracking-tighter text-tiktok-pink leading-none">15%</span>
              <p className="text-xs text-white/50 font-bold uppercase tracking-tight mt-4 italic mb-2">Algorithme de pricing prédictif acté.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 text-center">
            Ptier-1 Creator Level
          </div>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-8 border-b border-white/5 bg-white/5 flex items-center justify-between">
          <h3 className="text-xl bold-heading italic uppercase">Historique des Transactions</h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/40">
                <div className="w-2 h-2 rounded-full bg-tiktok-cyan" />
                Validé
             </div>
             <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-white/40">
                <div className="w-2 h-2 rounded-full bg-tiktok-pink animate-pulse" />
                Suspendu
             </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 uppercase-label italic opacity-100">ID TRANSACTION</th>
                <th className="px-8 py-6 uppercase-label italic opacity-100">PLATFORME</th>
                <th className="px-8 py-6 uppercase-label italic opacity-100">DATE ANALYSE</th>
                <th className="px-8 py-6 uppercase-label italic opacity-100">MONTANT</th>
                <th className="px-8 py-6 uppercase-label italic opacity-100">STATUT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {state.commissions.map((comm) => (
                <tr key={comm.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6 font-mono text-xs font-black text-white/40">#{comm.id.toUpperCase()}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        {getPlatformIcon(comm.platform)}
                      </div>
                      <span className="text-xs font-black uppercase tracking-tighter italic">{comm.platform}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs text-white/60 font-bold uppercase tracking-tight">
                    {new Date(comm.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-lg font-black italic tracking-tighter text-white">
                      {comm.amount.toLocaleString()} <span className="text-[10px] text-white/30 ml-1">FCFA</span>
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest",
                      comm.status === 'paid' 
                        ? "bg-tiktok-cyan/10 text-tiktok-cyan border border-tiktok-cyan/20" 
                        : "bg-tiktok-pink/10 text-tiktok-pink border border-tiktok-pink/20 animate-pulse"
                    )}>
                      {comm.status === 'paid' ? 'Payé' : 'À Régler'}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10">
        <AlertCircle className="w-8 h-8 text-tiktok-cyan shrink-0" />
        <p className="text-sm text-white/50 leading-relaxed font-bold uppercase tracking-tight">
          Les commissions sont calculées automatiquement par notre moteur de Machine Learning en fonction de votre <span className="text-white">engagement relatif</span> et de votre <span className="text-white">volume de vues officiel</span>. Le non-règlement des commissions peut entraîner une suspension temporaire des outils de boost Stealth.
        </p>
      </div>
    </div>
  );
}
