import React from 'react';
import * as THREE from 'three'
import { useRef, useState} from 'react'
import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useSelector, useDispatch } from 'react-redux'
import {toggleNonFocusReload} from '../State_management/nonFocusSlice';


function PosterFrame(props) {
    const GOLDENRATIO = 1.61803398875
    const [hover, set_hover] = useState(false); 
    const this_mesh = useRef(); 

    const [display, set_display] = useState('')
  //    const hide = useSelector((state) => state.type.hide)
    const nonFocusVisibility = useSelector((state) =>state.nonFocus.visibility);
    const nonFocusReload = useSelector((state) => state.nonFocus.reload);




    const handle_click = () => {
 
    }

    useFrame(({ clock }) => {
      if(this_mesh != undefined){
        set_display(coords(this_mesh.current));
      }
      if(this_mesh != undefined && !nonFocusVisibility && props.id > -1){
        
        toggle_visible(this_mesh.current, false);
      }
      if(this_mesh != undefined && nonFocusVisibility && !this_mesh.current.visible){
        toggle_visible(this_mesh.current, true);
      }
      });


    
    const toggle_visible = (item, enable) =>{
      let ref_target = new THREE.Vector3;
      item.getWorldPosition(ref_target);
      if(!enable && ref_target.z <= -7 && ref_target.x <=-3){
        this_mesh.current.visible = false
      }
      if(enable && ref_target.z <= -7 && ref_target.x <=-3){
        this_mesh.current.visible = true
      }

    }


    //DEBUG HELPER TO GET OBJ WORLD POSITION  
    const coords = (item) =>{
      let ref_target = new THREE.Vector3;
      //Math.round(num * 100) / 100
      item.getWorldPosition(ref_target);
      return 'x: ' + Math.round(ref_target.x*100)/100 + ' y: ' + Math.round(ref_target.y*100)/100 + ' z: ' + Math.round(ref_target.z*100)/100
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

          <Text  anchorX="center" color='black' anchorY="top" position={[0, 1.25, 0]} fontSize={.1}> 
                {this_mesh.current != undefined ? display : null}
          </Text>
        </mesh>

      </group>
    )
}

export default PosterFrame


