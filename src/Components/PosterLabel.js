import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'


function PosterLabel(label) {
    //const [label, set_label] = useState(null);
    const focus_display_name = useSelector((state)=>state.focus.displayName);
    const focus = useSelector((state) => state.focus.value);
    const nonFocus = useSelector((state)=>state.nonFocus.value);

   /* useEffect(() => {
        if(props.label == -1){
            set_label(focus_display_name);
        }
        else{
            set_label(nonFocus[props.label].displayName) 
        }
        console.log('focus', label);

    }, [focus])

    if(label != null){
        return(
            label
        )
    }
    else{
        return(
            "no"
        )
    }
*/

if(label == -1){
    return focus_display_name
}
else{
    return nonFocus[label].displayName 
}



}

export default PosterLabel
