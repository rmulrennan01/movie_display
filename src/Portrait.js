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
    const {primary} = useContext(MovieContext)   

    return (
        <>
            {console.log('this is', primary)}
        </>

    )
    
      

}

export default Portrait