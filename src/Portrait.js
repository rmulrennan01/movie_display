import React, {useContext} from 'react'
import { MovieContext } from './Movie_context'
function Portrait(props) {

    /*

            <img 
        style={{width:'300px'}} 
        src={'https://image.tmdb.org/t/p/original'+props.credits[index].profile_path}
        onClick={()=>get_credits(credits[index].id)}
        >
        </img>
*/
    const {primary, set_focus, focus} = useContext(MovieContext)   

    return (
        <>
            <button onClick={()=>set_focus(focus+1)}> Increment Focus</button>
            This is the value of {focus}
        </>

    )
    
      

}

export default Portrait