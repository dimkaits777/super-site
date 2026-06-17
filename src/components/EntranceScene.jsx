import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { scroll } from '../store/scroll';
import { LAYOUT } from '../config/scene3d';

/**
 * СЦЕНА 1 — «Вхід».
 * Three depth layers (facade/signboard → interior → back wall). The camera
 * dollies forward THROUGH them (see Experience/CameraRig), so parallax comes
 * from the camera motion. The foreground signboard rises up and dissolves once
 * scroll.offset passes ~0.3 — like walking through the doors into the café.
 */

const GOLD = '#c29d5a';
const GOLD_DARK = '#916b2d';
const WALL = '#ecdcc0'; // warm peach interior wall
const WALL_DARK = '#d8c09c';
const BRICK = '#3b3940'; // grey facade brick
const DARK = '#241712';
const GLASS = '#26343a';
const WOOD = '#4a3526';

function smoothstep(a, b, x) {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
}

function setOpacity(group, value) {
  group.traverse((o) => {
    if (o.material) o.material.opacity = value;
  });
}

/** Half coconut "bowl" used in the signboard emblem. */
function CoconutHalf({ position, scale = 1 }) {
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
  const fgRef = useRef();

  useFrame(() => {
    const o = scroll.offset;
    if (fgRef.current) {
      // rise up and out of frame…
      fgRef.current.position.y = LAYOUT.foreground.y + o * 7;
      // …and dissolve (opacity → 0) past ~0.3
      setOpacity(fgRef.current, 1 - smoothstep(LAYOUT.fgFade[0], LAYOUT.fgFade[1], o));
      fgRef.current.visible = o < 0.5;
    }
  });

  return (
    <group>
      {/* ───────── BACKGROUND (z ≈ -8): warm back wall + windows ───────── */}
      <group position={[0, 0, LAYOUT.background.z]}>
        <mesh position={[0, 2, 0]}>
          <planeGeometry args={[40, 22]} />
          <meshStandardMaterial color={WALL} roughness={1} />
        </mesh>
        {/* glowing windows */}
        {[-9, 9].map((x) => (
          <mesh key={x} position={[x, 4, 0.05]}>
            <planeGeometry args={[4.5, 5.5]} />
            <meshStandardMaterial color="#ffe4ad" emissive="#ffd089" emissiveIntensity={0.8} />
          </mesh>
        ))}
        {/* framed pictures */}
        {[-3.5, 3.5].map((x) => (
          <mesh key={x} position={[x, 3, 0.06]}>
            <planeGeometry args={[1.6, 2.1]} />
            <meshStandardMaterial color={DARK} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ───────── MIDGROUND (z ≈ -4): counter, display case, log wall ───────── */}
      <group position={[0, 0, LAYOUT.midground.z]}>
        {/* lower peach wall band */}
        <mesh position={[0, 0.4, -0.4]}>
          <planeGeometry args={[26, 8]} />
          <meshStandardMaterial color={WALL_DARK} roughness={1} />
        </mesh>
        {/* service counter */}
        <mesh position={[2.8, -0.7, 0]}>
          <boxGeometry args={[5.5, 1.6, 1.3]} />
          <meshStandardMaterial color="#cfcfd2" roughness={0.6} />
        </mesh>
        {/* glowing pastry display case */}
        <mesh position={[-1.6, -0.55, 0.1]}>
          <boxGeometry args={[3, 1.1, 1.2]} />
          <meshStandardMaterial color="#fff3da" emissive="#ffe6b0" emissiveIntensity={0.5} transparent opacity={0.9} />
        </mesh>
        {/* firewood log wall (nod to the real café) */}
        <group position={[5.4, -0.7, 0.2]}>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => (
              <mesh key={`${r}-${c}`} position={[(-0.3 + c * 0.2) * 0, -0.55 + r * 0.28, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.13, 0.13, 1.0, 10]} />
                <meshStandardMaterial color={c % 2 ? '#7a5638' : WOOD} roughness={0.9} />
              </mesh>
            )),
          )}
        </group>
        {/* wall TV */}
        <mesh position={[0.2, 1.4, -0.35]}>
          <planeGeometry args={[1.8, 1.0]} />
          <meshStandardMaterial color="#10202a" emissive="#1d3a4a" emissiveIntensity={0.5} />
        </mesh>
        {/* warm pendant light */}
        <mesh position={[-1.6, 1.8, 0.4]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#fff0c0" emissive="#ffcf7a" emissiveIntensity={1.4} />
        </mesh>
        <pointLight position={[0, 1.2, 1]} intensity={12} color="#ffd28a" distance={14} decay={2} />
      </group>

      {/* ───────── FOREGROUND (z ≈ +2.6): facade + «Кокос» signboard + doors ───────── */}
      <group ref={fgRef} position={[0, LAYOUT.foreground.y, LAYOUT.foreground.z]}>
        {/* grey brick facade slab */}
        <mesh position={[0, -0.3, -0.35]}>
          <boxGeometry args={[10, 8, 0.4]} />
          <meshStandardMaterial color={BRICK} roughness={1} transparent />
        </mesh>
        {/* signboard plaque */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[3.6, 1.9, 0.18]} />
          <meshStandardMaterial color="#fbf8f1" roughness={0.6} transparent />
        </mesh>
        {/* gold ring */}
        <mesh position={[0, 0.1, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.72, 0.035, 16, 80]} />
          <meshStandardMaterial color={GOLD} roughness={0.25} metalness={0.9} transparent />
        </mesh>
        {/* two coconut halves as the «ОО» */}
        <CoconutHalf position={[-0.34, 0.12, 0.2]} scale={0.42} />
        <CoconutHalf position={[0.34, 0.12, 0.2]} scale={0.42} />
        {/* gold accent line under the name */}
        <mesh position={[0, -0.55, 0.12]}>
          <boxGeometry args={[1.8, 0.03, 0.03]} />
          <meshStandardMaterial color={GOLD} roughness={0.3} metalness={0.8} transparent />
        </mesh>
        {/* glass entrance doors */}
        {[-0.6, 0.6].map((x) => (
          <mesh key={x} position={[x, -2.0, 0.05]}>
            <boxGeometry args={[1.05, 2.6, 0.08]} />
            <meshStandardMaterial color={GLASS} roughness={0.1} metalness={0.3} transparent opacity={0.85} />
          </mesh>
        ))}
        {/* door frame */}
        <mesh position={[0, -2.0, -0.02]}>
          <boxGeometry args={[2.4, 2.8, 0.06]} />
          <meshStandardMaterial color={GOLD_DARK} roughness={0.5} metalness={0.5} transparent />
        </mesh>
      </group>
    </group>
  );
}
