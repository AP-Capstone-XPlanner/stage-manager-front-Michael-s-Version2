import { getPropCatalogSpec } from '../constants/propCatalogSpecs';
import type { PlacedProp, PropType } from '../types';

/** All catalog models sit on local Y = 0 (origin at floor contact). */
const PROP_LOCAL_BOTTOM_Y: Record<PropType, number> = {
  sofa: 0,
  coffee_table: 0,
  dining_set: 0,
  bed: 0,
  wardrobe: 0,
  bookshelf: 0,
  nightstand: 0,
  musician_chair: 0,
  conductor_podium: 0,
  music_stand: 0,
  musical_instruments: 0,
};

const GROUND_EPSILON = 0.03;

/** World-space ring band thickness (inner/outer radius difference). */
export const SELECTION_RING_THICKNESS = 0.07;

/** Must match `TransformControls` `size` in PlacedProps. */
export const POSITIONING_GIZMO_SIZE = 0.65;

/** Gap between translate arrow tips and the inner edge of the rotate ring. */
export const RING_CLEAR_OF_GIZMO = 0.42;

const SELECTION_RING_PADDING = 0.2;
const SELECTION_RING_MIN_INNER = 0.34;

export function getPropLocalBottom(type: PropType): number {
  return PROP_LOCAL_BOTTOM_Y[type] ?? 0;
}

export function getPropBottomY(prop: PlacedProp): number {
  return prop.position[1] + getPropLocalBottom(prop.type) * prop.scale;
}

export function isPropGroundedOnStage(prop: PlacedProp, stageTopY: number): boolean {
  return getPropBottomY(prop) <= stageTopY + GROUND_EPSILON;
}

export function shiftGroundedPropsForStageHeight(
  props: PlacedProp[],
  oldStageTopY: number,
  newStageTopY: number,
): PlacedProp[] {
  const delta = newStageTopY - oldStageTopY;
  if (delta === 0) return props;
  return props.map((p) => {
    if (!isPropGroundedOnStage(p, oldStageTopY)) return p;
    return {
      ...p,
      position: [p.position[0], p.position[1] + delta, p.position[2]],
    };
  });
}

/** Inner/outer radius for the selection ring in world units (thickness fixed). */
export function getPropSelectionRingRadii(prop: PlacedProp): {
  inner: number;
  outer: number;
} {
  const s = prop.scale;
  const spec = getPropCatalogSpec(prop.type);
  const half = Math.max(spec.width, spec.depth) * 0.5 * s;
  const clearOfGizmo =
    POSITIONING_GIZMO_SIZE * s + RING_CLEAR_OF_GIZMO;
  const inner = Math.max(
    SELECTION_RING_MIN_INNER,
    half + SELECTION_RING_PADDING,
    clearOfGizmo,
  );
  return { inner, outer: inner + SELECTION_RING_THICKNESS };
}

/** Max Y extent for clamping elevated props (approximate). */
export function getPropTopExtent(prop: PlacedProp): number {
  const spec = getPropCatalogSpec(prop.type);
  return prop.position[1] + spec.height * prop.scale;
}
