import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LuminousConfig } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import {
  Activity,
  Zap,
  Cpu,
  Wifi,
  Database,
  Radio,
  Sliders,
  Sparkles,
  TrendingUp,
  BarChart3,
  Globe,
  Lock,
  RefreshCw
} from 'lucide-react';

interface LuminousDashboardProps {
  config: LuminousConfig;
}

export const LuminousDashboard: React.FC<LuminousDashboardProps> = ({ config }) => {
  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;

  // Live simulated telemetry data
  const [throughput, setThroughput] = useState(1480);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [audioFreq, setAudioFreq] = useState<number[]>([40, 65, 80, 55, 90, 70, 85, 60, 45, 95, 75, 50, 88, 62, 78]);

  // Periodic pulse updater
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => Math.floor(1400 + Math.random() * 200));
      setCpuUsage(prev => Math.floor(20 + Math.random() * 15));
      setAudioFreq(prev => prev.map(() => Math.floor(30 + Math.random() * 65)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner with Ambient Gradient Background */}
      <div 
        className="relative rounded-3xl p-6 border overflow-hidden transition-all duration-300 bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl"
        style={{
          boxShadow: `0 10px 40px -10px rgba(${palette.glowRgb}, ${0.25 * glowAlpha})`
        }}
      >
        {/* Luminous Glow Ambient Spotlights */}
        <div 
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse-glow"
          style={{ background: palette.primaryHex }}
        />
        <div 
          className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-30 animate-pulse-glow"
          style={{ background: palette.secondaryHex }}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${palette.badgeBgClass}`}>
                Luminous UX Core
              </span>
              <span className="text-xs text-slate-400">System Status: Nominal</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
              Cyber-UX Luminous Control Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Real-time demonstration of how specular highlights, glowing telemetry cards, and ambient light backdrops guide user focus in high-density user interfaces.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 flex items-center gap-2"
              style={{
                backgroundColor: palette.primaryHex,
                boxShadow: `0 0 20px rgba(${palette.glowRgb}, ${0.5 * glowAlpha})`
              }}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Live Syncing</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Luminous Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Stat 1: Network Throughput */}
        <div className="relative rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group overflow-hidden shadow-xl">
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at 50% 0%, rgba(${palette.glowRgb}, 0.2), transparent 80%)`
            }}
          />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Throughput</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white tracking-tight">
            {throughput.toLocaleString()} <span className="text-xs font-normal text-slate-400">MB/s</span>
          </p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% peak luminescence</span>
          </div>
        </div>

        {/* Stat 2: CPU Pulse */}
        <div className="relative rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Core Load</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white tracking-tight">
            {cpuUsage}% <span className="text-xs font-normal text-slate-400">capacity</span>
          </p>
          {/* Progress bar with glow */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${cpuUsage}%`,
                backgroundColor: palette.primaryHex,
                boxShadow: `0 0 10px rgba(${palette.glowRgb}, 0.8)`
              }}
            />
          </div>
        </div>

        {/* Stat 3: Active Nodes */}
        <div className="relative rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Global Nodes</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Globe className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white tracking-tight">
            99.98% <span className="text-xs font-normal text-slate-400">uptime</span>
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>42 Edge Clusters Active</span>
          </div>
        </div>

        {/* Stat 4: Security Shield */}
        <div className="relative rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group overflow-hidden shadow-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-medium">Luminous Shield</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold font-mono text-white tracking-tight">
            256-BIT <span className="text-xs font-normal text-slate-400">Quantum</span>
          </p>
          <p className="text-[11px] text-amber-400 mt-2 font-medium">
            Zero Threat Vectors
          </p>
        </div>

      </div>

      {/* Main Grid: Interactive Audio Pulse Visualizer + Glowing Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Audio Pulse Wave Visualizer (1 Col) */}
        <div className="rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4" style={{ color: palette.primaryHex }} />
                Luminous Audio Equalizer
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 border border-white/10 text-slate-300">
                Live Spectrum
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Real-time glowing audio frequency bars driven by fluid CSS keyframe height transforms.
            </p>
          </div>

          {/* Glowing Equalizer Bars */}
          <div className="h-32 flex items-end justify-between gap-1.5 p-3 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10">
            {audioFreq.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
                <motion.div
                  animate={{ height: `${val}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full rounded-t-md transition-all"
                  style={{
                    backgroundColor: palette.primaryHex,
                    boxShadow: `0 0 12px rgba(${palette.glowRgb}, ${0.8 * glowAlpha})`
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono">
            <span>20 Hz</span>
            <span>1 kHz</span>
            <span>20 kHz</span>
          </div>
        </div>

        {/* Glowing Simulated Chart (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl p-5 bg-white/5 backdrop-blur-2xl border border-white/10 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-slate-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                UX Lumens Activity & Engagement Graph
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Scale: 24 Hours</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              Demonstrating glowing stroke pathways and gradient light fills for charts.
            </p>
          </div>

          {/* SVG Glowing Line Chart */}
          <div className="relative h-44 w-full bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center justify-center overflow-hidden">
            {/* Grid Lines */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

            {/* Glowing Chart Path SVG */}
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={palette.primaryHex} stopOpacity="0.4" />
                  <stop offset="100%" stopColor={palette.primaryHex} stopOpacity="0.0" />
                </linearGradient>

                <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Area Fill */}
              <path
                d="M 0 130 Q 80 40 160 90 T 320 30 T 500 70 L 500 150 L 0 150 Z"
                fill="url(#chartGradient)"
              />

              {/* Glowing Line */}
              <path
                d="M 0 130 Q 80 40 160 90 T 320 30 T 500 70"
                fill="none"
                stroke={palette.primaryHex}
                strokeWidth="3"
                filter="url(#glowFilter)"
              />

              {/* Glowing Data Point Markers */}
              <circle cx="160" cy="90" r="5" fill="#ffffff" stroke={palette.primaryHex} strokeWidth="3" className="animate-ping" />
              <circle cx="320" cy="30" r="6" fill="#ffffff" stroke={palette.primaryHex} strokeWidth="3" />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-2 mt-4 text-center text-xs text-slate-400 font-mono">
            <div>00:00</div>
            <div>06:00</div>
            <div>12:00</div>
            <div>18:00</div>
          </div>
        </div>

      </div>

    </div>
  );
};
