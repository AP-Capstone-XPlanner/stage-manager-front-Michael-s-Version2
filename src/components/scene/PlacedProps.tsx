import { useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useStageStore } from '../../store/stageStore';
import type { PlacedProp } from '../../types';
import { PropMesh } from '../props/PropMesh';
import { useStageBounds, useStageTopY } from './StagePlatform';
import { normalizePropPosition } from '../../utils/propPosition';
import { PropCoordinateLabel } from './PropCoordinateLabel';
import { PropTagLabel } from './PropTagLabel';

export function PlacedProps() {
  const props = useStageStore((s) => s.props);
  const selectedPropId = useStageStore((s) => s.selectedPropId);

  return (
    <group>
      {props.map((prop) => (
        <PlacedPropItem
          key={prop.id}
          prop={prop}
          isSelected={prop.id === selectedPropId}
        />
      ))}
    </group>
  );
}

function PlacedPropItem({
  prop,
  isSelected,
}: {
  prop: PlacedProp;
  isSelected: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const selectProp = useStageStore((s) => s.selectProp);
  const updateProp = useStageStore((s) => s.updateProp);
  const snapToGrid = useStageStore((s) => s.snapToGrid);
  const topY = useStageTopY();
  const { halfLength, halfWidth } = useStageBounds();
  const orbitControls = useThree((s) => s.controls);

  const syncFromTransform = () => {
    if (!groupRef.current) return;
    const p = groupRef.current.position;
    const position = normalizePropPosition(
      p.x,
      p.y,
      p.z,
      halfLength,
      halfWidth,
      snapToGrid,
      topY,
    );
    groupRef.current.position.set(...position);
    updateProp(prop.id, {
      position,
      rotation: groupRef.current.rotation.y,
    });
  };

  const showInScene = prop.visible;
  const showGizmo = isSelected && prop.visible;

  return (
    <>
      <group
        ref={groupRef}
        position={prop.position}
        rotation={[0, prop.rotation, 0]}
        scale={[prop.scale, prop.scale, prop.scale]}
        visible={showInScene}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          if (!prop.visible) return;
          e.stopPropagation();
          selectProp(prop.id);
        }}
      >
        <PropMesh type={prop.type} color={prop.color} />
        <PropTagLabel tag={prop.tag} />
        {isSelected && showInScene && (
          <>
            <SelectionRing />
            <PropCoordinateLabel prop={prop} />
          </>
        )}
      </group>
      {isSelected && !prop.visible && (
        <group position={prop.position} rotation={[0, prop.rotation, 0]}>
          <HiddenPropMarker scale={prop.scale} color={prop.color} />
          <PropTagLabel tag={prop.tag} />
          <PropCoordinateLabel prop={prop} />
        </group>
      )}
      {showGizmo && (
        <TransformControls
          object={groupRef as React.RefObject<THREE.Object3D>}
          mode="translate"
          showY
          onMouseDown={() => {
            if (orbitControls && 'enabled' in orbitControls) {
              (orbitControls as { enabled: boolean }).enabled = false;
            }
          }}
          onMouseUp={() => {
            if (orbitControls && 'enabled' in orbitControls) {
              (orbitControls as { enabled: boolean }).enabled = true;
            }
          }}
          onChange={syncFromTransform}
        />
      )}
    </>
  );
}

function HiddenPropMarker({ scale, color }: { scale: number; color: string }) {
  return (
    <mesh scale={[1.6 * scale, 1.2 * scale, 1.6 * scale]} position={[0, 0.6 * scale, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.45}
      />
    </mesh>
  );
}

function SelectionRing() {
  return (
    <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.8, 1, 32]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.7} side={THREE.DoubleSide} />
    </mesh>
  );
}
