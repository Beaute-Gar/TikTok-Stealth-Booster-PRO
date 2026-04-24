import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { AppState } from '../../types';
import { 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Smartphone,
  TrendingUp,
  Monitor
} from 'lucide-react';
import { cn } from '../../lib/utils';

const hourlyData = [
  { hour: '00h', index: 12 }, { hour: '04h', index: 5 }, { hour: '08h', index: 45 },
  { hour: '12h', index: 88 }, { hour: '16h', index: 95 }, { hour: '20h', index: 100 },
];

const sourceData = [
  { name: 'For You', value: 85, color: '#F27D26' },
  { name: 'Following', value: 10, color: '#EF4444' },
  { name: 'Search', value: 5, color: '#3B82F6' },
];

export default function Analytics({ state }: { state: AppState }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Nexus Audience Insights</h1>
          <p className="text-gray-400">Analyse de performance multi-réseaux via API officielle.</p>
        </div>
        <div className="flex gap-2">
          {['7j', '28j', '60j'].map(t => (
            <button key={t} className={cn(
              "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
              t === '28j' ? "bg-white text-black" : "bg-white/5 text-gray-500 hover:text-gray-300"
            )}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Audience Engagement Heatmap */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold flex items-center gap-2 uppercase tracking-tighter italic">
              <Clock className="w-5 h-5 text-tiktok-cyan" />
              Pics d'activité en temps réel
            </h3>
            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-black">Sync: GMT +1 ({state.country})</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: '#141414', border: 'none', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="index" radius={[4, 4, 0, 0]}>
                  {hourlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.index > 80 ? '#F27D26' : 'rgba(242, 125, 38, 0.2)'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
            <p className="text-xs text-orange-500 leading-relaxed font-medium">
              💡 Votre meilleur créneau de publication est entre <span className="underline">18h30 et 21h00</span>.
              Publier pendant ces pics augmente le taux de recommandation "For You" de 34%.
            </p>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="glass-card p-6 flex flex-col">
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-500" />
            Sources de Trafic
          </h3>
          <div className="flex-1 min-h-[200px]">
             <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {sourceData.map(s => (
              <div key={s.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-400">{s.name}</span>
                </div>
                <span className="font-bold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 border-b-4 border-orange-500">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-gray-500" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Rétention</h4>
          </div>
          <p className="text-2xl font-display font-bold">58.4%</p>
          <p className="text-[10px] text-green-500 mt-1">Excellent (Moy. 35%)</p>
        </div>
        <div className="glass-card p-6 border-b-4 border-blue-500">
           <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-gray-500" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Top Localité</h4>
          </div>
          <p className="text-2xl font-display font-bold">{state.country === 'Cameroon' ? 'Douala (CM)' : 'Paris (FR)'}</p>
          <p className="text-[10px] text-gray-500 mt-1">42% de votre audience</p>
        </div>
        <div className="glass-card p-6 border-b-4 border-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Device</h4>
          </div>
          <p className="text-2xl font-display font-bold">iPhone</p>
          <p className="text-[10px] text-gray-500 mt-1">iOS 17+ (78%)</p>
        </div>
        <div className="glass-card p-6 border-b-4 border-red-500">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-5 h-5 text-gray-500" />
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-500">Partages</h4>
          </div>
          <p className="text-2xl font-display font-bold">12.5k</p>
          <p className="text-[10px] text-orange-500 mt-1">+12% ce mois</p>
        </div>
      </div>
    </div>
  );
}
