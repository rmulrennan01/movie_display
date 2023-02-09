import { configureStore } from '@reduxjs/toolkit'
import focusSlice from './focusSlice'
import nonFocusSlice from './nonFocusSlice'
import typeSlice  from './typeSlice'

export default configureStore({
  reducer: {
    focus: focusSlice,
    nonFocus: nonFocusSlice,
    type: typeSlice,
  },
})