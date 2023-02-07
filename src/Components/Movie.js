

//RETURNS THE POSTER URL PATH AND THE MOVIE'S TITLE

const Movie = (index, focus, non_focus, focus_type) => {

    let path = ''; 
    let name = ''; 
    if(focus_type){
        path = focus.poster_path;
        name = focus.original_title
    }
    else{
        path = non_focus[index].poster_path
        name = non_focus[index].original_title
    }

    
    return {path:path, name:name}
}

export default Movie
