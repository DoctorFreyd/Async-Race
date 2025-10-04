import { API_URL } from '.';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface Winner {
  id: number;
  name: string;
  wins: number;
  bestTime: number;
}
// Create Winner
export const createWinner = createAsyncThunk<Winner, Winner, { rejectValue: string }>(
  'winners/create',
  async (winnerData, { rejectWithValue }) => {
    try {
      // Checking if a winner with this ID already exists
      const existing = await axios
        .get<Winner>(`${API_URL}/winners/${winnerData.id}`)
        .catch(() => null);

      if (existing?.data) {
        // If the winner exists, update their record
        const updated = await axios.patch<Winner>(`${API_URL}/winners/${winnerData.id}`, {
          wins: existing.data.wins + 1,
          bestTime: Math.min(existing.data.bestTime, winnerData.bestTime),
        });
        return updated.data;
      } else {
        // If the winner does not exist, create a new record
        const response = await axios.post<Winner>(`${API_URL}/winners`, winnerData, {
          headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.Error ?? 'Failed to create winner');
      }
      return rejectWithValue('Failed to create winner');
    }
  },
);
