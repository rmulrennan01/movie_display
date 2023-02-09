import React from 'react';
import * as THREE from 'three'
import { useRef, useState} from 'react'
import { Text } from '@react-three/drei'
import PosterLabel from './PosterLabel'; 


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
        onPointerOver={() => (set_hover(true))}
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
        {/*props.url == null ? 
          null 
          :
            <Image raycast={() => null} position={[0, 0, 0.7]} url={props.url}/>
        */}
        {props.children}
        <Text  anchorX="center" color='black' anchorY="top" position={[0, .75, 0]} fontSize={.1}>
          {PosterLabel(props.label)}
        </Text>
      </mesh>

      </group>
    )
}

export default PosterFrame


