import type { PropInteractionState, PropType } from '../types';

export interface PropCatalogSpec {
  width: number;
  height: number;
  depth: number;
}

export const PROP_CATALOG_SPECS: Record<PropType, PropCatalogSpec> = {
  sofa: { width: 1.83, height: 0.79, depth: 1.52 },
  coffee_table: { width: 0.965, height: 0.47, depth: 0.965 },
  dining_set: { width: 2.5, height: 0.95, depth: 1.6 },
  bed: { width: 1.65, height: 1.12, depth: 2.15 },
  wardrobe: { width: 1.2, height: 1.82, depth: 0.55 },
  bookshelf: { width: 0.77, height: 1.22, depth: 0.3 },
  nightstand: { width: 0.47, height: 0.68, depth: 0.4 },
  musician_chair: { width: 0.51, height: 0.88, depth: 0.58 },
  conductor_podium: { width: 1.0, height: 1.2, depth: 1.0 },
  music_stand: { width: 0.51, height: 1.25, depth: 0.45 },
  musical_instruments: { width: 0.45, height: 0.85, depth: 0.45 },
};

export const INTERACTIVE_PROP_TYPES = new Set<PropType>([
  'wardrobe',
  'nightstand',
  'dining_set',
]);

export function getPropCatalogSpec(type: PropType): PropCatalogSpec {
  return PROP_CATALOG_SPECS[type];
}

export function propSupportsToggleInteraction(type: PropType): boolean {
  return type === 'wardrobe' || type === 'nightstand';
}

export function getDefaultPropInteractionState(
  type: PropType,
): PropInteractionState | undefined {
  if (type === 'wardrobe' || type === 'nightstand') {
    return { open: false };
  }
  if (type === 'dining_set') {
    return { chairsPulled: [false, false, false, false, false, false] };
  }
  return undefined;
}
