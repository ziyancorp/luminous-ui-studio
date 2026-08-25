import React from 'react';
import { Sparkles, Sliders, LayoutDashboard, Code, Sun, Moon, Volume2, VolumeX, ShieldAlert } from 'lucide-react';
import { LuminousConfig, GlowColorKey } from '../types';
import { GLOW_PALETTES } from '../data/palettes';

interface HeaderProps {
  config: LuminousConfig;
  setConfig: React.Dispatch<React.SetStateAction<LuminousConfig>>;
}

export const Header: React.FC<HeaderProps> = ({ config, setConfig }) => {
  const currentPalette = GLOW_PALETTES[config.colorPalette];

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
      config.darkMode 
        ? 'bg-white/5 border-white/10 text-slate-100 shadow-xl' 
        : 'bg-white/80 border-slate-200 text-slate-900 shadow-md'
    } backdrop-blur-2xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/80 shadow-lg overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-70 blur-md transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, rgba(${currentPalette.glowRgb}, 0.8) 0%, transparent 70%)`
                }}
              />
              <Sparkles className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" style={{ color: currentPalette.primaryHex }} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-xl tracking-tight font-heading bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  Luminous UI
                </h1>
                <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${currentPalette.badgeBgClass}`}>
                  UX Studio
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block font-medium tracking-normal">
                Dynamic Glow, Specular Light & Radiant Border FX
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            <button
              onClick={() => setConfig(prev => ({ ...prev, activeTab: 'showcase' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                config.activeTab === 'showcase'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={{
                boxShadow: config.activeTab === 'showcase' ? `0 0 15px rgba(${currentPalette.glowRgb}, 0.25)` : 'none'
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Showcase</span>
            </button>

            <button
              onClick={() => setConfig(prev => ({ ...prev, activeTab: 'playground' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                config.activeTab === 'playground'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={{
                boxShadow: config.activeTab === 'playground' ? `0 0 15px rgba(${currentPalette.glowRgb}, 0.25)` : 'none'
              }}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Glow Studio</span>
            </button>

            <button
              onClick={() => setConfig(prev => ({ ...prev, activeTab: 'dashboard' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                config.activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={{
                boxShadow: config.activeTab === 'dashboard' ? `0 0 15px rgba(${currentPalette.glowRgb}, 0.25)` : 'none'
              }}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>UX Dashboard</span>
            </button>

            <button
              onClick={() => setConfig(prev => ({ ...prev, activeTab: 'code' }))}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                config.activeTab === 'code'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700/80'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
              style={{
                boxShadow: config.activeTab === 'code' ? `0 0 15px rgba(${currentPalette.glowRgb}, 0.25)` : 'none'
              }}
            >
              <Code className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Code Snippets</span>
              <span className="md:hidden">Code</span>
            </button>
          </nav>

          {/* Quick Controls: Palette, Sound & Dark Mode */}
          <div className="flex items-center gap-2">
            
            {/* Color Swatch Picker Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
              {(Object.keys(GLOW_PALETTES) as GlowColorKey[]).map((key) => {
                const palette = GLOW_PALETTES[key];
                const isSelected = config.colorPalette === key;
                return (
                  <button
                    key={key}
                    onClick={() => setConfig(prev => ({ ...prev, colorPalette: key }))}
                    title={palette.name}
                    className={`w-5 h-5 rounded-full transition-transform hover:scale-125 relative ${
                      isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110' : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: palette.primaryHex }}
                  />
                );
              })}
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={() => setConfig(prev => ({ ...prev, darkMode: !prev.darkMode }))}
              className="p-2 rounded-xl bg-slate-900/60 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
              title={config.darkMode ? "Switch to Light Canvas" : "Switch to Dark Canvas"}
            >
              {config.darkMode ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
