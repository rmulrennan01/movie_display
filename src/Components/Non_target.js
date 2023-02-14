import React, {useContext, useEffect, useState, useRef} from 'react'
import PosterImage from './PosterImage'; 
import PosterFrame from './PosterFrame'; 
import { useSelector, useDispatch } from 'react-redux'
import {toggleNonFocusVisibility, toggleNonFocusReload} from '../State_management/nonFocusSlice'

//GENERATES ALL THE NON-TARGET POSTERS THAT WILL CIRCLE THE TARGET POSTER
function Non_target() {
    const [ready, set_ready] = useState(false);
    const [locations, set_locations] = useState();
    const radius = 4; 
    const poster_count = 12;
    const poster_ref = useRef([])
    const dispatch = useDispatch()


    useEffect(() => {        
        get_positions();
    }, [])


    //CREATES THE POSITION DATA FOR EACH POSTER AND THE Y-ROTATION TO MAKE IT FACE CENTER
    //THESE GET PLACED INSIDE A MESH FOR ROTATION
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

  





    const build_posters = (item, index) => {

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
            {ready ? this_array.map(build_posters) : null}
            <mesh position={[0,3,0]} onClick={()=>dispatch(toggleNonFocusVisibility())}>
                <boxGeometry args={[1,1,1]} />
            </mesh>

        </>
    )
}

export default Non_target

