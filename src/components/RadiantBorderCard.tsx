import React from 'react';
import { motion } from 'motion/react';
import { LuminousConfig } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import { ShieldCheck, Flame, Radio, Activity } from 'lucide-react';

interface RadiantBorderCardProps {
  config: LuminousConfig;
  title?: string;
  tagline?: string;
  description?: string;
  badge?: string;
}

export const RadiantBorderCard: React.FC<RadiantBorderCardProps> = ({
  config,
  title = "Radiant Conic Frame",
  tagline = "Continuous Spinning Gradient Outline",
  description = "A precision-engineered border effect using CSS conic-gradients and blur backdrops for high-priority UI highlights.",
  badge = "Active Glow"
}) => {
  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;

  return (
    <div className="relative group rounded-3xl p-[1.5px] overflow-hidden transition-all duration-300">
      
      {/* Spinning Conic Gradient Border background */}
      <div 
        className="absolute inset-[-200%] animate-border-spin pointer-events-none"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 300deg, ${palette.primaryHex} 320deg, ${palette.secondaryHex} 350deg, ${palette.primaryHex} 360deg)`,
          opacity: 0.85 * glowAlpha + 0.15
        }}
      />

      {/* Outer Ambient Glow Mesh */}
      <div 
        className="absolute inset-0 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(${palette.glowRgb}, ${0.5 * glowAlpha}) 0%, transparent 70%)`
        }}
      />

      {/* Inner Card Glass Surface */}
      <div className={`relative z-10 rounded-[22px] p-6 h-full flex flex-col justify-between transition-colors backdrop-blur-2xl ${
        config.darkMode ? 'bg-slate-950/80 text-slate-100' : 'bg-slate-900/90 text-slate-100'
      }`}>
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span 
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: palette.primaryHex }}
                />
                <span 
                  className="relative inline-flex rounded-full h-2.5 w-2.5"
                  style={{ backgroundColor: palette.primaryHex }}
                />
              </span>
              <span className="text-xs font-mono font-medium tracking-wider text-slate-400 uppercase">
                {badge}
              </span>
            </div>

            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${palette.badgeBgClass}`}>
              CONIC-FX
            </span>
          </div>

          <h3 className="font-bold text-lg text-white mb-1 tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            {tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
            {description}
          </p>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400">Radiance FPS</p>
              <p className="text-xs font-bold font-mono text-emerald-400">60.0 FPS</p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
            <Radio className="w-4 h-4" style={{ color: palette.primaryHex }} />
            <div>
              <p className="text-[10px] text-slate-400">Pulse Band</p>
              <p className="text-xs font-bold font-mono text-white">{config.pulseSpeed}s Loop</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
