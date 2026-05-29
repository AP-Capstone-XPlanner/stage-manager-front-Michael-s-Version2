/** Html anchor Y above prop origin — tag + selection marker. */
export const PROP_TAG_LABEL_Y = 2.08;

/** Gap from tag/marker anchor to data bar (world units). */
const COORD_GAP_ABOVE_TAG = 0.62;
const COORD_GAP_ABOVE_MARKER = 0.48;

/** Data bar above the tag pill (clears XYZ gizmo). */
export const PROP_COORD_Y_ABOVE_TAG = PROP_TAG_LABEL_Y + COORD_GAP_ABOVE_TAG;

/** Data bar above red marker when there is no tag text. */
export const PROP_COORD_Y_ABOVE_MARKER = PROP_TAG_LABEL_Y + COORD_GAP_ABOVE_MARKER;
