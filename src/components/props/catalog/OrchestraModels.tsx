import {
  BRASS_MATERIAL,
  CoffeeTableWoodMaterial,
  PAD_MATERIAL,
  SILVER_MATERIAL,
} from '../materials/StagePropMaterials';

export function MusicianChairModel() {
  const mC_width = 0.51;
  const mC_depth = 0.58;
  const mC_frameH = 0.47;
  const mC_totalH = 0.88;

  return (
    <group>
      <mesh position={[-(mC_width / 2) + 0.015, mC_frameH / 2, mC_depth / 2 - 0.02]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, mC_frameH, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[mC_width / 2 - 0.015, mC_frameH / 2, mC_depth / 2 - 0.02]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, mC_frameH, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.7} roughness={0.3} />
      </mesh>
      <group position={[0, 0, -(mC_depth / 2) + 0.02]}>
        <mesh position={[-(mC_width / 2) + 0.015, mC_totalH / 2, 0]} rotation={[-0.08, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, mC_totalH, 16]} />
          <meshStandardMaterial color="#1f1f2e" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[mC_width / 2 - 0.015, mC_totalH / 2, 0]} rotation={[-0.08, 0, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, mC_totalH, 16]} />
          <meshStandardMaterial color="#1f1f2e" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>
      <mesh position={[0, mC_frameH, 0]} castShadow receiveShadow>
        <boxGeometry args={[mC_width - 0.02, 0.035, mC_depth - 0.04]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh
        position={[0, mC_totalH - 0.14, -(mC_depth / 2) + 0.05]}
        rotation={[-0.08, 0, 0]}
        castShadow
      >
        <boxGeometry args={[mC_width - 0.04, 0.24, 0.025]} />
        <meshStandardMaterial color="#181818" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function ConductorPodiumModel() {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.2, 1.0]} />
        <meshStandardMaterial color="#333333" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.201, 0]} receiveShadow>
        <boxGeometry args={[0.96, 0.005, 0.96]} />
        <meshStandardMaterial color="#7f8c8d" roughness={0.9} />
      </mesh>
      {[
        [-0.46, -0.46],
        [0.46, -0.46],
        [-0.46, 0.46],
        [0.46, 0.46],
      ].map(([px, pz], idx) => (
        <mesh key={`podium-foot-${idx}`} position={[px, 0.025, pz]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.05, 12]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      ))}
      <group position={[0, 0.2, -0.47]}>
        <mesh position={[-0.36, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.0175, 0.0175, 1.0, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.36, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.0175, 0.0175, 1.0, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.0175, 0.0175, 0.72, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.72, 16]} />
          <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export function MusicStandModel() {
  const mS_height = 0.95;

  return (
    <group>
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.02, 6]} />
        <meshStandardMaterial color="#151515" roughness={0.5} />
      </mesh>
      {[0, Math.PI * 0.66, Math.PI * 1.33].map((ang, bIdx) => (
        <mesh
          key={`stand-prong-${bIdx}`}
          position={[Math.sin(ang) * 0.18, 0.01, Math.cos(ang) * 0.18]}
          rotation={[0, ang, 0]}
          castShadow
        >
          <boxGeometry args={[0.02, 0.015, 0.32]} />
          <meshStandardMaterial color="#151515" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, mS_height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.014, mS_height, 16]} />
        <meshStandardMaterial color="#1c1c1c" metalness={0.4} roughness={0.4} />
      </mesh>
      <mesh position={[0, mS_height + 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.3, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      <group position={[0, mS_height + 0.24, 0.02]} rotation={[-0.3, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.51, 0.3, 0.01]} />
          <meshStandardMaterial color="#202020" roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.15, 0.03]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <boxGeometry args={[0.51, 0.06, 0.01]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

const TONE_HOLES = [
  { y: 0.18, r: 0.016, theta: 0.4 },
  { y: 0.22, r: 0.016, theta: 0.35 },
  { y: 0.26, r: 0.015, theta: 0.3 },
  { y: 0.34, r: 0.013, theta: 0.2 },
  { y: 0.38, r: 0.013, theta: 0.15 },
  { y: 0.42, r: 0.012, theta: 0.1 },
];

export function MusicalInstrumentsModel() {
  return (
    <group>
      <group>
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.04, 6]} />
          <CoffeeTableWoodMaterial baseColor="#5d4037" roughness={0.3} />
        </mesh>
        <mesh position={[-0.08, 0.28, 0]} rotation={[0, 0, -0.18]} castShadow>
          <boxGeometry args={[0.04, 0.52, 0.08]} />
          <CoffeeTableWoodMaterial baseColor="#5d4037" roughness={0.3} />
        </mesh>
        <mesh position={[0.04, 0.24, 0]} rotation={[0, 0, 0.4]} castShadow>
          <torusGeometry args={[0.065, 0.012, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
        <mesh position={[-0.13, 0.55, 0]} rotation={[0, 0, 0.2]} castShadow>
          <torusGeometry args={[0.035, 0.01, 12, 24, Math.PI]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
      </group>

      <group position={[0.03, 0.14, 0]} rotation={[0, 0, 0.2]}>
        <group>
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.034, 0.038, 0.12, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.24, 0]} castShadow>
            <cylinderGeometry args={[0.029, 0.034, 0.12, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.36, 0]} castShadow>
            <cylinderGeometry args={[0.024, 0.029, 0.12, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.48, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.024, 0.12, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
        </group>

        <group position={[0.024, -0.01, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.038, 0.0385, 0.02, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0.012, -0.018, 0]} rotation={[0, 0, -0.3]} castShadow>
            <cylinderGeometry args={[0.0382, 0.0385, 0.025, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0.034, -0.032, 0]} rotation={[0, 0, -0.6]} castShadow>
            <cylinderGeometry args={[0.0385, 0.039, 0.025, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0.062, -0.038, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.039, 0.039, 0.03, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0.09, -0.032, 0]} rotation={[0, 0, -2.5]} castShadow>
            <cylinderGeometry args={[0.039, 0.041, 0.025, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
        </group>

        <group position={[0.115, -0.01, 0]} rotation={[0, 0, -0.55]}>
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.046, 0.041, 0.08, 24, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.13, 0]} castShadow>
            <cylinderGeometry args={[0.056, 0.046, 0.08, 24, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.21, 0]} castShadow>
            <cylinderGeometry args={[0.072, 0.056, 0.08, 24, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.071, 0.004, 12, 32]} />
            {BRASS_MATERIAL}
          </mesh>
        </group>

        <group position={[0, 0.54, 0]} rotation={[0, 0, -0.45]}>
          <mesh position={[0, 0.03, 0]} castShadow>
            <cylinderGeometry args={[0.015, 0.018, 0.06, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[-0.01, 0.08, 0]} rotation={[0, 0, 0.3]} castShadow>
            <cylinderGeometry args={[0.012, 0.015, 0.05, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[-0.035, 0.12, 0]} rotation={[0, 0, 0.75]} castShadow>
            <cylinderGeometry args={[0.01, 0.012, 0.05, 16, 1, true]} />
            {BRASS_MATERIAL}
          </mesh>
          <mesh position={[-0.062, 0.142, 0]} rotation={[0, 0, 1.1]} castShadow>
            <cylinderGeometry args={[0.009, 0.01, 0.025, 16]} />
            <meshStandardMaterial color="#c29d70" roughness={0.8} />
          </mesh>
          <group position={[-0.088, 0.156, 0]} rotation={[0, 0, 1.1]}>
            <mesh castShadow>
              <boxGeometry args={[0.016, 0.035, 0.015]} />
              <meshStandardMaterial color="#0b0b0b" roughness={0.4} />
            </mesh>
            <mesh position={[0, -0.005, 0]}>
              <cylinderGeometry args={[0.0095, 0.0095, 0.01, 16, 1, true]} />
              <meshStandardMaterial color="rgb(212, 175, 55)" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>

        <group>
          <mesh position={[-0.024, 0.3, 0.01]} castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.44, 8]} />
            {SILVER_MATERIAL}
          </mesh>
          <mesh position={[0.01, 0.28, -0.024]} castShadow>
            <cylinderGeometry args={[0.003, 0.003, 0.38, 8]} />
            {SILVER_MATERIAL}
          </mesh>
          {TONE_HOLES.map((keyItem, idx) => (
            <group
              key={`tonehole-pad-${idx}`}
              position={[
                Math.sin(keyItem.theta) * 0.03,
                keyItem.y,
                Math.cos(keyItem.theta) * 0.03,
              ]}
              rotation={[0, keyItem.theta, 0]}
            >
              <mesh castShadow>
                <cylinderGeometry args={[keyItem.r, keyItem.r, 0.006, 12]} />
                {BRASS_MATERIAL}
              </mesh>
              <mesh position={[0, -0.004, 0]}>
                <cylinderGeometry
                  args={[keyItem.r - 0.002, keyItem.r - 0.002, 0.003, 12]}
                />
                {PAD_MATERIAL}
              </mesh>
              <mesh position={[0, 0.004, 0]}>
                <cylinderGeometry
                  args={[keyItem.r * 0.65, keyItem.r * 0.65, 0.002, 12]}
                />
                <meshStandardMaterial color="#fcfaf2" roughness={0.3} />
              </mesh>
            </group>
          ))}
          <mesh position={[0.08, 0.04, 0.03]} rotation={[0, 0, -0.4]} castShadow>
            <boxGeometry args={[0.005, 0.14, 0.018]} />
            {BRASS_MATERIAL}
          </mesh>
        </group>
      </group>
    </group>
  );
}
