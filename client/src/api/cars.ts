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
// Create a Car
export const createCar = createAsyncThunk<
  Car,
  Pick<Car, 'name' | 'color'>,
  { rejectValue: string }
>('cars/create', async (carData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<Car>(`${API_URL}/garage`, carData);
    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('error message');
  }
});
