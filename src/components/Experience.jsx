import { Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EntranceScene } from './EntranceScene';
import { MagicCake } from './MagicCake';
import { scroll } from '../store/scroll';
import { LAYOUT } from '../config/scene3d';

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

/** Scroll-driven dolly-in camera + fading mouse parallax (module-scoped state). */
const pointer = { x: 0, y: 0 };
const lookCurrent = new THREE.Vector3(...LAYOUT.camStart.look);
const lookTarget = new THREE.Vector3();

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

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
    const o = scroll.offset;
    const e = easeInOut(clamp01(o / LAYOUT.dollyEnd));
    const { camStart: s, camEnd: en } = LAYOUT;

    // mouse parallax fades out as the camera locks onto the cake
    const settle = clamp01(o / 0.5);
    const mx = pointer.x * 0.5 * (1 - settle);
    const my = pointer.y * 0.35 * (1 - settle * 0.6);

    const cam = state.camera;
    cam.position.x += (lerp(s.pos[0], en.pos[0], e) + mx - cam.position.x) * 0.08;
    cam.position.y += (lerp(s.pos[1], en.pos[1], e) - my - cam.position.y) * 0.08;
    cam.position.z += (lerp(s.pos[2], en.pos[2], e) - cam.position.z) * 0.08;

    lookTarget.set(
      lerp(s.look[0], en.look[0], e),
      lerp(s.look[1], en.look[1], e),
      lerp(s.look[2], en.look[2], e),
    );
    lookCurrent.lerp(lookTarget, 0.1);
    cam.lookAt(lookCurrent);
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
