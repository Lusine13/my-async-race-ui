import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Car } from '../types/car';
import { GarageState } from '../types/garage';
import { getCars, createCar, deleteCar } from '../api/carsApi'; // ✅ Use named imports


export const fetchCars = createAsyncThunk('garage/fetchCars', async () => {
  const cars = await getCars();
  return cars;
});

export const addCarAsync = createAsyncThunk(
  'garage/addCar',
  async (car: Omit<Car, 'id'>) => {
    const newCar = await createCar(car);
    return newCar;
  }
);

export const removeCarAsync = createAsyncThunk(
  'garage/removeCar',
  async (id: number) => {
    await deleteCar(id);
    return id;
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
   
    builder.addCase(fetchCars.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCars.fulfilled, (state, action: PayloadAction<Car[]>) => {
      state.loading = false;
      state.cars = action.payload;
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch cars';
    });

   
    builder.addCase(addCarAsync.fulfilled, (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    });

   
    builder.addCase(removeCarAsync.fulfilled, (state, action: PayloadAction<number>) => {
      state.cars = state.cars.filter((car) => car.id !== action.payload);
    });
  },
});

export default garageSlice.reducer;
