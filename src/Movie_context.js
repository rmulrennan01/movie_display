import React, {useState, useEffect,  createContext} from "react";

//NEEDS TO KEEP TRACK OF FOCUS TYPE -> MOVIE OR PERSON
//NEEDS TO KEEP TRACK OF IDS BASED ON THE ABOVE

/*
const Movie_provider = () =>{

    const MovieContext = createContext({movie_id: 11})


    return(
        <MovieContext.Provider value={{movie_id:11}}>
            <Child />
        </MovieContext.Provider>
    )
}
export default Movie_provider

*/


export const MovieContext = createContext({}); 
