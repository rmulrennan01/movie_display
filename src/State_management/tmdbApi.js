// Need to use the React-specific entry point to import createApi
//import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.themoviedb.org/3/' 
  }),
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (movie_id) => `movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    }),
    getMovieCredits: builder.query({
      query: (movie_id) => `movie/${movie_id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    }),
    getPerson: builder.query({
      query: (person_id) => `person/${person_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    }),
    getPersonCredits: builder.query({
      query: (person_id) => `person/${person_id}?/movie_credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieQuery, useGetMovieCreditsQuery, useGetPersonQuery, useGetPersonCreditsQuery } = tmdbApi

//import {useGetMovieQuery} from './State_management/tmdbApi';
//const { data, error, isLoading } = useGetMovieQuery(100)

//await fetch('https://api.themoviedb.org/3/movie/'+movie_id+'?api_key='+process.env.REACT_APP_TMDB_API_KEY);
//await fetch(' https://api.themoviedb.org/3/movie/'+movie_id+'/credits?api_key='+process.env.REACT_APP_TMDB_API_KEY)

//await fetch('https://api.themoviedb.org/3/person/' + person_id  + '?api_key=' +process.env.REACT_APP_TMDB_API_KEY);
//await fetch('https://api.themoviedb.org/3/person/' + person_id + '/movie_credits?api_key=' + process.env.REACT_APP_TMDB_API_KEY);


