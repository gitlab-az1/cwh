import { configureStore } from '@reduxjs/toolkit';

import appStateSlice from './features/appState';


export const store = configureStore({
  reducer: {
    appState: appStateSlice,
  },
});
