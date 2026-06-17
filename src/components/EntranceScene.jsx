import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { scroll } from '../store/scroll';

/**
 * СЦЕНА 1 — «Вивіска і вхід».
 * Three parallax layers (interior → bar counter → signboard) that drift upward
 * at different speeds as `scroll.offset` grows; the signboard leaves fastest.
 */

const GOLD = '#c29d5a';
const GOLD_DARK = '#916b2d';
const CREAM = '#f3ead9';
const CLAY = '#5c3a28';
const DARK = '#2a1710';

function smoothstep(a, b, x) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

function setOpacity(group, value) {
  if (!group) return;
  group.traverse((o) => {
    if (o.material) o.material.opacity = value;
  });
}

function CoconutHalf({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#3f210f" roughness={0.95} transparent />
      </mesh>
      <mesh scale={0.92}>
        <sphereGeometry args={[0.5, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f7f2e7" roughness={0.5} transparent />
      </mesh>
    </group>
  );
}

export function EntranceScene() {
  const interiorRef = useRef();
  const counterRef = useRef();
  const signRef = useRef();

  // memo cup positions on the counter
  const cups = useMemo(
    () => [
      [-2.2, 0, 0.2],
      [-1.4, 0, -0.1],
      [2.0, 0, 0.1],
    ],
    [],
  );

  useFrame(() => {
    const o = scroll.offset;
    // whole-entrance lift + per-layer differential parallax
    if (interiorRef.current) {
      interiorRef.current.position.y = o * 4.5;
      setOpacity(interiorRef.current, 1 - smoothstep(0.25, 0.45, o));
    }
    if (counterRef.current) {
      counterRef.current.position.y = -1.4 + o * 7;
      setOpacity(counterRef.current, 1 - smoothstep(0.22, 0.42, o));
    }
    if (signRef.current) {
      signRef.current.position.y = 1.7 + o * 12; // floats up and out fastest
      signRef.current.rotation.z = Math.sin(performance.now() / 1400) * 0.015 * (1 - o);
      setOpacity(signRef.current, 1 - smoothstep(0.18, 0.36, o));
    }
  });

  return (
    <group>
      {/* LAYER 1 — interior wall, shelves, warm window glow (slowest) */}
      <group ref={interiorRef} position={[0, 0, -6]}>
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[26, 16]} />
          <meshStandardMaterial color={CLAY} roughness={1} transparent />
        </mesh>
        {/* warm windows */}
        {[-6, 6].map((x) => (
          <mesh key={x} position={[x, 3.2, 0.05]}>
            <planeGeometry args={[3.2, 4.2]} />
            <meshStandardMaterial color="#ffdfa6" emissive="#ffcf86" emissiveIntensity={0.6} transparent />
          </mesh>
        ))}
        {/* shelves */}
        {[1.2, 3.0].map((y) => (
          <mesh key={y} position={[0, y, 0.2]}>
            <boxGeometry args={[10, 0.18, 0.5]} />
            <meshStandardMaterial color={DARK} roughness={0.8} transparent />
          </mesh>
        ))}
        {[-3.6, -2.6, 2.6, 3.6].map((x) => (
          <mesh key={x} position={[x, 3.45, 0.3]}>
            <cylinderGeometry args={[0.22, 0.26, 0.7, 16]} />
            <meshStandardMaterial color={GOLD_DARK} roughness={0.5} metalness={0.3} transparent />
          </mesh>
        ))}
      </group>

      {/* LAYER 2 — bar counter with cups (medium) */}
      <group ref={counterRef} position={[0, -1.4, -2]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[9, 1.6, 1.4]} />
          <meshStandardMaterial color={DARK} roughness={0.7} transparent />
        </mesh>
        <mesh position={[0, 0.86, 0]}>
          <boxGeometry args={[9.3, 0.18, 1.7]} />
          <meshStandardMaterial color={GOLD_DARK} roughness={0.35} metalness={0.5} transparent />
        </mesh>
        {/* a glowing accent strip */}
        <mesh position={[0, 0.1, 0.71]}>
          <planeGeometry args={[9, 0.12]} />
          <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.7} transparent />
        </mesh>
        {cups.map((p, i) => (
          <group key={i} position={[p[0], 1.1, p[2]]}>
            <mesh>
              <cylinderGeometry args={[0.22, 0.16, 0.34, 20]} />
              <meshStandardMaterial color={i === 1 ? GOLD : CREAM} roughness={0.3} metalness={0.2} transparent />
            </mesh>
            <mesh position={[0, 0.18, 0]}>
              <cylinderGeometry args={[0.2, 0.2, 0.02, 20]} />
              <meshStandardMaterial color="#4e2b15" roughness={0.2} transparent />
            </mesh>
          </group>
        ))}
        {/* vase with a sprig */}
        <mesh position={[3.2, 1.15, -0.1]}>
          <cylinderGeometry args={[0.12, 0.18, 0.5, 16]} />
          <meshStandardMaterial color="#e9e2d4" roughness={0.4} transparent />
        </mesh>
      </group>

      {/* LAYER 3 — hanging signboard emblem (fastest, leaves first) */}
      <group ref={signRef} position={[0, 1.7, 1]}>
        {/* hanging strings */}
        {[-2.1, 2.1].map((x) => (
          <mesh key={x} position={[x, 1.7, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 3.4, 8]} />
            <meshStandardMaterial color={GOLD_DARK} roughness={0.4} metalness={0.6} transparent />
          </mesh>
        ))}
        {/* plaque */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[5, 2.6, 0.2]} />
          <meshStandardMaterial color={DARK} roughness={0.6} transparent />
        </mesh>
        {/* gold ring */}
        <mesh position={[0, 0, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.045, 16, 80]} />
          <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.9} transparent />
        </mesh>
        {/* two coconut halves as the «ОО» */}
        <CoconutHalf position={[-0.5, 0, 0.25]} scale={0.62} />
        <CoconutHalf position={[0.5, 0, 0.25]} scale={0.62} />
        {/* gold base line */}
        <mesh position={[0, -0.85, 0.18]}>
          <boxGeometry args={[2.4, 0.04, 0.04]} />
          <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.8} transparent />
        </mesh>
      </group>
    </group>
  );
}
