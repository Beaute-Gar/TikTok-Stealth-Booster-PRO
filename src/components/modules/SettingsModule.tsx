import React from 'react';
import { 
  Settings2, 
  Shield, 
  Globe, 
  Lock, 
  RefreshCcw, 
  Monitor, 
  FileText,
  CreditCard,
  Phone,
  Mail,
  Smartphone
} from 'lucide-react';
import { AppState } from '../../types';
import { cn } from '../../lib/utils';

export default function SettingsModule({ state }: { state: AppState }) {
  const sections = [
    {
      title: 'Compte & Sécurité',
      icon: Shield,
      items: [
        { label: 'ID Utilisateur TikTok', value: state.currentAccount?.username, type: 'text' },
        { label: 'Niveau de sécurité', value: 'Élevé (AES-256)', type: 'badge', color: 'text-green-500' },
        { label: 'Proxy Résidentiel', value: 'Activé (CM-Node-01)', type: 'badge', color: 'text-blue-500' },
      ]
    },
    {
      title: 'Facturation (MTN MoMo)',
      icon: CreditCard,
      items: [
        { label: 'Type de Plan', value: 'Essai PRO (2j)', type: 'text' },
        { label: 'Numéro de paiement', value: '+237 6** ** ** 88', type: 'text' },
        { label: 'Prochain prélèvement', value: '26 Avril 2026', type: 'text' },
      ]
    },
    {
      title: 'Système Nexus API v13',
      icon: Settings2,
      items: [
        { label: 'Version Logiciel', value: '13.0.0-stable', type: 'text' },
        { label: 'Infrastructure Cloud', value: 'Nexus Global Sync', type: 'text' },
        { label: 'Intelligence Artificielle', value: 'Gemini 3 Flash', type: 'badge', color: 'text-purple-500' },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">PARAMÈTRES SYSTÈME</h1>
        <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Configuration de l'environnement de performance Nexus v13.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {sections.map((section, idx) => (
          <div key={idx} className="glass-card overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/5 flex items-center gap-4">
              <section.icon className="w-6 h-6 text-white/40" />
              <h3 className="text-xl bold-heading italic uppercase">{section.title}</h3>
            </div>
            <div className="p-10 space-y-6">
              {section.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 group">
                  <span className="uppercase-label italic opacity-100">{item.label}</span>
                  {item.type === 'badge' ? (
                    <span className={cn("status-badge font-black italic text-[10px]", 
                      item.color?.includes('green') ? 'bg-tiktok-cyan text-black' : 
                      item.color?.includes('purple') ? 'bg-tiktok-pink text-white' : 
                      'bg-white/10 text-white'
                    )}>
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-sm font-black text-white italic tracking-tight leading-none group-hover:text-tiktok-cyan transition-colors">{item.value}</span>
                  )}
                </div>
              ))}
              <div className="pt-8">
                <button className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-tiktok-pink transition-all">
                  <RefreshCcw className="w-4 h-4" />
                  Actualiser les Données
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="glass-card p-10 bg-gradient-to-br from-tiktok-pink/10 to-transparent border-tiktok-pink/20">
          <div className="flex items-start gap-8">
            <div className="p-5 rounded-3xl bg-tiktok-pink/20 border border-tiktok-pink/30 shadow-[0_0_20px_rgba(254,44,85,0.2)]">
              <Lock className="w-10 h-10 text-tiktok-pink" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl bold-heading italic text-tiktok-pink mb-2 uppercase">ZONE DE DANGER</h4>
              <p className="text-sm text-white/40 font-bold uppercase tracking-tight mb-8 leading-relaxed">
                La réinitialisation supprimera toutes vos configurations locales et vos historiques de rapports Nexus.
              </p>
              <button 
                onClick={() => {
                   if(confirm("Confirmez-vous la réinitialisation TOTALE du compte ? Cette action est irréversible.")) {
                     localStorage.clear();
                     window.location.reload();
                   }
                }}
                className="w-full md:w-auto px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-[0.98] transition-transform"
              >
                RÉINITIALISER LE SYSTÈME
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-12 py-12 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all border-y border-white/5">
        <Smartphone className="w-10 h-10 text-white" />
        <Globe className="w-10 h-10 text-white" />
        <Monitor className="w-10 h-10 text-white" />
        <Shield className="w-10 h-10 text-white" />
        <FileText className="w-10 h-10 text-white" />
      </div>
      
      <div className="text-center space-y-3 pb-20">
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Copyright © 2026 Djousse Tech Evolution</p>
        <div className="flex justify-center gap-4 text-[8px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">
          <span>Douala</span>
          <span>•</span>
          <span>Abidjan</span>
          <span>•</span>
          <span>Dakar</span>
          <span>•</span>
          <span>Paris</span>
        </div>
      </div>
    </div>
  );
}
