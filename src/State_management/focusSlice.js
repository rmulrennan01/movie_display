import { createSlice, createSelector } from '@reduxjs/toolkit'

/*
    MOVIES:
    'https://image.tmdb.org/t/p/w300' + poster_path
    original_title
    id

*/

/* PEOPLE 
    'https://image.tmdb.org/t/p/w300' +profile_path
    name
    id
*/



export const focusSlice = createSlice({
  name: 'focus',
  initialState: {
    value: null,
    url:null,
    type:null,
    displayName:null,
  },
  reducers: {
    setFocus: (state, action) =>{
      if(action.payload.hasOwnProperty('poster_path')){
        state.value = action.payload
        state.url = 'https://image.tmdb.org/t/p/w300' + action.payload.poster_path
        state.type = 'movie'
        state.displayName = action.payload.title + ' (' + action.payload.release_date.slice(0, 4) + ')'  
      }
      else if (action.payload.hasOwnProperty('profile_path')){
        state.value = action.payload;
        state.url = 'https://image.tmdb.org/t/p/w300' + action.payload.profile_path;
        state.type = 'person';
        state.displayName = action.payload.name;
      }
    },
     
  },
})





// Action creators are generated for each case reducer function
export const { setFocus} = focusSlice.actions

export default focusSlice.reducer