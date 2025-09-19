import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Winner } from './types';
import { winnersAPI } from '../../api';

interface WinnersState {
  winners: Winner[];
  loading: boolean;
}

const initialState: WinnersState = { winners: [], loading: false };

export const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default winnersSlice.reducer;
