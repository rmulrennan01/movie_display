import React, {useState, useContext, useEffect} from 'react'
import { Image, Text } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'

function PosterImage(props) {

    const [url, set_url] = useState(null); 
    
    const focus = useSelector((state)=>state.focus.value)
    const focus_url = useSelector((state)=>state.focus.url);
    const nonFocus = useSelector((state)=>state.nonFocus.value);

    useEffect(() => {
        //IF IT IS THE MAIN TARGET POSTER
        if(props.target){
            set_url(focus_url); 
        } 
        //IF IT IS A BACKGROUND POSTER
        else{
            set_url(nonFocus[props.index].url);
        }

    }, [focus])


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
