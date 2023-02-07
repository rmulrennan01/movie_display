import React, {useContext, useEffect, useState} from 'react'
import Movie from './Movie.js'; 
import Portrait from './Portrait.js'; 
import {MovieContext} from '../Movie_context.js'; 
import PosterFrame from './PosterFrame'; 

function Non_target() {

    const {focus, non_focus, poster_count, focus_type} = useContext(MovieContext)   

    const [poster_data, set_poster_data] = useState(); 
    const [ready, set_ready] = useState(false);
    const [locations, set_locations] = useState();
    const radius = 4; 

    useEffect(() => {        
        get_positions();
        build_poster_data(); 
    }, [])


    const build_poster_data = () =>{
        let result = [];
        //CASE WEHRE FOCUS IS A PERSON -> THEN ALL BACKDROP IMAGES SHOULD BE MOVIE POSTERS
        if(!focus_type){
            
            for(let i = 0; i < poster_count; i++){
                result.push(Movie(i, focus, non_focus, focus_type)); 
            }
        }
        //CASE WHERE FOCUS IS A MOVIE -> THEN ALL BACKDROP IMAGES SHOULD BE PORTRAITS
        else{
            
            for(let i = 0; i < poster_count; i++){
                result.push(Portrait(i, focus, non_focus, focus_type)); 
            }
        }
        set_poster_data(result); 
        set_ready(true);
    }


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
    }


    const get_posters = (item,index) => {
        return(
            <PosterFrame url={item.path} pos={locations[index].position} angle={locations[index].angle} name={item.name}/>
        )
    }

    return(
        <>
        {ready ? poster_data.map(get_posters) : null}
        </>
    )
}

export default Non_target
