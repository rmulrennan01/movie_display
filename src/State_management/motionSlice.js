import { createSlice, createSelector } from '@reduxjs/toolkit'


export const motionSlice = createSlice({
  name: 'focus',
  initialState: {
    focusSpeed: Number(8)
    
  },
  reducers: {
    setFocusSpeed: (state, action) =>{
        state.focusSpeed = action.payload
    },
     
  },
})





// Action creators are generated for each case reducer function
export const { setFocusSpeed} = motionSlice.actions

export default motionSlice.reducer