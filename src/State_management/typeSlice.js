import { createSlice, createSelector } from '@reduxjs/toolkit'


export const typeSlice = createSlice({
  name: 'type',
  initialState: {
    value: 'movie',
    id: Number(120),
    hide: false

  },
  reducers: {
    setID: (state,action) =>{
        state.id = action.payload
    },
    switchTypeAndID: (state, action) => {
        state.id = action.payload
        if(state.value === 'movie'){
            state.value = 'person'
        }
        else{
            state.value = 'movie'
        }
    },
    setHide: (state, action) =>{
        state.hide = action.payload
    }
  }
    
})





// Action creators are generated for each case reducer function
export const {setID, switchTypeAndID, setHide} = typeSlice.actions

export default typeSlice.reducer