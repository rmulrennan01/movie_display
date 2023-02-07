import React, {useContext} from 'react';
import { MovieContext } from '../Movie_context'

//RETURNS THE POSTER URL PATH AND THE MOVIE'S TITLE

function Movie(index) {
    const {set_loaded, focus, non_focus,  set_focus_id, focus_type, set_focus_type} = useContext(MovieContext)   


    //  <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+primary.poster_path}></img> <br></br>

    const handle_click = () => {
        //IF THE FOCUS IS NOT A MOVIE, WE NEED TO CHANGE THE CONTEXT
        if(!focus_type){
            set_loaded(false);
            set_focus_id(non_focus[index].id); 
            set_focus_type(true);

            
        }
    }

    let path = ''; 
    let name = ''; 
    if(focus_type){
        path = focus.poster_path;
        name = focus.original_title
    }
    else{
        path = non_focus[index].poster_path
        name = non_focus[index].original_title
    }

    


    /*
    return (
        <>
        <img 
            style={{width:'300px'}} 
            src={'https://image.tmdb.org/t/p/w300/'+ path}
            onClick = {() => handle_click()}
        >
        </img>
        </>
    )
    */
    return {path:path, name:name}
}

export default Movie
