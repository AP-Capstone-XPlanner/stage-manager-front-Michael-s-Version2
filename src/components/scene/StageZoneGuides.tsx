import { useMemo } from 'react';
import { Html, Line } from '@react-three/drei';
import {
  STAGE_GUIDE_PALETTES,
  STAGE_SURFACE_COLORS,
} from '../../constants/stage';
import {
  STAGE_AUDIENCE_LABEL,
  STAGE_NINE_ZONE_LABELS,
  STAGE_ZONE_LINE_OPACITY,
  STAGE_ZONE_LINE_WIDTH,
} from '../../constants/stageZones';
import { useStageStore } from '../../store/stageStore';
import { getContrastOnBackground } from '../../utils/color';
import { getStageHalfExtents } from '../../utils/stageAxes';

const Y_EPSILON = 0.016;
const RENDER_ORDER = 12;

/** Cell center along one axis in [-half, +half] for index 0..2. */
function thirdCenter(half: number, index: 0 | 1 | 2): number {
  const third = (2 * half) / 3;
  return -half + third * (index + 0.5);
}

function buildAudienceArc(
  halfX: number,
  halfZ: number,
  y: number,
  bulge: number,
  segments = 48,
): [number, number, number][] {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = -halfX + t * 2 * halfX;
    const nx = halfX > 0 ? x / halfX : 0;
    const z = halfZ + bulge * (1 - nx * nx);
    points.push([x, y, z]);
  }
  return points;
}

function ZoneLabel({
  x,
  z,
  y,
  text,
  distanceFactor,
  textColor,
  textShadow,
}: {
  x: number;
  z: number;
  y: number;
  text: string;
  distanceFactor: number;
  textColor: string;
  textShadow: string;
}) {
  return (
    <Html
      position={[x, y, z]}
      center
      occlude={false}
      distanceFactor={distanceFactor}
      zIndexRange={[500, 0]}
      style={{ pointerEvents: 'none' }}
      transform={false}
    >
      <div
        className="stage-zone-label"
        style={{ color: textColor, textShadow }}
      >
        {text}
      </div>
    </Html>
  );
}

/**
 * 3×3 stage zones + audience arc on the deck plane.
 * Z+ = Downstage, X+ = Stage Left. Labels stay visible above props.
 */
export function StageZoneGuides() {
  const showStageZones = useStageStore((s) => s.showStageZones);
  const stageTexture = useStageStore((s) => s.stageTexture);
  const groundColor = useStageStore((s) => s.groundColor);
  const { length, width, height } = useStageStore((s) => s.stage);

  const colors = useMemo(() => {
    const stageBg = STAGE_SURFACE_COLORS[stageTexture].body;
    const zonePalette = STAGE_GUIDE_PALETTES[stageTexture].zone;
    const shadow = getContrastOnBackground(stageBg).textShadow;
    return {
      zone: {
        line: zonePalette.line,
        text: zonePalette.text,
        textShadow: shadow,
      },
      audience: getContrastOnBackground(groundColor),
    };
  }, [stageTexture, groundColor]);

  const geometry = useMemo(() => {
    const { halfX, halfZ } = getStageHalfExtents(length, width);
    const y = height + Y_EPSILON;
    const xLines = [-halfX / 3, halfX / 3];
    const zLines = [-halfZ / 3, halfZ / 3];
    const audienceBulge = Math.min(width * 0.28, length * 0.2, 2.5);

    const gridLines: [number, number, number][][] = [];

    for (const x of xLines) {
      gridLines.push([
        [x, y, -halfZ],
        [x, y, halfZ],
      ]);
    }

    for (const z of zLines) {
      gridLines.push([
        [-halfX, y, z],
        [halfX, y, z],
      ]);
    }

    const audienceArc = buildAudienceArc(halfX, halfZ, y, audienceBulge);

    const labelDistance = Math.max(length, width) * 1.15;

    const zoneLabels = STAGE_NINE_ZONE_LABELS.map(({ text, alongZ, alongX }) => ({
      text,
      x: thirdCenter(halfX, alongX),
      z: thirdCenter(halfZ, alongZ),
    }));

    const audienceLabel = {
      x: 0,
      z: halfZ + audienceBulge * 0.72,
      text: STAGE_AUDIENCE_LABEL,
    };

    return {
      y,
      gridLines,
      audienceArc,
      labelDistance,
      zoneLabels,
      audienceLabel,
    };
  }, [length, width, height]);

  if (!showStageZones) return null;

  const { zone: zoneColors, audience: audienceColors } = colors;

  return (
    <group renderOrder={RENDER_ORDER}>
      {geometry.gridLines.map((points, index) => (
        <Line
          key={`zone-grid-${index}`}
          points={points}
          color={zoneColors.line}
          lineWidth={STAGE_ZONE_LINE_WIDTH}
          transparent
          opacity={STAGE_ZONE_LINE_OPACITY}
          depthWrite={false}
          depthTest={false}
        />
      ))}
      <Line
        points={geometry.audienceArc}
        color={audienceColors.line}
        lineWidth={STAGE_ZONE_LINE_WIDTH}
        transparent
        opacity={STAGE_ZONE_LINE_OPACITY}
        depthWrite={false}
        depthTest={false}
      />
      {geometry.zoneLabels.map(({ text, x, z }) => (
        <ZoneLabel
          key={text}
          x={x}
          z={z}
          y={geometry.y}
          text={text}
          distanceFactor={geometry.labelDistance}
          textColor={zoneColors.text}
          textShadow={zoneColors.textShadow}
        />
      ))}
      <ZoneLabel
        x={geometry.audienceLabel.x}
        z={geometry.audienceLabel.z}
        y={geometry.y}
        text={geometry.audienceLabel.text}
        distanceFactor={geometry.labelDistance}
        textColor={audienceColors.text}
        textShadow={audienceColors.textShadow}
      />
    </group>
  );
}
