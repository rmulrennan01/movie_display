

//RETURNS THE POSTER URL PATH AND THE MOVIE'S TITLE

const Movie = (index, focus, non_focus, focus_type) => {

    let path = 'https://image.tmdb.org/t/p/w300'; 
    let name = ''; 
    let id = 0; 
    if(focus_type && focus!=null && focus.poster_path != null){
        path += focus.poster_path;
        name = focus.original_title;
        id = focus.id; 
    }
    else if(!focus_types && non_focus!=null && focus.poster_path != null){
        path += non_focus[index].poster_path;
        name = non_focus[index].original_title;
        id = non_focus[index].id; 

    }
    else{
        path = null; 
        name = null; 
        id = null; 
    }

    
    return {path:path, name:name, id:id}
}

export default Movie


/*
    MOVIES:
    'https://image.tmdb.org/t/p/w300' + poster_path
    original_title
    id

*/