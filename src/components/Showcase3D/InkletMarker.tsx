import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Mesh } from 'three'
import { Quaternion } from 'three'
import type { Anchor } from './types'

interface Props {
  anchor: Anchor
}

/**
 * Subtle wall-mounted inklet indicator.
 * A thin warm-gold frame with a soft breathing glow — no rainbow, no flash.
 */
export function InkletMarker({ anchor }: Props) {
  const glowRef = useRef<Mesh>(null!)
  const frameRef = useRef<Mesh>(null!)

  const [px, py, pz] = anchor.position
  const q = useMemo(
    () => new Quaternion(
      anchor.quaternion[0],
      anchor.quaternion[1],
      anchor.quaternion[2],
      anchor.quaternion[3],
    ),
    [anchor.quaternion],
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    // Very subtle breathing — just enough to feel alive
    if (glowRef.current) {
      const mat = glowRef.current.material as { opacity: number }
      mat.opacity = 0.06 + Math.sin(t * 1.2) * 0.03
    }
    if (frameRef.current) {
      const mat = frameRef.current.material as { opacity: number }
      mat.opacity = 0.5 + Math.sin(t * 1.2) * 0.15
    }
  })

  return (
    <group position={[px, py, pz]} quaternion={q}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Screen plate — the inklet device face */}
        <mesh>
          <boxGeometry args={[0.22, 0.13, 0.008]} />
          <meshStandardMaterial color="#EDEADE" roughness={0.9} metalness={0} />
        </mesh>

        {/* Thin elegant frame border */}
        <mesh ref={frameRef} position={[0, 0, 0.005]}>
          <ringGeometry args={[0.135, 0.145, 64]} />
          <meshBasicMaterial
            color="#C4A265"
            transparent
            opacity={0.55}
            depthWrite={false}
          />
        </mesh>

        {/* Soft ambient glow — barely visible, just a warm halo */}
        <mesh ref={glowRef} position={[0, 0, 0.003]}>
          <circleGeometry args={[0.2, 64]} />
          <meshBasicMaterial
            color="#D4B87A"
            transparent
            opacity={0.08}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}
