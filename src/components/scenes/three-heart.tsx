"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function ThreeHeart() {
  const heartGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Optimized parametric extruded heart shape
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.4);
    shape.bezierCurveTo(0, 0.7, -0.4, 1.0, -0.8, 1.0);
    shape.bezierCurveTo(-1.3, 1.0, -1.4, 0.6, -1.4, 0.35);
    shape.bezierCurveTo(-1.4, 0.0, -1.1, -0.4, -0.6, -0.85);
    shape.bezierCurveTo(-0.3, -1.15, 0, -1.5, 0, -1.5);
    shape.bezierCurveTo(0, -1.5, 0.3, -1.15, 0.6, -0.85);
    shape.bezierCurveTo(1.1, -0.4, 1.4, 0.0, 1.4, 0.35);
    shape.bezierCurveTo(1.4, 0.6, 1.3, 1.0, 0.8, 1.0);
    shape.bezierCurveTo(0.4, 1.0, 0, 0.7, 0, 0.4);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.35,
      bevelEnabled: true,
      bevelSegments: 4, // Optimized from 8
      steps: 1,         // Optimized from 2
      bevelSize: 0.12,
      bevelThickness: 0.12,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (heartGroupRef.current) {
      heartGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      heartGroupRef.current.rotation.y += delta * 0.35;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.25;
      ring1Ref.current.rotation.y += delta * 0.18;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.2;
      ring2Ref.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={heartGroupRef}>
      {/* High-Performance 60FPS Glass Heart Mesh */}
      <mesh geometry={heartGeometry} scale={1.2}>
        <meshStandardMaterial
          color="#F2B8C6"
          emissive="#6F2947"
          emissiveIntensity={0.35}
          roughness={0.25}
          metalness={0.15}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* Outer Celestial Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.018, 12, 64]} />
        <meshStandardMaterial
          color="#F2D7B0"
          emissive="#F2D7B0"
          emissiveIntensity={0.4}
          roughness={0.3}
          transparent={true}
          opacity={0.65}
        />
      </mesh>

      {/* Inner Celestial Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.5, 0.014, 12, 64]} />
        <meshStandardMaterial
          color="#E8A5B8"
          emissive="#E8A5B8"
          emissiveIntensity={0.3}
          roughness={0.3}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}
