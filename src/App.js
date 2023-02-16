import './App.css';
import React, {useRef} from 'react';
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial, Plane, Text, Environment, OrbitControls, SpotLight } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import PosterCollection from './Components/PosterCollection';
import RandomLight from './Components/RandomLight'

import store from './State_management/store'
import { Provider } from 'react-redux'

function App() {
  const target = new THREE.Object3D()


  return (
      <div className="App">


     
        <Canvas dpr={[1, 1.5]} camera={{ fov: 65, position: [0, 2, -10] }}>
          <OrbitControls />
          {/*<ambientLight /> */}
          {/*<pointLight position={[0, 4, 0]} intensity={4}/> */}
          <RandomLight target={target} />
          <primitive object={target} position={[0, 0, -6]} />
          <color attach="background" args={['#000000']} />
          <fog attach="fog" args={['#191920', 0, 15]} />
          <group position={[0, 0.5, 0]}>
          <Provider store={store}>

            <PosterCollection />
          </Provider>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial
                blur={[0, 0]}
                resolution={2048}
                mixBlur={1}
                mixStrength={50}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
              />
            </mesh>
          </group>
          <Environment preset="city" />
        </Canvas>

        <h3> React Three Fiber with TMDB API </h3>
        <div>
          Click the film poster to load a random film along with its cast!
        </div>
        <h3> Credits</h3>
        <div>
          This demo uses the TMDB API but is not endorsed or certified by TMDB.
        </div>


      </div>
  );
}

export default App;
