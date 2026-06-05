import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Parallax Camera Controller
function CameraRig() {
  const { camera, pointer } = useThree()
  
  useFrame((state) => {
    const targetX = pointer.x * 2.0
    const targetY = pointer.y * 2.0
    
    // Slow, elegant camera interpolation
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + 0.8, 0.04)
    camera.lookAt(0, 0.2, 0)
  })
  
  return null
}

// Polished Rose-Gold Central Sculpture
function CentralSculpture({ scaleMultiplier }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.12
      meshRef.current.rotation.x = Math.sin(time * 0.15) * 0.15
    }
  })

  const baseScale = active ? 1.35 : 1.15
  const currentScale = baseScale * scaleMultiplier

  return (
    <mesh
      ref={meshRef}
      scale={currentScale}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color={hovered ? "#e50010" : "#d4af37"} // Shift between brand red and polished gold
        distort={hovered ? 0.35 : 0.22}
        speed={1.8}
        roughness={0.08}
        metalness={0.95}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        transmission={0.25}
        thickness={0.8}
      />
    </mesh>
  )
}

// Floating Luxury Fashion Orbits (Gold rings and marble blocks)
function LuxuryOrbits({ scaleMultiplier }) {
  const groupRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.04
    }
  })

  return (
    <group ref={groupRef} scale={scaleMultiplier}>
      {/* Outer Brand-Red Fine Ring */}
      <mesh rotation={[Math.PI / 2.1, 0.2, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.9, 0.012, 8, 120]} />
        <meshStandardMaterial color="#e50010" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Inner Polished Gold Ring */}
      <mesh rotation={[0.4, Math.PI / 4, 0.8]} position={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.015, 8, 120]} />
        <meshStandardMaterial color="#d4af37" roughness={0.05} metalness={0.95} />
      </mesh>

      {/* Floating Solid Gold Block */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <mesh position={[2.1, 0.6, -0.8]} rotation={[0.4, 0.4, 0.4]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
      </Float>

      {/* Floating Frosted Glass Shape */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-2.1, -0.5, 0.8]} rotation={[0.2, 0.8, 0.2]}>
          <octahedronGeometry args={[0.35]} />
          <meshPhysicalMaterial 
            color="#ffffff" 
            metalness={0.1} 
            roughness={0.1} 
            transmission={0.9} 
            thickness={0.8}
            clearcoat={1.0}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function MaintenanceCanvas() {
  const [dpr, setDpr] = useState(1)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setDpr(Math.min(window.devicePixelRatio, 2))
    
    // Check mobile screens dynamically
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const scaleMultiplier = isMobile ? 0.75 : 1.0

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0.5, 5.0], fov: 42 }}
        dpr={dpr}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Soft studio gallery lights */}
        <ambientLight intensity={0.85} />
        
        {/* Soft Golden studio spotlight */}
        <directionalLight 
          position={[5, 8, 6]} 
          intensity={1.5} 
          color="#fff6eb" 
        />

        {/* Brand-Red highlight rim light */}
        <pointLight 
          position={[-6, 4, 3]} 
          intensity={2.0} 
          color="#e50010" 
          distance={15}
        />
        
        {/* Luxury Gold rim light */}
        <pointLight 
          position={[6, -4, 3]} 
          intensity={2.5} 
          color="#d4af37" 
          distance={15}
        />

        {/* Central visual structures with mobile scales */}
        <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.5}>
          <CentralSculpture scaleMultiplier={scaleMultiplier} />
          <LuxuryOrbits scaleMultiplier={scaleMultiplier} />
        </Float>

        {/* Golden stardust particle field */}
        <Stars 
          radius={60} 
          depth={30} 
          count={800} 
          factor={3.5} 
          saturation={0.8} 
          fade 
          speed={0.8} 
        />

        <CameraRig />
      </Canvas>
    </div>
  )
}
