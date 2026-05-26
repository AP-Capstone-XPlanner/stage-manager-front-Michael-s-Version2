import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { normalizeRotation } from '../../utils/propPosition';

const plane = new THREE.Plane();
const intersection = new THREE.Vector3();
const center = new THREE.Vector3();
const pointer = new THREE.Vector2();
const worldPos = new THREE.Vector3();
const hitPoint = new THREE.Vector3();

const BLUE = '#38bdf8';
const BLUE_HOVER = '#7dd3fc';
const BLUE_ACTIVE = '#bae6fd';

/** Extra hit margin so the thin ring band is easy to grab. */
const HIT_INNER_PAD = 0.08;
const HIT_OUTER_PAD = 0.16;

const noopRaycast = () => null;

function createRingRaycast(
  innerRadius: number,
  outerRadius: number,
  padInner: number,
  padOuter: number,
) {
  const hitPlane = new THREE.Plane();
  const inner = innerRadius - padInner;
  const outer = outerRadius + padOuter;

  return function ringRaycast(
    this: THREE.Mesh,
    raycaster: THREE.Raycaster,
    intersects: THREE.Intersection[],
  ) {
    this.getWorldPosition(worldPos);
    hitPlane.set(new THREE.Vector3(0, 1, 0), -worldPos.y);
    if (!raycaster.ray.intersectPlane(hitPlane, hitPoint)) return;

    const dist = Math.hypot(hitPoint.x - worldPos.x, hitPoint.z - worldPos.z);
    if (dist < inner || dist > outer) return;

    intersects.push({
      distance: raycaster.ray.origin.distanceTo(hitPoint),
      point: hitPoint,
      object: this,
    });
  };
}

/** Blue ring at prop position — hover to highlight, drag to rotate. */
export function BlueSelectionRing({
  worldPosition,
  rotation,
  innerRadius,
  outerRadius,
  onRotate,
  onDragChange,
}: {
  worldPosition: [number, number, number];
  rotation: number;
  innerRadius: number;
  outerRadius: number;
  onRotate: (rotation: number) => void;
  onDragChange: (dragging: boolean) => void;
}) {
  const { camera, gl, raycaster } = useThree();
  const hitMeshRef = useRef<THREE.Mesh>(null);
  const startAngle = useRef(0);
  const startRotation = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [dragging, setDragging] = useState(false);

  useLayoutEffect(() => {
    const mesh = hitMeshRef.current;
    if (!mesh) return;
    mesh.raycast = createRingRaycast(
      innerRadius,
      outerRadius,
      HIT_INNER_PAD,
      HIT_OUTER_PAD,
    );
  }, [innerRadius, outerRadius]);

  const pointerOnStage = (event: PointerEvent) => {
    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    center.set(worldPosition[0], worldPosition[1], worldPosition[2]);
    plane.set(new THREE.Vector3(0, 1, 0), -center.y);
    if (!raycaster.ray.intersectPlane(plane, intersection)) {
      return { angle: null as number | null, inRing: false };
    }

    const dist = Math.hypot(
      intersection.x - center.x,
      intersection.z - center.z,
    );
    const inRing =
      dist >= innerRadius - HIT_INNER_PAD &&
      dist <= outerRadius + HIT_OUTER_PAD;
    const angle = Math.atan2(
      intersection.x - center.x,
      intersection.z - center.z,
    );
    return { angle, inRing };
  };

  const beginDrag = (event: PointerEvent) => {
    const { angle, inRing } = pointerOnStage(event);
    if (!inRing || angle === null) return false;

    setDragging(true);
    setActive(true);
    setHovered(true);
    startAngle.current = angle;
    startRotation.current = rotation;
    onDragChange(true);
    gl.domElement.style.cursor = 'grabbing';
    return true;
  };

  useEffect(() => {
    if (!dragging) return;

    const onMove = (event: PointerEvent) => {
      const { angle } = pointerOnStage(event);
      if (angle === null) return;
      const delta = angle - startAngle.current;
      onRotate(normalizeRotation(startRotation.current + delta));
    };

    const onUp = () => {
      setDragging(false);
      setActive(false);
      onDragChange(false);
      gl.domElement.style.cursor = hovered ? 'grab' : '';
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [
    dragging,
    camera,
    gl,
    raycaster,
    hovered,
    onRotate,
    onDragChange,
    worldPosition,
    innerRadius,
    outerRadius,
    rotation,
  ]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    beginDrag(event.nativeEvent);
  };

  const color = active ? BLUE_ACTIVE : hovered ? BLUE_HOVER : BLUE;
  const opacity = active ? 1 : hovered ? 0.98 : 0.88;

  return (
    <group>
      <mesh
        ref={hitMeshRef}
        position={[0, 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={12}
        onPointerDown={onPointerDown}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (!dragging) gl.domElement.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          if (!dragging) {
            setHovered(false);
            gl.domElement.style.cursor = '';
          }
        }}
      >
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshBasicMaterial visible={false} />
      </mesh>
      <mesh
        position={[0, 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        renderOrder={11}
        raycast={noopRaycast}
      >
        <ringGeometry args={[innerRadius, outerRadius, 64]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </group>
  );
}
