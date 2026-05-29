import { PROP_SCALE_LIMITS } from '../constants/props';
import { getDefaultPropInteractionState } from '../constants/propCatalogSpecs';
import { getDefaultPropColor } from '../constants/propColors';
import { normalizeHexColor } from './color';
import type { PlacedProp } from '../types';

export type NewPlacedProp = Pick<PlacedProp, 'type' | 'position' | 'rotation'> &
  Partial<
    Pick<PlacedProp, 'scale' | 'visible' | 'tag' | 'color' | 'interactionState'>
  >;

/** Pre-fill for placement (copy) — position comes from the stage click. */
export type PlacementDraft = Omit<NewPlacedProp, 'position'>;

export function propToPlacementDraft(prop: PlacedProp): PlacementDraft {
  return {
    type: prop.type,
    rotation: prop.rotation,
    scale: prop.scale,
    visible: prop.visible,
    color: prop.color,
    ...(prop.interactionState
      ? { interactionState: structuredClone(prop.interactionState) }
      : {}),
  };
}

export const DEFAULT_PROP_SCALE = PROP_SCALE_LIMITS.default;

export function createNewProp(
  partial: NewPlacedProp,
): Omit<PlacedProp, 'id'> {
  const interactionState =
    partial.interactionState ?? getDefaultPropInteractionState(partial.type);

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
    ...(interactionState ? { interactionState } : {}),
  };
}

export function clampPropScale(scale: number): number {
  return Math.min(
    PROP_SCALE_LIMITS.max,
    Math.max(PROP_SCALE_LIMITS.min, scale),
  );
}
