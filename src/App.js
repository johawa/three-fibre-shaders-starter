import * as THREE from "three";
import { extend } from '@react-three/fiber'
import { Canvas } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import glsl from 'babel-plugin-glsl/macro';

const ColorShiftMaterial = shaderMaterial(
  { time: 0, color: new THREE.Color(0.2, 0.0, 0.1) },
  // vertex shader
  glsl`
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  glsl`
    uniform float time;
    uniform vec3 color;
    varying vec2 vUv;
    void main() {
      gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
    }
  `
)

extend({ ColorShiftMaterial });

function App() {
  return (
    <Canvas>
      <ambientLight intensity={1} color="blue" />

      <mesh>
        <boxGeometry />
        <colorShiftMaterial color="hotpink" time={2} />
      </mesh>

      <OrbitControls />
    </Canvas>
  );
}

export default App;
