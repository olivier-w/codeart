import { useMemo, useEffect } from 'react';
import { Canvas as R3FCanvas, useThree } from '@react-three/fiber';
import { OrbitControls, Line, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { useStore } from '../../hooks/useStore';
import { generateScene, type Block, type GridLine, type GridDot } from '../../engine/isometric';

interface BlockMeshProps extends Block {
  shadingStyle: 'standard' | 'isometric';
}

function BlockMesh({ x, y, z, height, width, depth, color, shadingStyle }: BlockMeshProps) {
  const materials = useMemo(() => {
    if (shadingStyle === 'isometric') {
      // Face order: +X, -X, +Y, -Y, +Z, -Z
      // For isometric view from top-right-front:
      // +Y (top) = lightest, +X (right) = medium grey, +Z (front) = darkest
      const topColor = '#ffffff';      // White top
      const rightColor = '#888888';    // Grey right side
      const frontColor = '#222222';    // Dark front side
      const hiddenColor = '#000000';   // Black for non-visible faces

      return [
        new THREE.MeshBasicMaterial({ color: rightColor }),   // +X right
        new THREE.MeshBasicMaterial({ color: hiddenColor }),  // -X left (hidden)
        new THREE.MeshBasicMaterial({ color: topColor }),     // +Y top
        new THREE.MeshBasicMaterial({ color: hiddenColor }),  // -Y bottom (hidden)
        new THREE.MeshBasicMaterial({ color: frontColor }),   // +Z front
        new THREE.MeshBasicMaterial({ color: hiddenColor }),  // -Z back (hidden)
      ];
    }
    return undefined;
  }, [shadingStyle]);

  if (shadingStyle === 'isometric') {
    return (
      <mesh position={[x, y, z]} material={materials}>
        <boxGeometry args={[width, height, depth]} />
        <Edges color="#ffffff" threshold={15} />
      </mesh>
    );
  }

  return (
    <mesh position={[x, y, z]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={color} />
      <Edges color={color} threshold={15} />
    </mesh>
  );
}

function GridLineMesh({ start, end, color }: GridLine) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1}
    />
  );
}

function DotMesh({ position, color, size }: GridDot) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

function SceneElements() {
  const params = useStore((state) => state.params);
  const scene = useMemo(() => generateScene(params), [params]);
  const shadingStyle = params.colors.shadingStyle;

  return (
    <group>
      {scene.blocks.map((block, i) => (
        <BlockMesh key={`block-${i}`} {...block} shadingStyle={shadingStyle} />
      ))}
      {scene.gridLines.map((line, i) => (
        <GridLineMesh key={`line-${i}`} {...line} />
      ))}
      {scene.dots.map((dot, i) => (
        <DotMesh key={`dot-${i}`} {...dot} />
      ))}
    </group>
  );
}

function IsometricCamera() {
  const { camera } = useThree();
  const params = useStore((state) => state.params);

  useEffect(() => {
    const size = Math.max(params.grid.rows, params.grid.cols) * (params.blocks.width + params.grid.spacing);
    const distance = size * 2;

    camera.position.set(distance, distance, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, params.grid.rows, params.grid.cols, params.blocks.width, params.grid.spacing]);

  return null;
}

function Scene() {
  return (
    <>
      <IsometricCamera />
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 100, 50]} intensity={1} />
      <directionalLight position={[-50, 50, -50]} intensity={0.4} />
      <SceneElements />
    </>
  );
}

export function Canvas() {
  const backgroundColor = useStore((state) => state.params.colors.background);

  return (
    <div className="flex-1 min-w-0 h-full overflow-hidden">
      <R3FCanvas
        orthographic
        camera={{ zoom: 20, position: [50, 50, 50], near: 0.1, far: 1000 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        style={{ background: backgroundColor }}
      >
        <Scene />
      </R3FCanvas>
    </div>
  );
}
