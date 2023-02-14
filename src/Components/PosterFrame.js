import React from 'react';
import * as THREE from 'three'
import { useRef, useState} from 'react'
import { Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import {setID, switchTypeAndID, switchHide} from '../State_management/typeSlice'; 
import { useSelector, useDispatch } from 'react-redux'



function PosterFrame(props) {
    const GOLDENRATIO = 1.61803398875
    const [hover, set_hover] = useState(false); 
    const this_mesh = useRef(); 
    const state = useThree();
    const camera = useThree((state)=>state.camera);
    const [display, set_display] = useState('')
    const hide = useSelector((state) => state.type.hide)



    const handle_click = () => {
      //if(props.id != null){
       // set_focus_id(props.id); 
      //  set_focus_type(!focus_type);
      //}
    }

    useFrame(({ clock }) => {
      //console.log(poster_ref.current[0].rotation);
      //console.log(state);
      if(this_mesh != undefined && hide && props.id > -1){
        
        visible(this_mesh.current);
      }
      console.log('hide', hide); 
    

      });
/*
      const set_visibility = (item) =>{
        
        let ref_target = new THREE.Vector3;
        
        item.getWorldPosition(ref_target);
        if(check_visible(ref_target)){
            //console.log('inside map', item);
            //item.visible = false;
            return 'visible' 
        }
        else{
          return 'non visible'; 
        }
    }
    
    
    const check_visible = (position) =>{
      if(frustum.containsPoint(position)){
         return true; 
      }
      else{
          return false;
      }

    }
    */

    const visible = (item) => {
      camera.updateMatrix();
      camera.updateMatrixWorld();
      let ref_target = new THREE.Vector3;
        
      item.getWorldPosition(ref_target);

      const frustum2 = new THREE.Frustum()
      const matrix = new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      frustum2.setFromProjectionMatrix(matrix)
      if (!frustum2.containsPoint(ref_target)) {
          return this_mesh.current.visible = false; 

      }
  

    }

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


