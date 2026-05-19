import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useStageStore } from '../../store/stageStore';
import { CameraKeyboardControls } from './CameraKeyboardControls';
import { PlacementController } from './PlacementController';
import { PlacedProps } from './PlacedProps';
import { StageGuides } from './StageGuides';
import { StagePlatform } from './StagePlatform';

function SceneContent() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const selectProp = useStageStore((s) => s.selectProp);
  const mode = useStageStore((s) => s.mode);
  const stage = useStageStore((s) => s.stage);
  const maxExtent = Math.max(stage.length, stage.width) + 8;

  return (
    <>
      <color attach="background" args={['#1a1d26']} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#b8c9e0', '#2a2d38', 0.45]} />
      <directionalLight
        position={[12, 18, 8]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <directionalLight position={[-8, 10, -6]} intensity={0.35} />
      <Grid
        args={[80, 80]}
        cellSize={1}
        cellThickness={0.6}
        sectionSize={5}
        sectionThickness={1.2}
        fadeDistance={50}
        position={[0, 0.001, 0]}
        cellColor="#3a4055"
        sectionColor="#5a6380"
      />
      <StagePlatform />
      <StageGuides />
      <PlacedProps />
      <PlacementController />
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onClick={() => {
          if (mode === 'select') selectProp(null);
        }}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#14161c" roughness={1} />
      </mesh>
      <OrbitControls
        ref={controlsRef}
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2 - 0.08}
        minDistance={5}
        maxDistance={maxExtent * 2}
        target={[0, stage.height + 0.5, 0]}
      />
      <CameraKeyboardControls controlsRef={controlsRef} />
    </>
  );
}

export function Scene3D() {
  return (
    <Canvas
      shadows
      style={{ width: '100%', height: '100%', display: 'block' }}
      camera={{ position: [14, 10, 14], fov: 45, near: 0.1, far: 200 }}
      gl={{ antialias: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#1a1d26');
        gl.toneMappingExposure = 1.05;
      }}
    >
      <SceneContent />
    </Canvas>
  );
}
