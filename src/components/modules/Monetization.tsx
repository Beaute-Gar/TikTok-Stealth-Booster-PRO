import React from 'react';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  PlayCircle, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  HelpCircle,
  Zap,
  Gift,
  CreditCard,
  ArrowRight,
  Receipt
} from 'lucide-react';
import { AppState } from '../../types';
import { cn } from '../../lib/utils';

export default function Monetization({ state }: { state: AppState }) {
  const account = state.currentAccount;
  if (!account) return null;

  const programs = [
    { 
      name: 'Creator Fund', 
      eligible: account.monetizationStatus.isEligibleForCreatorFund, 
      req: '10,000 followers', 
      progress: Math.min(100, (account.followers / 10000) * 100),
      icon: DollarSign,
      color: 'bg-green-500'
    },
    { 
      name: 'TikTok LIVE', 
      eligible: account.followers >= 1000, 
      req: '1,000 followers', 
      progress: Math.min(100, (account.followers / 1000) * 100),
      icon: Zap,
      color: 'bg-orange-500'
    },
    { 
      name: 'Series & Tips', 
      eligible: account.followers >= 10000, 
      req: '10,000 followers', 
      progress: Math.min(100, (account.followers / 10000) * 100),
      icon: Gift,
      color: 'bg-purple-500'
    },
    { 
      name: 'TikTok Shop', 
      eligible: account.followers >= 5000, 
      req: '5,000 followers', 
      progress: Math.min(100, (account.followers / 5000) * 100),
      icon: CreditCard,
      color: 'bg-blue-500'
    },
  ];

  const estimatedTotal = (state.accounts?.tiktok?.monetizationStatus.estimatedEarnings || 0) + 
                       (state.accounts?.youtube?.subscribers ? 15000 : 0);
  
  const commissionRate = account.followers < 10000 ? 25 : account.followers < 100000 ? 18 : 10;
  const calculatedCommission = Math.floor(estimatedTotal * (commissionRate / 100));

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">MONÉTISATION INTELLIGENTE</h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Analyse des revenus multi-plateformes et commissionnement dynamique.</p>
        </div>
        <div className="status-badge bg-tiktok-cyan text-black flex items-center gap-2">
          <TrendingUp className="w-3 h-3" />
          Revenue Optimizer Active
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Consolidated Revenue Card */}
        <div className="lg:col-span-1 glass-card p-10 bg-gradient-to-br from-tiktok-pink/10 to-transparent flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all">
            <DollarSign className="w-64 h-64" />
          </div>
          
          <div>
            <h3 className="uppercase-label italic opacity-100 mb-6">Revenus Consolidés (30j)</h3>
            <div className="flex flex-col mb-10">
              <span className="text-7xl font-black italic tracking-tighter text-white leading-none">{estimatedTotal.toLocaleString()}</span>
              <span className="text-2xl font-black text-tiktok-pink tracking-widest mt-2 uppercase">FCFA</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-bold italic tracking-tight uppercase">
              Somme estimée des revenus TikTok et YouTube via API officielles.
            </p>
          </div>

          <div className="space-y-4">
             <button className="w-full mt-6 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:scale-[0.98] transition-all">
              Retrait MTN MoMo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Commission Card */}
        <div className="lg:col-span-1 glass-card p-10 bg-gradient-to-br from-tiktok-cyan/10 to-transparent flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all">
            <Receipt className="w-64 h-64" />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="uppercase-label italic opacity-100">Commission AI Stealth</h3>
              <div className="status-badge bg-tiktok-cyan text-black py-0.5 text-[8px]">{commissionRate}% RATE</div>
            </div>
            <div className="flex flex-col mb-10">
              <span className="text-7xl font-black italic tracking-tighter text-white leading-none">{calculatedCommission.toLocaleString()}</span>
              <span className="text-2xl font-black text-tiktok-cyan tracking-widest mt-2 uppercase">FCFA</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-bold italic tracking-tight uppercase">
              Prélèvement calculé sur la croissance générée par nos algorithmes.
            </p>
          </div>

          <p className="text-[10px] text-tiktok-cyan font-black uppercase tracking-widest text-center py-4 bg-tiktok-cyan/5 rounded-xl border border-tiktok-cyan/10">
            Next Tier: {(account.followers < 100000 ? 100000 : 500000).toLocaleString()} Followers
          </p>
        </div>

        {/* Region Analysis */}
        <div className="lg:col-span-1 glass-card p-10 flex flex-col justify-between">
          <h3 className="uppercase-label italic opacity-100 mb-8">Analyse Locale CPM</h3>
          <div className="space-y-6">
             {[
               { region: "Cameroon", cpm: "0.5$", status: "Stable", color: "text-tiktok-cyan" },
               { region: "Ivory Coast", cpm: "0.65$", status: "Rising", color: "text-tiktok-pink" },
               { region: "France", cpm: "2.1$", status: "High", color: "text-white" },
             ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight text-white">{r.region}</p>
                    <p className={cn("text-[8px] font-black uppercase tracking-widest", r.color)}>{r.status}</p>
                  </div>
                  <span className="text-lg font-black italic tracking-tighter">{r.cpm} <span className="text-[10px] opacity-40">USD</span></span>
                </div>
             ))}
          </div>
          <p className="text-[9px] text-white/30 font-bold uppercase tracking-tight mt-6 leading-tight">
            *Les revenus sont convertis en FCFA au taux du jour.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eligibility Grid */}
        <div className="glass-card p-10">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-xl bold-heading italic">ÉLIGIBILITÉ PROGRAMMES</h3>
            <div className="status-badge border border-white/10 text-white/40 font-black">Playwright Security v1.41</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((p, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-xl bg-white/10", p.eligible ? "text-tiktok-cyan" : "text-white/40")}>
                      <p.icon className="w-6 h-6" />
                    </div>
                    <span className="font-black italic uppercase tracking-tighter text-lg">{p.name}</span>
                  </div>
                  {p.eligible ? (
                    <CheckCircle2 className="w-6 h-6 text-tiktok-cyan" />
                  ) : (
                    <Clock className="w-6 h-6 text-white/20" />
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between uppercase-label">
                    <span>{p.req}</span>
                    <span className="text-white opacity-100">{Math.round(p.progress)}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      className={cn(
                        "h-full rounded-full", 
                        p.eligible ? "bg-tiktok-cyan shadow-[0_0_10px_rgba(37,244,238,0.4)]" : "bg-white/20"
                      )}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscription Pricing Notification */}
      <div className="glass-card p-8 bg-gradient-to-r from-tiktok-pink/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="p-5 rounded-full bg-tiktok-pink/20 border border-tiktok-pink/30 relative">
            <Zap className="w-10 h-10 text-tiktok-pink fill-current" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-tiktok-pink rounded-full animate-ping" />
          </div>
          <div>
            <h4 className="text-2xl bold-heading italic mb-1 uppercase text-white">Tarification Dynamique PRO</h4>
            <p className="text-sm text-white/50 font-bold uppercase tracking-tight">
              Prix ajusté: <span className="text-white font-black">{account.monetizationStatus.subscriptionPrice.toLocaleString()} FCFA / mois</span>
            </p>
          </div>
        </div>
        <button className="whitespace-nowrap px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-black uppercase text-xs tracking-widest border border-white/10 rounded-xl transition-all">
          Gérer mon plan
        </button>
      </div>
    </div>
  );
}
