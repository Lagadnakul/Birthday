import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshWobbleMaterial, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Mobile detection hook
const useIsMobile = () => {
  return useMemo(() => {
    return window.innerWidth < 768
  }, [])
}

interface FlowerProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

function Flower({ position, scale = 1, color = '#ff69b4' }: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const petalRefs = useRef<THREE.Mesh[]>([])
  const isMobile = useIsMobile()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.12
      
      // Animate individual petals (reduced on mobile)
      if (!isMobile) {
        petalRefs.current.forEach((petal, i) => {
          if (petal) {
            petal.rotation.z = Math.sin(state.clock.elapsedTime * 2 + i) * 0.1
            petal.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.1)
          }
        })
      }
    }
  })

  return (
    <Float speed={isMobile ? 1 : 1.5} rotationIntensity={isMobile ? 0.2 : 0.3} floatIntensity={isMobile ? 0.3 : 0.4}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Flower petals with mobile optimization */}
        {[...Array(isMobile ? 6 : 8)].map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) petalRefs.current[i] = el
            }}
            position={[
              Math.cos((i * Math.PI * 2) / (isMobile ? 6 : 8)) * 0.35,
              Math.sin(i * 0.3) * 0.05,
              Math.sin((i * Math.PI * 2) / (isMobile ? 6 : 8)) * 0.35
            ]}
            rotation={[
              Math.sin(i * 0.5) * 0.2,
              (i * Math.PI * 2) / (isMobile ? 6 : 8),
              Math.cos(i * 0.3) * 0.1
            ]}
          >
            <sphereGeometry args={[0.18, isMobile ? 8 : 12, isMobile ? 6 : 8]} />
            <MeshWobbleMaterial 
              color={color} 
              factor={isMobile ? 0.05 : 0.1}
              speed={isMobile ? 1 : 2}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>
        ))}
        
        {/* Flower center with gentle animation */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, isMobile ? 12 : 16, isMobile ? 12 : 16]} />
          <MeshWobbleMaterial 
            color="#ffd700" 
            factor={isMobile ? 0.02 : 0.05}
            speed={1}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
        
        {/* Enhanced stem */}
        <mesh position={[0, -0.6, 0]} rotation={[0, 0, Math.random() * 0.1]}>
          <cylinderGeometry args={[0.025, 0.035, 1.2, isMobile ? 6 : 8]} />
          <MeshWobbleMaterial 
            color="#90EE90" 
            factor={isMobile ? 0.01 : 0.02}
            speed={1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Add leaves (fewer on mobile) */}
        {[...Array(isMobile ? 2 : 3)].map((_, i) => (
          <mesh
            key={`leaf-${i}`}
            position={[
              Math.cos(i * 2) * 0.15,
              -0.3 - i * 0.2,
              Math.sin(i * 2) * 0.15
            ]}
            rotation={[0, i * 2, Math.PI / 4]}
          >
            <boxGeometry args={[0.1, 0.02, 0.2]} />
            <MeshWobbleMaterial 
              color="#228B22"
              factor={isMobile ? 0.01 : 0.03}
              speed={2}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

function Sunflower({ position, scale = 1 }: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const petalRefs = useRef<THREE.Mesh[]>([])
  const centerRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.08
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.2) * 0.1
    }
    
    // Animate sunflower center
    if (centerRef.current) {
      centerRef.current.rotation.y = state.clock.elapsedTime * 0.5
      centerRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05)
    }
    
    // Animate sunflower petals
    petalRefs.current.forEach((petal, i) => {
      if (petal) {
        petal.rotation.y = Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.1
        petal.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2.5 + i) * 0.08)
      }
    })
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Enhanced sunflower petals */}
        {[...Array(16)].map((_, i) => (
          <mesh
            key={i}
            ref={(el) => {
              if (el) petalRefs.current[i] = el
            }}
            position={[
              Math.cos((i * Math.PI * 2) / 16) * 0.45,
              Math.sin(i * 0.2) * 0.03,
              Math.sin((i * Math.PI * 2) / 16) * 0.45
            ]}
            rotation={[
              Math.sin(i * 0.3) * 0.15,
              (i * Math.PI * 2) / 16,
              Math.cos(i * 0.4) * 0.1
            ]}
          >
            <boxGeometry args={[0.35, 0.06, 0.12]} />
            <MeshWobbleMaterial 
              color="#FFD700" 
              factor={0.08}
              speed={1.5}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        ))}
        
        {/* Enhanced sunflower center with texture-like appearance */}
        <mesh ref={centerRef} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 32]} />
          <MeshWobbleMaterial 
            color="#8B4513"
            factor={0.1}
            speed={2}
            roughness={0.9}
            metalness={0.0}
          />
        </mesh>
        
        {/* Seeds pattern on center */}
        {[...Array(20)].map((_, i) => (
          <mesh
            key={`seed-${i}`}
            position={[
              (Math.cos(i * 0.8) * 0.15) + (Math.random() - 0.5) * 0.1,
              0.04,
              (Math.sin(i * 0.8) * 0.15) + (Math.random() - 0.5) * 0.1
            ]}
          >
            <sphereGeometry args={[0.015, 6, 6]} />
            <MeshWobbleMaterial 
              color="#654321"
              factor={0.02}
              speed={3}
              roughness={1}
            />
          </mesh>
        ))}
        
        {/* Enhanced stem */}
        <mesh position={[0, -0.8, 0]} rotation={[0, 0, Math.random() * 0.08]}>
          <cylinderGeometry args={[0.04, 0.05, 1.6, 12]} />
          <MeshWobbleMaterial 
            color="#228B22"
            factor={0.03}
            speed={1.2}
            roughness={0.8}
          />
        </mesh>
        
        {/* Sunflower leaves */}
        {[...Array(4)].map((_, i) => (
          <mesh
            key={`sunleaf-${i}`}
            position={[
              Math.cos(i * 1.5) * 0.2,
              -0.4 - i * 0.15,
              Math.sin(i * 1.5) * 0.2
            ]}
            rotation={[0, i * 1.5, Math.PI / 3]}
          >
            <boxGeometry args={[0.15, 0.03, 0.25]} />
            <MeshWobbleMaterial 
              color="#2E8B57"
              factor={0.05}
              speed={2.5}
              roughness={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

export function FlowerScene() {
  const lightRef = useRef<THREE.PointLight>(null!)
  const isMobile = useIsMobile()
  
  useFrame((state) => {
    if (lightRef.current && !isMobile) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 5
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 5
      lightRef.current.intensity = 1.2 + Math.sin(state.clock.elapsedTime * 2) * 0.3
    }
  })

  return (
    <>
      {/* Enhanced lighting setup - simplified for mobile */}
      <ambientLight intensity={isMobile ? 0.6 : 0.4} color="#ffeeff" />
      {!isMobile && (
        <pointLight 
          ref={lightRef}
          position={[5, 8, 5]} 
          intensity={1.5} 
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      )}
      <pointLight 
        position={[-8, 6, -3]} 
        intensity={isMobile ? 0.6 : 0.8} 
        color="#ff69b4"
        distance={20}
        decay={2}
      />
      <pointLight 
        position={[8, -4, 8]} 
        intensity={isMobile ? 0.4 : 0.6} 
        color="#ffc0cb"
        distance={15}
        decay={2}
      />
      
      {/* Directional light for better shadows - desktop only */}
      {!isMobile && (
        <directionalLight
          position={[10, 10, 5]}
          intensity={0.5}
          color="#fff8dc"
          castShadow
        />
      )}
      
      {/* Stars background - reduced on mobile */}
      <Stars
        radius={100}
        depth={50}
        count={isMobile ? 100 : 200}
        factor={isMobile ? 2 : 4}
        saturation={0.5}
        fade
        speed={0.5}
      />
      
      {/* Main sparkles - reduced on mobile */}
      <Sparkles
        count={isMobile ? 40 : 80}
        scale={[15, 15, 15]}
        size={isMobile ? 3 : 4}
        speed={0.3}
        color="#ff69b4"
        opacity={0.6}
      />
      
      {/* Secondary sparkles - reduced on mobile */}
      <Sparkles
        count={isMobile ? 30 : 60}
        scale={[10, 10, 10]}
        size={2}
        speed={0.4}
        color="#ffffff"
        opacity={0.8}
        position={[0, 2, 0]}
      />
      
      {/* Golden sparkles - reduced on mobile */}
      <Sparkles
        count={isMobile ? 20 : 40}
        scale={[8, 8, 8]}
        size={isMobile ? 2 : 3}
        speed={0.2}
        color="#ffd700"
        opacity={0.7}
        position={[0, -1, 0]}
      />
      
      {/* Multiple flowers in more natural arrangement - fewer on mobile */}
      <Flower position={[-2.5, -0.8, -2.5]} color="#ff69b4" scale={0.9} />
      <Flower position={[2.8, -0.3, -3.2]} color="#ffc0cb" scale={1.3} />
      <Flower position={[-3.5, -0.6, 1.2]} color="#ff1493" scale={0.8} />
      <Flower position={[4.2, -1.0, 0.5]} color="#ffb6c1" scale={1.1} />
      {!isMobile && (
        <>
          <Flower position={[1.5, -0.9, 2.8]} color="#ff91c4" scale={0.7} />
          <Flower position={[-1.8, -0.4, 3.5]} color="#ffd1dc" scale={1.0} />
        </>
      )}
      
      {/* Sunflowers positioned more naturally - fewer on mobile */}
      <Sunflower position={[0.5, -1.4, -4.5]} scale={1.1} />
      <Sunflower position={[-4.5, -1.6, -0.8]} scale={0.8} />
      {!isMobile && (
        <>
          <Sunflower position={[4.8, -1.5, -1.8]} scale={0.9} />
          <Sunflower position={[-2.0, -1.8, -6.0]} scale={0.7} />
          <Sunflower position={[3.2, -1.7, -5.5]} scale={0.85} />
        </>
      )}
      
      {/* Floating magical orbs - fewer on mobile */}
      {[...Array(isMobile ? 4 : 8)].map((_, i) => (
        <Float
          key={`orb-${i}`}
          speed={1 + i * 0.2}
          rotationIntensity={isMobile ? 0.3 : 0.5}
          floatIntensity={isMobile ? 0.5 : 0.8}
        >
          <mesh
            position={[
              (Math.random() - 0.5) * (isMobile ? 6 : 10),
              Math.random() * 3 + 1,
              (Math.random() - 0.5) * (isMobile ? 6 : 10)
            ]}
          >
            <sphereGeometry args={[0.05, isMobile ? 8 : 16, isMobile ? 8 : 16]} />
            <MeshWobbleMaterial
              color={i % 2 === 0 ? "#ff69b4" : "#ffd700"}
              factor={isMobile ? 0.1 : 0.2}
              speed={3}
              transparent
              opacity={0.6}
              emissive={i % 2 === 0 ? "#ff1493" : "#ffb347"}
              emissiveIntensity={isMobile ? 0.2 : 0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}
