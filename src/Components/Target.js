import React, {useEffect, useRef, useState} from 'react';
import PosterFrame from './PosterFrame'; 
import PosterImage from './PosterImage'; 
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'
import { useSelector, useDispatch } from 'react-redux'
import Fetch_movie from '../Utilities/Fetch_movie'
import Fetch_movie_credits from '../Utilities/Fetch_movie_credits'
import Fetch_individual_credits from '../Utilities/Fetch_individual_credits'
import Fetch_individual from '../Utilities/Fetch_individual'
import { setFocus} from '../State_management/focusSlice';
import { setNonFocus } from '../State_management/nonFocusSlice';
import {setID, switchTypeAndID} from '../State_management/typeSlice'; 



function Target() {
  const dispatch = useDispatch()

    const targetRef = useRef();
    const [active, set_active] = useState(0);
    const id = useSelector((state) => state.type.id)
    const focus = useSelector((state) => state.value)
    const type = useSelector((state) => state.type.value)
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
            set_active(Number(!active));
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
            set_active(Number(!active));
          })
          .catch((err) => console.log(err)); 
        }) 
        .catch((error) => console.log(error)); 
    
      }


    useFrame(({ clock }) => {
      // const a = clock.getElapsedTime();
       // const speed = THREE.MathUtils.damp(.8,.15,100,clock.getDelta()) * a ;
       //targetRef.current.children[0].children[0].rotation.y = a * 2;

    });
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 100, friction: 50, precision: 0.0001 },
      });
      const rotation = spring.to([0, 1], [0, Math.PI*8])
     

    const handle_click = () => {
        set_active(Number(!active));

        dispatch(setID(Math.floor(Math.random() * 1000)));
    }
  
    return(
        <a.mesh ref = {targetRef} position={[0,1,-6]} rotation-y={rotation} onClick={()=>handle_click()}>

            <PosterFrame 
            id={-1} 
            pos={[0,0,0]} 
            angle={Math.PI}
            label={-1}
            
            >
                <PosterImage   target={true}/>
            </PosterFrame>
        </a.mesh>
    );

}

export default Target
