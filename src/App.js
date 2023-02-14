import './App.css';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_movie_credits from './Utilities/Fetch_movie_credits';
import Fetch_individual from './Utilities/Fetch_individual'; 
import Fetch_individual_credits from './Utilities/Fetch_individual_credits';
import { Canvas } from '@react-three/fiber'
import PosterCollection from './Components/PosterCollection';
import { MeshReflectorMaterial, Plane, Text, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'
import { setFocus} from './State_management/focusSlice';
import { setNonFocus } from './State_management/nonFocusSlice';
import {setID, switchTypeAndID} from './State_management/typeSlice'; 
import store from './State_management/store'
import { Provider } from 'react-redux'

function App() {
  //FOCUS TYPE -> MOVIE OR PERSON

 // const type = useSelector((state) => state.type.value)
  //const id = useSelector((state) => state.type.id)
  //const dispatch = useDispatch()




  return (
      <div className="App">
     
        <Canvas dpr={[1, 1.5]} camera={{ fov: 65, position: [0, 2, -10] }}>
          <ambientLight />
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#191920', 0, 15]} />
          <group position={[0, 0.5, 0]}>
          <Provider store={store}>

            <PosterCollection />
          </Provider>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[100, 100]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
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


      </div>
  );
}

export default App;
