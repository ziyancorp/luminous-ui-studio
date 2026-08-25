import React from 'react';
import { LuminousConfig, GlowColorKey } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import { Sliders, SunMedium, Eye, Zap, Volume2, Shield, Sparkles, Layers, RotateCcw } from 'lucide-react';
import { AuraCard } from './AuraCard';
import { RadiantBorderCard } from './RadiantBorderCard';

interface LuminousPlaygroundProps {
  config: LuminousConfig;
  setConfig: React.Dispatch<React.SetStateAction<LuminousConfig>>;
}

export const LuminousPlayground: React.FC<LuminousPlaygroundProps> = ({ config, setConfig }) => {
  const palette = GLOW_PALETTES[config.colorPalette];

  const handleReset = () => {
    setConfig({
      colorPalette: 'cyan',
      glowIntensity: 80,
      auraRadius: 280,
      blurAmount: 25,
      pulseSpeed: 3,
      enableMouseTracking: true,
      enableAmbientBackdrop: true,
      enableSoundFx: false,
      darkMode: true,
      activeTab: 'playground',
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      
      {/* Left Column: Interactive Parameters Customizer Panel (5 cols) */}
      <div className={`lg:col-span-5 rounded-3xl p-6 border transition-all ${
        config.darkMode ? 'bg-white/5 backdrop-blur-2xl border-white/10 text-slate-100 shadow-2xl' : 'bg-white/90 border-slate-200 text-slate-900 shadow-xl'
      }`}>
        
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">Luminous Parameter Studio</h3>
              <p className="text-xs text-slate-400">Tweak light variables in real-time</p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Reset to Default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          
          {/* 1. Color Palette Selector */}
          <div>
            <label className="text-xs font-mono text-slate-400 mb-2 block uppercase tracking-wider flex justify-between">
              <span>1. Neon Palette</span>
              <span className="text-white font-bold">{palette.name}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(GLOW_PALETTES) as GlowColorKey[]).map((key) => {
                const item = GLOW_PALETTES[key];
                const active = config.colorPalette === key;
                return (
                  <button
                    key={key}
                    onClick={() => setConfig(prev => ({ ...prev, colorPalette: key }))}
                    className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border transition-all ${
                      active
                        ? 'bg-slate-800 text-white border-slate-600 ring-2'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                    style={{
                      borderColor: active ? item.primaryHex : undefined
                    }}
                  >
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.primaryHex }} />
                    <span className="truncate">{item.name.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Glow Intensity Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <label className="font-mono text-slate-400 flex items-center gap-1.5">
                <SunMedium className="w-3.5 h-3.5" style={{ color: palette.primaryHex }} />
                Glow Intensity
              </label>
              <span className="font-mono font-bold text-white">{config.glowIntensity}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.glowIntensity}
              onChange={(e) => setConfig(prev => ({ ...prev, glowIntensity: Number(e.target.value) }))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800 accent-cyan-400"
              style={{ accentColor: palette.primaryHex }}
            />
          </div>

          {/* 3. Aura Spot Radius Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <label className="font-mono text-slate-400 flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" style={{ color: palette.primaryHex }} />
                Mouse Aura Radius
              </label>
              <span className="font-mono font-bold text-white">{config.auraRadius} px</span>
            </div>
            <input
              type="range"
              min="100"
              max="500"
              step="10"
              value={config.auraRadius}
              onChange={(e) => setConfig(prev => ({ ...prev, auraRadius: Number(e.target.value) }))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800"
              style={{ accentColor: palette.primaryHex }}
            />
          </div>

          {/* 4. Blur Depth Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs">
              <label className="font-mono text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" style={{ color: palette.primaryHex }} />
                Blur Dispersion Depth
              </label>
              <span className="font-mono font-bold text-white">{config.blurAmount} px</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={config.blurAmount}
              onChange={(e) => setConfig(prev => ({ ...prev, blurAmount: Number(e.target.value) }))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-800"
              style={{ accentColor: palette.primaryHex }}
            />
          </div>

          {/* Toggles */}
          <div className="pt-4 border-t border-slate-800/80 space-y-3">
            
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Mouse-Tracking Spotlight</span>
              <input
                type="checkbox"
                checked={config.enableMouseTracking}
                onChange={(e) => setConfig(prev => ({ ...prev, enableMouseTracking: e.target.checked }))}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700"
                style={{ accentColor: palette.primaryHex }}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-xs font-medium text-slate-300">Ambient Radial Backdrop</span>
              <input
                type="checkbox"
                checked={config.enableAmbientBackdrop}
                onChange={(e) => setConfig(prev => ({ ...prev, enableAmbientBackdrop: e.target.checked }))}
                className="w-4 h-4 rounded bg-slate-800 border-slate-700"
                style={{ accentColor: palette.primaryHex }}
              />
            </div>

          </div>

        </div>

      </div>

      {/* Right Column: Live Target Canvas (7 cols) */}
      <div className="lg:col-span-7 space-y-6">
        
        <div className="relative rounded-3xl p-6 border overflow-hidden min-h-[480px] flex flex-col justify-between bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl">
          
          {/* Ambient Radial Mesh Background */}
          {config.enableAmbientBackdrop && (
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-500 opacity-60"
              style={{
                background: `radial-gradient(${config.auraRadius * 1.8}px circle at 50% 50%, rgba(${palette.glowRgb}, ${0.25 * (config.glowIntensity / 100)}), transparent 70%)`
              }}
            />
          )}

          {/* Header Bar inside Canvas */}
          <div className="relative z-10 flex items-center justify-between pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-slate-300 font-semibold uppercase tracking-wider">
                Live Luminous Studio Canvas
              </span>
            </div>

            <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${palette.badgeBgClass}`}>
              {config.glowIntensity}% Lumens
            </span>
          </div>

          {/* Canvas Render Targets */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <AuraCard config={config} />
            <RadiantBorderCard config={config} />
          </div>

          {/* Footer note */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" style={{ color: palette.primaryHex }} />
              Hover cursor over target cards to test mouse light tracking
            </span>
            <span className="font-mono text-[10px]">CSS Backdrop: Blur({config.blurAmount}px)</span>
          </div>

        </div>

      </div>

    </div>
  );
};
