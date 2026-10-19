"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function ThreeHeart() {
  const heartGroupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  // Construct parametric extruded heart shape
  const heartGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Standard cubic bezier parametric heart
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
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 8,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  useFrame((state, delta) => {
    if (heartGroupRef.current) {
      // Gentle floating bob
      heartGroupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
      // Slow rotation
      heartGroupRef.current.rotation.y += delta * 0.4;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.3;
      ring1Ref.current.rotation.y += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z += delta * 0.35;
    }
  });

  return (
    <group ref={heartGroupRef}>
      {/* 3D Glass Heart Mesh */}
      <mesh geometry={heartGeometry} scale={1.2}>
        <meshPhysicalMaterial
          color="#E8A5B8"
          emissive="#6F2947"
          emissiveIntensity={0.3}
          roughness={0.12}
          metalness={0.05}
          transmission={0.88}
          ior={1.45}
          thickness={1.5}
          transparent={true}
          opacity={0.92}
        />
      </mesh>

      {/* Outer Celestial Translucent Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.2, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#F2D7B0"
          emissive="#F2D7B0"
          emissiveIntensity={0.4}
          roughness={0.2}
          transparent={true}
          opacity={0.6}
        />
      </mesh>

      {/* Inner Celestial Translucent Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.6, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#E8A5B8"
          emissive="#E8A5B8"
          emissiveIntensity={0.3}
          roughness={0.3}
          transparent={true}
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}
