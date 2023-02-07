import React, {useContext, useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment } from '@react-three/drei'
import PosterFrame from './PosterFrame'
import Non_target from './Non_target'
import { MovieContext } from '../Movie_context';



function PosterCollection() {
    const group_ref = useRef(); 
    const rotation_factor = 0.15; 
    const radius = 12; 
    const [locations, set_locations] = useState([])
    const {poster_count} = useContext(MovieContext)   
    const [ready, set_ready] = useState(false);

     
    useEffect(() => {
        get_positions(); 
        set_ready(true); 
    }, [])

    
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        group_ref.current.rotation.y = a*rotation_factor; 

    });

    const get_positions = () => {
        let radians = 2*Math.PI / poster_count; 
        let temp_locations = [];
        for(let i = 0; i < poster_count; i++){
            let rotation = i * radians; //THIS IS HOW MUCH THE POSTER NEEDS TO BE ROTATED TO FACE THE CENTER
            //let x = radius * Math.sin(Math.PI * 2 * angle / 360);
            //let y = radius * Math.cos(Math.PI * 2 * angle / 360);
            let x = radius * Math.sin(rotation);
            let z = radius * Math.cos(rotation);
            temp_locations.push({position:[x,1,z], angle:rotation})
        }
        set_locations(temp_locations);
    }


    const get_posters = (item,index) => {
        return(
            <PosterFrame url={item.path} pos={locations[index].position} angle={locations[index].angle}/>
        )
    }



    
      

    return (
        <group ref={group_ref} position={[0,0,0]}>
            {ready ? Non_target().map(get_posters) : null}
         
        </group>
    )
}

export default PosterCollection