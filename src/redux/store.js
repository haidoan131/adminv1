import { configureStore } from '@reduxjs/toolkit';
import studentSlice from './studentSlice';

import globalReducer from "state";
import { api } from "state/api";
import cateSlice from './cateSlice';
import productSlice from './productSlice';
const store=configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
      
        student:studentSlice,
        cate:cateSlice,
        products:productSlice
      },
      middleware: (getDefault) => getDefault().concat(api.middleware),
})
export default store