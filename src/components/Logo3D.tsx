import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, Float, Environment, Center } from "@react-three/drei"
import * as THREE from "three"

export function Logo3DModel() {
  const { scene } = useGLTF("/3D models/logo3dmodel.glb")
  const modelRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!modelRef.current) return
    modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.8
  })

  // Apply brand materials if needed, or just keep original
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true
      child.receiveShadow = true
      if (child.material) {
        child.material.metalness = 0.9
        child.material.roughness = 0.1
        child.material.envMapIntensity = 2
      }
    }
  })

  return (
    <Center>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive 
          ref={modelRef} 
          object={scene} 
          scale={2.5} 
          rotation={[0, 0, 0]}
        />
      </Float>
      <Environment preset="city" />
    </Center>
  )
}

useGLTF.preload("/3D models/logo3dmodel.glb")
