import React from 'react';
import * as THREE from 'three'
import { useRef, useState} from 'react'
import { Text } from '@react-three/drei'


function PosterFrame(props) {
    const GOLDENRATIO = 1.61803398875
    const [hover, set_hover] = useState(false); 
    const this_mesh = useRef(); 


    const handle_click = () => {
      //if(props.id != null){
       // set_focus_id(props.id); 
      //  set_focus_type(!focus_type);
      //}
    }

    
    return (
        <group >
        <mesh 
          ref={this_mesh}
          name={'example'}
          onPointerOver={() => set_hover(true)}
          onPointerOut={() => set_hover(false)}
          onClick = {() => handle_click()}
          scale={[1, GOLDENRATIO, 0.05]}
          position={props.pos}
          rotation={[0,props.angle, 0]}>
          <boxGeometry args={[1.2,1.2,1.1]} offset={[1,0,0]}/>
          <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
          <mesh raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
              

            <boxGeometry args={[1.2,1.2,1.1]} />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          {props.children}
        </mesh>

      </group>
    )
}

export default PosterFrame


