import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'

function Steam() {
  const refs = [useRef(), useRef(), useRef()]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    refs.forEach((r, i) => {
      if (!r.current) return
      const phase = (t * 0.6 + i * 1.1) % 1
      r.current.position.y = 2.5 + phase * 1.2
      r.current.position.x = Math.sin(t * 0.8 + i) * 0.06
      r.current.material.opacity = phase < 0.5 ? phase * 1.2 : (1 - phase) * 1.2
      const s = 0.04 + phase * 0.08
      r.current.scale.set(s, s, s)
    })
  })

  return refs.map((r, i) => (
    <mesh key={i} ref={r} position={[i * 0.09 - 0.09, 2.5, 0.5]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="white" transparent opacity={0.5} />
    </mesh>
  ))
}

function CakePrimitive() {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.25
    }
  })

  return (
    <group ref={groupRef} position={[0, 1.05, 0]}>
      {/* Base layer */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.35, 64]} />
        <meshStandardMaterial color="#f2c4a0" roughness={0.6} metalness={0} />
      </mesh>
      {/* Middle layer */}
      <mesh castShadow position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.82, 0.82, 0.32, 64]} />
        <meshStandardMaterial color="#fff5f0" roughness={0.5} />
      </mesh>
      {/* Top layer */}
      <mesh castShadow position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.28, 64]} />
        <meshStandardMaterial color="#f9b8c8" roughness={0.4} metalness={0.05} />
      </mesh>
      {/* Cream top */}
      <mesh castShadow position={[0, 0.92, 0]}>
        <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.2]} />
        <meshStandardMaterial color="#fff8f5" roughness={0.3} />
      </mesh>
      {/* Decorative berry 1 */}
      <mesh castShadow position={[0.3, 1.02, 0.15]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#c0392b" roughness={0.4} />
      </mesh>
      {/* Decorative berry 2 */}
      <mesh castShadow position={[-0.25, 1.02, 0.2]}>
        <sphereGeometry args={[0.065, 12, 12]} />
        <meshStandardMaterial color="#8e44ad" roughness={0.4} />
      </mesh>
      {/* Decorative berry 3 */}
      <mesh castShadow position={[0.1, 1.04, -0.3]}>
        <sphereGeometry args={[0.07, 12, 12]} />
        <meshStandardMaterial color="#c0392b" roughness={0.4} />
      </mesh>
    </group>
  )
}

function Cup() {
  return (
    <group position={[1.6, 0.82, 0.2]}>
      {/* Saucer */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.32, 0.05, 32]} />
        <meshStandardMaterial color="#f8f4ef" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Cup body */}
      <mesh castShadow position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.18, 0.14, 0.28, 32]} />
        <meshStandardMaterial color="#f8f4ef" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.01, 32]} />
        <meshStandardMaterial color="#4a2409" roughness={0.9} />
      </mesh>
      {/* Steam */}
      <Steam />
    </group>
  )
}

export default function Scene() {
  return (
    <>
      {/* Gradient background via a large sphere */}
      <color attach="background" args={['#fdf6f0']} />
      <fog attach="fog" args={['#fdf6f0', 10, 20]} />

      {/* Lights */}
      <ambientLight intensity={0.7} color="#fff5e8" />
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.4}
        color="#ffe8cc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <pointLight position={[-3, 3, 2]} intensity={15} color="#ffd080" distance={12} decay={2} />
      <pointLight position={[3, 1, -2]} intensity={8} color="#ffcba0" distance={10} decay={2} />

      {/* Wooden table */}
      <mesh receiveShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[5, 0.12, 3]} />
        <meshStandardMaterial color="#8b5e3c" roughness={0.75} metalness={0.02} />
      </mesh>
      {/* Table legs suggestion */}
      {[[-2.3, 0], [2.3, 0], [-2.3, -2.3], [2.3, -2.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.3, z]}>
          <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
          <meshStandardMaterial color="#6b4226" roughness={0.8} />
        </mesh>
      ))}
      {/* Table surface subtle sheen */}
      <mesh receiveShadow position={[0, 0.765, 0]}>
        <boxGeometry args={[5, 0.005, 3]} />
        <meshStandardMaterial color="#a0723e" roughness={0.3} metalness={0.15} transparent opacity={0.6} />
      </mesh>

      {/* Cake */}
      <CakePrimitive />

      {/* Cup */}
      <Cup />

      {/* Coconut sparkles */}
      <Sparkles
        count={60}
        scale={[2.2, 2.5, 2.2]}
        position={[0, 1.5, 0]}
        size={3}
        speed={0.25}
        color="#ffe8a0"
        opacity={0.85}
      />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8d5c0" roughness={0.9} />
      </mesh>
    </>
  )
}
