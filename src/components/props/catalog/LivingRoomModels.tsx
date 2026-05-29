import {
  CoffeeTableWoodMaterial,
  CouchFabricMaterial,
} from '../materials/StagePropMaterials';
import { AnimatedDiningChair, AnimatedNightstand, AnimatedWardrobe } from './AnimatedParts';

const SOFA_BODY = 'rgb(143, 111, 51)';
const SOFA_CUSHION = 'rgb(201, 173, 119)';
const TABLE_TAN = '#d2b48c';
const OUTLINE_WHITE = '#ffffff';

export function SofaModel() {
  return (
    <group>
      <mesh position={[0, 0.2, -0.325]} castShadow receiveShadow>
        <boxGeometry args={[1.83, 0.1, 0.87]} />
        <CouchFabricMaterial color={SOFA_BODY} />
      </mesh>
      <mesh position={[-0.435, 0.2, 0.385]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.1, 0.55]} />
        <CouchFabricMaterial color={SOFA_BODY} />
      </mesh>
      <group position={[0, 0.525, -0.71]}>
        <mesh castShadow>
          <boxGeometry args={[1.83, 0.43, 0.1]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
        <mesh position={[0, 0.215, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 1.83, 16]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
      </group>
      <group position={[-0.885, 0.39, -0.325]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.38, 0.87]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
        <mesh position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.87, 16]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
      </group>
      <group position={[0.885, 0.39, -0.325]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.38, 0.87]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
        <mesh position={[0, 0.19, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.87, 16]} />
          <CouchFabricMaterial color={SOFA_BODY} />
        </mesh>
      </group>
      <group position={[0.41, 0.35, -0.275]}>
        <mesh castShadow>
          <boxGeometry args={[0.82, 0.18, 0.73]} />
          <CouchFabricMaterial color={SOFA_CUSHION} />
        </mesh>
        <mesh position={[0, 0, 0.365]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.82, 16]} />
          <CouchFabricMaterial color={SOFA_CUSHION} />
        </mesh>
      </group>
      <group position={[-0.435, 0.35, 0.1]}>
        <mesh castShadow>
          <boxGeometry args={[0.85, 0.18, 1.48]} />
          <CouchFabricMaterial color={SOFA_CUSHION} />
        </mesh>
        <mesh position={[0, 0, 0.74]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.09, 0.09, 0.85, 16]} />
          <CouchFabricMaterial color={SOFA_CUSHION} />
        </mesh>
      </group>
      <mesh position={[0, 0.52, -0.64]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 24]} />
        <CouchFabricMaterial color={SOFA_CUSHION} />
      </mesh>
      <mesh position={[-0.82, 0.44, -0.25]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.5]} />
        <CouchFabricMaterial color={SOFA_CUSHION} />
      </mesh>
      <mesh position={[0.82, 0.44, -0.25]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[0.05, 0.2, 0.5]} />
        <CouchFabricMaterial color={SOFA_CUSHION} />
      </mesh>
      {[
        [-0.84, 0.075, -0.7],
        [0.84, 0.075, -0.7],
        [-0.84, 0.075, 0.05],
        [0.84, 0.075, 0.05],
        [-0.84, 0.075, 0.75],
        [-0.03, 0.075, 0.75],
      ].map(([x, y, z], i) => (
        <mesh key={`sofa-leg-${i}`} position={[x, y, z]} castShadow>
          <cylinderGeometry args={[0.03, 0.015, 0.15]} />
          <meshStandardMaterial color="#2d1f18" roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

export function CoffeeTableModel() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.965, 0.03, 0.965]} />
        <CoffeeTableWoodMaterial baseColor={TABLE_TAN} />
      </mesh>
      <mesh position={[0, 0.466, 0]}>
        <boxGeometry args={[0.97, 0.002, 0.97]} />
        <meshStandardMaterial color={OUTLINE_WHITE} roughness={0.2} />
      </mesh>
      {[
        [-0.445, 0.22, -0.445],
        [0.445, 0.22, -0.445],
        [-0.445, 0.22, 0.445],
        [0.445, 0.22, 0.445],
      ].map(([x, y, z], i) => (
        <mesh key={`coffee-leg-${i}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.075, 0.44, 0.075]} />
          <CoffeeTableWoodMaterial baseColor={TABLE_TAN} />
        </mesh>
      ))}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.885, 0.03, 0.885]} />
        <CoffeeTableWoodMaterial baseColor={TABLE_TAN} />
      </mesh>
      <mesh position={[0, 0.096, 0]}>
        <boxGeometry args={[0.89, 0.002, 0.89]} />
        <meshStandardMaterial color={OUTLINE_WHITE} roughness={0.3} />
      </mesh>
      <group position={[0, 0.33, 0.415]}>
        <mesh castShadow>
          <boxGeometry args={[0.81, 0.15, 0.03]} />
          <CoffeeTableWoodMaterial baseColor={TABLE_TAN} />
        </mesh>
        <mesh position={[0, 0, 0.016]}>
          <boxGeometry args={[0.79, 0.13, 0.002]} />
          <meshStandardMaterial color={OUTLINE_WHITE} roughness={0.2} wireframe />
        </mesh>
        <mesh position={[0, -0.01, 0.02]}>
          <boxGeometry args={[0.1, 0.04, 0.01]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

const DINING_W = 0.91;
const DINING_CHAIR_OFFSET = DINING_W / 2 + 0.18;

const DINING_CHAIRS: { posX: number; posZ: number; rotY: number }[] = [
  { posX: -0.55, posZ: DINING_CHAIR_OFFSET, rotY: Math.PI },
  { posX: 0, posZ: DINING_CHAIR_OFFSET, rotY: Math.PI },
  { posX: 0.55, posZ: DINING_CHAIR_OFFSET, rotY: Math.PI },
  { posX: -0.55, posZ: -DINING_CHAIR_OFFSET, rotY: 0 },
  { posX: 0, posZ: -DINING_CHAIR_OFFSET, rotY: 0 },
  { posX: 0.55, posZ: -DINING_CHAIR_OFFSET, rotY: 0 },
];

export function DiningSetModel({
  chairsPulled,
  onToggleChair,
}: {
  chairsPulled?: boolean[];
  onToggleChair?: (index: number) => void;
}) {
  const diningL = 1.83;
  const diningW = 0.91;
  const diningH = 0.76;
  const apronThickness = 0.06;
  const chairSeatH = 0.48;
  const chairW = 0.42;
  const chairD = 0.42;
  const chairBackH = 0.95;
  const tableColor = '#d2b48c';
  const chairColor = '#b59975';
  const cushionTone = '#eae2d5';

  return (
    <group>
      <mesh position={[0, diningH - 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[diningL, 0.04, diningW]} />
        <CoffeeTableWoodMaterial baseColor={tableColor} roughness={0.35} />
      </mesh>
      <group position={[0, diningH - 0.04 - apronThickness / 2, 0]}>
        <mesh position={[0, 0, diningW / 2 - 0.03]} castShadow>
          <boxGeometry args={[diningL - 0.1, apronThickness, 0.02]} />
          <meshStandardMaterial color={tableColor} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, -(diningW / 2) + 0.03]} castShadow>
          <boxGeometry args={[diningL - 0.1, apronThickness, 0.02]} />
          <meshStandardMaterial color={tableColor} roughness={0.5} />
        </mesh>
        <mesh position={[diningL / 2 - 0.03, 0, 0]} castShadow>
          <boxGeometry args={[0.02, apronThickness, diningW - 0.06]} />
          <meshStandardMaterial color={tableColor} roughness={0.5} />
        </mesh>
        <mesh position={[-(diningL / 2) + 0.03, 0, 0]} castShadow>
          <boxGeometry args={[0.02, apronThickness, diningW - 0.06]} />
          <meshStandardMaterial color={tableColor} roughness={0.5} />
        </mesh>
      </group>
      {[
        [diningL / 2 - 0.05, diningW / 2 - 0.05],
        [diningL / 2 - 0.05, -(diningW / 2) + 0.05],
        [-(diningL / 2) + 0.05, diningW / 2 - 0.05],
        [-(diningL / 2) + 0.05, -(diningW / 2) + 0.05],
      ].map(([x, z], idx) => (
        <mesh key={`table-leg-${idx}`} position={[x, (diningH - 0.04) / 2, z]} castShadow>
          <boxGeometry args={[0.07, diningH - 0.04, 0.07]} />
          <meshStandardMaterial color={tableColor} roughness={0.4} />
        </mesh>
      ))}
      {DINING_CHAIRS.map((chair, idx) => (
        <AnimatedDiningChair
          key={`dining-chair-${idx}`}
          posX={chair.posX}
          posZ={chair.posZ}
          rotY={chair.rotY}
          chairW={chairW}
          chairD={chairD}
          chairSeatH={chairSeatH}
          chairBackH={chairBackH}
          chairColor={chairColor}
          cushionTone={cushionTone}
          isPulled={chairsPulled?.[idx] ?? false}
          onTogglePull={onToggleChair ? () => onToggleChair(idx) : undefined}
        />
      ))}
    </group>
  );
}

export function BedModel() {
  const bedWidth = 1.65;
  const bedLength = 2.15;
  const baseFrameH = 0.28;
  const headHeight = 1.12;
  const naturalTimberColor = '#c6a072';
  const mattressWhite = '#f5f5f0';
  const pillowGrey = '#eaeaea';

  const renderPillow = (pX: number) => (
    <group
      position={[pX, baseFrameH + 0.32, -(bedLength / 2) + 0.32]}
      rotation={[0.18, 0, 0]}
    >
      <mesh castShadow>
        <boxGeometry args={[0.56, 0.015, 0.42]} />
        <CouchFabricMaterial color={pillowGrey} roughness={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0, 0]} scale={[1, 0.32, 1]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.16, 0.5, 24]} />
        <CouchFabricMaterial color={pillowGrey} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.48, 0.07, 0.34]} />
        <CouchFabricMaterial color={pillowGrey} roughness={0.8} />
      </mesh>
    </group>
  );

  return (
    <group>
      <mesh position={[-(bedWidth / 2) + 0.04, baseFrameH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, baseFrameH, bedLength]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.5} />
      </mesh>
      <mesh position={[bedWidth / 2 - 0.04, baseFrameH / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, baseFrameH, bedLength]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.5} />
      </mesh>
      <mesh position={[0, baseFrameH / 2, bedLength / 2 - 0.04]} castShadow receiveShadow>
        <boxGeometry args={[bedWidth - 0.08, baseFrameH, 0.08]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.5} />
      </mesh>
      {[
        [-(bedWidth / 2) + 0.1, -(bedLength / 2) + 0.2],
        [-(bedWidth / 2) - 0.1, -(bedLength / 2) + 0.2],
        [-(bedWidth / 2) + 0.1, bedLength / 2 - 0.4],
        [-(bedWidth / 2) - 0.1, bedLength / 2 - 0.4],
      ].map(([bx, bz], bIdx) => (
        <mesh key={`bed-leg-${bIdx}`} position={[bx, 0.06, bz]} castShadow>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[-(bedWidth / 2) + 0.04, headHeight / 2, -(bedLength / 2) + 0.04]} castShadow>
        <boxGeometry args={[0.08, headHeight, 0.08]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.4} />
      </mesh>
      <mesh position={[bedWidth / 2 - 0.04, headHeight / 2, -(bedLength / 2) + 0.04]} castShadow>
        <boxGeometry args={[0.08, headHeight, 0.08]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.4} />
      </mesh>
      <mesh position={[0, headHeight - 0.03, -(bedLength / 2) + 0.04]} castShadow>
        <boxGeometry args={[bedWidth, 0.06, 0.1]} />
        <CoffeeTableWoodMaterial baseColor={naturalTimberColor} roughness={0.35} />
      </mesh>
      <mesh position={[0, baseFrameH + 0.04, -(bedLength / 2) + 0.04]} castShadow>
        <boxGeometry args={[bedWidth - 0.08, 0.06, 0.05]} />
        <meshStandardMaterial color={naturalTimberColor} roughness={0.5} />
      </mesh>
      {[-0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6].map((sX, sIdx) => (
        <mesh
          key={`headboard-slat-${sIdx}`}
          position={[sX, (headHeight + baseFrameH) / 2 + 0.04, -(bedLength / 2) + 0.04]}
          castShadow
        >
          <boxGeometry args={[0.04, headHeight - baseFrameH - 0.12, 0.02]} />
          <meshStandardMaterial color={naturalTimberColor} roughness={0.45} />
        </mesh>
      ))}
      <group position={[0, baseFrameH + 0.14, 0.04]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[bedWidth - 0.14, 0.26, bedLength - 0.16]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[bedWidth - 0.18, 0.03, bedLength - 0.2]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.85} />
        </mesh>
        <mesh position={[0, -0.01, (bedLength - 0.16) / 2 - 0.02]} rotation={[0.45, 0, 0]}>
          <boxGeometry args={[bedWidth - 0.16, 0.24, 0.06]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.9} />
        </mesh>
        <mesh position={[0, -0.01, -(bedLength - 0.16) / 2 + 0.02]} rotation={[-0.45, 0, 0]}>
          <boxGeometry args={[bedWidth - 0.16, 0.24, 0.06]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.9} />
        </mesh>
        <mesh position={[-(bedWidth - 0.14) / 2 + 0.02, -0.01, 0]} rotation={[0, 0, 0.45]}>
          <boxGeometry args={[0.06, 0.24, bedLength - 0.18]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.9} />
        </mesh>
        <mesh position={[(bedWidth - 0.14) / 2 - 0.02, -0.01, 0]} rotation={[0, 0, -0.45]}>
          <boxGeometry args={[0.06, 0.24, bedLength - 0.18]} />
          <CouchFabricMaterial color={mattressWhite} roughness={0.9} />
        </mesh>
      </group>
      {renderPillow(-0.35)}
      {renderPillow(0.35)}
    </group>
  );
}

export function BookshelfModel() {
  const bW = 0.77;
  const bH = 1.07;
  const bD = 0.3;
  const bTone = '#6d4c41';
  const wallT = 0.02;

  const Book = ({
    width = 0.03,
    height = 0.16,
    depth = 0.18,
    color = '#a63a3a',
    lean = 0,
  }: {
    width?: number;
    height?: number;
    depth?: number;
    color?: string;
    lean?: number;
  }) => (
    <mesh castShadow receiveShadow rotation={[0, 0, lean]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );

  return (
    <group position={[0, (bH + 0.15) / 2, 0]}>
      <mesh position={[-(bW / 2) + wallT / 2, 0.075, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallT, bH, bD]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[bW / 2 - wallT / 2, 0.075, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallT, bH, bD]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[0, bH / 2 + 0.075 - wallT / 2, 0]} castShadow>
        <boxGeometry args={[bW, wallT, bD]} />
        <CoffeeTableWoodMaterial baseColor={bTone} roughness={0.4} />
      </mesh>
      <mesh position={[0, -(bH / 2) + 0.075 + wallT / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[bW - wallT * 2, wallT, bD]} />
        <meshStandardMaterial color={bTone} roughness={0.55} />
      </mesh>
      <mesh position={[-0.09, bH * 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[bW - wallT * 2 - 0.18, wallT, bD - 0.01]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[0, bH * 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[bW - wallT * 2, wallT, bD - 0.01]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[-0.1, -bH * 0.18, 0]} castShadow receiveShadow>
        <boxGeometry args={[bW * 0.65, wallT, bD - 0.01]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[0.1, bH * 0.32, 0]} castShadow>
        <boxGeometry args={[wallT, bH * 0.28, bD - 0.02]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[-0.16, bH * 0.115, 0]} castShadow>
        <boxGeometry args={[wallT, bH * 0.12, bD - 0.02]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[-(bW / 2) + bW * 0.24, -bH * 0.22, 0]} castShadow>
        <boxGeometry args={[wallT, bH * 0.5, bD - 0.02]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <mesh position={[0.1, -bH * 0.07, 0]} castShadow>
        <boxGeometry args={[wallT, bH * 0.24, bD - 0.02]} />
        <meshStandardMaterial color={bTone} roughness={0.5} />
      </mesh>
      <group position={[-0.3, bH * 0.27, 0]}>
        <group position={[0, 0, 0]}>
          <Book color="#2c3e50" height={0.17} />
        </group>
        <group position={[0.035, 0, 0]}>
          <Book color="#c0392b" height={0.15} />
        </group>
        <group position={[0.07, 0, 0]}>
          <Book color="#d35400" height={0.16} />
        </group>
        <group position={[0.105, 0, 0]}>
          <Book color="#7f8c8d" height={0.14} />
        </group>
        <group position={[0.145, 0, 0]} rotation={[0, 0, -0.22]}>
          <Book color="#16a085" height={0.16} />
        </group>
      </group>
      <group position={[0.22, bH * 0.15, 0]}>
        <mesh castShadow position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.045, 0.05, 0.01, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.05, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh castShadow position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.052, 0.005, 8, 24, Math.PI]} />
          <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh castShadow rotation={[0.4, 0.5, 0]}>
          <sphereGeometry args={[0.046, 12, 12]} />
          <meshStandardMaterial color="#2e7d32" roughness={0.6} flatShading />
        </mesh>
      </group>
      <group position={[-0.1, bH * 0.08, 0]} rotation={[0, 0, Math.PI / 2]}>
        <group position={[0, 0, 0]}>
          <Book color="#7b1fa2" height={0.15} />
        </group>
        <group position={[0.02, 0, 0]}>
          <Book color="#303f9f" height={0.15} />
        </group>
      </group>
      {[
        [-0.325, -(bD / 2) + 0.05],
        [0.325, -(bD / 2) + 0.05],
        [-0.325, bD / 2 - 0.05],
        [0.325, bD / 2 - 0.05],
      ].map(([lx, lz], lIdx) => (
        <mesh
          key={`shelf-leg-${lIdx}`}
          position={[lx, -(bH / 2), lz]}
          rotation={[0.08, 0, lx > 0 ? -0.05 : 0.05]}
          castShadow
        >
          <cylinderGeometry args={[0.02, 0.012, 0.15, 16]} />
          <meshStandardMaterial color="#3e2723" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export { AnimatedNightstand, AnimatedWardrobe };
