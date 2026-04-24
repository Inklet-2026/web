import { useGLTF } from '@react-three/drei'

export function HouseModel() {
  const { scene } = useGLTF('/models/house-optimized.glb')
  return <primitive object={scene} />
}

useGLTF.preload('/models/house-optimized.glb')
