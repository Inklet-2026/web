import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CatmullRomCurve3, PerspectiveCamera, Vector3 } from 'three'
import type { AnchorsFile } from './types'

interface Props {
  progressRef: React.RefObject<number>
  anchors: AnchorsFile
}

// Hold zones: splineStart === splineEnd → camera completely frozen.
const SEGMENTS: [number, number, number, number][] = [
  [0.00, 0.08, 0.00, 0.00],  // overview hold (frozen)
  [0.08, 0.14, 0.00, 0.20],  // fly into living room
  [0.14, 0.30, 0.20, 0.20],  // living room hold — 16%
  [0.30, 0.35, 0.20, 0.45],  // fly to bedroom
  [0.35, 0.52, 0.45, 0.45],  // bedroom hold — 17%
  [0.52, 0.57, 0.45, 0.70],  // fly to guest bedroom
  [0.57, 0.74, 0.70, 0.70],  // guest bedroom hold — 17%
  [0.74, 0.79, 0.70, 1.00],  // fly to bathroom
  [0.79, 1.00, 1.00, 1.00],  // bathroom hold — 21%
]

function scrollToSpline(scroll: number): number {
  for (const [ss, se, ts, te] of SEGMENTS) {
    if (scroll <= se) {
      if (ts === te) return ts
      const t = Math.max(0, (scroll - ss) / (se - ss))
      const eased = t * t * (3 - 2 * t)
      return ts + (te - ts) * eased
    }
  }
  return 1
}

function isHoldZone(scroll: number): boolean {
  for (const [ss, se, ts, te] of SEGMENTS) {
    if (scroll <= se) return ts === te
  }
  return true
}

function getFov(splineT: number): number {
  if (splineT < 0.01) return 45
  if (splineT < 0.20) {
    const t = splineT / 0.20
    return 45 + t * 30
  }
  return 75
}

// Top-down up vector: (0, 0, -1) makes "north" point up on screen.
// Normal up vector: (0, 1, 0) for horizontal views.
// We blend between them during the overview→room transition.
const UP_TOPDOWN = new Vector3(1, 0, 0)
const UP_NORMAL = new Vector3(0, 1, 0)
const _upTemp = new Vector3()

function getUpVector(splineT: number): Vector3 {
  if (splineT <= 0.01) return UP_TOPDOWN
  if (splineT >= 0.20) return UP_NORMAL
  // Smooth blend during descent
  const t = (splineT - 0.01) / 0.19
  const eased = t * t * (3 - 2 * t)
  return _upTemp.copy(UP_TOPDOWN).lerp(UP_NORMAL, eased)
}

