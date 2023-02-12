import React, { useRef, useState, useEffect} from 'react'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import Non_target from './Non_target'
import Target from './Target'; 
import { useSpring, a } from '@react-spring/three'
import { useSelector, useDispatch } from 'react-redux'
import { MathUtils } from 'three';


function PosterCollection() {
    const [active, set_active] = useState(false);
    const group_ref = useRef(); 
    const [movement, set_movement] = useState(false);
    const nonFocus = useSelector((state)=>state.nonFocus.value);
    const id = useSelector((state) => state.type.id)


    useEffect(() => {
        set_active(Number(!active))
    }, [id])

    //const { scale } = useSpring({ scale: active ? 1.5 : 1 })
    const {spring}  = useSpring({
        spring: active,
        config: { mass: 5, tension: 50, friction: 20, precision: 0.0001,clamp:true, loop:false},
        onRest: ()=>set_movement(true)
     
      });
    const rotation = spring.to([0, 1], [0, Math.PI*20]);


    const [time, set_time] =  useState(null); 
   
    
    useFrame(({ clock }) => {
        if(time == null){
            set_time(clock.getElapsedTime()); 
        }
     
        const b = clock.getElapsedTime();
        const diff = b - time
        const speed = 0.5 * b;
        if(active){
            set_time(clock.getElapsedTime());
            set_active(false);
        }
        //const vel = MathUtils.lerp(0.15, 8, Math.sqrt(b)); 
        const vel2 = MathUtils.damp(1,200,2, diff); 

    

        group_ref.current.rotation.y = speed +vel2;
        //group_ref.current.rotation.y += a*Math.PI; 
        console.log('vel2', vel2, 'speed', speed); 

   
    

    });

    //            <a.group ref={group_ref} position={[0,0,-6]} rotation-y={rotation} onClick={()=>set_active(Number(!active))}>


    return (
        
        <>
            <Target />
            <a.group ref={group_ref} position={[0,0,-6]}  onClick={()=>set_active(true)}>
                <Non_target />
            </a.group>
        </>
        
    )
}

export default PosterCollection