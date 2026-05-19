import { GRID_SNAP } from '../constants/props';
import type { PropType } from '../types';
import { getPropLocalBottom } from './propBounds';
import { snapValue } from './snap';

/** Max height (m) a prop can be placed above the stage deck. */
export const PROP_MAX_HEIGHT_ABOVE_STAGE = 12;

export function clampPropXZ(
  x: number,
  z: number,
  halfLength: number,
  halfWidth: number,
  margin = 0.5,
): { x: number; z: number } {
  return {
    x: Math.max(-halfLength + margin, Math.min(halfLength - margin, x)),
    z: Math.max(-halfWidth + margin, Math.min(halfWidth - margin, z)),
  };
}

export function clampPropOriginY(
  y: number,
  stageTopY: number,
  type: PropType,
  scale: number,
): number {
  const localBottom = getPropLocalBottom(type);
  const minY = stageTopY - localBottom * scale;
  const maxY = stageTopY + PROP_MAX_HEIGHT_ABOVE_STAGE - localBottom * scale;
  return Math.max(minY, Math.min(maxY, y));
}

export function normalizePropPosition(
  x: number,
  y: number,
  z: number,
  halfLength: number,
  halfWidth: number,
  snapToGrid: boolean,
  stageTopY: number,
  prop?: { type: PropType; scale: number },
): [number, number, number] {
  let nx = snapValue(x, snapToGrid);
  let ny = snapValue(y, snapToGrid);
  let nz = snapValue(z, snapToGrid);
  const clamped = clampPropXZ(nx, nz, halfLength, halfWidth);
  if (prop) {
    ny = clampPropOriginY(ny, stageTopY, prop.type, prop.scale);
  } else {
    ny = Math.max(
      stageTopY,
      Math.min(stageTopY + PROP_MAX_HEIGHT_ABOVE_STAGE, ny),
    );
  }
  return [clamped.x, ny, clamped.z];
}

export const KEYBOARD_MOVE_STEP = GRID_SNAP;
export const KEYBOARD_MOVE_STEP_FAST = 1;

export function radiansToDegrees(rad: number): number {
  return (rad * 180) / Math.PI;
}

const TAU = Math.PI * 2;

/** Keep rotation in [0, 2π) so values do not grow without bound. */
export function normalizeRotation(radians: number): number {
  let r = radians % TAU;
  if (r < 0) r += TAU;
  return r;
}

/** Display rotation as 0–360° (full turn resets to 0). */
export function rotationDisplayDegrees(radians: number): number {
  const deg = Math.round(radiansToDegrees(normalizeRotation(radians)));
  return deg >= 360 ? 0 : deg;
}

export function heightAboveStage(propY: number, stageTopY: number): number {
  return Math.max(0, propY - stageTopY);
}
