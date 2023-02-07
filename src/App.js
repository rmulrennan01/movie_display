import './App.css';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_movie_credits from './Utilities/Fetch_movie_credits';
import Fetch_individual from './Utilities/Fetch_individual'; 
import Fetch_individual_credits from './Utilities/Fetch_individual_credits';
import json_sort from './Utilities/json_sort';
import { MovieContext } from './Movie_context';
import Target from './Components/Target'; 
import Non_target from './Components/Non_target';
import { Canvas } from '@react-three/fiber'
import PosterFrame from './Components/PosterFrame'
import PosterCollection from './Components/PosterCollection';
import { useCursor, MeshReflectorMaterial, Plane, Text, Environment } from '@react-three/drei'

function App() {
  //FOCUS TYPE -> MOVIE OR PERSON
  const [focus_type, set_focus_type] = useState(true); //TRUE = MOVIE  FALSE = PERSON
  const [focus, set_focus] = useState({}); 
  const [non_focus, set_non_focus] = useState([]); 
  const [focus_id, set_focus_id] = useState(Number(100)); 
  const [loaded, set_loaded] = useState(false); 


  //LOAD THE MOVIE primary AND THE CREDIT LIST -> DEPENDENCY IS IF MOVIE_ID STATE CHANGES
  useEffect(() => {
    if(focus_type){
      get_data_movie_focus(); 
    }
    else{
      get_data_person_focus();
    }
  }, [focus_type, focus_id]);

  const get_data_movie_focus = () => {
    Fetch_movie(focus_id)
    .then((result) => {
      set_focus(result); 
      Fetch_movie_credits(focus_id)
      .then((creds) =>{
        set_non_focus(json_sort(creds,'popularity')); 
        set_loaded(true); 
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 

  }

  const get_data_person_focus = () =>{
    Fetch_individual(focus_id)
    .then((result) => {
      set_focus(result); 
      Fetch_individual_credits(focus_id)
      .then((movies) =>{
        set_non_focus(json_sort(movies,'popularity')); 
        set_loaded(true); 
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 

  }







  return (
    <MovieContext.Provider value={{set_loaded, focus, set_focus, non_focus, set_non_focus, focus_type, set_focus_type, focus_id, set_focus_id}}>
      <div className="App">
     
    {/*
        {loaded ? <Target /> : null }
        <br></br>
        {loaded ? <Non_target /> : null }
    */}
      <Canvas dpr={[1, 1.5]} camera={{ fov: 70, position: [0, 2, 15] }}>
          <ambientLight />
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#191920', 0, 15]} />
          <group position={[0, 0.5, 0]}>
            <PosterCollection />

            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
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
    </MovieContext.Provider>
  );
}

export default App;
