import React, { useRef, useState} from 'react'
import { useFrame } from '@react-three/fiber'
import Non_target from './Non_target'
import Target from './Target'; 
import { useSelector, useDispatch } from 'react-redux'
import { MathUtils } from 'three';
import {toggleNonFocusReload} from '../State_management/nonFocusSlice';


//COMPONENT THAT CONSISTS OF BOTH THE TARGET AND NON-TARGET POSTERS TO BE PLACED IN THE CANVAS
function PosterCollection() {
    const group_ref = useRef(); 
    const nonFocusReload = useSelector((state) =>state.nonFocus.reload);
    const dispatch = useDispatch();
    const [time, set_time] =  useState(null); 


    
    //HANDLES ANIMATION
    useFrame(({ clock }) => {
        //SAVE BASE TIME ELAPSED
        if(time == null){
            set_time(clock.getElapsedTime()); 
        }
        const elapsedTime = clock.getElapsedTime();
        const diff = elapsedTime - time; //CALCULATES THE DELTA BETWEEN THE CURRENT TIME ELAPSED AND THE TIME ELAPSED STATE
        const speed = 0.5 * elapsedTime;
        if(nonFocusReload){
            //BY RESETTING THE TIME STATE, THE CALULATED TIME ELAPSED ON FUTURE FRAMES WILL BE REFRESHED, SO THE DAMPEN EFFECT IS APPLIED AGAIN.
            set_time(clock.getElapsedTime()); 
            dispatch(toggleNonFocusReload());
        }
        const boost_dampen = MathUtils.damp(Math.PI,Math.PI*10,2, diff); 
        group_ref.current.rotation.y = speed + boost_dampen; //APPLY ROTATION ANIMATION

    });

 
    return (
        <>
            <Target />
            <group ref={group_ref} position={[0,0,-6]}  >
                <Non_target />
            </group>
        </>
        
    )
}

export default PosterCollection