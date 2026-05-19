import type { PropType } from '../../types';
import { adjustColorBrightness } from '../../utils/color';

interface PropMeshProps {
  type: PropType;
  color: string;
  ghost?: boolean;
}

function Material({
  ghost,
  color,
  accent,
}: {
  ghost?: boolean;
  color: string;
  accent?: string;
}) {
  const base = accent ?? color;
  return (
    <meshStandardMaterial
      color={ghost ? '#60a5fa' : base}
      transparent={ghost}
      opacity={ghost ? 0.45 : 1}
      emissive={ghost ? '#1e3a5f' : '#000000'}
      emissiveIntensity={ghost ? 0.3 : 0}
      roughness={0.72}
    />
  );
}

function BigScreen({ ghost, color }: { ghost?: boolean; color: string }) {
  const accent = adjustColorBrightness(color, 0.12);
  return (
    <group>
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[5, 2.8, 0.15]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 1.8, 0.08]}>
        <boxGeometry args={[4.6, 2.4, 0.02]} />
        <Material ghost={ghost} color={color} accent={accent} />
      </mesh>
      <mesh position={[0, 0.9, -0.2]}>
        <boxGeometry args={[0.3, 1.8, 0.3]} />
        <Material ghost={ghost} color={adjustColorBrightness(color, -0.1)} />
      </mesh>
    </group>
  );
}

function Screen({ ghost, color }: { ghost?: boolean; color: string }) {
  const accent = adjustColorBrightness(color, 0.15);
  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.6, 0.95, 0.08]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0.05]}>
        <boxGeometry args={[1.45, 0.82, 0.02]} />
        <Material ghost={ghost} color={color} accent={accent} />
      </mesh>
      <mesh position={[0, 0.35, -0.15]}>
        <boxGeometry args={[0.2, 0.7, 0.2]} />
        <Material ghost={ghost} color={adjustColorBrightness(color, -0.1)} />
      </mesh>
    </group>
  );
}

function Table({ ghost, color }: { ghost?: boolean; color: string }) {
  const leg = adjustColorBrightness(color, -0.12);
  return (
    <group>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.9]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      {(
        [
          [-0.75, 0.35, -0.35],
          [0.75, 0.35, -0.35],
          [-0.75, 0.35, 0.35],
          [0.75, 0.35, 0.35],
        ] as const
      ).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <Material ghost={ghost} color={leg} />
        </mesh>
      ))}
    </group>
  );
}

function Platform({ ghost, color }: { ghost?: boolean; color: string }) {
  const edge = adjustColorBrightness(color, -0.08);
  return (
    <group>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[2.5, 0.24, 2.5]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 0.26, 0]}>
        <boxGeometry args={[2.35, 0.04, 2.35]} />
        <Material ghost={ghost} color={edge} />
      </mesh>
    </group>
  );
}

function Square({ ghost, color }: { ghost?: boolean; color: string }) {
  return (
    <group>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[1.5, 0.08, 1.5]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[1.35, 0.02, 1.35]} />
        <Material ghost={ghost} color={adjustColorBrightness(color, 0.18)} />
      </mesh>
    </group>
  );
}

function Circle({ ghost, color }: { ghost?: boolean; color: string }) {
  return (
    <group>
      <mesh position={[0, 0.04, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.85, 0.08, 32]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.02, 32]} />
        <Material ghost={ghost} color={adjustColorBrightness(color, 0.18)} />
      </mesh>
    </group>
  );
}

function Chair({ ghost, color }: { ghost?: boolean; color: string }) {
  const leg = adjustColorBrightness(color, -0.12);
  return (
    <group>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[0.48, 0.06, 0.48]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[0.48, 0.75, 0.06]} />
        <Material ghost={ghost} color={color} />
      </mesh>
      {(
        [
          [-0.18, 0.2, -0.18],
          [0.18, 0.2, -0.18],
          [-0.18, 0.2, 0.18],
          [0.18, 0.2, 0.18],
        ] as const
      ).map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <boxGeometry args={[0.05, 0.4, 0.05]} />
          <Material ghost={ghost} color={leg} />
        </mesh>
      ))}
    </group>
  );
}

function Stairs({ ghost, color }: { ghost?: boolean; color: string }) {
  const steps = 5;
  const stepHeight = 0.2;
  const stepDepth = 0.35;
  return (
    <group>
      {Array.from({ length: steps }, (_, i) => (
        <mesh
          key={i}
          position={[0, stepHeight * (i + 0.5), -i * stepDepth]}
        >
          <boxGeometry args={[2, stepHeight, stepDepth]} />
          <Material
            ghost={ghost}
            color={adjustColorBrightness(color, -0.05 * i)}
          />
        </mesh>
      ))}
    </group>
  );
}

export function PropMesh({ type, color, ghost }: PropMeshProps) {
  switch (type) {
    case 'big_screen':
      return <BigScreen ghost={ghost} color={color} />;
    case 'screen':
      return <Screen ghost={ghost} color={color} />;
    case 'table':
      return <Table ghost={ghost} color={color} />;
    case 'platform':
      return <Platform ghost={ghost} color={color} />;
    case 'square':
      return <Square ghost={ghost} color={color} />;
    case 'circle':
      return <Circle ghost={ghost} color={color} />;
    case 'chair':
      return <Chair ghost={ghost} color={color} />;
    case 'stairs':
      return <Stairs ghost={ghost} color={color} />;
  }
}
