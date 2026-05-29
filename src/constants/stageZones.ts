/** Stage zone overlay — Z+ = Downstage, X+ = Stage Left. */

export const STAGE_ZONE_LINE_OPACITY = 0.88;
export const STAGE_ZONE_LINE_WIDTH = 1.35;

/**
 * Nine grid labels:
 * alongZ: 0 = upstage (−Z), 2 = downstage (+Z)
 * alongX: 0 = stage right (−X), 2 = stage left (+X)
 */
export const STAGE_NINE_ZONE_LABELS: {
  text: string;
  alongZ: 0 | 1 | 2;
  alongX: 0 | 1 | 2;
}[] = [
  { text: 'Upstage Right', alongZ: 0, alongX: 0 },
  { text: 'Upstage', alongZ: 0, alongX: 1 },
  { text: 'Upstage Left', alongZ: 0, alongX: 2 },
  { text: 'Stage Right', alongZ: 1, alongX: 0 },
  { text: 'Center Stage', alongZ: 1, alongX: 1 },
  { text: 'Stage Left', alongZ: 1, alongX: 2 },
  { text: 'Downstage Right', alongZ: 2, alongX: 0 },
  { text: 'Downstage', alongZ: 2, alongX: 1 },
  { text: 'Downstage Left', alongZ: 2, alongX: 2 },
];

export const STAGE_AUDIENCE_LABEL = 'AUDIENCE';
