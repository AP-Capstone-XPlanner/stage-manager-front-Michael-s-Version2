import type { PlacedProp, PropType } from '../types';

/** Local Y of the lowest point at scale 1 (group origin unchanged). */
const PROP_LOCAL_BOTTOM_Y: Record<PropType, number> = {
  big_screen: 0,
  screen: 0,
  table: 0,
  platform: 0,
  square: 0,
  circle: 0,
  chair: 0,
  stairs: 0,
};

const GROUND_EPSILON = 0.03;

export function getPropLocalBottom(type: PropType): number {
  return PROP_LOCAL_BOTTOM_Y[type];
}

export function getPropBottomY(
  prop: Pick<PlacedProp, 'type' | 'position' | 'scale'>,
): number {
  return prop.position[1] + getPropLocalBottom(prop.type) * prop.scale;
}

/** True when the prop sits on or penetrates the stage deck. */
export function isPropGroundedOnStage(
  prop: Pick<PlacedProp, 'type' | 'position' | 'scale'>,
  stageTopY: number,
): boolean {
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
