
const TMDP_API_KEY = process.env.REACT_APP_TMDB_API_KEY

const TMDB = () => {
    fetch('https://api.themoviedb.org/3/movie/550?api_key=087dbd8f38dc4f44c16496dd6896ac2a')
    .then((data) => {
        return data
    })
    .catch((error) =>{
        console.log('error'); 
    })

}
export default TMDB




