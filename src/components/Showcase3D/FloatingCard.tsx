"use client"

import { motion, useTransform, type MotionValue } from 'framer-motion'

interface RoomContent {
  label: string
  tagline: string
  description: string
  side: 'left' | 'right'
  rangeStart: number
  rangeEnd: number
}

export const ROOM_CONTENT: RoomContent[] = [
  {
    label: 'Living Room',
    tagline: 'The household dashboard everyone walks past',
    description: 'Weather, calendar, family schedule — glanceable from the couch.',
    side: 'left',
    rangeStart: 0.17,
    rangeEnd: 0.30,
  },
  {
    label: 'Bedroom',
    tagline: 'Wake up to what matters',
    description: 'Sleep data, morning briefing, daily intention.',
    side: 'right',
    rangeStart: 0.35,
    rangeEnd: 0.52,
  },
  {
    label: 'Guest Bedroom',
    tagline: 'Your focus list, front and center',
    description: 'Tasks, deadlines, meeting notes — no phone required.',
    side: 'left',
    rangeStart: 0.57,
    rangeEnd: 0.74,
  },
  {
    label: 'Bathroom',
    tagline: 'Your morning routine, simplified',
    description: 'Time, weather, schedule — everything you need before you head out.',
    side: 'right',
    rangeStart: 0.79,
    rangeEnd: 1.00,
  },
]

interface FloatingCardProps {
  content: RoomContent
  scrollProgress: MotionValue<number>
  index: number
  isMobile: boolean
}

export function FloatingCard({ content, scrollProgress, index, isMobile }: FloatingCardProps) {
  const { rangeStart, rangeEnd, side } = content

  const fadeInEnd = rangeStart + (rangeEnd - rangeStart) * 0.2
  const fadeOutStart = rangeEnd - (rangeEnd - rangeStart) * 0.15

  const opacity = useTransform(
    scrollProgress,
    [rangeStart, fadeInEnd, fadeOutStart, rangeEnd],
    [0, 1, 1, 0],
  )

  const slideOffset = side === 'left' ? -30 : 30
  const x = useTransform(
    scrollProgress,
    [rangeStart, fadeInEnd, fadeOutStart, rangeEnd],
    [slideOffset, 0, 0, slideOffset],
  )

  return (
    <motion.div
      style={{
        opacity,
        x,
        position: 'absolute',
        top: '50%',
        translateY: '-50%',
        ...(side === 'left' ? { left: isMobile ? 16 : 48 } : { right: isMobile ? 16 : 48 }),
        maxWidth: isMobile ? 280 : 420,
        width: isMobile ? '85%' : '90%',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(245, 243, 237, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: isMobile ? 12 : 20,
          border: '1px solid rgba(232, 229, 219, 0.6)',
          padding: isMobile ? '20px 24px' : '36px 40px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Room label */}
        <div
          style={{
            fontFamily: 'var(--font-ibm-plex-mono)',
            fontSize: isMobile ? 10 : 12,
            color: '#aaa',
            textTransform: 'uppercase',
            letterSpacing: 3,
            marginBottom: isMobile ? 8 : 14,
          }}
        >
          {String(index + 1).padStart(2, '0')} — {content.label}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontFamily: 'var(--font-newsreader)',
            fontSize: isMobile ? 20 : 32,
            fontWeight: 300,
            color: '#1a1a1a',
            lineHeight: 1.25,
            marginBottom: isMobile ? 8 : 14,
          }}
        >
          {content.tagline}
        </div>

        {/* Description */}
        <div
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: isMobile ? 13 : 16,
            color: '#666',
            lineHeight: 1.6,
          }}
        >
          {content.description}
        </div>
      </div>
    </motion.div>
  )
}
