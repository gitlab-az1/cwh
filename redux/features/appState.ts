import { createSlice } from '@reduxjs/toolkit';


export type AppState = {
  readonly isSidebarOpen: boolean;
};


export const appStateSlice = createSlice({
  name: 'AppState',
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    setIsSidebarOpen(state, { payload }) {
      if(typeof payload !== 'boolean')
        return;

      state.isSidebarOpen = payload;
    },
  },
});


export const { setIsSidebarOpen } = appStateSlice.actions;

export default appStateSlice.reducer;
