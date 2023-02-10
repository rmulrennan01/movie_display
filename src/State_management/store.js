import { configureStore } from '@reduxjs/toolkit'
import focusSlice from './focusSlice'
import nonFocusSlice from './nonFocusSlice'
import typeSlice  from './typeSlice'
import motionSlice from './motionSlice'

export default configureStore({
  reducer: {
    focus: focusSlice,
    nonFocus: nonFocusSlice,
    type: typeSlice,
    motion: motionSlice
  },
})