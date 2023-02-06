
//FETCHES DATA FOR AN INDIVIDUAL
const Fetch_individual = async (person_id) => {
    let data = await fetch('https://api.themoviedb.org/3/person/' + person_id  + '?api_key=' +process.env.REACT_APP_TMDB_API_KEY);
    let person = await data.json();
    return person; 
}

export default Fetch_individual