"use client"

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const Showcase3DInner = dynamic(() => import('./Showcase3DInner'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '500vh',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
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
          }}
        >
          loading…
        </div>
      </div>
    </div>
  ),
})

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Showcase3D() {
  return (
    <section id="use-cases">
      {/* Static heading — renders server-side, visible immediately */}
      <div className="py-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
            className="font-[family-name:var(--font-newsreader)] text-4xl md:text-5xl font-light mb-5"
          >
            One brain, every room.
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="text-[#666] text-sm max-w-md mx-auto"
          >
            Scroll to see how inklet surfaces the right information
            in every corner of your home.
          </motion.p>
        </div>
      </div>

      {/* 3D scroll-driven showcase */}
      <Showcase3DInner />
    </section>
  )
}
