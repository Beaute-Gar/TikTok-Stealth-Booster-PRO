import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ShieldCheck, Globe, User, ArrowRight, Loader2, Volume2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Country, TikTokAccount } from '../types';

interface OnboardingProps {
  onComplete: (account: TikTokAccount, country: string) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [country, setCountry] = useState<Country>('Cameroon');
  const [username, setUsername] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string) => {
    if (!voiceEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1;
    synthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (step === 0 && voiceEnabled) {
      speak("Bonjour, je suis l'assistant de Nexus Analytics Pro, créé par Djousse Uriel de Djousse Tech Evolution. Bienvenue dans la version 13.0 de notre solution officielle de pilotage de carrière pour créateurs multi-réseaux.");
    }
  }, [step, voiceEnabled]);

  const countries: Country[] = ['Cameroon', 'Ivory Coast', 'Senegal', 'France', 'Other'];

  const getLawInfo = () => {
    switch (country) {
      case 'Cameroon': return "Conformément à la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et à la cybercriminalité au Cameroun.";
      case 'Ivory Coast': return "Conformément à la loi n° 2013-451 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire.";
      case 'Senegal': return "Conformément à la loi n° 2008-12 du 25 janvier 2008 portant sur la Protection des données à caractère personnel au Sénégal.";
      default: return "Conformément aux régulations internationales RGPD et aux lois locales de protection des données.";
    }
  };

  const handleAnalyze = async () => {
    if (!username) return;
    setIsAnalyzing(true);
    speak(`Analyse du compte ${username} en cours. Veuillez patienter.`);
    
    // Simulate API call
    await new Promise(r => setTimeout(r, 3000));
    
    const isBeautegar = username.toLowerCase().includes('237djousseuriel');
    
    const mockAccount: TikTokAccount = {
      username: username.startsWith('@') ? username : `@${username}`,
      displayName: isBeautegar ? "Beauté Gar" : username,
      platform: 'tiktok',
      isConnected: true,
      followers: isBeautegar ? 1785 : Math.floor(Math.random() * 500000),
      following: isBeautegar ? 119 : Math.floor(Math.random() * 1000),
      likes: isBeautegar ? 5787 : Math.floor(Math.random() * 2000000),
      bio: isBeautegar ? "Beauté Gar - Créateur passionné." : "Créateur passionné par l'innovation technique. Explorant les limites de Nexus Analytics Pro.",
      videos: [],
      monetizationStatus: {
        isEligibleForLive: true,
        isEligibleForCreatorFund: false,
        estimatedEarnings: isBeautegar ? 1250 : Math.floor(Math.random() * 100000),
        subscriptionPrice: 5000,
        commissionDue: 0
      }
    };
    
    mockAccount.monetizationStatus.isEligibleForCreatorFund = mockAccount.followers >= 10000;
    mockAccount.monetizationStatus.subscriptionPrice = Math.max(5000, Math.floor(mockAccount.followers / 2));
    mockAccount.monetizationStatus.commissionDue = Math.floor(mockAccount.monetizationStatus.estimatedEarnings * 0.15);

    setIsAnalyzing(false);
    onComplete(mockAccount, country);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-20 bg-black">
      <div className="absolute top-8 right-8">
        <button 
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className="p-3 transition-colors rounded-full glass-card hover:bg-white/10"
        >
          <Volume2 className={cn("w-6 h-6", !voiceEnabled && "opacity-30")} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl p-10 glass-card"
          >
            <div className="flex flex-col mb-10 overflow-hidden">
              <h1 className="text-4xl bold-heading tiktok-gradient-text uppercase text-center mb-1">
                NEXUS ANALYTICS
              </h1>
              <p className="uppercase-label text-center">Djousse Tech Evolution • Version 13.0</p>
            </div>

            <div className="space-y-8 text-gray-300">
              <p className="text-xl font-bold italic tracking-tight text-white/90 leading-tight">
                Le copilote intelligent pour les créateurs qui veulent percer.
              </p>

              <div className="p-6 overflow-y-auto max-h-60 rounded-xl bg-black/40 border border-white/10 text-sm space-y-4">
                <h3 className="font-black text-white uppercase text-xs tracking-widest text-tiktok-cyan">Conditions de Service Officielles</h3>
                <p>En utilisant Nexus Analytics Pro, vous acceptez nos politiques de confidentialité et l'utilisation exclusive des API officielles des plateformes.</p>
                <p>Le logiciel garantit la protection de vos données en conformité avec les standards de sécurité les plus élevés et les directives de Djousse Tech Evolution.</p>
                <p className="text-tiktok-pink font-bold italic">{getLawInfo()}</p>
              </div>

              <div className="flex flex-col gap-4">
                <label className="uppercase-label opacity-100">Pays de Résidence</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {countries.map(c => (
                    <button
                      key={c}
                      onClick={() => setCountry(c)}
                      className={cn(
                        "px-3 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg border transition-all",
                        country === c 
                          ? "bg-tiktok-cyan border-tiktok-cyan text-black" 
                          : "border-white/10 text-white/40 hover:border-white/30 hover:bg-white/5"
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <input 
                  type="checkbox" 
                  id="terms" 
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="w-6 h-6 rounded border-white/20 bg-white/5 text-tiktok-pink focus:ring-tiktok-pink transition-all"
                />
                <label htmlFor="terms" className="text-xs font-bold text-white/50 select-none cursor-pointer">
                  J'accepte d'utiliser les outils Nexus Analytics de manière professionnelle.
                </label>
              </div>

              <button
                disabled={!accepted}
                onClick={() => setStep(1)}
                className="w-full py-5 flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-sm tracking-widest rounded-xl transition-all hover:scale-[0.98] disabled:opacity-30 disabled:grayscale"
              >
                Accepter et Continuer
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-lg p-10 glass-card"
          >
            <div className="text-center mb-10">
              <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center rounded-full bg-tiktok-pink/10 border border-tiktok-pink/20">
                <User className="w-10 h-10 text-tiktok-pink" />
              </div>
              <h2 className="text-3xl bold-heading text-white mb-2 italic">CONNEXION SÉCURISÉE</h2>
              <p className="text-white/40 text-sm font-bold tracking-tight uppercase">Initialisation de la vérification API</p>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-tiktok-pink font-black text-lg group-focus-within:scale-110 transition-transform">@</span>
                <input 
                  type="text"
                  placeholder="nom_utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-6 py-5 bg-black/60 border border-white/10 rounded-2xl focus:border-tiktok-cyan focus:ring-1 focus:ring-tiktok-cyan text-white placeholder:text-gray-700 outline-none transition-all font-black text-lg italic tracking-tight"
                />
              </div>

              <button
                disabled={!username || isAnalyzing}
                onClick={handleAnalyze}
                className="w-full py-5 flex items-center justify-center gap-3 bg-tiktok-pink text-white font-black uppercase text-sm tracking-widest rounded-2xl transition-all hover:scale-[1.02] shadow-[0_20px_40px_rgba(254,44,85,0.2)] disabled:opacity-30 disabled:grayscale"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    VÉRIFICATION EN COURS...
                  </>
                ) : (
                  <>
                    VÉRIFIER LE COMPTE
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">
                <ShieldCheck className="w-4 h-4 text-tiktok-cyan" />
                OFFICIAL API VERIFICATION • AES-256
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 text-center">
        <p className="text-gray-600 text-xs font-mono uppercase tracking-[0.3em]">
          Powered by Djousse Tech Evolution Engine
        </p>
      </div>
    </div>
  );
}
