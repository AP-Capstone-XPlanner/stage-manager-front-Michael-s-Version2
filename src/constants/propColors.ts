import type { PropType } from '../types';

export const DEFAULT_PROP_COLORS: Record<PropType, string> = {
  sofa: '#8f6f33',
  coffee_table: '#d2b48c',
  dining_set: '#d2b48c',
  bed: '#c6a072',
  wardrobe: '#8d6e63',
  bookshelf: '#6d4c41',
  nightstand: '#fcfdfd',
  musician_chair: '#1a1a1a',
  conductor_podium: '#333333',
  music_stand: '#202020',
  musical_instruments: '#deb941',
};

/** Preset swatches for prop color (selected panel + future pickers). */
export const COLOR_PRESETS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#14b8a6',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#b91c1c',
  '#c2410c',
  '#a16207',
  '#854d0e',
  '#78716c',
  '#57534e',
  '#44403c',
  '#64748b',
  '#334155',
  '#1e293b',
  '#0f172a',
  '#000000',
  '#f8fafc',
  '#ffffff',
  '#fecaca',
  '#fef08a',
  '#bbf7d0',
  '#bae6fd',
  '#e9d5ff',
] as const;

export function getDefaultPropColor(type: PropType): string {
  return DEFAULT_PROP_COLORS[type];
}
