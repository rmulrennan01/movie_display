

//RETURNS THE POSTER URL PATH AND PERSON'S NAME
const Portrait = (index, focus, non_focus, focus_type) => {

    console.log('ran portrait'); 
    

    let path = 'https://image.tmdb.org/t/p/w300'; 
    let name = '';
    //IF FOCUS IS NOT A MOVIE THEN WE ARE JUST USING THE FILE PATH FOR AN INDIVIDUAL PORTRAIT
    if(!focus_type){
        path += focus.profile_path;
        name = focus.name; 
    }
    else{
        path += non_focus[index].profile_path
        name = non_focus[index].name; 
    }

    console.log('path', path)
    console.log('name', name); 

    return {path:path, name:name}
    
}

export default Portrait