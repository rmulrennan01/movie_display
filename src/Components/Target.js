import React, {useContext} from 'react';
import Movie from './Movie.js'; 
import Portait from './Portrait.js'; 
import {MovieContext} from '../Movie_context.js'; 


//THIS IS THE PRIMARY FOCUSED ITEM

function Target() {
    const {focus_type} = useContext(MovieContext)   

    //CASE WHERE FOCUS IS A MOVIE
    if(focus_type){
        return (
            <Movie index={0}/>
        )

    }
    //CASE WHERE FOCUS IS A PERSON
    else{
        return (
            <Portait index={0}/>
        )
    }

}

export default Target
