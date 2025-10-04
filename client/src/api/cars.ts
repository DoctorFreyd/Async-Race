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

export const getCars = createAsyncThunk(
  'cars/get',
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await axios.get<Car[]>(`${API_URL}/garage`, {
      params: { _page: page, _limit: limit },
    });

    return {
      cars: response.data as Car[],
      totalCount: Number(response.headers['x-total-count']),
    };
  },
);
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
// Car Engine
// Start
export const startEngine = createAsyncThunk<
  { id: number; velocity: number; distance: number },
  number,
  { rejectValue: string }
>('cars/startEngine', async (id, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`${API_URL}/engine?id=${id}&status=started`);
    return { id, velocity: data.velocity, distance: data.distance };
  } catch {
    return rejectWithValue('Failed to start engine');
  }
});
// Stop
export const stopEngine = createAsyncThunk(
  'cars/stopEngine',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.patch(`${API_URL}/engine?id=${id}&status=stopped`);
      return { id };
    } catch {
      return rejectWithValue('Failed to stop engine');
    }
  },
);
