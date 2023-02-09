import './App.css';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_movie_credits from './Utilities/Fetch_movie_credits';
import Fetch_individual from './Utilities/Fetch_individual'; 
import Fetch_individual_credits from './Utilities/Fetch_individual_credits';
import json_sort from './Utilities/json_sort';
import { MovieContext } from './Movie_context';
import { Canvas } from '@react-three/fiber'
import PosterCollection from './Components/PosterCollection';
import { useCursor, MeshReflectorMaterial, Plane, Text, Environment, OrbitControls } from '@react-three/drei'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, set } from './State_management/focusSlice'

function App() {
  //FOCUS TYPE -> MOVIE OR PERSON
  const [focus_type, set_focus_type] = useState(true); //TRUE = MOVIE  FALSE = PERSON
  const [focus, set_focus] = useState(null); 
  const [non_focus, set_non_focus] = useState(null); 
  const [focus_id, set_focus_id] = useState(Number(105)); 
  const [loaded, set_loaded] = useState(false); 
  const [poster_count, set_poster_count] = useState(Number(12)); 

  const count = useSelector((state) => state.focus.value)
  const dispatch = useDispatch()


  //LOAD THE MOVIE primary AND THE CREDIT LIST -> DEPENDENCY IS IF MOVIE_ID STATE CHANGES
  useEffect(() => {
    set_focus(null);
    set_non_focus(null); 
    if(focus_type){
      get_data_movie_focus(); 
    }
    else{
      get_data_person_focus();
    }
  }, [focus_id]);



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


  const show_posters = () =>{
    if(loaded){


      return(           
        <MovieContext.Provider value={{poster_count, set_loaded, focus, set_focus, non_focus, set_non_focus, focus_type, set_focus_type, focus_id, set_focus_id}}>
          <PosterCollection />
        </MovieContext.Provider>)
    }
    else{
      return <></>
    }


  }




  return (
      <div className="App">
     
        <Canvas dpr={[1, 1.5]} camera={{ fov: 65, position: [0, 2, -10] }}>
          <OrbitControls />
          <ambientLight />
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#191920', 0, 15]} />
          <group position={[0, 0.5, 0]}>
            <MovieContext.Provider value={{poster_count, set_loaded, focus, set_focus, non_focus, set_non_focus, focus_type, set_focus_type, focus_id, set_focus_id}}>
              <PosterCollection />
            </MovieContext.Provider>
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


      <button onClick={()=>set_focus_id(focus_id -10)}>Prev</button>
      <button onClick={()=>set_focus_id(focus_id +10)}>Next</button>
      <button onClick={()=>dispatch(increment())}> Try Redux</button>
      <button onClick={()=>dispatch(set(3))}> set to 3</button>
      
      {count}
      </div>
  );
}

export default App;
