

//RETURNS THE POSTER URL PATH AND PERSON'S NAME
const Portrait = (index, focus, non_focus, focus_type) => {

    console.log('ran portrait'); 
    

    let path = 'https://image.tmdb.org/t/p/w300'; 
    let name = '';
    let id = ''; 
    //IF FOCUS IS NOT A MOVIE THEN WE GET THE DATA FROM THE FOCUS STATE IN THE CONTEXT
    if(!focus_type && focus!=null){
        path += focus.profile_path;
        name = focus.name; 
        id = focus.id; 
    }
    //IF FOCUS IS A MOVIE THEN WE GET THE DATA FROM THE NON_FOCUS STATE IN THE CONTEXT
    else if (focus_type && non_focus!=null){
        path += non_focus[index].profile_path
        name = non_focus[index].name; 
        id = non_focus[index].id; 
    }
    else{
        path = null; 
        name = null; 
        id = null; 
    }

    console.log('path', path)
    console.log('name', name); 

    return {path:path, name:name, id:id}
    
}


/* PEOPLE 
    'https://image.tmdb.org/t/p/w300' +profile_path
    name
    id
*/

export default Portrait