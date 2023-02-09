import { createSlice, createSelector } from '@reduxjs/toolkit'


export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    value: 'movie',
  },
  reducers: {
    switchType: (state) =>{
        if(state.value == 'movie'){
            state.value = 'person'
        }
        else{
            state.value = 'movie'
    }
  }
    }
})





// Action creators are generated for each case reducer function
export const { switchType} = typeSlice.actions

export default typeSlice.reducer