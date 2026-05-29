import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { CoffeeTableWoodMaterial } from '../materials/StagePropMaterials';

export function AnimatedWardrobe({ isOpen }: { isOpen: boolean }) {
  const leftDoorRef = useRef<THREE.Group>(null);
  const centerDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  const wWidth = 1.2;
  const wHeight = 1.82;
  const wDepth = 0.55;
  const wWoodTone = '#8d6e63';
  const wMetalTone = '#b0bec5';

  useFrame(() => {
    const openAngle = Math.PI * 0.75;
    const targetCenterAngle = isOpen ? openAngle : 0;
    const targetLeftAngle = isOpen ? -openAngle : 0;
    const targetRightAngle = isOpen ? openAngle : 0;

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y +=
        (targetLeftAngle - leftDoorRef.current.rotation.y) * 0.05;
    }
    if (centerDoorRef.current) {
      centerDoorRef.current.rotation.y +=
        (targetCenterAngle - centerDoorRef.current.rotation.y) * 0.05;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y +=
        (targetRightAngle - rightDoorRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group position={[0, wHeight / 2, 0]}>
      <mesh position={[0, wHeight * 0.005, -(wDepth / 2) + 0.01]} castShadow receiveShadow>
        <boxGeometry args={[wWidth, wHeight - 0.06, 0.02]} />
        <meshStandardMaterial color={wWoodTone} roughness={0.5} />
      </mesh>
      <mesh position={[-(wWidth / 2) + 0.015, wHeight * 0.005, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.03, wHeight - 0.06, wDepth - 0.02]} />
        <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.45} />
      </mesh>
      <mesh position={[wWidth / 2 - 0.015, wHeight * 0.005, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.03, wHeight - 0.06, wDepth - 0.02]} />
        <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.45} />
      </mesh>
      <mesh position={[0, wHeight / 2 - 0.015, 0]} castShadow>
        <boxGeometry args={[wWidth + 0.04, 0.04, wDepth + 0.03]} />
        <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.4} />
      </mesh>
      <mesh position={[0, -(wHeight / 2) + 0.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[wWidth, 0.06, wDepth]} />
        <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.6} />
      </mesh>
      <mesh position={[0.15, wHeight * 0.005, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.02, wHeight - 0.1, wDepth - 0.04]} />
        <meshStandardMaterial color={wWoodTone} roughness={0.5} />
      </mesh>
      <mesh position={[-0.2, wHeight / 2 - 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.73, 16]} />
        <meshStandardMaterial color={wMetalTone} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.2, wHeight / 2 - 0.35, 0.01]} castShadow receiveShadow>
        <boxGeometry args={[0.73, 0.02, wDepth - 0.04]} />
        <meshStandardMaterial color={wWoodTone} roughness={0.5} />
      </mesh>
      {[-0.5, -0.15, 0.15, 0.45].map((shY, sIdx) => (
        <mesh
          key={`wardrobe-shelf-${sIdx}`}
          position={[0.365, shY, 0.01]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.39, 0.02, wDepth - 0.04]} />
          <meshStandardMaterial color={wWoodTone} roughness={0.55} />
        </mesh>
      ))}
      <group ref={leftDoorRef} position={[-(wWidth / 2) + 0.03, 0, wDepth / 2]}>
        <mesh position={[0.19, wHeight * 0.005, -0.0075]} castShadow>
          <boxGeometry args={[0.38, wHeight - 0.08, 0.015]} />
          <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.35} />
        </mesh>
        <mesh position={[0.35, 0.05, 0.01]} castShadow>
          <boxGeometry args={[0.015, wHeight * 0.08, 0.015]} />
          <meshStandardMaterial color={wMetalTone} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      <group ref={centerDoorRef} position={[0.15, 0, wDepth / 2]}>
        <mesh position={[-0.19, wHeight * 0.005, -0.0075]} castShadow>
          <boxGeometry args={[0.38, wHeight - 0.08, 0.015]} />
          <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.35} />
        </mesh>
        <mesh position={[-0.35, 0.05, 0.01]} castShadow>
          <boxGeometry args={[0.015, wHeight * 0.08, 0.015]} />
          <meshStandardMaterial color={wMetalTone} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      <group ref={rightDoorRef} position={[wWidth / 2 - 0.03, 0, wDepth / 2]}>
        <mesh position={[-0.19, wHeight * 0.005, -0.0075]} castShadow>
          <boxGeometry args={[0.38, wHeight - 0.08, 0.015]} />
          <CoffeeTableWoodMaterial baseColor={wWoodTone} roughness={0.35} />
        </mesh>
        <mesh position={[-0.35, 0.05, 0.01]} castShadow>
          <boxGeometry args={[0.015, wHeight * 0.08, 0.015]} />
          <meshStandardMaterial color={wMetalTone} metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

