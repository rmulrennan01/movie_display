import React, { useRef, useState} from 'react'

import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import Non_target from './Non_target'
import Target from './Target'; 
import { useSpring, a } from '@react-spring/three'


function PosterCollection() {
    const [active, set_active] = useState(0);
    const group_ref = useRef(); 
    const rotation_factor = 0.15; 
    //const { scale } = useSpring({ scale: active ? 1.5 : 1 })
    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001,clamp:false },
        
     
      });
      const rotation = spring.to([0, 1], [0, Math.PI*20])


    
    useFrame(({ clock }) => {
      //  const a = clock.getElapsedTime();
        //const speed = THREE.MathUtils.damp(.8,.15,100,clock.getDelta()) * a ;
        //group_ref.current.rotation.y = a * .15;
    
        //console.log(THREE.MathUtils.lerp(1, 2, a))
        //console.log(THREE.MathUtils.damp(10,.15,500,clock.getDelta()));
    });

    return (
        
        <>
            <Target />
            <a.group position={[0,0,-6]} rotation-y={rotation} onClick={()=>set_active(Number(!active))}>
                <Non_target />
            </a.group>
        </>
        
    )
}

export default PosterCollection