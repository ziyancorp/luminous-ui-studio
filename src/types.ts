export type GlowColorKey = 'cyan' | 'violet' | 'amber' | 'emerald' | 'rose' | 'sapphire';

export interface GlowPalette {
  id: GlowColorKey;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  glowRgb: string;
  borderGradient: string;
  shadowGlowCss: string;
  accentBgClass: string;
  badgeBgClass: string;
}

export interface LuminousConfig {
  colorPalette: GlowColorKey;
  glowIntensity: number; // 0 to 100
  auraRadius: number; // 100 to 500 px
  blurAmount: number; // 5 to 50 px
  pulseSpeed: number; // 1 to 5s
  enableMouseTracking: boolean;
  enableAmbientBackdrop: boolean;
  enableSoundFx: boolean;
  darkMode: boolean;
  activeTab: 'showcase' | 'playground' | 'dashboard' | 'code';
}

export interface ShowcaseComponent {
  id: string;
  title: string;
  category: 'Cards' | 'Buttons & Controls' | 'Borders & Frames' | 'Data & Visuals' | 'Badges & Alerts';
  description: string;
  tags: string[];
}
