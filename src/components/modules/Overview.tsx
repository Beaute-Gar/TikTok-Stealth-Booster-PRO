import React from 'react';
import { 
  Users, 
  Heart, 
  PlayCircle, 
  TrendingUp, 
  Zap,
  Youtube,
  Instagram,
  Video,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { AppState } from '../../types';
import { cn } from '../../lib/utils';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Lun', tiktok: 4000, youtube: 2400, instagram: 1200 },
  { name: 'Mar', tiktok: 3000, youtube: 2800, instagram: 1500 },
  { name: 'Mer', tiktok: 5000, youtube: 3900, instagram: 1800 },
  { name: 'Jeu', tiktok: 2780, youtube: 4500, instagram: 2100 },
  { name: 'Ven', tiktok: 4890, youtube: 3800, instagram: 2400 },
  { name: 'Sam', tiktok: 6390, youtube: 5800, instagram: 3000 },
  { name: 'Dim', tiktok: 7490, youtube: 6300, instagram: 3500 },
];

export default function Overview({ state }: { state: AppState }) {
  const accounts = state.accounts || {};
  
  const totalFollowers = (accounts.tiktok?.followers || 0) + 
                       (accounts.youtube?.subscribers || 0) + 
                       (accounts.instagram?.followers || 0);
                       
  const totalRevenue = (accounts.tiktok?.monetizationStatus.estimatedEarnings || 0) + 
                      (accounts.youtube ? 15000 : 0); // Simulated YT earnings

  const platformCards = [
    { 
      id: 'tiktok', 
      name: 'TikTok', 
      icon: Video, 
      account: accounts.tiktok, 
      color: 'text-tiktok-pink', 
      metric: 'Followers' 
    },
    { 
      id: 'youtube', 
      name: 'YouTube', 
      icon: Youtube, 
      account: accounts.youtube, 
      color: 'text-red-500', 
      metric: 'Subscribers' 
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Instagram, 
      account: accounts.instagram, 
      color: 'text-pink-500', 
      metric: 'Followers' 
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl bold-heading text-white italic tracking-tight uppercase">Dashboard Multi-Réseaux</h1>
          <p className="text-white/40 text-sm mt-1 uppercase font-bold tracking-tight">Pilotage intelligent v13.0 • Ecosystème Créateur Connecté</p>
        </div>
        
        <div className="flex gap-4">
          <div className="glass-card px-6 py-4 flex items-center gap-4 bg-tiktok-cyan/10 border-tiktok-cyan/20">
            <DollarSign className="w-6 h-6 text-tiktok-cyan" />
            <div>
              <p className="uppercase-label text-tiktok-cyan opacity-100">Revenus Cumulés</p>
              <p className="text-xl font-black italic tracking-tighter text-white">
                {totalRevenue.toLocaleString()} <span className="text-[10px] opacity-40">FCFA</span>
              </p>
            </div>
          </div>
          <div className="glass-card px-6 py-4 flex items-center gap-4">
            <Users className="w-6 h-6 text-white/40" />
            <div>
              <p className="uppercase-label">Audience Totale</p>
              <p className="text-xl font-black italic tracking-tighter text-white">
                {totalFollowers.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Connectivity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platformCards.map((p) => (
          <div key={p.id} className={cn(
            "glass-card p-8 group relative overflow-hidden transition-all hover:scale-[0.98]",
            p.account ? "border-white/10" : "border-white/5 opacity-50 grayscale"
          )}>
            <div className="flex items-center justify-between mb-8">
               <div className={cn("p-3 rounded-xl bg-white/5", p.color)}>
                <p.icon className="w-6 h-6" />
              </div>
              {p.account ? (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-tiktok-cyan">
                  <ShieldCheck className="w-4 h-4" />
                  Live Sync
                </div>
              ) : (
                <div className="text-[10px] font-black uppercase text-white/20">Hors-ligne</div>
              )}
            </div>

            {p.account ? (
              <div>
                <p className="uppercase-label mb-2 opacity-100 italic">{p.name}</p>
                <h3 className="text-3xl font-black text-white italic tracking-tighter mb-1">
                  {p.id === 'youtube' && p.account && 'subscribers' in p.account 
                    ? p.account.subscribers.toLocaleString() 
                    : p.account?.followers.toLocaleString()}
                </h3>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{p.metric}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-4 border border-dashed border-white/10 rounded-xl">
                <Plus className="w-6 h-6 text-white/20 mb-2" />
                <p className="text-[10px] font-black text-white/20 uppercase">Connecter {p.name}</p>
              </div>
            )}
            
            <div className={cn("absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity", p.color)}>
              <p.icon className="w-24 h-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl bold-heading italic uppercase italic tracking-tighter">Flux d'engagement Global</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-tiktok-pink">
                <div className="w-2 h-2 rounded-full bg-tiktok-pink" />
                TikTok
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                YouTube
              </div>
            </div>
          </div>
          <div className="glass-card p-10 bg-black/40">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTikTok" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FE2C55" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FE2C55" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorYT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF0000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10, fontWeight: 900 }} 
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F0F12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 900 }}
                  />
                  <Area type="monotone" dataKey="tiktok" stroke="#FE2C55" strokeWidth={4} fillOpacity={1} fill="url(#colorTikTok)" />
                  <Area type="monotone" dataKey="youtube" stroke="#FF0000" strokeWidth={4} fillOpacity={1} fill="url(#colorYT)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <h3 className="text-2xl bold-heading italic uppercase italic tracking-tighter">Alertes Neural Engine</h3>
           <div className="space-y-4">
              {[
                { title: "Opportunité CPM", desc: "Le CPM au Cameroun est en hausse sur la niche Tech.", type: "cyan" },
                { title: "Audit de Compte", desc: "YouTube a validé votre éligibilité monétisation.", type: "pink" },
                { title: "Tendance Détectée", desc: "Challenge audio #douala_vibe gagne +300% /h.", type: "white" },
              ].map((alert, i) => (
                <div key={i} className={cn(
                  "p-6 rounded-2xl bg-white/[0.03] border-l-4 transition-all hover:bg-white/[0.07] cursor-pointer",
                  alert.type === 'cyan' ? 'border-tiktok-cyan' : alert.type === 'pink' ? 'border-tiktok-pink' : 'border-white/10'
                )}>
                  <h4 className="text-sm font-black uppercase italic mb-1">{alert.title}</h4>
                  <p className="text-[11px] text-white/40 font-bold leading-tight uppercase">{alert.desc}</p>
                </div>
              ))}
              
              <button className="w-full py-5 bg-white text-black font-black uppercase text-xs tracking-widest hover:scale-[0.98] transition-transform rounded-2xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] mt-4">
                Démarrer Optimisation Totale
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
