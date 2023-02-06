import React, {useContext} from 'react'
import { MovieContext } from '../Movie_context'

function Portrait(props) {
    const {set_loaded,focus, non_focus, set_focus_id, focus_type, set_focus_type} = useContext(MovieContext)   


    const handle_click = () => {
        if(focus_type){
            set_loaded(false);
            set_focus_id(non_focus[props.index].id);
            set_focus_type(false);
             
        }
    }


    let path = 'https://image.tmdb.org/t/p/w300'; 
    let name = '';
    //IF FOCUS IS NOT A MOVIE THEN WE ARE JUST USING THE FILE PATH FOR AN INDIVIDUAL PORTRAIT
    if(!focus_type){
        path += focus.profile_path;
        name = focus.name; 
    }
    else{
        path += non_focus[props.index].profile_path
        name = non_focus[props.index].name; 
    }


//https://image.tmdb.org/t/p/original/yRI8MDB5sg8b8EZkzFz5cCBrnKL.jpg
    
    return (
        <>
        <img 
            style={{width:'300px'}} 
            src={path}
            onClick = {() => handle_click()}
        >
        </img>

        </>
    )
    
    
      

}

export default Portrait