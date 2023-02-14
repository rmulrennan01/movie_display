import React, { useRef, useState, useEffect} from 'react'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import Non_target from './Non_target'
import Target from './Target'; 
import { useSelector, useDispatch } from 'react-redux'
import { MathUtils } from 'three';
import {toggleNonFocusReload} from '../State_management/nonFocusSlice';

function PosterCollection() {
    const [active, set_active] = useState(false);
    const group_ref = useRef(); 
    const [movement, set_movement] = useState(false);
    const nonFocus = useSelector((state)=>state.nonFocus.value);
    const id = useSelector((state) => state.type.id)
    const nonFocusReload = useSelector((state) =>state.nonFocus.reload);
    const focusReload = useSelector((state) =>state.focus.reload);
    const dispatch = useDispatch();

    useEffect(() => {
        set_active(Number(!active))
    }, [id])

    const [time, set_time] =  useState(null); 
   
    
    useFrame(({ clock }) => {
        //INITIATE BASE TIME
        if(time == null){
            set_time(clock.getElapsedTime()); 
        }
        const elapsedTime = clock.getElapsedTime();
        const diff = elapsedTime - time
        const speed = 0.5 * elapsedTime;
        if(nonFocusReload){
            set_time(clock.getElapsedTime());
            dispatch(toggleNonFocusReload());
        }

        const boost_dampen = MathUtils.damp(1,5,2, diff); 
        group_ref.current.rotation.y = speed + boost_dampen;
        if(nonFocusReload <= Math.PI){
            //dispatch(toggleNonFocusReload());
        }
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