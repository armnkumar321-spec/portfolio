import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Points, PointMaterial, Icosahedron, Torus, Octahedron } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!)
  const pos = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) { const r = 4 + Math.random() * 6, t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1)
      a.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p)], i * 3) }
    return a
  }, [count])
  useFrame((_, d) => { ref.current.rotation.y += d * 0.03 })
  return <Points ref={ref} positions={pos} stride={3}><PointMaterial transparent color="#22d3ee" size={0.025} sizeAttenuation depthWrite={false} opacity={0.7} /></Points>
}

function Rig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 1.2 - camera.position.x) * 0.04
    camera.position.y += (pointer.y * 0.8 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })
  return null
}

function Core() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((s) => { ref.current.rotation.x = s.clock.elapsedTime * 0.15; ref.current.rotation.y = s.clock.elapsedTime * 0.2 })
  return (
    <group>
      <Icosahedron ref={ref} args={[1.4, 8]}><MeshDistortMaterial color="#1e1b4b" emissive="#4c1d95" emissiveIntensity={0.4} roughness={0.15} metalness={0.9} distort={0.35} speed={1.6} /></Icosahedron>
      <Icosahedron args={[1.75, 1]}><meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} /></Icosahedron>
    </group>
  )
}

export default function Scene({ low }: { low: boolean }) {
  return (
    <Canvas dpr={low ? 1 : [1, 1.75]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: !low, powerPreference: 'high-performance' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 3, 4]} intensity={40} color="#22d3ee" />
      <pointLight position={[-4, -2, 2]} intensity={40} color="#8b5cf6" />
      <Core />
      <Float speed={2} floatIntensity={1.5}><Torus args={[0.35, 0.12, 16, 48]} position={[2.6, 1.2, -0.5]}><meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} /></Torus></Float>
      <Float speed={1.5} floatIntensity={2}><Octahedron args={[0.4]} position={[-2.7, -1.1, 0]}><meshStandardMaterial color="#22d3ee" metalness={0.7} roughness={0.25} /></Octahedron></Float>
      <Float speed={2.4} floatIntensity={1}><Icosahedron args={[0.25]} position={[-2.2, 1.6, -1]}><meshStandardMaterial color="#fff" wireframe /></Icosahedron></Float>
      <Particles count={low ? 600 : 1800} />
      <Rig />
    </Canvas>
  )
}
