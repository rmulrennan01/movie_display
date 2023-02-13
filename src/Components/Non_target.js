import React, {useContext, useEffect, useState, useRef} from 'react'
import PosterImage from './PosterImage'; 
import PosterFrame from './PosterFrame'; 
import { useFrame } from '@react-three/fiber'
import {useThree} from '@react-three/fiber'
import * as THREE from 'three'


function Non_target() {

    //const {poster_count} = useContext(MovieContext)   

    const [ready, set_ready] = useState(false);
    const [locations, set_locations] = useState();
    const radius = 4; 
    const poster_count = 12;
    const poster_ref = useRef([])
    const [hidden, set_hidden] = useState([]);
    const [disappear, set_disappear] = useState(false);
    const state = useThree();
    const camera = useThree((state)=>state.camera);
    const frustum = new THREE.Frustum();
//    frustum.setFromMatrix( camera.projectionMatrix );

    const target = new THREE.Vector3(0,0,-6);


    useEffect(() => {        
        get_positions();
    }, [])

    useFrame(({ clock }) => {
        //console.log(poster_ref.current[0].rotation);
        //console.log(state);
        if(disappear && poster_ref.current != undefined){
            poster_ref.current.map(set_visibility);

        }
     

    });

    //CREATES THE POSITION DATA FOR EACH POSTER AND THE Y-ROTATION TO MAKE IT FACE CENTER
    const get_positions = () => {
        let radians = 2*Math.PI / poster_count; 
        let temp_locations = [];
        for(let i = 0; i < poster_count; i++){
            let rotation = i * radians; //THIS IS HOW MUCH THE POSTER NEEDS TO BE ROTATED TO FACE THE CENTER
            let x = radius * Math.sin(rotation);
            let z = radius * Math.cos(rotation);
            temp_locations.push({position:[x,1,z], angle:rotation+Math.PI})
        }
        set_locations(temp_locations);
        set_ready(true);
    }

    const set_visibility = (item) =>{
        let ref_target = new THREE.Vector3;
        let child = item.children[0].children[0];
        child.getWorldPosition(ref_target);
        if(check_visible(ref_target)){
            console.log('inside map', item);
            item.visible = false; 
        }
    }


    const info = () =>{
        if(poster_ref.current[0] != undefined){
             let ref_target = new THREE.Vector3;
            let pos =  poster_ref.current[0].children[0].children[0];
            pos.getWorldPosition(ref_target)
            console.log(ref_target);
            check_visible(ref_target);
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

    const check_visible_2 = (position) =>{
        if(position.z < -1){
            return true
        }
        else{
            return false
        }
    }


 
    const build_posters = (item, index) => {
        if(hidden.includes(index)){
            return <></>
        }
        return(
            <mesh ref={el => poster_ref.current[index] = el} >
            <PosterFrame 
            id={index} 
            pos={locations[index].position} 
            angle={locations[index].angle}
            key={index+'nonFocus'}
            >
                <PosterImage   target={false} index={index}/>
            </PosterFrame>
            </mesh>
        );
    }


    const this_array = new Array(poster_count).fill(0)
    return(
        <>
            {console.log(camera)}
            {ready ? this_array.map(build_posters) : null}
            <mesh position={[0,3,0]} onClick={()=>set_disappear(!disappear)}>
                <boxGeometry args={[1,1,1]} />
            </mesh>

        </>
    )
}

export default Non_target

