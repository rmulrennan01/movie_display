import logo from './logo.svg';
import './App.css';
import TMDB from './TMDB.js';
import React, {useState, useEffect, createContext, useContext} from 'react';
import Movie from './Movie.js'; 

function App() {
  const [loaded, set_loaded] = useState(false); 
  const [data, set_data] = useState(); 
  const [poster, set_poster] = useState(); 
  const [credits, set_credits] = useState(); 
  const [search, set_search] = useState(); 
  const [movie_id, set_movie_id] = useState(Number(100)); 

  useEffect(() => {
    const fetchData = async () => {
      const info = await TMDB().json();
      set_data(info);
      
      set_loaded(true);
    }

    //fetchData();

  }, []);

  useEffect(() => {
    fetch_movie();
  },[movie_id]);
  
  const fetch_movie = async () => {
    let id = movie_id;
    const data = await fetch('https://api.themoviedb.org/3/movie/'+id+'?api_key='+process.env.REACT_APP_TMDB_API_KEY);
    const movies = await data.json();
    set_data(movies);
    
    const data2 = await fetch(' https://api.themoviedb.org/3/movie/'+id+'/images?api_key='+process.env.REACT_APP_TMDB_API_KEY);
    const poster_img = await data2.json();
    set_poster(poster_img); 

    const data3 = await fetch(' https://api.themoviedb.org/3/movie/'+id+'/credits?api_key='+process.env.REACT_APP_TMDB_API_KEY)
    const credit_list = await data3.json(); 
    set_credits(credit_list.cast); 

    let search = "star"
    let search_2 = 'https://api.themoviedb.org/3/search/movie?query=Avengers&api_key='+process.env.REACT_APP_TMDB_API_KEY +'&page=2'
    //const data4 = await fetch('https://api.themoviedb.org/3/search/movie?'+'query='+search+'&api_key='+process.env.REACT_APP_TMDB_API_KEY+'&page=1');
    const data4 = await fetch(search_2)
    const results = data4; 
    set_search(results); 
    set_loaded(true);

  };

  const show_poster = () => {
    let path = poster.posters[0].file_path; 
    //data.poster_path also works
    return(
      <>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+path}></img>
      <img style={{width:'300px'}} src={'https://image.tmdb.org/t/p/original'+credits[0].profile_path}></img>
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
