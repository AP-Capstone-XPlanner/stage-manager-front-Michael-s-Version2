import { PROP_SCALE_LIMITS } from '../constants/props';
import { getDefaultPropColor } from '../constants/propColors';
import { normalizeHexColor } from './color';
import type { PlacedProp } from '../types';

export type NewPlacedProp = Pick<PlacedProp, 'type' | 'position' | 'rotation'> &
  Partial<Pick<PlacedProp, 'scale' | 'visible' | 'tag' | 'color'>>;

export const DEFAULT_PROP_SCALE = PROP_SCALE_LIMITS.default;

export function createNewProp(
  partial: NewPlacedProp,
): Omit<PlacedProp, 'id'> {
  return {
    type: partial.type,
    position: partial.position,
    rotation: partial.rotation,
    scale: partial.scale ?? DEFAULT_PROP_SCALE,
    visible: partial.visible ?? true,
    tag: partial.tag?.trim() ?? '',
    color: partial.color
      ? normalizeHexColor(partial.color, getDefaultPropColor(partial.type))
      : getDefaultPropColor(partial.type),
  };
}

export function clampPropScale(scale: number): number {
  return Math.min(
    PROP_SCALE_LIMITS.max,
    Math.max(PROP_SCALE_LIMITS.min, scale),
  );
}
