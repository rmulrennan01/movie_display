import { createSlice, createSelector } from '@reduxjs/toolkit'


export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    focusId: null, 
    nonFocusIds:null,
    focusType:null,
    focusData:null,
    nonFocusData:null,
  },
  reducers: {
    setFocus: (state, action) =>{
        state.focusData = action.payload;
    },
     
  },
})





// Action creators are generated for each case reducer function
export const { setFocus} = dataSlice.actions

export default dataSlice.reducer