export function ScrollCameraRig({ progressRef, anchors }: Props) {
  const prevPos = useRef(new Vector3())
  const prevTarget = useRef(new Vector3())
  const initialized = useRef(false)

  const { positionCurve, targetCurve } = useMemo(() => {
    const rooms = anchors.rooms
    const lr = rooms.find(r => r.id === 'livingroom')!
    const br = rooms.find(r => r.id === 'bedroom')!
    const br2 = rooms.find(r => r.id === 'bedroom2')!
    const bath = rooms.find(r => r.id === 'bathroom')!

    // True top-down: directly above house center
    const centerX = (lr.view.position[0] + br.view.position[0] + br2.view.position[0] + bath.view.position[0]) / 4
    const centerZ = (lr.view.position[2] + br.view.position[2] + br2.view.position[2] + bath.view.position[2]) / 4
    const overviewPos = new Vector3(centerX, 15, centerZ)
    const overviewTarget = new Vector3(centerX, 0, centerZ)

    const posWaypoints = [
      overviewPos,
      new Vector3(
        (centerX + lr.view.position[0]) / 2,
        5.5,
        (centerZ + lr.view.position[2]) / 2,
      ),
      new Vector3(lr.view.position[0], lr.view.position[1], lr.view.position[2]),
      new Vector3(
        (lr.view.position[0] + br.view.position[0]) / 2,
        Math.max(lr.view.position[1], br.view.position[1]) + 0.4,
        (lr.view.position[2] + br.view.position[2]) / 2,
      ),
      new Vector3(br.view.position[0], br.view.position[1], br.view.position[2]),
      new Vector3(
        (br.view.position[0] + br2.view.position[0]) / 2,
        Math.max(br.view.position[1], br2.view.position[1]) + 0.4,
        (br.view.position[2] + br2.view.position[2]) / 2,
      ),
      new Vector3(br2.view.position[0], br2.view.position[1], br2.view.position[2]),
      new Vector3(
        (br2.view.position[0] + bath.view.position[0]) / 2,
        Math.max(br2.view.position[1], bath.view.position[1]) + 0.4,
        (br2.view.position[2] + bath.view.position[2]) / 2,
      ),
      new Vector3(bath.view.position[0], bath.view.position[1], bath.view.position[2]),
    ]

    const targetWaypoints = [
      overviewTarget,
      new Vector3(
        (overviewTarget.x + lr.inklet.position[0]) / 2,
        (overviewTarget.y + lr.inklet.position[1]) / 2,
        (overviewTarget.z + lr.inklet.position[2]) / 2,
      ),
      new Vector3(lr.inklet.position[0], lr.inklet.position[1], lr.inklet.position[2]),
      new Vector3(
        (lr.inklet.position[0] + br.inklet.position[0]) / 2,
        (lr.inklet.position[1] + br.inklet.position[1]) / 2,
        (lr.inklet.position[2] + br.inklet.position[2]) / 2,
      ),
      new Vector3(br.inklet.position[0], br.inklet.position[1], br.inklet.position[2]),
      new Vector3(
        (br.inklet.position[0] + br2.inklet.position[0]) / 2,
        (br.inklet.position[1] + br2.inklet.position[1]) / 2,
        (br.inklet.position[2] + br2.inklet.position[2]) / 2,
      ),
      new Vector3(br2.inklet.position[0], br2.inklet.position[1], br2.inklet.position[2]),
      new Vector3(
        (br2.inklet.position[0] + bath.inklet.position[0]) / 2,
        (br2.inklet.position[1] + bath.inklet.position[1]) / 2,
        (br2.inklet.position[2] + bath.inklet.position[2]) / 2,
      ),
      new Vector3(bath.inklet.position[0], bath.inklet.position[1], bath.inklet.position[2]),
    ]

    return {
      positionCurve: new CatmullRomCurve3(posWaypoints, false, 'centripetal', 0.5),
      targetCurve: new CatmullRomCurve3(targetWaypoints, false, 'centripetal', 0.5),
    }
  }, [anchors])

  useEffect(() => {
    if (initialized.current) return
    const pos = positionCurve.getPoint(0)
    const target = targetCurve.getPoint(0)
    prevPos.current.copy(pos)
    prevTarget.current.copy(target)
    initialized.current = true
  }, [positionCurve, targetCurve])

  useFrame(({ camera }) => {
    const scroll = progressRef.current ?? 0
    const splineT = scrollToSpline(scroll)
    const hold = isHoldZone(scroll)

    const pos = positionCurve.getPoint(splineT)
    const target = targetCurve.getPoint(splineT)

    // Always lerp — hold zones use a higher factor to settle quickly,
    // fly zones use a lower factor for cinematic smoothness.
    // Never snap (copy) to avoid jumps at zone boundaries.
    const lerpFactor = hold ? 0.18 : 0.1
    prevPos.current.lerp(pos, lerpFactor)
    prevTarget.current.lerp(target, lerpFactor)

    camera.position.copy(prevPos.current)

    // Blend up vector from top-down (0,0,-1) to normal (0,1,0) during descent
    const up = getUpVector(splineT)
    camera.up.copy(up)
    camera.lookAt(prevTarget.current)

    if (camera instanceof PerspectiveCamera) {
      const fov = getFov(splineT)
      if (Math.abs(camera.fov - fov) > 0.1) {
        camera.fov += (fov - camera.fov) * (hold ? 0.1 : 0.05)
        camera.updateProjectionMatrix()
      }
    }
  })

  return null
}
