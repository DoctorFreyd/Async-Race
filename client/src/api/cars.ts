import { API_URL } from './index';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface Car {
  id: number;
  name: string;
  color: string;
  loading: boolean;
}

// Get All Cars
export const getCars = createAsyncThunk('cars/get', async () => {
  const { data } = await axios.get<Car[]>(`${API_URL}/garage`);
  return data as Car[];
});
