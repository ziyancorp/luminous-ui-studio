import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { LuminousConfig } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import { ArrowUpRight, Zap, Shield, Sparkles, Cpu } from 'lucide-react';

interface AuraCardProps {
  config: LuminousConfig;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  content?: string;
  badge?: string;
}

export const AuraCard: React.FC<AuraCardProps> = ({
  config,
  title = "Aura Matrix Engine",
  subtitle = "Interactive Mouse Light Tracking",
  icon = <Zap className="w-5 h-5" />,
  content = "Hover and move your pointer over this card to witness dynamic radial luminous spotlights and responsive specular highlights.",
  badge = "Aura Spot"
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!config.enableMouseTracking || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y, opacity: 1 });

    // Subtle 3D Tilt calculation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setMousePos(prev => ({ ...prev, opacity: 0 }));
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative group rounded-3xl p-6 transition-all duration-300 border overflow-hidden cursor-pointer ${
        config.darkMode
          ? 'bg-white/5 backdrop-blur-2xl border-white/10 text-slate-100 hover:border-white/20 hover:bg-white/10 shadow-2xl'
          : 'bg-white/80 backdrop-blur-2xl border-slate-200 text-slate-900 hover:border-slate-300 shadow-xl'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        boxShadow: config.darkMode
          ? `0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 ${config.blurAmount}px rgba(${palette.glowRgb}, ${glowAlpha * 0.25})`
          : `0 15px 35px -5px rgba(0, 0, 0, 0.08), 0 0 ${config.blurAmount}px rgba(${palette.glowRgb}, ${glowAlpha * 0.2})`
      }}
    >
      {/* Dynamic Cursor Spotlight Layer */}
      {config.enableMouseTracking && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity,
            background: `radial-gradient(${config.auraRadius}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${palette.glowRgb}, ${0.35 * glowAlpha}), transparent 70%)`,
          }}
        />
      )}

      {/* Luminous Specular Border Highlight */}
      {config.enableMouseTracking && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl border transition-opacity duration-300"
          style={{
            opacity: mousePos.opacity,
            borderColor: `rgba(${palette.glowRgb}, ${0.8 * glowAlpha})`,
            background: `radial-gradient(${config.auraRadius * 0.7}px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${palette.glowRgb}, ${0.25 * glowAlpha}), transparent 80%)`,
          }}
        />
      )}

      {/* Static Ambient Backglow */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none opacity-40 transition-all group-hover:scale-125 group-hover:opacity-70"
        style={{
          background: palette.primaryHex
        }}
      />

      {/* Card Content Header */}
      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110 flex items-center justify-center"
            style={{
              backgroundColor: `rgba(${palette.glowRgb}, 0.12)`,
              borderColor: `rgba(${palette.glowRgb}, 0.3)`,
              color: palette.primaryHex,
              boxShadow: `0 0 20px rgba(${palette.glowRgb}, ${0.3 * glowAlpha})`
            }}
          >
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-base tracking-tight">{title}</h3>
            <p className="text-xs text-slate-400">{subtitle}</p>
          </div>
        </div>

        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${palette.badgeBgClass}`}>
          {badge}
        </span>
      </div>

      {/* Body Content */}
      <p className="relative z-10 text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
        {content}
      </p>

      {/* Interactive Footer & Action */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/60">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Sparkles className="w-3.5 h-3.5" style={{ color: palette.primaryHex }} />
          <span>Glow Intensity: {config.glowIntensity}%</span>
        </div>

        <button 
          className="flex items-center gap-1.5 text-xs font-medium transition-all group-hover:translate-x-1"
          style={{ color: palette.primaryHex }}
        >
          <span>Explore FX</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
