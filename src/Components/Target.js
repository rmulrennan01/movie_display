import React from 'react';
import PosterFrame from './PosterFrame'; 
import PosterImage from './PosterImage'; 


//THIS DETERMINES WHAT THE CENTER FOCUSED POSTER IS AND THEN GENERATES A 3D POSTER OBJECT


function Target() {
  
    return(
        <PosterFrame 
        id={-1} 
        pos={[0,1,-6]} 
        angle={Math.PI}
        label={-1}
        >
            <PosterImage   target={true}/>
        </PosterFrame>
    );

}

export default Target
