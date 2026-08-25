import React, { useState } from 'react';
import { LuminousConfig } from '../types';
import { GLOW_PALETTES } from '../data/palettes';
import { Code, Copy, Check, Terminal, FileCode, Layers } from 'lucide-react';

interface CodeExporterProps {
  config: LuminousConfig;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({ config }) => {
  const palette = GLOW_PALETTES[config.colorPalette];
  const glowAlpha = config.glowIntensity / 100;
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [codeType, setCodeType] = useState<'tailwind' | 'css' | 'react'>('tailwind');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTab(id);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const tailwindSnippet = `<!-- Mouse-Tracking Luminous Aura Card (Tailwind CSS v4) -->
<div className="relative rounded-2xl p-6 bg-slate-900/80 border border-slate-800 transition-all duration-300 overflow-hidden"
     style={{
       boxShadow: '0 0 ${config.blurAmount}px rgba(${palette.glowRgb}, ${0.3 * glowAlpha})'
     }}>
  <!-- Radial Spotlight Layer -->
  <div className="pointer-events-none absolute -inset-px rounded-2xl"
       style={{
         background: 'radial-gradient(${config.auraRadius}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${palette.glowRgb}, ${0.35 * glowAlpha}), transparent 70%)'
       }} />
  
  <h3 className="text-base font-bold text-white">Luminous Card</h3>
  <p className="text-xs text-slate-400">Dynamic specular lighting effect</p>
</div>`;

  const cssSnippet = `/* Luminous Card CSS Classes */
.luminous-card {
  position: relative;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0 ${config.blurAmount}px rgba(${palette.glowRgb}, ${0.3 * glowAlpha});
  overflow: hidden;
}

.luminous-card::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(${config.auraRadius}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(${palette.glowRgb}, ${0.35 * glowAlpha}), transparent 70%);
}

/* Spinning Conic Radiant Border */
@keyframes border-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.radiant-conic-border {
  animation: border-spin ${config.pulseSpeed * 2}s linear infinite;
  background: conic-gradient(from 0deg, transparent 0 300deg, ${palette.primaryHex} 320deg, ${palette.secondaryHex} 360deg);
}`;

  const reactSnippet = `import React, { useRef, useState } from 'react';

export const LuminousAuraCard = () => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos(prev => ({ ...prev, opacity: 0 }))}
      className="relative p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white overflow-hidden cursor-pointer"
      style={{
        boxShadow: \`0 0 ${config.blurAmount}px rgba(${palette.glowRgb}, ${0.3 * glowAlpha})\`
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-200"
        style={{
          opacity: pos.opacity,
          background: \`radial-gradient(${config.auraRadius}px circle at \${pos.x}px \${pos.y}px, rgba(${palette.glowRgb}, ${0.4 * glowAlpha}), transparent 70%)\`
        }}
      />
      <h3 className="font-bold text-lg">Interactive Light Card</h3>
      <p className="text-xs text-slate-400">Specular aura tracks cursor smoothly</p>
    </div>
  );
};`;

  const getCurrentSnippet = () => {
    if (codeType === 'tailwind') return tailwindSnippet;
    if (codeType === 'css') return cssSnippet;
    return reactSnippet;
  };

  return (
    <div className={`rounded-3xl p-6 border transition-all ${
      config.darkMode ? 'bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl' : 'bg-white/90 border-slate-200 shadow-xl'
    }`}>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" />
            Luminous Effect Code Generator
          </h3>
          <p className="text-xs text-slate-400">Copy pre-configured code snippets for your frontend project</p>
        </div>

        {/* Code Type Tabs */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setCodeType('tailwind')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              codeType === 'tailwind' ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tailwind CSS
          </button>
          <button
            onClick={() => setCodeType('css')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              codeType === 'css' ? 'bg-slate-800 text-purple-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pure CSS
          </button>
          <button
            onClick={() => setCodeType('react')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              codeType === 'react' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            React Hook
          </button>
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-xl bg-slate-950 border border-slate-800/90 overflow-hidden font-mono text-xs text-slate-300 p-4">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2 text-slate-400">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">
              {codeType === 'tailwind' ? 'Tailwind v4 Component' : codeType === 'css' ? 'CSS Stylesheet' : 'React Component'}
            </span>
          </div>

          <button
            onClick={() => copyToClipboard(getCurrentSnippet(), codeType)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-all active:scale-95 text-xs"
          >
            {copiedTab === codeType ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        <pre className="overflow-x-auto p-2 leading-relaxed text-cyan-200/90">
          <code>{getCurrentSnippet()}</code>
        </pre>
      </div>

    </div>
  );
};
