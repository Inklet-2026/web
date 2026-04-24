import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment, Html, useProgress } from '@react-three/drei'
import { Suspense } from 'react'
import { HouseModel } from './HouseModel'
import { ScrollCameraRig } from './ScrollCameraRig'
import { InkletMarker } from './InkletMarker'
import type { AnchorsFile } from './types'

function LoaderOverlay() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div
        style={{
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: 13,
          color: '#7a6a4f',
          letterSpacing: 1,
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8 }}>loading</div>
        <div style={{ fontSize: 11, color: '#aaa' }}>{progress.toFixed(0)}%</div>
      </div>
    </Html>
  )
}

interface Props {
  progressRef: React.RefObject<number>
  anchors: AnchorsFile
  isMobile: boolean
}

export function Showcase3DCanvas({ progressRef, anchors, isMobile }: Props) {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
      }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [4.5, 15, 12.7], fov: 45, near: 0.1, far: 200 }}
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      shadows={false}
      performance={{ min: 0.5 }}
      onCreated={({ camera }) => {
        camera.up.set(1, 0, 0)
        camera.lookAt(4.5, 0, 12.7)
      }}
    >
      {/* Automatic DPR scaling — drops resolution when FPS dips */}
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 20, 10]} intensity={0.7} />
      <Suspense fallback={<LoaderOverlay />}>
        <Environment preset="apartment" />
        <HouseModel />
        <ScrollCameraRig progressRef={progressRef} anchors={anchors} />
        {anchors.rooms.map((room) => (
          <InkletMarker key={room.id} anchor={room.inklet} />
        ))}
      </Suspense>
    </Canvas>
  )
}
