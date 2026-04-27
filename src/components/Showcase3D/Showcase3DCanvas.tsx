import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, AdaptiveEvents, Environment, useProgress } from '@react-three/drei'
import { Component, Suspense, useEffect, useState } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { HouseModel } from './HouseModel'
import { ScrollCameraRig } from './ScrollCameraRig'
import { InkletMarker } from './InkletMarker'
import type { AnchorsFile } from './types'

class Canvas3DErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Showcase3D] render error:', error, info)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function ErrorFallback() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #faf5e9 0%, #e8d8b3 100%)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-ibm-plex-mono)',
          fontSize: 13,
          color: '#7a6a4f',
          letterSpacing: 1,
          textAlign: 'center',
        }}
      >
        <div style={{ marginBottom: 8 }}>unable to load 3D view</div>
        <div style={{ fontSize: 11, color: '#aaa' }}>check your connection and refresh</div>
      </div>
    </div>
  )
}

function ProgressTracker({ onLoaded }: { onLoaded: () => void }) {
  const { progress } = useProgress()
  useEffect(() => {
    if (progress >= 100) onLoaded()
  }, [progress, onLoaded])
  return null
}

interface Props {
  progressRef: React.RefObject<number>
  anchors: AnchorsFile
  isMobile: boolean
}

export function Showcase3DCanvas({ progressRef, anchors, isMobile }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
            background: 'linear-gradient(180deg, #faf5e9 0%, #e8d8b3 100%)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 12,
              color: '#7a6a4f',
              letterSpacing: 2,
            }}
          >
            loading 3D view
          </div>
          <div
            style={{
              width: 120,
              height: 2,
              background: '#e0dac8',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '40%',
                height: '100%',
                background: '#7a6a4f',
                borderRadius: 1,
                animation: 'showcase-progress 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}
      <Canvas3DErrorBoundary fallback={<ErrorFallback />}>
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
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />

          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 20, 10]} intensity={0.7} />
          <Suspense fallback={null}>
            <ProgressTracker onLoaded={() => setLoaded(true)} />
            <Environment preset="apartment" />
            <HouseModel />
            <ScrollCameraRig progressRef={progressRef} anchors={anchors} />
            {anchors.rooms.map((room) => (
              <InkletMarker key={room.id} anchor={room.inklet} />
            ))}
          </Suspense>
        </Canvas>
      </Canvas3DErrorBoundary>
    </div>
  )
}
