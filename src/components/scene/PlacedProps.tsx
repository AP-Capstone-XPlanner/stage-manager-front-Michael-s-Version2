import { useCallback, useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { useStageStore } from '../../store/stageStore';
import type { PlacedProp } from '../../types';
import { PropMesh } from '../props/PropMesh';
import { useStageBounds, useStageTopY } from './StagePlatform';
import { normalizePropPosition, normalizeRotation } from '../../utils/propPosition';
import { PropCoordinateLabel } from './PropCoordinateLabel';
import { PropTagLabel } from './PropTagLabel';
import { BlueSelectionRing } from './SelectionRings';

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
  const ringDragging = useRef(false);

  const setOrbitEnabled = useCallback((enabled: boolean) => {
    if (orbitControls && 'enabled' in orbitControls) {
      (orbitControls as { enabled: boolean }).enabled = enabled;
    }
  }, [orbitControls]);

  const handleRingRotate = useCallback(
    (rotation: number) => {
      if (!groupRef.current) return;
      const r = normalizeRotation(rotation);
      groupRef.current.rotation.y = r;
      updateProp(prop.id, { rotation: r });
    },
    [prop.id, updateProp],
  );

  const handleRingDragChange = useCallback(
    (dragging: boolean) => {
      ringDragging.current = dragging;
      setOrbitEnabled(!dragging);
    },
    [setOrbitEnabled],
  );

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
      prop,
    );
    groupRef.current.position.set(...position);
    updateProp(prop.id, {
      position,
      rotation: normalizeRotation(groupRef.current.rotation.y),
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
            <BlueSelectionRing
              groupRef={groupRef}
              onRotate={handleRingRotate}
              onDragChange={handleRingDragChange}
            />
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
          onMouseDown={() => setOrbitEnabled(false)}
          onMouseUp={() => {
            if (!ringDragging.current) setOrbitEnabled(true);
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

