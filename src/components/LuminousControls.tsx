import React, { useState } from 'react';
import { motion } from 'motion/react';
import { LuminousConfig } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import { Sparkles, Power, Sliders, ShieldAlert, CheckCircle2, Zap, Layers, BellRing, Flame } from 'lucide-react';

interface LuminousControlsProps {
  config: LuminousConfig;
}

export const LuminousControls: React.FC<LuminousControlsProps> = ({ config }) => {
  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;

  const [toggleState, setToggleState] = useState(true);
  const [sliderValue, setSliderValue] = useState(72);
  const [btnPressed, setBtnPressed] = useState(false);
  const [scanning, setScanning] = useState(true);

  return (
    <div className={`rounded-3xl p-6 border transition-all ${
      config.darkMode ? 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-xl'
    }`}>
      
      {/* Title */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/60">
        <div>
          <h3 className="font-semibold text-base flex items-center gap-2">
            <Sliders className="w-4 h-4" style={{ color: palette.primaryHex }} />
            Luminous UX Controls & Badges
          </h3>
          <p className="text-xs text-slate-400">Interactive neon-infused UI controls with reactive lighting feedback</p>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${palette.badgeBgClass}`}>
          UX Elements
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Luminous Action Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
            1. Luminous Action Buttons
          </label>
          
          <div className="flex flex-col gap-3">
            {/* Primary Neon Glow Button */}
            <button
              onClick={() => setBtnPressed(!btnPressed)}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              style={{
                backgroundColor: palette.primaryHex,
                boxShadow: `0 0 25px rgba(${palette.glowRgb}, ${0.6 * glowAlpha}), 0 0 50px rgba(${palette.glowRgb}, ${0.3 * glowAlpha})`
              }}
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Zap className="w-4 h-4 animate-bounce" />
              <span>{btnPressed ? 'LUMINOUS ENGAGED' : 'ENGAGE NEON LIGHT'}</span>
            </button>

            {/* Glassmorphism Outline Glow Button */}
            <button 
              className="px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95"
              style={{
                borderColor: `rgba(${palette.glowRgb}, 0.5)`,
                backgroundColor: `rgba(${palette.glowRgb}, 0.08)`,
                color: palette.primaryHex,
                boxShadow: `0 0 15px rgba(${palette.glowRgb}, ${0.2 * glowAlpha})`
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>OUTLINE SPECULAR GLOW</span>
            </button>
          </div>
        </div>

        {/* 2. Luminous Toggle & Sliders */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
            2. Glowing Toggle & Slider
          </label>

          {/* Glowing Toggle Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-xs text-slate-300 font-medium">Radiance Power</span>
            
            <button
              onClick={() => setToggleState(!toggleState)}
              className={`relative w-12 h-6 rounded-full transition-all duration-300 p-0.5 flex items-center ${
                toggleState ? 'bg-slate-800' : 'bg-slate-900'
              }`}
              style={{
                boxShadow: toggleState ? `0 0 20px rgba(${palette.glowRgb}, ${0.5 * glowAlpha})` : 'none',
                backgroundColor: toggleState ? palette.primaryHex : '#1e293b'
              }}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center"
                style={{
                  translateX: toggleState ? 24 : 0
                }}
              >
                <Power className="w-3 h-3 text-slate-900" />
              </motion.div>
            </button>
          </div>

          {/* Luminous Range Slider */}
          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>Aura Lumens</span>
              <span style={{ color: palette.primaryHex }}>{sliderValue} LM</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              value={sliderValue}
              onChange={(e) => setSliderValue(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-cyan-400"
              style={{
                accentColor: palette.primaryHex
              }}
            />
          </div>
        </div>

        {/* 3. Scanning Beam Alert Card */}
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-400 block uppercase tracking-wider">
            3. Scanning Beam Glass Alert
          </label>

          <div className="relative rounded-xl p-4 bg-slate-950/80 border border-slate-800 overflow-hidden">
            {/* Animated Light Beam Scanner */}
            {scanning && (
              <div 
                className="absolute left-0 right-0 h-1 blur-sm animate-[beam-scan_3s_ease-in-out_infinite] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${palette.primaryHex}, transparent)`,
                  boxShadow: `0 0 15px rgba(${palette.glowRgb}, 0.8)`
                }}
              />
            )}

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  Luminous Perimeter Active
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </p>
                <p className="text-[11px] text-slate-400 leading-snug">
                  Dynamic light sweep verifies real-time UX lighting integrity without dropping frames.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Badges & Status Pills Gallery */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-3">
        <span className="text-xs font-mono text-slate-400">Glowing Badges:</span>
        
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.3)]">
          <Flame className="w-3.5 h-3.5" /> High Lumens
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
          <Layers className="w-3.5 h-3.5" /> Specular Layer
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-3.5 h-3.5" /> Hardware Accel
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.3)]">
          <BellRing className="w-3.5 h-3.5" /> Live Signal
        </span>
      </div>

    </div>
  );
};
