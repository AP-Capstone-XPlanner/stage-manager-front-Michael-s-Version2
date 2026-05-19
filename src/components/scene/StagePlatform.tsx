import { Edges } from '@react-three/drei';
import { useStageStore } from '../../store/stageStore';

export function StagePlatform() {
  const { length, width, height } = useStageStore((s) => s.stage);
  const topY = height;

  return (
    <group>
      <mesh position={[0, height / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial color="#52525b" roughness={0.85} metalness={0.08} />
        <Edges color="#a1a1aa" threshold={15} />
      </mesh>
      <mesh position={[0, topY + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[length, width]} />
        <meshStandardMaterial color="#71717a" roughness={0.65} />
      </mesh>
    </group>
  );
}

export function useStageTopY(): number {
  return useStageStore((s) => s.stage.height);
}

export function useStageBounds() {
  const { length, width } = useStageStore((s) => s.stage);
  return { halfLength: length / 2, halfWidth: width / 2 };
}
