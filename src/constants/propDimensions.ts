import type { PropType } from '../types';

/** Catalog props use fixed dimensions from propCatalogSpecs. */
export function usesCustomDimensions(_type: PropType): boolean {
  return false;
}
