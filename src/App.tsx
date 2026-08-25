import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LuminousConfig, GlowColorKey } from './types';
import { GLOW_PALETTES, SHOWCASE_ITEMS } from './data/palettes';
import { Header } from './components/Header';
import { AuraCard } from './components/AuraCard';
import { RadiantBorderCard } from './components/RadiantBorderCard';
import { LuminousControls } from './components/LuminousControls';
import { LuminousDashboard } from './components/LuminousDashboard';
import { LuminousPlayground } from './components/LuminousPlayground';
import { CodeExporter } from './components/CodeExporter';
import { Sparkles, Sliders, LayoutDashboard, Code, Flame, Zap, Shield, Layers, ArrowRight } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<LuminousConfig>({
    colorPalette: 'cyan',
    glowIntensity: 85,
    auraRadius: 280,
    blurAmount: 25,
    pulseSpeed: 3,
    enableMouseTracking: true,
    enableAmbientBackdrop: true,
    enableSoundFx: false,
    darkMode: true,
    activeTab: 'showcase',
  });

  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative ${
      config.darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Background Grid & Ambient Radial Backlight for Frosted Glass Theme */}
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Frosted Glass Luminous Ambient Orbs (GPU Optimized) */}
      <div className="fixed top-[-100px] left-[-100px] w-96 h-96 bg-indigo-600/25 rounded-full blur-[60px] pointer-events-none transform-gpu" />
      <div className="fixed bottom-[-50px] right-[-50px] w-80 h-80 bg-cyan-500/20 rounded-full blur-[60px] pointer-events-none transform-gpu" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[80px] pointer-events-none transform-gpu" />

      {config.enableAmbientBackdrop && (
        <div 
          className="fixed inset-0 pointer-events-none transition-all duration-700 opacity-40"
          style={{
            background: `radial-gradient(1000px circle at 50% 20%, rgba(${palette.glowRgb}, ${0.35 * glowAlpha}), transparent 70%)`
          }}
        />
      )}

      {/* Main App Bar Header */}
      <Header config={config} setConfig={setConfig} />

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        <AnimatePresence mode="wait">
          {/* Tab 1: Showcase View */}
          {config.activeTab === 'showcase' && (
            <motion.div 
              key="showcase"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-8 relative"
            >
              {/* Subtle Light Beam Accent on Screen Entrance */}
              <motion.div 
                initial={{ opacity: 0.8, x: '-100%' }}
                animate={{ opacity: 0, x: '100%' }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="absolute -top-4 left-0 right-0 h-[1px] pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, transparent, ${palette.primaryHex}, transparent)`
                }}
              />

              {/* Hero Luminous Title & Showcase Banner */}
              <div className="text-center max-w-3xl mx-auto space-y-4 py-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-xl shadow-lg transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                     style={{
                       backgroundColor: `rgba(${palette.glowRgb}, 0.1)`,
                       borderColor: `rgba(${palette.glowRgb}, 0.3)`,
                       color: palette.primaryHex
                     }}>
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>Next-Gen Frosted Glass & Glow Studio</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Luminous & Specular <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
                    Glow Effects Studio
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                  Elevate user experience with responsive mouse-tracking spotlights, rotating conic radiant borders, neon control triggers, and ambient specular glass backdrops.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, activeTab: 'playground' }))}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-105 active:scale-95 flex items-center gap-2 relative overflow-hidden group shadow-lg"
                    style={{
                      backgroundColor: palette.primaryHex,
                      boxShadow: `0 0 25px rgba(${palette.glowRgb}, ${0.6 * glowAlpha})`
                    }}
                  >
                    <Sliders className="w-4 h-4" />
                    <span>Customize Lumens & Aura</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setConfig(prev => ({ ...prev, activeTab: 'dashboard' }))}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-xl transition-all flex items-center gap-2 shadow-md"
                  >
                    <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                    <span>View UX Dashboard Demo</span>
                  </button>
                </div>
              </div>

              {/* Showcase Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Mouse Aura Card */}
                <AuraCard 
                  config={config} 
                  title="Mouse-Tracking Aura Spot"
                  subtitle="Cursor-Follow Spotlight"
                  content="Radial luminous gradient tracks cursor coordinates inside the card container, dynamically illuminating borders and specular layers."
                  badge="Aura Spot"
                />

                {/* Radiant Conic Frame */}
                <RadiantBorderCard 
                  config={config} 
                  title="Spinning Conic Gradient Frame"
                  tagline="Radiant Border Motion"
                  description="Continuous rotating conic gradient border with diffuse ambient glow backdrops for high-priority calls to action."
                  badge="Conic FX"
                />

                {/* Second Aura Card variant */}
                <AuraCard 
                  config={config} 
                  title="Specular Glass Highlight"
                  subtitle="Precision Edge Illumination"
                  content="Combines subtle 3D hover tilt with edge specular lighting for high-end sci-fi & dark mode applications."
                  badge="Specular FX"
                />

              </div>

              {/* Luminous Interactive Controls Showcase */}
              <LuminousControls config={config} />

            </motion.div>
          )}

          {/* Tab 2: Interactive Luminous Playground */}
          {config.activeTab === 'playground' && (
            <motion.div 
              key="playground"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative"
            >
              <LuminousPlayground config={config} setConfig={setConfig} />
            </motion.div>
          )}

          {/* Tab 3: UX Luminous Dashboard */}
          {config.activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative"
            >
              <LuminousDashboard config={config} />
            </motion.div>
          )}

          {/* Tab 4: Code Exporter Snippets */}
          {config.activeTab === 'code' && (
            <motion.div 
              key="code"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative"
            >
              <CodeExporter config={config} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 mt-16 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: palette.primaryHex }} />
            <span className="font-semibold text-slate-300">Luminous UI Studio</span>
            <span>— Precision Light, Glow & Specular UX Effects</span>
          </div>
          <p className="font-mono text-[11px] text-slate-500">
            Powered by React, Motion & Tailwind CSS v4
          </p>
        </div>
      </footer>

    </div>
  );
}
