import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Heart, 
  UserPlus, 
  Zap, 
  DollarSign, 
  TrendingUp, 
  Settings,
  LogOut,
  Bell,
  Clock,
  ExternalLink,
  ChevronRight,
  Share2,
  Receipt,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { AppState } from '../types';

// Module Components
import Overview from './modules/Overview';
import Analytics from './modules/Analytics';
import Automation from './modules/Automation';
import AICreator from './modules/AICreator';
import Monetization from './modules/Monetization';
import Growth from './modules/Growth';
import SettingsModule from './modules/SettingsModule';
import PlatformConnect from './modules/PlatformConnect';
import CommissionHistory from './modules/CommissionHistory';

interface DashboardProps {
  state: AppState;
  setState: (updates: Partial<AppState>) => void;
}

export default function Dashboard({ state, setState }: DashboardProps) {
  const tabs = [
    { id: 'overview', label: 'Poste de contrôle', icon: LayoutDashboard },
    { id: 'connect', label: 'Connexions', icon: Share2 },
    { id: 'analytics', label: 'Audience Info', icon: BarChart3 },
    { id: 'likes', label: 'Engagement', icon: Heart },
    { id: 'follows', label: 'Communauté', icon: UserPlus },
    { id: 'creator', label: 'IA Content', icon: Zap },
    { id: 'monetization', label: 'Monétisation', icon: DollarSign },
    { id: 'commissions', label: 'Facturation', icon: Receipt },
    { id: 'growth', label: 'Stratégie', icon: TrendingUp },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const renderContent = () => {
    switch (state.currentTab) {
      case 'overview': return <Overview state={state} />;
      case 'connect': return <PlatformConnect state={state} setState={setState} />;
      case 'analytics': return <Analytics state={state} />;
      case 'likes': return <Automation type="likes" state={state} />;
      case 'follows': return <Automation type="follows" state={state} />;
      case 'creator': return <AICreator />;
      case 'monetization': return <Monetization state={state} />;
      case 'commissions': return <CommissionHistory state={state} />;
      case 'growth': return <Growth state={state} />;
      case 'settings': return <SettingsModule state={state} />;
      default: return <Overview state={state} />;
    }
  };

  const trialTimeLeft = () => {
    if (!state.trialExpiresAt) return '0h';
    const diff = state.trialExpiresAt - Date.now();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex h-screen bg-app-bg text-white">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/10 flex flex-col bg-app-bg z-40">
        <div className="p-8">
          <div className="flex flex-col mb-1 pt-2">
            <h1 className="text-2xl font-black tracking-tighter italic tiktok-gradient-text uppercase">
              NEXUS PRO
            </h1>
            <p className="uppercase-label">{state.currentAccount?.displayName || "Djousse Tech Evolution"}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setState({ currentTab: tab.id })}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all group relative",
                state.currentTab === tab.id 
                  ? "bg-white/10 text-white" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <div className={cn(
                "w-2 h-2 rounded-full transition-all",
                state.currentTab === tab.id 
                  ? "bg-tiktok-pink shadow-[0_0_10px_rgba(254,44,85,0.6)]" 
                  : "bg-transparent border border-white/30"
              )} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto border-t border-white/10">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-tiktok-cyan/20 to-white/5 border border-white/10 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black text-tiktok-cyan uppercase tracking-widest">Connect V13.0</span>
              <ShieldCheck className="w-4 h-4 text-tiktok-cyan" />
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-medium">Système certifié API Official. <br/>Région: {state.country}</p>
          </div>

          <button 
            onClick={() => {
              if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
                localStorage.removeItem('nexus_analytics_state');
                window.location.reload();
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-10 bg-app-bg/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-6">
            <div className="status-badge bg-white/10 text-white">Full Access</div>
            <p className="text-sm font-medium">Statut de la connexion: <span className="text-tiktok-cyan font-black tracking-widest ml-1">SYNC OPTIMAL</span></p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-black tracking-tight">{state.currentAccount?.username || "@createur_afrique"}</p>
              <p className="uppercase-label opacity-60 tracking-wider font-medium">{state.country} (Français)</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 border border-white/20 p-0.5">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${state.currentAccount?.username}`}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </header>

        {/* Viewport */}
        <div className="flex-1 overflow-auto p-10 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
