import React, {useState, useContext, useEffect} from 'react'
import { Image, Text } from '@react-three/drei'
import {MovieContext} from '../Movie_context.js'; 


function PosterImage(props) {
    const {focus, focus_type, non_focus, focus_id} = useContext(MovieContext)   

    const [url, set_url] = useState(null); 

    useEffect(() => {
        //IF IT IS THE MAIN TARGET POSTER
        if(props.target){
            if(focus_type && focus != null){
                set_url('https://image.tmdb.org/t/p/w300' + focus.poster_path)
            }
            else if (!focus_type && focus !=null){
                set_url('https://image.tmdb.org/t/p/w300' + focus.profile_path)
            }
        } 
        //IF IT IS A BACKGROUND POSTER
        else{
            if(!focus_type && non_focus != null){
                set_url('https://image.tmdb.org/t/p/w300' + non_focus[props.index].poster_path)
            }
            else if (focus_type && non_focus !=null){
                set_url('https://image.tmdb.org/t/p/w300' + non_focus[props.index].profile_path)
            }

        }

    }, [focus_id])


    if(url != null){
        return(
            <Image raycast={() => null} position={[0, 0, 0.7]} url={url} scale={[.85,1,1]}/>
        )
    }
    else{
        return(
            <></>
        )
    }
}

export default PosterImage
