import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Billboard } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { skills } from '../data/content'

function Cloud() {
  const g = useRef<THREE.Group>(null!)
  const [hover, setHover] = useState<string | null>(null)
  const words = useMemo(() => {
    const all = Object.values(skills).flat(); const n = all.length
    return all.map((w, i) => { const phi = Math.acos(-1 + (2 * i + 1) / n), th = Math.sqrt(n * Math.PI) * phi
      return { w, p: new THREE.Vector3().setFromSphericalCoords(2.6, phi, th) } })
  }, [])
  useFrame(({ pointer }, d) => { g.current.rotation.y += d * (0.15 + pointer.x * 0.3); g.current.rotation.x += (pointer.y * 0.3 - g.current.rotation.x) * 0.05 })
  return <group ref={g}>{words.map(({ w, p }) => (
    <Billboard key={w} position={p}><Text fontSize={hover === w ? 0.34 : 0.26} color={hover === w ? '#22d3ee' : '#cbd5e1'}
      onPointerOver={() => setHover(w)} onPointerOut={() => setHover(null)}>{w}</Text></Billboard>))}</group>
}
export default function SkillOrb() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6.5], fov: 50 }}><Cloud /></Canvas>
}
