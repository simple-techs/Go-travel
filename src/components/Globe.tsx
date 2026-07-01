"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Sphere, Html } from "@react-three/drei";
import * as THREE from "three";
import { countries } from "@/lib/countries";
import { Country } from "@/lib/types";

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function GlobeAtmosphere() {
  return (
    <Sphere args={[2.05, 64, 64]}>
      <shaderMaterial
        transparent
        side={THREE.BackSide}
        vertexShader={`
          varying vec3 vNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec3 vNormal;
          void main() {
            float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
            gl_FragColor = vec4(0.0, 0.8, 1.0, intensity * 0.4);
          }
        `}
      />
    </Sphere>
  );
}

interface MarkerProps {
  country: Country;
  onSelect: (country: Country) => void;
  isHovered: boolean;
  onHover: (code: string | null) => void;
}

function Marker({ country, onSelect, isHovered, onHover }: MarkerProps) {
  const position = useMemo(
    () => latLngToVector3(country.lat, country.lng, 2.01),
    [country.lat, country.lng]
  );
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered
        ? 1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.3
        : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(country);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover(country.code);
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={() => {
          onHover(null);
          document.body.style.cursor = "default";
        }}
      >
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial
          color={isHovered ? "#00ffaa" : country.popular ? "#00d4ff" : "#0088aa"}
          transparent
          opacity={isHovered ? 1 : 0.9}
        />
      </mesh>
      {country.popular && (
        <mesh>
          <ringGeometry args={[0.04, 0.06, 32]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={isHovered ? 0.8 : 0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
      {isHovered && (
        <Html distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap border border-cyan-500/30">
            {country.name}
          </div>
        </Html>
      )}
    </group>
  );
}

function GlobeMesh({ onSelectCountry }: { onSelectCountry: (country: Country) => void }) {
  const globeRef = useRef<THREE.Group>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const handleHover = useCallback((code: string | null) => {
    setHoveredCountry(code);
  }, []);

  useFrame(() => {
    if (globeRef.current && !hoveredCountry) {
      globeRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={globeRef}>
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          color="#0a1628"
          emissive="#061020"
          specular="#1a3a5c"
          shininess={20}
          transparent
          opacity={0.95}
        />
      </Sphere>

      {/* Grid lines */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * Math.PI) / 6;
        return (
          <mesh key={`lng-${i}`} rotation={[0, angle, 0]}>
            <torusGeometry args={[2.005, 0.002, 8, 64]} />
            <meshBasicMaterial color="#1a3a5c" transparent opacity={0.3} />
          </mesh>
        );
      })}
      {Array.from({ length: 5 }, (_, i) => {
        const latAngle = ((i + 1) * Math.PI) / 6;
        const radius = 2.005 * Math.sin(latAngle);
        const y = 2.005 * Math.cos(latAngle);
        return (
          <mesh key={`lat-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.002, 8, 64]} />
            <meshBasicMaterial color="#1a3a5c" transparent opacity={0.3} />
          </mesh>
        );
      })}

      {countries.map((country) => (
        <Marker
          key={country.code}
          country={country}
          onSelect={onSelectCountry}
          isHovered={hoveredCountry === country.code}
          onHover={handleHover}
        />
      ))}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });
  return (
    <OrbitControls
      enableZoom={true}
      enablePan={false}
      minDistance={3}
      maxDistance={8}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      autoRotate={false}
    />
  );
}

interface GlobeProps {
  onSelectCountry: (country: Country) => void;
}

export default function Globe({ onSelectCountry }: GlobeProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#88ccff" />
        <pointLight position={[-5, -3, -5]} intensity={0.3} color="#4466aa" />
        <GlobeAtmosphere />
        <GlobeMesh onSelectCountry={onSelectCountry} />
        <CameraController />
      </Canvas>
    </div>
  );
}
