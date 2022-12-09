import { createSlice } from '@reduxjs/toolkit';

const main = createSlice({
  name: 'main',
  initialState: {
    idx: 0,
    subtitles: ['redux example 1', 'redux example 2', 'redux example 3'],
  },
  reducers: {
    next: (state, { payload }) => {
      state.idx = payload >= state.subtitles.length ? 0 : payload;
    },
  },
});

export const { next } = main.actions;

export default main.reducer;
