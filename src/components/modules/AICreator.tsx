import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Copy, 
  Check, 
  RefreshCcw, 
  Clapperboard,
  Music,
  Monitor,
  Type as FontIcon,
  Youtube,
  Instagram,
  Video,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateTikTokScript } from '../../services/geminiService';
import Markdown from 'react-markdown';
import { cn } from '../../lib/utils';
import { PlatformType } from '../../types';
import VideoStudio from './VideoStudio';

export default function AICreator() {
  const [theme, setTheme] = useState('');
  const [script, setScript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [platform, setPlatform] = useState<PlatformType>('tiktok');
  const [mode, setMode] = useState<'editor' | 'studio'>('editor');

  const handleGenerate = async () => {
    if (!theme) return;
    setIsLoading(true);
    setScript('');
    try {
      const generatedScript = await generateTikTokScript(`PLATFORM: ${platform.toUpperCase()}. THEME: ${theme}`);
      setScript(generatedScript);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erreur inconnue");
    } finally {
      setIsLoading(false);
    }
  };

  const platforms = [
    { id: 'tiktok' as const, icon: Video, label: 'TikTok/Reels' },
    { id: 'youtube' as const, icon: Youtube, label: 'YouTube' },
    { id: 'instagram' as const, icon: Instagram, label: 'Instagram' },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (mode === 'studio') {
    return <VideoStudio script={script} platform={platform} onBack={() => setMode('editor')} />;
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl bold-heading text-white italic tracking-tight uppercase">IA Content Creator</h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-tight font-medium">Génération multi-plateformes optimisée par Gemini Pro.</p>
        </div>
        <div className="status-badge bg-tiktok-cyan text-black flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          IA Engine Ready
        </div>
      </div>

      <div className="flex gap-4">
        {platforms.map(p => (
          <button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={cn(
              "flex-1 p-4 rounded-2xl flex items-center justify-center gap-3 border transition-all",
              platform === p.id 
                ? "bg-white/10 border-white/20 text-white" 
                : "bg-white/[0.02] border-white/5 text-white/40 hover:bg-white/[0.05]"
            )}
          >
            <p.icon className={cn("w-5 h-5", platform === p.id && "text-tiktok-cyan")} />
            <span className="text-xs font-black uppercase tracking-widest">{p.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Editor */}
        <div className="space-y-8">
          <div className="glass-card p-8">
            <h3 className="uppercase-label italic opacity-100 mb-6">Thème de la vidéo</h3>
            <div className="space-y-6">
              <textarea 
                placeholder={platform === 'youtube' ? "Ex: Documentaire sur l'essor technologique à Yaoundé..." : "Ex: 3 astuces pour percer sur TikTok en 2024..."}
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full h-44 bg-black/60 border border-white/10 rounded-2xl p-6 focus:border-tiktok-cyan outline-none transition-all text-sm font-bold text-white placeholder:text-white/10 resize-none italic"
              />
              <button
                disabled={!theme || isLoading}
                onClick={handleGenerate}
                className="w-full py-5 flex items-center justify-center gap-3 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:grayscale"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                GÉNÉRER {platform.toUpperCase()} CONTENT
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-6 border-l-4 border-tiktok-pink">
              <div className="flex items-center gap-2 mb-3">
                <Music className="w-5 h-5 text-tiktok-pink" />
                <span className="uppercase-label opacity-100 italic">Audio Sync</span>
              </div>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-tight">Synchronisation automatique avec les tendances musicales.</p>
            </div>
            <div className="glass-card p-6 border-l-4 border-tiktok-cyan">
              <div className="flex items-center gap-2 mb-3">
                <Clapperboard className="w-5 h-5 text-tiktok-cyan" />
                <span className="uppercase-label opacity-100 italic">Scene Cut</span>
              </div>
              <p className="text-[10px] text-white/50 font-bold uppercase tracking-tight">Découpage automatique pour maintenir un haut taux de rétention.</p>
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="glass-card flex flex-col min-h-[500px] overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-tiktok-cyan animate-pulse" />
              <h3 className="uppercase-label opacity-100 italic">Script Terminal_v2.0</h3>
            </div>
            {script && (
              <div className="flex gap-2">
                <button 
                  onClick={() => setMode('studio')}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-tiktok-cyan text-black font-black uppercase text-[10px] tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all mr-2"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Produire Vidéo
                </button>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  title="Copier"
                >
                  {copied ? <Check className="w-4 h-4 text-tiktok-cyan" /> : <Copy className="w-4 h-4" />}
                </button>
                <button 
                  onClick={handleGenerate}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white"
                  title="Régénérer"
                >
                  <RefreshCcw className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-10 relative bg-black/20 overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {script ? (
                <motion.div
                  key="script"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert prose-sm max-w-none prose-headings:bold-heading prose-headings:italic prose-headings:tracking-tighter prose-p:font-bold prose-p:text-white/70"
                >
                  <Markdown>{script}</Markdown>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30"
                >
                  <Sparkles className="w-20 h-20 text-white/20" />
                  <p className="uppercase-label opacity-60 italic tracking-[0.3em]">En attente de votre thème neural</p>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <Loader2 className="w-16 h-16 text-tiktok-cyan animate-spin" />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-tiktok-pink animate-pulse" />
                  </div>
                  <p className="uppercase-label opacity-100 text-tiktok-cyan tracking-[0.4em] animate-pulse">Neural engine active...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
