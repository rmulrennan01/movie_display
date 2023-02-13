import { configureStore } from '@reduxjs/toolkit'
import focusSlice from './focusSlice';
import nonFocusSlice from './nonFocusSlice';
import typeSlice  from './typeSlice';
import motionSlice from './motionSlice';
import {tmdbApi} from './tmdbApi';
//import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { setupListeners} from '@reduxjs/toolkit/query/react'


export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    focus: focusSlice,
    nonFocus: nonFocusSlice,
    type: typeSlice,
    motion: motionSlice,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
})

setupListeners(configureStore.dispatch);