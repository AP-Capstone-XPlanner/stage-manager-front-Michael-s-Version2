import * as THREE from 'three';

export function adjustColorBrightness(hex: string, amount: number): string {
  const color = new THREE.Color(hex);
  color.offsetHSL(0, 0, amount);
  return `#${color.getHexString()}`;
}

export function isValidHexColor(value: string): boolean {
  return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value);
}

export function normalizeHexColor(value: string, fallback: string): string {
  if (!value.startsWith('#')) value = `#${value}`;
  return isValidHexColor(value) ? value.toLowerCase() : fallback;
}

/**
 * Returns a high-contrast highlight color for selection outlines.
 * Dark props get a bright cyan, light props get a deep blue.
 */
export function getContrastHighlightColor(baseHex: string): string {
  const luminance = getRelativeLuminance(baseHex);
  return luminance > 0.62 ? '#0f4cff' : '#8be9ff';
}

export function getRelativeLuminance(hex: string): number {
  const color = new THREE.Color(hex);
  return 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
}

/** Line + label colors that read clearly on a given background hex. */
export function getContrastOnBackground(hex: string): {
  line: string;
  text: string;
  textShadow: string;
} {
  const lum = getRelativeLuminance(hex);
  const onLight = lum > 0.52;
  if (onLight) {
    return {
      line: '#1c1917',
      text: '#18181b',
      textShadow:
        '0 0 4px rgba(255, 255, 255, 0.85), 0 1px 2px rgba(255, 255, 255, 0.7)',
    };
  }
  return {
    line: '#f4f4f5',
    text: '#fafafa',
    textShadow:
      '0 0 6px rgba(0, 0, 0, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)',
  };
}
