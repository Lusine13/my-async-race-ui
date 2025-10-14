import { Car } from '../types/car';

export interface CarFormProps {
    editingCar?: Car | null;
    onFinishEdit?: () => void;
  }
  