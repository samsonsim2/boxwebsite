import React, { useEffect, useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import {
  useGLTF,
  useAnimations,
  useTexture,
  TransformControls,
  PresentationControls,
} from '@react-three/drei'
import gsap from 'gsap'

export default function Three(props) {
  //LIGHT MODE TEXTURES
  const boxLightdiffuseMap = useTexture('/textures/Box_LightMode_Diffuse.jpg')
  boxLightdiffuseMap.flipY = false

  const humanLightDiffuseMap = useTexture(
    '/textures/Human_LightMode_Diffuse.jpg'
  )
  humanLightDiffuseMap.flipY = false

  //DARK MODE TEXTURES
  const boxDarkdiffuseMap = useTexture('/textures/Box_DarkMode_Diffuse.jpg')
  boxDarkdiffuseMap.flipY = false

  const humanDarkDiffuseMap = useTexture('/textures/Human_DarkMode_Diffuse.jpg')
  humanDarkDiffuseMap.flipY = false

  const { nodes, materials, animations } = useGLTF('/models/Box.glb')
  //---------------Start of Box Animation
  const ref = useRef(null)

  useEffect(() => {
    gsap.to(ref.current.rotation, {
      y: Math.PI * 2,
      duration: 3,
      ease: 'power1.out',
    })
  }, [])
  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    ref.current.rotation.y += 0.001
  })

  //---------------End of Box Animation

  return (
    <PresentationControls
      global
      zoom={1}
      rotation={[0, Math.PI / 12, 0]}
      polar={[-Infinity, Infinity]}
      config={{ mass: 0.1, tension: 37, friction: 10 }}
    >
      <group ref={ref} {...props} dispose={null} scale={[0.008, 0.008, 0.008]}>
        <group>
          <group name='Box' position={[5.65, 33.71, -23.23]}>
            <mesh
              name='Glass'
              castShadow
              receiveShadow
              geometry={nodes.Glass.geometry}
              material={nodes.Glass.material}
              position={[-5.65, -33.71, 29.87]}
            >
              <meshPhysicalMaterial
                transmission={1}
                metalness={0}
                roughness={0}
                ior={1.8}
              />
            </mesh>
            <mesh
              name='Human'
              castShadow
              receiveShadow
              geometry={nodes.Human.geometry}
              material={nodes.Human.material}
              position={[-84.18, -68.22, -7.62]}
            >
              <meshBasicMaterial
                map={props.toggle ? humanLightDiffuseMap : humanDarkDiffuseMap}
              />
            </mesh>
            <mesh
              name='Package'
              castShadow
              receiveShadow
              geometry={nodes.Package.geometry}
              material={nodes.Package.material}
              position={[89.83, 101.93, -22.24]}
            >
              <meshBasicMaterial
                map={props.toggle ? boxLightdiffuseMap : boxDarkdiffuseMap}
              />
            </mesh>
          </group>
        </group>
      </group>
    </PresentationControls>
  )
}

useGLTF.preload('/models/Box.glb')
