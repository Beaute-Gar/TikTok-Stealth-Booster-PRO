import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Download, 
  Share2, 
  Music, 
  Volume2, 
  VolumeX,
  Clapperboard,
  Waves,
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { PlatformType } from '../../types';

interface VideoStudioProps {
  script: string;
  platform: PlatformType;
  onBack: () => void;
}

interface Scene {
  text: string;
  duration: number;
  image: string;
}

export default function VideoStudio({ script, platform, onBack }: VideoStudioProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Parse script into simplified scenes
  useEffect(() => {
    const lines = script.split('\n').filter(l => l.trim() && !l.includes('[') && !l.includes(']'));
    const parsedScenes: Scene[] = lines.slice(0, 5).map((line, i) => ({
      text: line.length > 80 ? line.substring(0, 80) + '...' : line,
      duration: 3000,
      image: `https://images.unsplash.com/photo-${1600000000000 + (i * 1000)}?w=800&q=80`
    }));
    setScenes(parsedScenes);
    
    // Simulate generation delay
    setTimeout(() => setIsLoading(false), 2000);
  }, [script]);

  // Video playback logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          const next = prev + (100 / (scenes.length * 30)); // 30fps simulation
          if (next >= 100) {
            setIsPlaying(false);
            return 100;
          }
          
          const sceneIndex = Math.floor((next / 100) * scenes.length);
          if (sceneIndex !== currentScene && sceneIndex < scenes.length) {
            setCurrentScene(sceneIndex);
          }
          
          return next;
        });
      }, 33);
    }
    return () => clearInterval(interval);
  }, [isPlaying, scenes, isLoading, currentScene]);

  const handleRestart = () => {
    setProgress(0);
    setCurrentScene(0);
    setIsPlaying(true);
  };

  const isVertical = platform === 'tiktok' || platform === 'instagram';

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white transition-colors uppercase-label italic"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'éditeur
        </button>
        <div className="status-badge bg-tiktok-cyan text-black px-4 py-2 flex items-center gap-2">
          <Clapperboard className="w-3 h-3" />
          STUDIO DE PRODUCTION V1.0
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Video Preview Area */}
        <div className="lg:col-span-7 space-y-6">
          <div className={cn(
            "relative mx-auto rounded-[40px] bg-black border-[12px] border-white/5 overflow-hidden shadow-2xl transition-all duration-700",
            isVertical ? "aspect-[9/16] max-w-[340px]" : "aspect-video w-full"
          )}>
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                <Loader2 className="w-12 h-12 text-tiktok-cyan animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-tiktok-cyan">Processing Assets...</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentScene}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <img 
                    src={scenes[currentScene]?.image} 
                    className="w-full h-full object-cover opacity-60"
                    alt="scene"
                  />
                  {/* Panning effect overlay */}
                  <motion.div 
                    initial={{ x: "-10%" }}
                    animate={{ x: "0%" }}
                    className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Captions Overlay */}
            {!isLoading && (
              <div className="absolute inset-x-8 bottom-24 z-10 text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScene}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="inline-block"
                  >
                    <p className="text-xl font-black italic uppercase tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] leading-tight">
                      {scenes[currentScene]?.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            )}

            {/* Platform UI Simulation (Vertical) */}
            {isVertical && !isLoading && (
              <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center">
                <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Nexus" className="w-full h-full" alt="avatar" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <span className="text-white text-xs">❤️</span>
                  </div>
                  <span className="text-[8px] font-bold text-white">12.4k</span>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
              <motion.div 
                className="h-full bg-tiktok-cyan shadow-[0_0_10px_#25F4EE]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button 
              onClick={handleRestart}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
            </button>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-4 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Right: Studio Controls */}
        <div className="lg:col-span-5 space-y-8">
           <div className="glass-card p-8">
            <h3 className="text-xl bold-heading italic uppercase mb-6 flex items-center gap-3">
              <Music className="w-5 h-5 text-tiktok-pink" />
              Synthèse Sonore
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <Waves className="w-5 h-5 text-tiktok-cyan animate-pulse" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white">Deep House Mix</p>
                    <p className="text-[10px] font-bold text-white/40">Génération IA - Rythme 128 BPM</p>
                  </div>
                </div>
                <div className="status-badge bg-tiktok-pink py-0.5 px-2 text-[8px]">ACTIVE</div>
              </div>
              <p className="text-[10px] text-white/30 font-bold uppercase leading-relaxed">
                Le son est automatiquement synchronisé avec les transitions de texte pour maximiser l'effet hypnotique et la rétention d'audience.
              </p>
            </div>
           </div>

           <div className="glass-card p-8">
              <h3 className="text-xl bold-heading italic uppercase mb-6 flex items-center gap-3">
                <Waves className="w-5 h-5 text-tiktok-cyan" />
                Exploration de Scènes
              </h3>
              <div className="space-y-3">
                {scenes.map((scene, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "p-4 rounded-xl border transition-all",
                      currentScene === i ? "bg-tiktok-cyan/10 border-tiktok-cyan/40" : "bg-white/5 border-white/10 opacity-40"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-tiktok-cyan">0{i+1}</span>
                      <p className="text-xs font-bold text-white truncate">{scene.text}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                <Download className="w-4 h-4" />
                Exporter MP4
              </button>
              <button className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-tiktok-cyan text-black font-black uppercase text-xs tracking-widest hover:scale-[0.98] transition-all">
                <Share2 className="w-4 h-4" />
                Partager
              </button>
           </div>
        </div>
      </div>

      {/* Audio Element Hidden */}
      <audio 
        src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" 
        autoPlay={isPlaying && !isMuted}
        loop
        muted={isMuted || !isPlaying}
      />
    </div>
  );
}
