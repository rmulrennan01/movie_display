import logo from './logo.svg';
import './App.css';
import TMDB from './TMDB.js';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Movie from './Movie.js'; 
import Fetch_movie from './Utilities/Fetch_movie.js'; 
import Fetch_people from './Utilities/Fetch_people';
import Fetch_credits from './Utilities/Fetch_credits';
import json_sort from './Utilities/json_sort';
import { MovieContext } from './Movie_context';
import Portrait from './Portrait';

function App() {
  //FOCUS TYPE -> MOVIE OR PERSON
  const [focus_type, set_focus_type] = useState('movie'); 
  const [focus, set_focus] = useState(Number(1)); 
  const [credits, set_credits] = useState(); 
  //FOCUS -> THIS WILL BE EITHER THE DATA FOR A MOVIE OR PERSON, WHICHEVER IS IN FOCUS
  //PERSON_CREDITS -> IF FOCUS IS PERSON, THIS IS THE LIST OF OTHER PROJECTS THEY ARE IN
  //MOVIE_CREDITS -> IF FOCUS IS MOVIE, THIS IS THE LIST OF ALL CREDITED PEOPLE IN THE MOVIE


  const [loaded, set_loaded] = useState(false); 
  const [primary, set_primary] = useState(); 
  //const [credits, set_credits] = useState(); 
  const [movie_id, set_movie_id] = useState(Number(100)); 


  //LOAD THE MOVIE primary AND THE CREDIT LIST -> DEPENDENCY IS IF MOVIE_ID STATE CHANGES
  useEffect(() => {
    Fetch_movie(movie_id)
    .then((result) => {
      set_primary(result)
      Fetch_people(movie_id)
      .then((creds) =>{
        set_credits(json_sort(creds,'popularity')); 
        set_loaded(true); 
      })
      .catch((err) => console.log(err)); 
    }) 
    .catch((error) => console.log(error)); 
  }, [movie_id]);

  const get_credits = (id) => {
    Fetch_credits(id)
    .then((results) => console.log("Credits", results))
    .catch((err) => console.log(err))
  }

  const show_poster = () => {
    //let path = poster.posters[0].file_path; 
    //primary.poster_path also works
    return(
      <>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+primary.poster_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[0].profile_path}></img> 
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[1].profile_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[2].profile_path}></img> 
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[3].profile_path}></img> <br></br>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[4].profile_path}></img> 
      {portrait(5)}
      </>
    );
  }


  const portrait = (index) =>{


    return (
      <img 
        style={{width:'300px'}} 
        src={'https://image.tmdb.org/t/p/original'+credits[index].profile_path}
        onClick={()=>get_credits(credits[index].id)}
      >
      </img>

    )

  }

  return (
    <MovieContext.Provider value={{primary, focus, set_focus}}>
      <div className="App">
        <button onClick={()=>set_movie_id(movie_id-1)}>Back</button>
        <button onClick={()=>set_movie_id(movie_id+1)}>Next</button>
        <br></br>
        {loaded ? <>{primary.title}</>: console.log('not loaded')}
        <br></br>

        {loaded ? <>{primary.release_date}</>: console.log('not loaded')}
        {loaded ? console.log('primary', primary): console.log('not loaded')}
        <br></br>
        {loaded ? <>{show_poster()}</>: console.log('not loaded')}
        <br></br>

      </div>
      <Portrait />
    </MovieContext.Provider>
  );
}

export default App;
