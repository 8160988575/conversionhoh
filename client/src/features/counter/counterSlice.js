// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    totalchanges:0,
  },
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
      state.totalchanges ++

    },
    decrement: (state) => {
      state.value -= 1;
      state.totalchanges ++
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
