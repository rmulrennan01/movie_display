import React, {useContext, useEffect, useState} from 'react'
import PosterImage from './PosterImage'; 
import PosterFrame from './PosterFrame'; 

function Non_target() {

    //const {poster_count} = useContext(MovieContext)   

    const [ready, set_ready] = useState(false);
    const [locations, set_locations] = useState();
    const radius = 4; 
    const poster_count = 8;

    useEffect(() => {        
        get_positions();
    }, [])


    //CREATES THE POSITION DATA FOR EACH POSTER AND THE Y-ROTATION TO MAKE IT FACE CENTER
    const get_positions = () => {
        let radians = 2*Math.PI / poster_count; 
        let temp_locations = [];
        for(let i = 0; i < poster_count; i++){
            let rotation = i * radians; //THIS IS HOW MUCH THE POSTER NEEDS TO BE ROTATED TO FACE THE CENTER
            //let x = radius * Math.sin(Math.PI * 2 * angle / 360);
            //let y = radius * Math.cos(Math.PI * 2 * angle / 360);
            let x = radius * Math.sin(rotation);
            let z = radius * Math.cos(rotation);
            temp_locations.push({position:[x,1,z], angle:rotation+Math.PI})
        }
        set_locations(temp_locations);
        set_ready(true);
    }


 
    const build_posters = (item, index) => {
        return(
            <PosterFrame 
            url={null} 
            name = {null} 
            id={null} 
            pos={locations[index].position} 
            angle={locations[index].angle}
            >
                <PosterImage   target={false} index={index}/>
            </PosterFrame>
        );
    }


    const this_array = new Array(poster_count).fill(0)
    return(
        <>
            {ready ? this_array.map(build_posters) : null}
        </>
    )
}

export default Non_target

