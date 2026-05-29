import { Html } from '@react-three/drei';
import {
  PROP_COORD_Y_ABOVE_MARKER,
  PROP_COORD_Y_ABOVE_TAG,
} from '../../constants/propLabels';
import { heightAboveStage, rotationDisplayDegrees } from '../../utils/propPosition';
import { useStageStore } from '../../store/stageStore';
import type { PlacedProp } from '../../types';

export function PropCoordinateLabel({ prop }: { prop: PlacedProp }) {
  const [x, y, z] = prop.position;
  const stageTopY = useStageStore((s) => s.stage.height);
  const lift = heightAboveStage(y, stageTopY);
  const rotationDeg = rotationDisplayDegrees(prop.rotation);
  const hasTag = Boolean(prop.tag.trim());
  const positionY = hasTag ? PROP_COORD_Y_ABOVE_TAG : PROP_COORD_Y_ABOVE_MARKER;

  return (
    <Html
      position={[0, positionY, 0]}
      center
      distanceFactor={12}
      zIndexRange={[200, 0]}
      style={{ pointerEvents: 'none' }}
    >
      <div className="prop-coord-label">
        <span>
          X {x.toFixed(2)} · Y {lift.toFixed(2)} m up · Z {z.toFixed(2)} m
        </span>
        <span>
          {rotationDeg.toFixed(0)} deg · {(prop.scale * 100).toFixed(0)}% · {prop.color}
        </span>
        {!prop.visible && <span className="prop-coord-hidden">Hidden</span>}
      </div>
    </Html>
  );
}
