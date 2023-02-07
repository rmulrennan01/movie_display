import React, {useContext, useEffect, useState} from 'react';
import Movie from './Movie.js'; 
import Portait from './Portrait.js'; 
import {MovieContext} from '../Movie_context.js'; 
import Portrait from './Portrait.js';
import PosterFrame from './PosterFrame'; 


//THIS IS THE PRIMARY FOCUSED ITEM

function Target() {
    const {focus, non_focus, focus_type} = useContext(MovieContext)   
    const [poster_data, set_poster_data] = useState();
    const [ready, set_ready] = useState(false); 


    useEffect(() => {
        get_poster_data(); 
        set_ready(true); 
    }, [])

    const get_poster_data = () => {
        let temp_poster_data = {};
        //CASE WHERE FOCUS IS A MOVIE
        if(focus_type){
            temp_poster_data = Movie(0, focus, non_focus, focus_type); 

        }
        //CASE WHERE FOCUS IS A PERSON
        else{
            temp_poster_data = Portrait(0, focus, non_focus, focus_type);
        }
        set_poster_data(temp_poster_data);
    }


    return(
        <>
            {ready ? <PosterFrame url={poster_data.path} pos={[0,1,0]} angle={0}/> : null }
        </>
    )

}

export default Target
