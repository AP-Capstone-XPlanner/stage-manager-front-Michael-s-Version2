import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStageStore } from '../../store/stageStore';
import { getDefaultPropDimensions } from '../../constants/propDimensions';
import { getDefaultPropColor } from '../../constants/propColors';
import { createNewProp } from '../../utils/propDefaults';
import { snapValue } from '../../utils/snap';
import { PropMesh } from '../props/PropMesh';
import { useStageBounds, useStageTopY } from './StagePlatform';

export function PlacementController() {
  const mode = useStageStore((s) => s.mode);
  const placementType = useStageStore((s) => s.placementType);
  const placementChairVariant = useStageStore((s) => s.placementChairVariant);
  const snapToGrid = useStageStore((s) => s.snapToGrid);
  const addProp = useStageStore((s) => s.addProp);
  const cancelPlacement = useStageStore((s) => s.cancelPlacement);
  const topY = useStageTopY();
  const { halfX, halfZ } = useStageBounds();
  const { camera, raycaster, gl } = useThree();

  const planeRef = useRef<THREE.Mesh>(null);
  const [ghostPos, setGhostPos] = useState<[number, number, number] | null>(null);

  const isPlacing = mode === 'place' && placementType;

  useEffect(() => {
    if (!isPlacing) {
      setGhostPos(null);
      return;
    }

    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -topY);
    const target = new THREE.Vector3();
    const pointer = new THREE.Vector2();

    const onMove = (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.ray.intersectPlane(plane, target)) {
        let x = snapValue(target.x, snapToGrid);
        let z = snapValue(target.z, snapToGrid);
        x = THREE.MathUtils.clamp(x, -halfX + 0.5, halfX - 0.5);
        z = THREE.MathUtils.clamp(z, -halfZ + 0.5, halfZ - 0.5);
        setGhostPos([x, topY, z]);
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') cancelPlacement();
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [
    isPlacing,
    camera,
    raycaster,
    gl,
    topY,
    snapToGrid,
    halfX,
    halfZ,
    cancelPlacement,
  ]);

  if (!isPlacing || !placementType) return null;

  const ghostDimensions = getDefaultPropDimensions(
    placementType,
    placementChairVariant ?? undefined,
  );
  const ghostChairVariant =
    placementType === 'chair'
      ? (placementChairVariant ?? 'with_back')
      : undefined;

  const placeAt = (position: [number, number, number]) => {
    addProp(
      createNewProp({
        type: placementType,
        position,
        rotation: 0,
        chairVariant: ghostChairVariant,
      }),
    );
  };

  const positionFromPoint = (x: number, z: number): [number, number, number] => {
    let sx = snapValue(x, snapToGrid);
    let sz = snapValue(z, snapToGrid);
    sx = THREE.MathUtils.clamp(sx, -halfX + 0.5, halfX - 0.5);
    sz = THREE.MathUtils.clamp(sz, -halfZ + 0.5, halfZ - 0.5);
    return [sx, topY, sz];
  };

  const placeFromEvent = (point: THREE.Vector3) => {
    placeAt(positionFromPoint(point.x, point.z));
  };

  return (
    <>
      <mesh
        ref={planeRef}
        position={[0, topY + 0.01, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        visible={false}
        onPointerMove={(e) => {
          e.stopPropagation();
          setGhostPos(positionFromPoint(e.point.x, e.point.z));
        }}
        onClick={(e) => {
          e.stopPropagation();
          placeFromEvent(e.point);
        }}
      >
        <planeGeometry args={[halfX * 2, halfZ * 2]} />
      </mesh>
      {ghostPos && (
        <group position={ghostPos}>
          <PropMesh
            type={placementType}
            color={getDefaultPropColor(placementType)}
            dimensions={ghostDimensions}
            chairVariant={ghostChairVariant}
            ghost
          />
        </group>
      )}
      <mesh
        position={[0, topY + 0.005, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          placeFromEvent(e.point);
        }}
      >
        <planeGeometry args={[halfX * 2, halfZ * 2]} />
        <meshBasicMaterial visible={false} />
      </mesh>
    </>
  );
}
