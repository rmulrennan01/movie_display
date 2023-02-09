import './App.css';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_movie_credits from './Utilities/Fetch_movie_credits';
import Fetch_individual from './Utilities/Fetch_individual'; 
import Fetch_individual_credits from './Utilities/Fetch_individual_credits';
import { Canvas } from '@react-three/fiber'
import PosterCollection from './Components/PosterCollection';
import { MeshReflectorMaterial, Plane, Text, Environment, OrbitControls } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'
import { setFocus} from './State_management/focusSlice';
import { setNonFocus } from './State_management/nonFocusSlice';
import {setID, switchTypeAndID} from './State_management/typeSlice'; 

function App() {
  //FOCUS TYPE -> MOVIE OR PERSON

  const type = useSelector((state) => state.type.value)
  const id = useSelector((state) => state.type.id)
  const dispatch = useDispatch()


  

  //LOAD THE MOVIE primary AND THE CREDIT LIST -> DEPENDENCY IS IF MOVIE_ID STATE CHANGES
  useEffect(() => {
   
    if(type == 'movie'){
      get_data_movie_focus(); 
    }
    else{
      get_data_person_focus();
    }
  }, [id, type ]);



  const get_data_movie_focus = () => {
    Fetch_movie(id)
    .then((result) => {
      dispatch(setFocus(result));
      Fetch_movie_credits(id)
      .then((creds) =>{
        dispatch(setNonFocus(creds));
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 

  }

  const get_data_person_focus = () =>{
    Fetch_individual(id)
    .then((result) => {
      dispatch(setFocus(result));
      Fetch_individual_credits(id)
      .then((movies) =>{
        dispatch(setNonFocus(movies)); 
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 

  }



  return (
      <div className="App">
     
        <Canvas dpr={[1, 1.5]} camera={{ fov: 65, position: [0, 2, -10] }}>
          <OrbitControls />
          <ambientLight />
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#191920', 0, 15]} />
          <group position={[0, 0.5, 0]}>
          <PosterCollection />
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


      <button onClick={()=>dispatch(setID(id-1))}>Prev</button>
      <button onClick={()=>dispatch(setID(id+1))}>Next</button>

      </div>
  );
}

export default App;
