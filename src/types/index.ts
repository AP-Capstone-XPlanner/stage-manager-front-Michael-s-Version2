export type PropType =
  | 'big_screen'
  | 'screen'
  | 'table'
  | 'chair'
  | 'stairs'
  | 'platform'
  | 'square'
  | 'circle';

export interface StageDimensions {
  length: number;
  width: number;
  height: number;
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
  /** Primary surface color (hex). */
  color: string;
}

export type EditorMode = 'select' | 'place';
