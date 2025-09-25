import { API_URL } from './index';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { generateRandomCars } from '../utils/randomCars';

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
    return rejectWithValue('error message');
  }
});
//  Update a Car
export const updateCar = createAsyncThunk<
  Car,
  Pick<Car, 'name' | 'color' | 'id'>,
  { rejectValue: string }
>('cars/update', async (carData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put<Car>(`${API_URL}/garage/${carData.id}`, carData);
    return data;
  } catch (error) {
    return rejectWithValue('error message');
  }
});
//  Delete a Car
export const deleteCar = createAsyncThunk('cars/delete', async (id: number) => {
  const { data } = await axios.delete(`${API_URL}/garage/${id}`);
  return data;
});
// Create Random Cars
export const createRandomCars = createAsyncThunk<Car[], number>(
  'cars/createRandom',
  async (count, { rejectWithValue }) => {
    try {
      const randomCars = generateRandomCars(count);
      const requests = randomCars.map((car) => axios.post<Car>(`${API_URL}/garage`, car));
      const responses = await Promise.all(requests);
      return responses.map((res) => res.data);
    } catch (error) {
      return rejectWithValue('error message');
    }
  },
);