export function AnimatedNightstand({ isDrawerOpen }: { isDrawerOpen: boolean }) {
  const drawerGroupRef = useRef<THREE.Group>(null);
  const nW = 0.47;
  const nH = 0.51;
  const nD = 0.4;
  const nLegH = 0.17;
  const finishWhite = '#fcfdfd';
  const buttonBlack = '#151515';
  const lampshadeBeige = '#f4ebd9';

  useFrame(() => {
    if (!drawerGroupRef.current) return;
    const targetZ = isDrawerOpen ? 0.38 : 0;
    drawerGroupRef.current.position.z +=
      (targetZ - drawerGroupRef.current.position.z) * 0.05;
  });

  return (
    <group position={[0, (nH + nLegH) / 2, 0]}>
      <mesh position={[-(nW / 2) + 0.01, nLegH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, nH, nD]} />
        <meshStandardMaterial color={finishWhite} roughness={0.4} />
      </mesh>
      <mesh position={[nW / 2 - 0.01, nLegH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.02, nH, nD]} />
        <meshStandardMaterial color={finishWhite} roughness={0.4} />
      </mesh>
      <mesh position={[0, nH / 2 + nLegH / 2 - 0.01, 0]} castShadow>
        <boxGeometry args={[nW + 0.01, 0.02, nD + 0.01]} />
        <meshStandardMaterial color={finishWhite} roughness={0.35} />
      </mesh>
      <mesh position={[0, nH / 2 + nLegH / 2 - 0.24, 0]} castShadow receiveShadow>
        <boxGeometry args={[nW - 0.04, 0.015, nD - 0.02]} />
        <meshStandardMaterial color={finishWhite} roughness={0.45} />
      </mesh>
      <mesh position={[0, -(nH / 2) + nLegH / 2 + 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[nW - 0.04, 0.02, nD - 0.02]} />
        <meshStandardMaterial color={finishWhite} roughness={0.4} />
      </mesh>
      <mesh position={[0, nLegH / 2, -(nD / 2) + 0.01]} castShadow receiveShadow>
        <boxGeometry args={[nW - 0.04, nH - 0.02, 0.01]} />
        <meshStandardMaterial color={finishWhite} roughness={0.5} />
      </mesh>
      <group ref={drawerGroupRef} position={[0, 0, 0]}>
        <mesh position={[0, nH / 2 + nLegH / 2 - 0.12, 0]} castShadow>
          <boxGeometry args={[nW - 0.06, 0.18, nD - 0.04]} />
          <meshStandardMaterial color="#eeeeee" roughness={0.6} />
        </mesh>
        <mesh position={[0, nH / 2 + nLegH / 2 - 0.12, nD / 2 - 0.01]} castShadow>
          <boxGeometry args={[nW - 0.04, 0.22, 0.02]} />
          <meshStandardMaterial color={finishWhite} roughness={0.3} />
        </mesh>
        <mesh position={[0, nH / 2 + nLegH / 2 - 0.12, nD / 2 + 0.005]} castShadow>
          <boxGeometry args={[0.09, 0.025, 0.015]} />
          <meshStandardMaterial color={buttonBlack} roughness={0.6} metalness={0.1} />
        </mesh>
      </group>
      {[
        [-(nW / 2) + 0.02, -(nD / 2) + 0.03],
        [nW / 2 - 0.02, -(nD / 2) + 0.03],
        [-(nW / 2) + 0.02, nD / 2 - 0.03],
        [nW / 2 - 0.02, nD / 2 - 0.03],
      ].map(([lx, lz], idx) => (
        <mesh
          key={`nightstand-leg-${idx}`}
          position={[lx, -(nH / 2) + nLegH / 2 - nLegH / 2, lz]}
          castShadow
        >
          <boxGeometry args={[0.035, nLegH, 0.035]} />
          <meshStandardMaterial color={finishWhite} roughness={0.45} />
        </mesh>
      ))}
      <group position={[0, nH / 2 + nLegH / 2, 0]}>
        <mesh position={[0, 0.04, 0]} castShadow>
          <sphereGeometry args={[0.045, 24, 24]} />
          <meshStandardMaterial color="#cca471" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.09, 0]} castShadow>
          <cylinderGeometry args={[0.005, 0.005, 0.04, 8]} />
          <meshStandardMaterial color="#cca43b" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.16, 0]} castShadow>
          <cylinderGeometry args={[0.035, 0.075, 0.13, 24, 1, true]} />
          <meshStandardMaterial
            color={lampshadeBeige}
            roughness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
}

