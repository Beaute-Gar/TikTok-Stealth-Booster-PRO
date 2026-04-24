import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Instagram, 
  Video, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  Lock,
  ExternalLink
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { AppState, PlatformType, TikTokAccount, YouTubeAccount, InstagramAccount } from '../../types';

interface PlatformConnectProps {
  state: AppState;
  setState: (updates: Partial<AppState>) => void;
}

export default function PlatformConnect({ state, setState }: PlatformConnectProps) {
  const [connecting, setConnecting] = useState<PlatformType | null>(null);

  const platforms = [
    { 
      id: 'tiktok' as const, 
      name: 'TikTok', 
      icon: Video, 
      color: 'text-tiktok-pink', 
      bg: 'bg-tiktok-pink/10',
      connected: !!state.accounts?.tiktok 
    },
    { 
      id: 'youtube' as const, 
      name: 'YouTube', 
      icon: Youtube, 
      color: 'text-red-500', 
      bg: 'bg-red-500/10',
      connected: !!state.accounts?.youtube 
    },
    { 
      id: 'instagram' as const, 
      name: 'Instagram', 
      icon: Instagram, 
      color: 'text-pink-500', 
      bg: 'bg-pink-500/10',
      connected: !!state.accounts?.instagram 
    }
  ];

  const handleConnect = async (platform: PlatformType) => {
    setConnecting(platform);
    
    // Simulate OAuth flow redirect and callback
    await new Promise(r => setTimeout(r, 2000));
    
    const currentAccounts = state.accounts || {};

    if (platform === 'youtube') {
      const mockYT: YouTubeAccount = {
        username: "Uriel_Tech_YT",
        platform: 'youtube',
        isConnected: true,
        followers: 12500,
        subscribers: 12500,
        totalViews: 850000,
        following: 150,
        likes: 45000,
        monetizationEnabled: true
      };
      setState({ accounts: { ...currentAccounts, youtube: mockYT } });
    } else if (platform === 'instagram') {
      const mockIG: InstagramAccount = {
        username: "djousse_evolution",
        platform: 'instagram',
        isConnected: true,
        followers: 8400,
        following: 400,
        likes: 120000,
        postsCount: 145
      };
      setState({ accounts: { ...currentAccounts, instagram: mockIG } });
    }

    setConnecting(null);
  };

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">MULTI-RÉSEAUX OAUTH 2.0</h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Connexion sécurisée via les API officielles des plateformes.</p>
        </div>
        <div className="status-badge bg-tiktok-cyan text-black flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" />
          API V13 SAFE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {platforms.map((p) => (
          <div key={p.id} className="glass-card p-10 flex flex-col justify-between group overflow-hidden relative">
            <div className={cn("absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all", p.color)}>
              <p.icon className="w-64 h-64" />
            </div>

            <div className="relative z-10">
               <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8", p.bg)}>
                <p.icon className={cn("w-8 h-8", p.color)} />
              </div>

              <h3 className="text-2xl bold-heading italic mb-2 uppercase">{p.name}</h3>
              <p className="text-sm text-white/40 font-bold uppercase tracking-tight mb-8">
                {p.connected 
                  ? `Connecté en tant que ${state.accounts?.[p.id]?.username}`
                  : `Synchronisez vos statistiques réelles via ${p.name} Developers.`
                }
              </p>
            </div>

            {p.connected ? (
              <div className="flex items-center gap-3 py-4 px-6 rounded-xl bg-tiktok-cyan/10 border border-tiktok-cyan/20 text-tiktok-cyan">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-xs font-black uppercase tracking-widest">Actif & Vérifié</span>
              </div>
            ) : (
              <button
                disabled={connecting !== null}
                onClick={() => handleConnect(p.id)}
                className="w-full py-5 flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-[0.98] transition-transform disabled:opacity-30"
              >
                {connecting === p.id ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Connecter via OAuth
                    <ExternalLink className="w-4 h-4 shadow-[0_0_10px_rgba(255,255,255,0.4)]" />
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card p-10 bg-gradient-to-br from-white/5 to-transparent border-white/5">
        <div className="flex items-start gap-8">
          <div className="p-5 rounded-3xl bg-white/5 border border-white/10">
            <Lock className="w-10 h-10 text-white/40" />
          </div>
          <div className="flex-1">
            <h4 className="text-xl bold-heading italic mb-3 uppercase">Architecture de Sécurité Stealth</h4>
            <p className="text-sm text-white/40 leading-relaxed font-bold uppercase tracking-tight max-w-3xl mb-8">
              Nous n'accédons jamais à vos mots de passe. La connexion utilise des jetons OAuth 2.0 révocables à tout moment. Les données sont chiffrées au repos via AES-256 et transitent par nos serveurs proxy de Yaoundé pour garantir une stabilité géographique.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-tiktok-cyan">
                <CheckCircle2 className="w-3 h-3" />
                Pas de stockage de mot de passe
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-tiktok-cyan">
                <CheckCircle2 className="w-3 h-3" />
                Chiffrement Militaire
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-tiktok-cyan">
                <CheckCircle2 className="w-3 h-3" />
                Droit à l'oubli immédiat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
