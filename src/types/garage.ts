import { Car } from './car';

export interface GarageState {
  cars: Car[];
  loading: boolean;
  error: string | null;
}
