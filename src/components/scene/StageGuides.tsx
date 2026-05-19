import { useMemo } from 'react';
import { Line } from '@react-three/drei';
import { useStageStore } from '../../store/stageStore';

const GUIDE_SPACING = 1;

export function StageGuides() {
  const { length, width, height } = useStageStore((s) => s.stage);

  const guides = useMemo(() => {
    const y = height + 0.004;
    const halfLength = length / 2;
    const halfWidth = width / 2;
    const items: {
      points: [number, number, number][];
      center: boolean;
    }[] = [];

    for (let z = -halfWidth; z <= halfWidth + 0.001; z += GUIDE_SPACING) {
      const center = Math.abs(z) < 0.001;
      items.push({
        points: [
          [-halfLength, y, z],
          [halfLength, y, z],
        ],
        center,
      });
    }

    for (let x = -halfLength; x <= halfLength + 0.001; x += GUIDE_SPACING) {
      if (Math.abs(x) < 0.001) continue;
      items.push({
        points: [
          [x, y, -halfWidth],
          [x, y, halfWidth],
        ],
        center: false,
      });
    }

    return items;
  }, [length, width, height]);

  return (
    <group>
      {guides.map((guide, index) => (
        <Line
          key={index}
          points={guide.points}
          color={guide.center ? '#38bdf8' : '#94a3b8'}
          lineWidth={guide.center ? 2 : 1}
          dashed={!guide.center}
          dashSize={0.5}
          gapSize={0.35}
          transparent
          opacity={guide.center ? 0.85 : 0.45}
        />
      ))}
    </group>
  );
}