export function AnimatedDiningChair({
  posX,
  posZ,
  rotY,
  chairW,
  chairD,
  chairSeatH,
  chairBackH,
  chairColor,
  cushionTone,
  isPulled,
  onTogglePull,
}: {
  posX: number;
  posZ: number;
  rotY: number;
  chairW: number;
  chairD: number;
  chairSeatH: number;
  chairBackH: number;
  chairColor: string;
  cushionTone: string;
  isPulled: boolean;
  onTogglePull?: () => void;
}) {
  const chairGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!chairGroupRef.current) return;
    const targetZ = isPulled ? (posZ > 0 ? posZ + 0.25 : posZ - 0.25) : posZ;
    chairGroupRef.current.position.z +=
      (targetZ - chairGroupRef.current.position.z) * 0.08;
  });

  return (
    <group
      ref={chairGroupRef}
      position={[posX, 0, posZ]}
      rotation={[0, rotY, 0]}
      onClick={
        onTogglePull
          ? (e) => {
              e.stopPropagation();
              onTogglePull();
            }
          : undefined
      }
    >
      <mesh position={[-(chairW / 2) + 0.015, chairSeatH / 2, -(chairD / 2) + 0.015]} castShadow>
        <boxGeometry args={[0.02, chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh position={[chairW / 2 - 0.015, chairSeatH / 2, -(chairD / 2) + 0.015]} castShadow>
        <boxGeometry args={[0.02, chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh position={[-(chairW / 2) + 0.015, chairSeatH / 2, chairD / 2 - 0.015]} castShadow>
        <boxGeometry args={[0.02, chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh position={[chairW / 2 - 0.015, chairSeatH / 2, chairD / 2 - 0.015]} castShadow>
        <boxGeometry args={[0.02, chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh
        position={[-(chairW / 2) + 0.015, chairSeatH + (chairBackH - chairSeatH) / 2, -(chairD / 2) + 0.015]}
        castShadow
      >
        <boxGeometry args={[0.02, chairBackH - chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh
        position={[chairW / 2 - 0.015, chairSeatH + (chairBackH - chairSeatH) / 2, -(chairD / 2) + 0.015]}
        castShadow
      >
        <boxGeometry args={[0.02, chairBackH - chairSeatH, 0.02]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, chairBackH - 0.04, -(chairD / 2) + 0.015]} castShadow>
        <boxGeometry args={[chairW, 0.08, 0.018]} />
        <meshStandardMaterial color={chairColor} roughness={0.4} />
      </mesh>
      <mesh
        position={[0, chairSeatH + (chairBackH - chairSeatH) * 0.4, -(chairD / 2) + 0.015]}
        castShadow
      >
        <boxGeometry args={[chairW - 0.03, 0.03, 0.015]} />
        <meshStandardMaterial color={chairColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, chairSeatH, 0]} castShadow receiveShadow>
        <boxGeometry args={[chairW, 0.03, chairD]} />
        <meshStandardMaterial color={cushionTone} roughness={0.75} />
      </mesh>
    </group>
  );
}
