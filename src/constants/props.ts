import type { PropType } from '../types';

export interface PropCatalogItem {
  type: PropType;
  label: string;
  description: string;
  icon: string;
}

export interface PropCatalogCategory {
  id: string;
  label: string;
  items: PropCatalogItem[];
}

export const PROP_CATALOG_CATEGORIES: PropCatalogCategory[] = [
  {
    id: 'living',
    label: 'Living room & bedroom',
    items: [
      {
        type: 'sofa',
        label: 'Sofa / couch',
        description: 'Sectional sofa with cushions',
        icon: '🛋️',
      },
      {
        type: 'coffee_table',
        label: 'Coffee table',
        description: 'Wood coffee table with shelf',
        icon: '☕',
      },
      {
        type: 'dining_set',
        label: 'Dining table & chairs',
        description: 'Table with six pull-out chairs',
        icon: '🍽️',
      },
      {
        type: 'bed',
        label: 'Bed frame & mattress',
        description: 'Timber bed with pillows',
        icon: '🛏️',
      },
      {
        type: 'wardrobe',
        label: 'Wardrobe / dresser',
        description: 'Three-door wardrobe',
        icon: '🚪',
      },
      {
        type: 'bookshelf',
        label: 'Bookshelf',
        description: 'Bookshelf with decor',
        icon: '📚',
      },
      {
        type: 'nightstand',
        label: 'Nightstand',
        description: 'Bedside table with lamp',
        icon: '🪔',
      },
    ],
  },
  {
    id: 'orchestra',
    label: 'Orchestra & concert',
    items: [
      {
        type: 'musician_chair',
        label: 'Musician chair',
        description: 'Orchestra chair',
        icon: '💺',
      },
      {
        type: 'conductor_podium',
        label: "Conductor's podium",
        description: 'Raised podium with rails',
        icon: '🎼',
      },
      {
        type: 'music_stand',
        label: 'Music stand',
        description: 'Adjustable sheet stand',
        icon: '🎵',
      },
      {
        type: 'musical_instruments',
        label: 'Musical instruments',
        description: 'Saxophone on display stand',
        icon: '🎷',
      },
    ],
  },
];

/** Flat list for lookups (selected panel, etc.). */
export const PROP_CATALOG: PropCatalogItem[] = PROP_CATALOG_CATEGORIES.flatMap(
  (c) => c.items,
);

export const GRID_SNAP = 0.25;

export const STAGE_LIMITS = {
  length: { min: 4, max: 40 },
  width: { min: 4, max: 40 },
  height: { min: 0, max: 3 },
};

export const PROP_SCALE_LIMITS = {
  min: 0.25,
  max: 30,
  step: 0.05,
  default: 1,
};

export const PROP_TAG_MAX_LENGTH = 48;
