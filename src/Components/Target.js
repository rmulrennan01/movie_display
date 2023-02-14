import React, {useEffect, useRef, useState} from 'react';
import PosterFrame from './PosterFrame'; 
import PosterImage from './PosterImage'; 
import { useFrame } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux'
import Fetch_movie from '../Utilities/Fetch_movie'
import Fetch_movie_credits from '../Utilities/Fetch_movie_credits'
import Fetch_individual_credits from '../Utilities/Fetch_individual_credits'
import Fetch_individual from '../Utilities/Fetch_individual'
import { setFocus} from '../State_management/focusSlice';
import { setNonFocus } from '../State_management/nonFocusSlice';
import {setID, switchTypeAndID} from '../State_management/typeSlice'; 

import * as THREE from 'three'


function Target() {
  const dispatch = useDispatch()

    const targetRef = useRef();
    const [active, set_active] = useState(false);
    const id = useSelector((state) => state.type.id)
    const focus = useSelector((state) => state.value)
    const type = useSelector((state) => state.type.value)
    const [time, set_time] = useState();
    useEffect(() => {
        
        if(type === 'movie'){
            get_data_movie_focus(); 
        }
        else{
            get_data_person_focus();
        }
    }, [id, focus]);


    const get_data_movie_focus = () => {
        Fetch_movie(id)
        .then((result) => {
          dispatch(setFocus(result));
          Fetch_movie_credits(id)
          .then((creds) =>{
            dispatch(setNonFocus(creds));
            set_active(true);
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
            set_active(Number(true));
          })
          .catch((err) => console.log(err)); 
        }) 
        .catch((error) => console.log(error)); 
    
      }


    useFrame(({ clock }) => {
   
      if(time == null){
        set_time(clock.getElapsedTime()); 
      }

      const current_time = clock.getElapsedTime();
      const diff = current_time - time
      if(active){
          set_time(clock.getElapsedTime());
          set_active(false);
      }
      const boost_damp = THREE.MathUtils.damp(Math.PI*4,Math.PI*8,2, diff); 
      targetRef.current.rotation.y = boost_damp;

    });


 
    const handle_click = () => {
        set_active(true)
        dispatch(setID(Math.floor(Math.random() * 1000)));
    }
  
    return(
        <mesh ref = {targetRef} position={[0,1,-6]} onClick={()=>handle_click()}>
            <PosterFrame 
            id={-1} 
            pos={[0,0,0]} 
            angle={Math.PI}
            label={-1}
            >
                <PosterImage   target={true}/>
            </PosterFrame>
        </mesh>
    );

}

export default Target
