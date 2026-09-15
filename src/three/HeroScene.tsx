import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SculpturalObject() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = pointer.y * 0.15;
      const targetX = pointer.x * 0.1;
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetY,
        0.03
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX * 0.3,
        0.03
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.12;
      innerRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      {/* Outer architectural ring — brushed dark metal */}
      <mesh ref={ringRef} castShadow receiveShadow>
        <torusGeometry args={[2.6, 0.08, 32, 128]} />
        <meshStandardMaterial
          color="#1a1a24"
          metalness={0.95}
          roughness={0.35}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Mid ring — accent gold tone */}
      <mesh rotation={[Math.PI / 2.5, 0, 0]} castShadow>
        <torusGeometry args={[2.1, 0.035, 16, 128]} />
        <meshStandardMaterial
          color="#c4a86f"
          metalness={0.85}
          roughness={0.25}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Inner geometric structure — matte faceted form */}
      <mesh ref={innerRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#0f0f16"
          metalness={0.7}
          roughness={0.45}
          flatShading
          envMapIntensity={0.9}
        />
      </mesh>

      {/* Glass outer shell — subtle transmission */}
      <mesh scale={1.85}>
        <icosahedronGeometry args={[1.5, 2]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0.1}
          transmission={0.85}
          ior={1.3}
          chromaticAberration={0.02}
          anisotropy={0.3}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#0a0a12"
          attenuationColor="#1a1a2e"
          attenuationDistance={3}
        />
      </mesh>

      {/* Central core — glowing accent */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.35, 64, 64]} />
        <meshStandardMaterial
          color="#c4a86f"
          emissive="#c4a86f"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Orbital elements — small architectural details */}
      {useMemo(
        () =>
          Array.from({ length: 6 }).map((_, i) => {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 3.2;
            return (
              <Float key={i} speed={1 + i * 0.2} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh
                  position={[
                    Math.cos(angle) * radius,
                    Math.sin(angle * 0.5) * 0.8,
                    Math.sin(angle) * radius,
                  ]}
                  castShadow
                >
                  <boxGeometry args={[0.12, 0.12, 0.12]} />
                  <meshStandardMaterial
                    color={i % 2 === 0 ? '#2a2a38' : '#c4a86f'}
                    metalness={0.8}
                    roughness={0.3}
                    emissive={i % 2 === 0 ? '#000000' : '#c4a86f'}
                    emissiveIntensity={i % 2 === 0 ? 0 : 0.15}
                  />
                </mesh>
              </Float>
            );
          }),
        []
      )}

      {/* Base platform — architectural grounding */}
      <mesh position={[0, -2.8, 0]} receiveShadow>
        <cylinderGeometry args={[3.5, 3.8, 0.06, 64]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.6}
          roughness={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Accent ring on platform */}
      <mesh position={[0, -2.76, 0]}>
        <ringGeometry args={[2.8, 2.85, 64]} />
        <meshStandardMaterial
          color="#c4a86f"
          metalness={0.8}
          roughness={0.3}
          emissive="#c4a86f"
          emissiveIntensity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

interface HeroSceneProps {
  scrollProgress: React.MutableRefObject<number>;
}

function CameraController({ scrollProgress }: HeroSceneProps) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollProgress.current;
    // Scroll-driven camera arc around the object
    const angle = p * Math.PI * 0.6;
    const radius = 8 - p * 1.5;
    const height = 1.5 + p * 2;

    camera.position.x = Math.cos(angle - Math.PI / 2) * radius;
    camera.position.z = Math.sin(angle - Math.PI / 2) * radius;
    camera.position.y = height;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.5, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} color="#6b7a8f" />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#c4a86f" distance={6} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.5}
        color="#e0c896"
      />

      <SculpturalObject />
      <CameraController scrollProgress={scrollProgress} />

      <Environment preset="night" />
    </Canvas>
  );
}
