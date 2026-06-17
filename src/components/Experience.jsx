import { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EntranceScene } from './EntranceScene';
import { MagicCake } from './MagicCake';

/**
 * The lazy-loaded 3D backdrop (Three.js + drei live in this chunk so the
 * above-the-fold HTML can paint before the heavy renderer arrives).
 */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} color="#fff3df" />
      <hemisphereLight args={['#fff0d6', '#2a1710', 0.5]} />
      <directionalLight
        position={[5, 9, 5]}
        intensity={2.2}
        color="#fff0d0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0003}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />
      <directionalLight position={[-5, 3, -4]} intensity={1.0} color="#ffbe8c" />
      <pointLight position={[0, 2.5, 4]} intensity={20} color="#ffd28a" distance={18} decay={2} />
    </>
  );
}

/** Subtle mouse parallax on the camera (module-scoped pointer target). */
const pointer = { x: 0, y: 0 };

function CameraRig() {
  useEffect(() => {
    const onMove = (e) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useFrame((state) => {
    const cam = state.camera;
    cam.position.x += (pointer.x * 1.3 - cam.position.x) * 0.05;
    cam.position.y += (1.6 - pointer.y * 0.8 - cam.position.y) * 0.05;
    cam.lookAt(0, 1.0, 0);
  });
  return null;
}

export default function Experience() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.6, 6.5], fov: 42 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.15;
      }}
    >
      <color attach="background" args={['#0d0a08']} />
      <fog attach="fog" args={['#0d0a08', 13, 26]} />
      <Lights />
      <Suspense fallback={null}>
        <EntranceScene />
        <MagicCake />
      </Suspense>
      <CameraRig />
    </Canvas>
  );
}
