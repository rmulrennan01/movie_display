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
    value: 16869,
    url:null,
    type:null,
    displayName:null,
    reload:null
  },
  reducers: {
    setFocus: (state, action) =>{
      if(action.payload.hasOwnProperty('poster_path')){
        state.value = action.payload
        state.url = 'https://image.tmdb.org/t/p/w400' + action.payload.poster_path
        state.type = 'movie'
        state.displayName = action.payload.title + ' (' + action.payload.release_date.slice(0, 4) + ')'  
      }
      else if (action.payload.hasOwnProperty('profile_path')){
        state.value = action.payload;
        state.url = 'https://image.tmdb.org/t/p/w400' + action.payload.profile_path;
        state.type = 'person';
        state.displayName = action.payload.name;
      }
    },
  
    toggleFocusReload : (state) =>{
        state.reload = !state.reload
    }
     
  },
})





// Action creators are generated for each case reducer function
export const { setFocus, toggleFocusReload} = focusSlice.actions

export default focusSlice.reducer