import { BASE_URL } from "../core/utils/constants";
import { Car } from '../types/car';

export const getCars = async (): Promise<Car[]> => {
  const response = await fetch(`${BASE_URL}/garage`);
  return response.json();
};

export const createCar = async (car: Omit<Car, 'id'>): Promise<Car> => {
  const response = await fetch(`${BASE_URL}/garage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return response.json();
};

export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
};
