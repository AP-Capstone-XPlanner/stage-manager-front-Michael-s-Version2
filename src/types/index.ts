export type PropType =
  | 'sofa'
  | 'coffee_table'
  | 'dining_set'
  | 'bed'
  | 'wardrobe'
  | 'bookshelf'
  | 'nightstand'
  | 'musician_chair'
  | 'conductor_podium'
  | 'music_stand'
  | 'musical_instruments';

export type StageTexture = 'dark_wood' | 'light_wood' | 'matte_black';

export interface StageDimensions {
  length: number;
  width: number;
  height: number;
}

/** Wardrobe/nightstand doors; dining_set chair pull-out states. */
export interface PropInteractionState {
  open?: boolean;
  chairsPulled?: boolean[];
}

export interface PlacedProp {
  id: string;
  type: PropType;
  position: [number, number, number];
  rotation: number;
  /** Uniform scale multiplier (1 = default size). */
  scale: number;
  /** When false, prop is hidden in the 3D view but kept in the layout. */
  visible: boolean;
  /** User label describing how this prop is used (e.g. "Host desk"). */
  tag: string;
  /** Legacy tint — catalog models use built-in materials. */
  color: string;
  /** Animated parts (doors, drawers, chairs). */
  interactionState?: PropInteractionState;
}

export type EditorMode = 'select' | 'place';
