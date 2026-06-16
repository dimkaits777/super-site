import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

function Spinner({ shape, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.9
      ref.current.rotation.x = clock.getElapsedTime() * 0.4
    }
  })

  return (
    <mesh ref={ref}>
      {shape === 'sphere' ? (
        <sphereGeometry args={[0.55, 24, 24]} />
      ) : (
        <boxGeometry args={[0.85, 0.85, 0.85]} />
      )}
      <meshStandardMaterial color={color} roughness={0.35} metalness={0.1} />
    </mesh>
  )
}

export default function MiniCanvas({ shape = 'box', color = '#d4956a' }) {
  return (
    <Canvas camera={{ position: [0, 0, 2.2], fov: 40 }} gl={{ antialias: true }}>
      <ambientLight intensity={0.8} color="#fff5e0" />
      <directionalLight position={[2, 3, 2]} intensity={1.2} color="#ffddaa" />
      <Spinner shape={shape} color={color} />
    </Canvas>
  )
}
