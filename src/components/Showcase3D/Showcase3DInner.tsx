"use client"

import { useRef, useEffect, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { Showcase3DCanvas } from './Showcase3DCanvas'
import { FloatingCard, ROOM_CONTENT } from './FloatingCard'
import { useAnchors } from './useAnchors'

export default function Showcase3DInner() {
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const anchors = useAnchors()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Bridge framer-motion MotionValue → plain ref for R3F useFrame
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    progressRef.current = v
  })

  if (!anchors) {
    return (
      <div
        ref={containerRef}
        style={{ height: '500vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ibm-plex-mono)',
              fontSize: 13,
              color: '#7a6a4f',
              letterSpacing: 1,
            }}
          >
            loading…
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      style={{ height: '500vh', position: 'relative' }}
    >
      {/* Sticky viewport — stays fixed while user scrolls through the 500vh container */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflow: 'hidden',
        }}
      >
        {/* 3D Canvas */}
        <Showcase3DCanvas
          progressRef={progressRef}
          anchors={anchors}
          isMobile={isMobile}
        />

        {/* Floating text cards — one per room, driven by scroll progress */}
        {ROOM_CONTENT.map((content, i) => (
          <FloatingCard
            key={content.label}
            content={content}
            scrollProgress={scrollYProgress}
            index={i}
            isMobile={isMobile}
          />
        ))}

        {/* Scroll hint at the very start */}
        <ScrollHint scrollProgress={scrollYProgress} />
      </div>
    </div>
  )
}

function ScrollHint({ scrollProgress }: { scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  useMotionValueEvent(scrollProgress, 'change', (v) => {
    if (v > 0.05) setVisible(false)
  })

  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-ibm-plex-mono)',
        fontSize: 12,
        color: '#7a6a4f',
        letterSpacing: 1.5,
        background: 'rgba(245, 243, 237, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '8px 20px',
        borderRadius: 999,
        border: '1px solid rgba(232, 229, 219, 0.6)',
        opacity: 0.85,
        animation: 'showcase-hint-pulse 3s ease-in-out infinite',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      scroll to explore ↓
    </div>
  )
}
