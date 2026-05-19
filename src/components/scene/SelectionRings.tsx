import { useEffect, useRef, useState, type RefObject } from 'react';
import { useThree, type ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { normalizeRotation } from '../../utils/propPosition';

const plane = new THREE.Plane();
const intersection = new THREE.Vector3();
const center = new THREE.Vector3();
const pointer = new THREE.Vector2();

const BLUE = '#38bdf8';
const BLUE_HOVER = '#7dd3fc';
const BLUE_ACTIVE = '#bae6fd';

/** Blue ring at object position — hover to highlight, drag to rotate. */
export function BlueSelectionRing({
  groupRef,
  onRotate,
  onDragChange,
}: {
  groupRef: RefObject<THREE.Group | null>;
  onRotate: (rotation: number) => void;
  onDragChange: (dragging: boolean) => void;
}) {
  const { camera, gl, raycaster } = useThree();
  const dragging = useRef(false);
  const startAngle = useRef(0);
  const startRotation = useRef(0);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  const pointerAngleOnStage = (event: PointerEvent): number | null => {
    const group = groupRef.current;
    if (!group) return null;

    const rect = gl.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    group.getWorldPosition(center);
    plane.set(new THREE.Vector3(0, 1, 0), -center.y);
    if (!raycaster.ray.intersectPlane(plane, intersection)) return null;

    return Math.atan2(intersection.x - center.x, intersection.z - center.z);
  };

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      const angle = pointerAngleOnStage(event);
      if (angle === null) return;
      const delta = angle - startAngle.current;
      onRotate(normalizeRotation(startRotation.current + delta));
    };

    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setActive(false);
      onDragChange(false);
      gl.domElement.style.cursor = '';
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [camera, gl, raycaster, groupRef, onRotate, onDragChange]);

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    const group = groupRef.current;
    if (!group) return;

    const angle = pointerAngleOnStage(event.nativeEvent);
    if (angle === null) return;

    dragging.current = true;
    setActive(true);
    startAngle.current = angle;
    startRotation.current = group.rotation.y;
    onDragChange(true);
    gl.domElement.style.cursor = 'grabbing';
  };

  const color = active ? BLUE_ACTIVE : hovered ? BLUE_HOVER : BLUE;
  const opacity = active ? 0.95 : hovered ? 0.85 : 0.6;

  return (
    <mesh
      position={[0, 0.02, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (!dragging.current) gl.domElement.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        setHovered(false);
        if (!dragging.current) gl.domElement.style.cursor = '';
      }}
    >
      <ringGeometry args={[0.52, 0.64, 48]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
