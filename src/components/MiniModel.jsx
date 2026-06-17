import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FittedModel } from './FittedModel';
import { ModelBoundary } from './ModelBoundary';

/**
 * A self-contained mini 3D canvas with a slowly rotating model inside each menu
 * card. Renders a real .glb (`model`) when provided, otherwise the procedural
 * model picked by `kind`.
 */

const CREAM = '#f7f2e7';
const GOLD = '#c29d5a';
const GOLD_DARK = '#916b2d';

function Spin({ children, speed = 0.6 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed;
  });
  return (
    <group ref={ref} rotation={[0.12, 0, 0]}>
      {children}
    </group>
  );
}

function CakeMini() {
  return (
    <Spin>
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.7, 0.74, 0.32, 40]} />
        <meshStandardMaterial color={CREAM} roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[0.72, 0.72, 0.04, 40]} />
        <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.56, 0.6, 0.3, 40]} />
        <meshStandardMaterial color={CREAM} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.16, 18, 14]} />
        <meshStandardMaterial color="#3f210f" roughness={0.9} />
      </mesh>
    </Spin>
  );
}

function NapoleonMini() {
  const layers = [-0.3, -0.18, -0.06, 0.06, 0.18, 0.3];
  return (
    <Spin>
      {layers.map((y, i) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[0.95, 0.05, 0.7]} />
          <meshStandardMaterial color={i % 2 ? '#fff6e6' : '#d9a86a'} roughness={0.7} />
        </mesh>
      ))}
      <mesh position={[0.18, 0.42, 0.12]}>
        <sphereGeometry args={[0.07, 14, 12]} />
        <meshStandardMaterial color="#b8341f" roughness={0.4} />
      </mesh>
    </Spin>
  );
}

function CheesecakeMini() {
  return (
    <Spin>
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.7, 0.66, 0.5, 40]} />
        <meshStandardMaterial color="#e8c486" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.04, 40]} />
        <meshStandardMaterial color="#c98b2e" roughness={0.5} />
      </mesh>
      <mesh position={[0.2, 0.25, 0.15]}>
        <sphereGeometry args={[0.09, 16, 14]} />
        <meshStandardMaterial color="#9c1a1a" roughness={0.35} />
      </mesh>
    </Spin>
  );
}

function CupMini() {
  return (
    <Spin speed={0.5}>
      <mesh position={[0, -0.36, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 0.06, 28]} />
        <meshStandardMaterial color={CREAM} roughness={0.3} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.38, 0.27, 0.55, 28]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[-0.44, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.16, 0.05, 12, 24, Math.PI * 1.4]} />
        <meshStandardMaterial color={GOLD} roughness={0.2} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.02, 28]} />
        <meshStandardMaterial color="#4e2b15" roughness={0.15} />
      </mesh>
    </Spin>
  );
}

const PROCEDURAL = {
  cake: CakeMini,
  napoleon: NapoleonMini,
  cheesecake: CheesecakeMini,
  cup: CupMini,
};

export function MiniModel({ kind = 'cake', model = null }) {
  const Procedural = PROCEDURAL[kind] || CakeMini;
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.3, 2.3], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.9} color="#fff5e6" />
      <directionalLight position={[2, 3, 2]} intensity={1.6} color="#ffe6c0" />
      <directionalLight position={[-2, 1, -1]} intensity={0.5} color={GOLD_DARK} />
      {model && model.url ? (
        <ModelBoundary fallback={<Procedural />}>
          <Suspense fallback={<Procedural />}>
            <FittedModel url={model.url} rotation={model.rotation || [0, 0, 0]} fit={model.fit || 1.3} spin={0.6} />
          </Suspense>
        </ModelBoundary>
      ) : (
        <Procedural />
      )}
    </Canvas>
  );
}
