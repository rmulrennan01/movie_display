import logo from './logo.svg';
import './App.css';
import TMDB from './TMDB.js';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Movie from './Movie.js'; 
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_credits from './Utilities/Fetch_credits';
import json_sort from './Utilities/json_sort';

function App() {
  const [loaded, set_loaded] = useState(false); 
  const [data, set_data] = useState(); 
  const [poster, set_poster] = useState(); 
  const [credits, set_credits] = useState(); 
  const [search, set_search] = useState(); 
  const [movie_id, set_movie_id] = useState(Number(100)); 


  //LOAD THE MOVIE DATA AND THE CREDIT LIST -> DEPENDENCY IS IF MOVIE_ID STATE CHANGES
  useEffect(() => {
    Fetch_movie(movie_id)
    .then((result) => {
      set_data(result)
      Fetch_credits(movie_id)
      .then((creds) =>{
        set_credits(json_sort(creds,'popularity')); 
        set_loaded(true); 
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 
  }, [movie_id]);


  const show_poster = () => {
    //let path = poster.posters[0].file_path; 
    //data.poster_path also works
    return(
      <>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+data.poster_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[0].profile_path}></img> 
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[1].profile_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[2].profile_path}></img> 
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[3].profile_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[4].profile_path}></img> 
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[5].profile_path}></img>
      </>
    );


  }

  return (
    <div className="App">
      {loaded ? <>{data.title}</>: console.log('not loaded')}
      <br></br>

      {loaded ? <>{data.release_date}</>: console.log('not loaded')}
      {loaded ? console.log('data', data): console.log('not loaded')}
      <br></br>
      {loaded ? <>{show_poster()}</>: console.log('not loaded')}
      <br></br>
      <button onClick={()=>set_movie_id(movie_id-1)}>Back</button>
      <button onClick={()=>set_movie_id(movie_id+1)}>Next</button>
    </div>
  );
}

export default App;
