import { configureStore } from '@reduxjs/toolkit'
import focusSlice from './focusSlice'

export default configureStore({
  reducer: {
    focus: focusSlice,
  },
})