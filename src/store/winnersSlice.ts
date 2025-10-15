import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Winner } from '../types/winner';
import { FetchWinnersProps } from '../types/fetchWinners';

export const fetchWinners = createAsyncThunk<
  { winners: (Winner & { name?: string; color?: string })[]; total: number },
  FetchWinnersProps
>(
  'winners/fetchWinners',
  async ({ page = 1, limit = 10, sort = 'wins', order = 'desc' } = {}) => {
    const res = await fetch(`http://127.0.0.1:3000/winners`);
    if (!res.ok) throw new Error('Failed to fetch winners');
    const winners: Winner[] = await res.json();

    const carsPromises = winners.map(w =>
      fetch(`http://127.0.0.1:3000/garage/${w.id}`).then(r => r.json())
    );
    const cars = await Promise.all(carsPromises);

    const merged = winners.map((winner, idx) => ({
      ...winner,
      name: cars[idx]?.name || 'Unknown Car',
      color: cars[idx]?.color || '#999999',
    }));

    const sorted = merged.sort((a, b) => {
      if (sort === 'wins') return order === 'asc' ? a.wins - b.wins : b.wins - a.wins;
      return order === 'asc' ? a.time - b.time : b.time - a.time;
    });

    
    const start = (page - 1) * limit;
    const paginated = sorted.slice(start, start + limit);

    return { winners: paginated, total: merged.length };
  }
);

export const saveWinner = createAsyncThunk<void, { id: number; time: number }>(
  'winners/saveWinner',
  async ({ id, time }) => {
    const res = await fetch(`http://127.0.0.1:3000/winners/${id}`);
    if (res.ok) {
      const winner: Winner = await res.json();
      await fetch(`http://127.0.0.1:3000/winners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          wins: winner.wins + 1,
          time: time < winner.time ? time : winner.time,
        }),
      });
    } else {
      await fetch(`http://127.0.0.1:3000/winners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, wins: 1, time }),
      });
    }
  }
);

interface WinnersState {
  winners: (Winner & { name?: string; color?: string })[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: WinnersState = {
  winners: [],
  total: 0,
  loading: false,
  error: null,
};

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWinners.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action: PayloadAction<{ winners: (Winner & { name?: string; color?: string })[]; total: number }>) => {
        state.loading = false;
        state.winners = action.payload.winners;
        state.total = action.payload.total;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch winners';
      })
      .addCase(saveWinner.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save winner';
      });
  },
});

export default winnersSlice.reducer; 

