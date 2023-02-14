import React, {useState, useContext, useEffect} from 'react'
import { Image, Text } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'

function PosterImage(props) {

    const [url, set_url] = useState(null); 
    const [name, set_name] = useState('');
    
    const focus = useSelector((state)=>state.focus.value)
    const focus_url = useSelector((state)=>state.focus.url);
    const nonFocus = useSelector((state)=>state.nonFocus.value);    
    const focus_display_name = useSelector((state)=>state.focus.displayName);

    const type = useSelector((state) => state.type.value)
    const id = useSelector((state) => state.type.id)

   

    useEffect(() => {
              
        if(props.target){
            if(focus_url != null && focus_url != undefined){
                set_url(focus_url); 
                set_name(focus_display_name); 
            }
            else{
              //  set_url('https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg')
            }
        } 

        else{
            if(nonFocus != null && nonFocus != undefined && nonFocus[props.index] != undefined){
                set_url(nonFocus[props.index].url);
                set_name(nonFocus[props.index].displayName)
            }
            else{
               // set_url('https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg')
            }
        }

    }, [id, nonFocus, type, focus])

 

    if(url != null){
        return(
            <>
            <Image raycast={() => null} position={[0, 0, 0.7]} url={url} scale={[.85,1,1]} />
            <Text  anchorX="center" color='black' anchorY="top" position={[0, .75, 0]} fontSize={.1}> 
                {name}
            </Text>
            </>
        )
    }
    else{
        return(
            <></>
        )
    }
}

export default PosterImage
