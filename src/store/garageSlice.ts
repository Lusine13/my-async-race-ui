import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../types/car';
import { GarageState } from '../types/garage';
import { getCars, createCar, generateRandomCars, updateCar } from '../api/carsApi';
import { BASE_URL } from '../core/utils/constants';

export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  return await getCars();
});

export const generateCars = createAsyncThunk(
  'garage/generateCars',
  async (_, { dispatch }) => {
    const brands = [
      'Tesla', 'BMW', 'Mercedes', 'Ford', 'Audi',
      'Lexus', 'Toyota', 'Honda', 'Chevrolet', 'Nissan',
      'Kia', 'Mazda', 'Porsche', 'Ferrari', 'Lamborghini'
    ];
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16);
    const randomName = () => `${brands[Math.floor(Math.random() * brands.length)]} ${Math.floor(Math.random() * 1000)}`;

    const requests = Array.from({ length: 100 }).map(() =>
      fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: randomName(), color: randomColor() }),
      })
    );

    await Promise.all(requests);
    dispatch(fetchCars());
  }
);

export const updateCarAsync = createAsyncThunk(
  'garage/updateCar',
  async ({ id, car }: { id: number; car: Omit<Car, 'id'> }, { dispatch }) => {
    await updateCar(id, car);
    dispatch(fetchCars()); 
  }
);

export const removeCarAsync = createAsyncThunk(
  'garage/removeCar',
  async (id: number, { dispatch }) => {
    await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
    dispatch(fetchCars());
  }
);

export const addCarAsync = createAsyncThunk(
  'garage/addCar',
  async (car: Omit<Car, 'id'>, { dispatch }) => {
    await createCar(car);
    dispatch(fetchCars()); 
  }
);

const initialState: GarageState = {
  cars: [],
  loading: false,
  error: null,
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder      
      .addCase(fetchCars.pending, (state) => { state.loading = true; })
      .addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state) => { state.loading = false; state.error = 'Failed to fetch cars'; })      

      .addCase(generateCars.pending, (state) => { state.loading = true; })
      .addCase(generateCars.fulfilled, (state) => { state.loading = false; })
      .addCase(generateCars.rejected, (state) => { state.loading = false; state.error = 'Failed to generate cars'; })
      
      .addCase(updateCarAsync.pending, (state) => { state.loading = true; })
      .addCase(updateCarAsync.fulfilled, (state) => { state.loading = false; })
      .addCase(updateCarAsync.rejected, (state) => { state.loading = false; state.error = 'Failed to update car'; })
      
      .addCase(removeCarAsync.pending, (state) => { state.loading = true; })
      .addCase(removeCarAsync.fulfilled, (state) => { state.loading = false; })
      .addCase(removeCarAsync.rejected, (state) => { state.loading = false; state.error = 'Failed to delete car'; })
      
      .addCase(addCarAsync.pending, (state) => { state.loading = true; })
      .addCase(addCarAsync.fulfilled, (state) => { state.loading = false; })
      .addCase(addCarAsync.rejected, (state) => { state.loading = false; state.error = 'Failed to add car'; });
  },
});

export default garageSlice.reducer;
