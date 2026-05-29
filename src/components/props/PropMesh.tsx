import type { PropInteractionState, PropType } from '../../types';
import { getPropCatalogSpec } from '../../constants/propCatalogSpecs';
import { PropCatalogModel } from './catalog/PropCatalogModel';

interface PropMeshProps {
  type: PropType;
  ghost?: boolean;
  interactionState?: PropInteractionState;
  onToggleDiningChair?: (index: number) => void;
}

function GhostPlaceholder({ type }: { type: PropType }) {
  const { width, height, depth } = getPropCatalogSpec(type);
  return (
    <mesh position={[0, height / 2, 0]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color="#60a5fa"
        transparent
        opacity={0.45}
        emissive="#1e3a5f"
        emissiveIntensity={0.3}
        roughness={0.72}
      />
    </mesh>
  );
}

export function PropMesh({
  type,
  ghost,
  interactionState,
  onToggleDiningChair,
}: PropMeshProps) {
  if (ghost) {
    return <GhostPlaceholder type={type} />;
  }

  return (
    <PropCatalogModel
      type={type}
      interactionState={interactionState}
      onToggleDiningChair={onToggleDiningChair}
    />
  );
}
