import React, {useRef, useState} from 'react';
import PosterFrame from './PosterFrame'; 
import PosterImage from './PosterImage'; 
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'


//THIS DETERMINES WHAT THE CENTER FOCUSED POSTER IS AND THEN GENERATES A 3D POSTER OBJECT


function Target() {
    const targetRef = useRef();
    const [active, set_active] = useState(0)

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
     

  
    return(
        <a.mesh ref = {targetRef} position={[0,1,-6]} rotation-y={rotation} onClick={()=>set_active(Number(!active))}>
            {console.log(targetRef.current)}
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
