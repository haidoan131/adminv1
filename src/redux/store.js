import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './studentSlice';

import globalReducer from "state";
import { api } from "state/api";
import cateSlice from './cateSlice';
const store=configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
      
        student:studentSlice,
        cate:cateSlice
      },
      middleware: (getDefault) => getDefault().concat(api.middleware),
})
export default store