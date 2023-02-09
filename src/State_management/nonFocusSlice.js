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

const add_urls = (items) => {
    let temp_items = [...items];
    for (let i = 0; i<items.length; i++){
        if(temp_items[i].hasOwnProperty('poster_path')){
            temp_items[i].url = 'https://image.tmdb.org/t/p/w300' + temp_items[i].poster_path;
            temp_items[i].type = 'movie';
            temp_items[i].displayName = temp_items[i].title + ' (' + temp_items[i].release_date.slice(0,4) + ')'  

        }
        else if(temp_items[i].hasOwnProperty('profile_path')){
            temp_items[i].url = 'https://image.tmdb.org/t/p/w300' + temp_items[i].profile_path;
            temp_items[i].type = 'person'; 
            temp_items[i].displayName = temp_items[i].name;
        }
    }
    return temp_items; 

}



export const nonFocusSlice = createSlice({
  name: 'nonFocus',
  initialState: {
    value: null,
  },
  reducers: {
    setNonFocus: (state, action) =>{
        state.value = add_urls(action.payload);
    },
     
  },
})





// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setNonFocus} = nonFocusSlice.actions

export default nonFocusSlice.reducer