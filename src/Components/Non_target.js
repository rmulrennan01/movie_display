import React, {useContext} from 'react'
import Movie from './Movie.js'; 
import Portait from './Portrait.js'; 
import {MovieContext} from '../Movie_context.js'; 

function Non_target() {

    const {focus_type} = useContext(MovieContext)   

    //CASE WEHRE FOCUS IS A PERSON -> THEN ALL BACKDROP IMAGES SHOULD BE MOVIE POSTERS
    if(!focus_type){
        return (
            <>
            <Movie index={0}/> <Movie index={1}/> 
            <Movie index={2}/> <Movie index={3}/> 
            <Movie index={4}/> <Movie index={5}/> 
            </>
        )

    }
    //CASE WHERE FOCUS IS A MOVIE -> THEN ALL BACKDROP IMAGES SHOULD BE PORTRAITS
    else{
        return (
            <>
                <Portait index={0}/> <Portait index={1}/> 
                <Portait index={2}/> <Portait index={3}/> 
                <Portait index={4}/> <Portait index={5}/> 
            </>

        )
    }
}

export default Non_target
