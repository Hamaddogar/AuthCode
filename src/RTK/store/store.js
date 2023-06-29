// store.js

import { configureStore } from '@reduxjs/toolkit';
import formReducer from '../Reducer/formsilce';

const store = configureStore({
  reducer: {
    form: formReducer,
  },
});

export default store;