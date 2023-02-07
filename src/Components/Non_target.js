import React, {useContext} from 'react'
import Movie from './Movie.js'; 
import Portrait from './Portrait.js'; 
import {MovieContext} from '../Movie_context.js'; 
import PosterFrame from './PosterFrame'; 
import PosterCollection from './PosterCollection'; 

function Non_target() {

    const {focus_type, poster_count} = useContext(MovieContext)   

    //CASE WEHRE FOCUS IS A PERSON -> THEN ALL BACKDROP IMAGES SHOULD BE MOVIE POSTERS
    if(!focus_type){
        let result = [];
        for(let i = 0; i < poster_count; i++){
            result.push(Movie(i)); 
        }
        return result; 

    }
    //CASE WHERE FOCUS IS A MOVIE -> THEN ALL BACKDROP IMAGES SHOULD BE PORTRAITS
    else{
        let result = []
        for(let i = 0; i < poster_count; i++){
            result.push(Portrait(i)); 
        }
        return result
            

        
    }
}

export default Non_target
