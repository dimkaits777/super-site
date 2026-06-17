import { Suspense, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { MODELS } from '../config/models';
import { ModelBoundary } from './ModelBoundary';
import { FittedModel } from './FittedModel';
import { scroll } from '../store/scroll';

/**
 * СЦЕНА 2 — «Магія торта».
 * The cake loads from an opaque hashed .glb; if the asset is missing or fails,
 * it gracefully falls back to a procedural cake wrapped in a self-generated
 * coconut-shaving canvas texture. It emerges from golden <Sparkles> across
 * scroll.offset 0.4→0.7, then rotates slowly. A cup beside it puffs steam.
 */

function smoothstep(a, b, x) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

/* --- self-generated coconut-shaving texture (canvas), built once --- */
let coconutTexture = null;
function buildCoconutTexture() {
  if (coconutTexture || typeof document === 'undefined') return coconutTexture;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#fbf8f1';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 4200; i++) {
    const g = 230 + Math.floor(Math.random() * 25);
    ctx.fillStyle = `rgb(${g},${g - 6},${g - 18})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1.4 + Math.random() * 4, 0.7 + Math.random() * 1.4);
  }
  coconutTexture = new THREE.CanvasTexture(c);
  coconutTexture.wrapS = coconutTexture.wrapT = THREE.RepeatWrapping;
  coconutTexture.repeat.set(3, 2);
  return coconutTexture;
}

/* --- procedural fallback cake --- */
function ProceduralCake() {
  const tex = useMemo(() => buildCoconutTexture(), []);
  const tier = (r, h, y) => (
    <mesh position={[0, y, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[r, r * 1.04, h, 48]} />
      <meshStandardMaterial color="#f7f2e7" roughness={0.85} metalness={0.02} bumpMap={tex} bumpScale={0.04} />
    </mesh>
  );
  const band = (r, y) => (
    <mesh position={[0, y, 0]}>
      <cylinderGeometry args={[r, r, 0.05, 48]} />
      <meshStandardMaterial color="#c29d5a" roughness={0.25} metalness={0.85} />
    </mesh>
  );
  return (
    <group>
      {tier(1.0, 0.46, 0.23)}
      {band(1.02, 0.485)}
      {tier(0.9, 0.4, 0.71)}
      {band(0.92, 0.935)}
      {tier(0.78, 0.36, 1.14)}
      {/* coconut crown */}
      <mesh position={[0, 1.36, 0]} castShadow>
        <sphereGeometry args={[0.34, 24, 18]} />
        <meshStandardMaterial color="#ffffff" roughness={0.55} bumpMap={tex} bumpScale={0.05} />
      </mesh>
      <mesh position={[0, 1.55, 0]} castShadow>
        <sphereGeometry args={[0.2, 20, 16]} />
        <meshStandardMaterial color="#3f210f" roughness={0.95} />
      </mesh>
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.72, 1.34, Math.sin(a) * 0.72]} castShadow>
            <sphereGeometry args={[0.07, 10, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
          </mesh>
        );
      })}
    </group>
  );
}

/* --- real GLB cake (auto-fitted), procedural fallback on failure --- */
function CakeModel() {
  const cfg = MODELS.cake;
  return (
    <ModelBoundary fallback={<ProceduralCake />}>
      <Suspense fallback={<ProceduralCake />}>
        <FittedModel url={cfg.url} rotation={cfg.rotation} fit={cfg.fit} />
      </Suspense>
    </ModelBoundary>
  );
}

/* --- rising steam (transparent spheres) --- */
const STEAM_SEEDS = Array.from({ length: 6 }, () => ({ phase: Math.random(), seed: Math.random() * 10 }));

function Steam({ origin = [0, 0, 0] }) {
  const meshes = useRef([]);
  const phases = useRef(STEAM_SEEDS.map((s) => s.phase));
  useFrame((_state, delta) => {
    for (let i = 0; i < STEAM_SEEDS.length; i++) {
      const m = meshes.current[i];
      if (!m) continue;
      const t = (phases.current[i] + delta * 0.28) % 1;
      phases.current[i] = t;
      const { seed } = STEAM_SEEDS[i];
      m.position.set(
        origin[0] + Math.sin(seed + t * 6) * 0.07,
        origin[1] + t * 1.3,
        origin[2] + Math.cos(seed + t * 5) * 0.07,
      );
      m.scale.setScalar(0.05 + t * 0.16);
      m.material.opacity = (t < 0.25 ? t / 0.25 : 1 - t) * 0.4;
    }
  });
  return STEAM_SEEDS.map((_seed, i) => (
    <mesh
      key={i}
      ref={(el) => {
        meshes.current[i] = el;
      }}
    >
      <sphereGeometry args={[1, 10, 10]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0} depthWrite={false} />
    </mesh>
  ));
}

/* --- gold ceramic cup with steam --- */
function Cup({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.02, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.42, 0.34, 0.05, 28]} />
        <meshStandardMaterial color="#c29d5a" roughness={0.25} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.27, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.21, 0.44, 28]} />
        <meshStandardMaterial color="#c29d5a" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[-0.34, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.13, 0.04, 12, 24, Math.PI * 1.4]} />
        <meshStandardMaterial color="#c29d5a" roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.47, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.02, 28]} />
        <meshStandardMaterial color="#4e2b15" roughness={0.15} metalness={0.1} />
      </mesh>
      <Steam origin={[0, 0.5, 0]} />
    </group>
  );
}

export function MagicCake() {
  const cakeGroup = useRef();
  const sparklesGroup = useRef();

  useFrame((_, delta) => {
    const o = scroll.offset;
    const reveal = smoothstep(0.4, 0.7, o); // 0 → 1 across the spec range
    const appear = smoothstep(0.3, 0.45, o); // cup/steam fade-in slightly earlier

    if (cakeGroup.current) {
      const s = 0.0001 + reveal; // avoid zero-scale
      cakeGroup.current.scale.setScalar(s);
      cakeGroup.current.visible = reveal > 0.001;
      // gentle bob while emerging, steady slow spin once revealed
      cakeGroup.current.position.y = (1 - reveal) * -0.4;
      if (reveal > 0.95) cakeGroup.current.rotation.y += delta * 0.3;
      else cakeGroup.current.rotation.y += delta * 0.6 * (1 - reveal);
    }
    if (sparklesGroup.current) {
      // dense while emerging, fades once the cake is fully present
      const vis = Math.max(appear, 1 - Math.abs(reveal - 0.5) * 2) * (1 - smoothstep(0.7, 0.85, o));
      sparklesGroup.current.visible = vis > 0.02;
      sparklesGroup.current.scale.setScalar(0.9 + (1 - reveal) * 0.3);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Cup position={[-1.9, 0, 0.7]} />

      {/* golden particles the cake emerges from */}
      <group ref={sparklesGroup} position={[0, 0.9, 0]}>
        <Sparkles count={70} scale={[2.4, 2.6, 2.4]} size={4} speed={0.4} color="#ffe6a0" opacity={0.9} />
        <Sparkles count={40} scale={[1.6, 2.0, 1.6]} size={2.5} speed={0.6} color="#c29d5a" opacity={0.8} />
      </group>

      {/* the cake itself */}
      <group ref={cakeGroup} position={[0, 0, 0]}>
        <CakeModel />
      </group>

      <ContactShadows position={[0, 0.01, 0]} opacity={0.35} scale={8} blur={2.6} far={4} color="#3a2415" />
    </group>
  );
}

useGLTF.preload(MODELS.cake.url);
