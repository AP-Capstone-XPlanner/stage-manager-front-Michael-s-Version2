import { useMemo } from 'react';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { useStageStore } from '../../store/stageStore';
import { adjustColorBrightness } from '../../utils/color';
import { getStageHalfExtents } from '../../utils/stageAxes';

const WALL_OFFSET = 0.004;
const RENDER_ORDER = 6;

function EnclosureWall({
  position,
  rotation,
  width,
  height,
  fill,
  edge,
  opacity,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  fill: string;
  edge: string;
  opacity: number;
}) {
  return (
    <mesh position={position} rotation={rotation} renderOrder={RENDER_ORDER}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color={fill}
        transparent
        opacity={opacity}
        side={THREE.FrontSide}
        depthWrite={false}
        roughness={0.9}
        metalness={0}
      />
      <Edges color={edge} threshold={12} />
    </mesh>
  );
}

/**
 * Three inward-facing walls (visible from inside the stage only):
 * upstage (−Z), stage left (+X), stage right (−X). Downstage (+Z) open.
 */
export function StageEnclosure() {
  const showStageEnclosure = useStageStore((s) => s.showStageEnclosure);
  const enclosureHeight = useStageStore((s) => s.stageEnclosureHeight);
  const fill = useStageStore((s) => s.stageEnclosureColor);
  const opacity = useStageStore((s) => s.stageEnclosureOpacity);
  const { length, width, height } = useStageStore((s) => s.stage);

  const { halfX, halfZ } = useMemo(
    () => getStageHalfExtents(length, width),
    [length, width],
  );

  const edge = adjustColorBrightness(fill, 0.18);
  const yCenter = height + enclosureHeight / 2;

  if (!showStageEnclosure) return null;

  return (
    <group>
      <EnclosureWall
        position={[0, yCenter, -halfZ - WALL_OFFSET]}
        rotation={[0, 0, 0]}
        width={width}
        height={enclosureHeight}
        fill={fill}
        edge={edge}
        opacity={opacity}
      />
      <EnclosureWall
        position={[halfX + WALL_OFFSET, yCenter, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        width={length}
        height={enclosureHeight}
        fill={fill}
        edge={edge}
        opacity={opacity}
      />
      <EnclosureWall
        position={[-halfX - WALL_OFFSET, yCenter, 0]}
        rotation={[0, Math.PI / 2, 0]}
        width={length}
        height={enclosureHeight}
        fill={fill}
        edge={edge}
        opacity={opacity}
      />
    </group>
  );
}
