import React, {useState, useEffect} from 'react'
import { Image, Text } from '@react-three/drei'
import { useSelector, useDispatch } from 'react-redux'
import { setFocus, setFocusID, toggleFocusReload} from '../State_management/focusSlice';
import { setNonFocus, toggleNonFocusReload, toggleNonFocusVisibility } from '../State_management/nonFocusSlice';

function PosterImage(props) {

    const [url, set_url] = useState(null); 
    const [name, set_name] = useState('');
    const focus = useSelector((state)=>state.focus.value)
    const focus_url = useSelector((state)=>state.focus.url);
    const nonFocus = useSelector((state)=>state.nonFocus.value);   
    const focus_display_name = useSelector((state)=>state.focus.displayName);
    const type = useSelector((state) => state.type.value)
    const id = useSelector((state) => state.type.id)
    const dispatch = useDispatch();

   

    useEffect(() => {
        if(props.target){
            if(focus_url != null && focus_url != undefined){
                set_url(focus_url); 
                set_name(focus_display_name); 
                console.log(focus_url, focus_display_name)
            }
            else{
                set_name('No Info');
            }
        } 

        else{
            if(nonFocus != null && nonFocus != undefined && nonFocus[props.index] != undefined){
                let temp_url = nonFocus[props.index].url;
                let temp_name = nonFocus[props.index].displayName;
                if(temp_name == undefined || temp_url == undefined){
                    set_name('No Info to Display');

                    console.log(nonFocus[props.index])
                }
                else{
                    set_url(nonFocus[props.index].url);
                    set_name(nonFocus[props.index].displayName)
                    console.log(nonFocus[props.index].url, nonFocus[props.index].displayName)

                }

            }
            else{
                set_name('No Info');  
            }
        }

    }, [id, nonFocus, type, focus])

 

    if(url != null){
        return(
            <>
            <Image raycast={() => null} position={[0, 0, 0.7]} url={url} scale={[.85,1,1]} />
            <Text  anchorX="center" color='white' anchorY="top" position={[0, .75, 0]} fontSize={.12}> 
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
