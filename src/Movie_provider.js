import React, {useState, useEffect,  createContext} from "react";
import Movie_provider from './Movie_provider.js'; 

const Movie_provider = () =>{

    const MovieContext = createContext({movie_id: 11})


    return(
        <MovieContext.Provider value={{movie_id:11}}>
            <Child />
        </MovieContext.Provider>
    )
}
export default Movie_provider