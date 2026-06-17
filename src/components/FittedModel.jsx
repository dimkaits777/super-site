import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Loads a .glb and auto-fits it: applies an orientation `rotation` (e.g. to fix
 * Z-up models), then auto-centers on X/Z, seats the base at y=0, and uniformly
 * scales so its height ≈ `fit`. So you never hand-tune scale/position — only the
 * up-axis rotation if needed. `spin` (rad/s) rotates it around Y.
 */
export function FittedModel({ url, rotation = [0, 0, 0], fit = 1.8, spin = 0 }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  const [rx, ry, rz] = rotation;
  const { object, scale, position } = useMemo(() => {
    const obj = scene.clone(true);
    obj.rotation.set(rx, ry, rz);
    obj.updateMatrixWorld(true);
    obj.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    const box = new THREE.Box3().setFromObject(obj);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const s = size.y > 0.0001 ? fit / size.y : 1;
    return {
      object: obj,
      scale: s,
      position: [-center.x * s, -box.min.y * s, -center.z * s],
    };
  }, [scene, rx, ry, rz, fit]);

  useFrame((_state, delta) => {
    if (spin && ref.current) ref.current.rotation.y += delta * spin;
  });

  return (
    <group ref={ref}>
      <group position={position} scale={scale}>
        <primitive object={object} />
      </group>
    </group>
  );
}
