import type { PropType } from '../types';

export const DEFAULT_PROP_COLORS: Record<PropType, string> = {
  big_screen: '#334155',
  screen: '#475569',
  table: '#78716c',
  chair: '#78716c',
  stairs: '#64748b',
  platform: '#57534e',
  square: '#0ea5e9',
  circle: '#8b5cf6',
};

export const COLOR_PRESETS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#0ea5e9',
  '#6366f1',
  '#a855f7',
  '#ec4899',
  '#78716c',
  '#f8fafc',
  '#1e293b',
  '#000000',
] as const;

export function getDefaultPropColor(type: PropType): string {
  return DEFAULT_PROP_COLORS[type];
}
