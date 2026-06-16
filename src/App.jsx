import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Scene from './components/Scene'
import MenuSection from './components/MenuSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf6f0]">
      {/* Hero header */}
      <header className="py-6 text-center border-b border-[#e8d5c0]">
        <h1 className="text-4xl md:text-5xl font-bold tracking-widest text-[#2c1a0e]"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>
          КОКОС
        </h1>
        <p className="text-sm tracking-[0.3em] uppercase text-[#8b5e3c] mt-1">
          Кав'ярня-кондитерська
        </p>
      </header>

      {/* 3D Hero Scene */}
      <div className="w-full" style={{ height: 'min(70vh, 520px)' }}>
        <Canvas
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          camera={{ position: [0, 3, 6], fov: 42 }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <OrbitControls
            makeDefault
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
            target={[0, 0.8, 0]}
            autoRotate
            autoRotateSpeed={0.4}
          />
        </Canvas>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center py-8">
        <a
          href="https://t.me/coconut_coffee_bot"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-4 rounded-full text-white font-semibold text-lg shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #c97b3a 0%, #8b4513 100%)', fontFamily: 'Georgia, serif', letterSpacing: '0.08em' }}
        >
          Замовити
        </a>
      </div>

      {/* Menu Section */}
      <MenuSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
