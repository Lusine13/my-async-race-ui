import { BASE_URL } from "../core/utils/constants";
import { Car } from "../types/car";

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
export const updateCar = async (id: number, car: Omit<Car, 'id'>): Promise<Car> => {
  const response = await fetch(`${BASE_URL}/garage/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  return response.json();
};
export const deleteCar = async (id: number): Promise<void> => {
  await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
};

export const generateRandomCars = async (): Promise<void> => {
  await fetch(`${BASE_URL}/generate-cars`, { method: 'POST' });
};

export const startEngine = async (id: number) => {
  const response = await fetch(`http://localhost:3000/engine?id=${id}&status=started`, { method: 'PATCH' });
  return response.json();
};

export const driveCar = async (id: number) => {
  const response = await fetch(`http://localhost:3000/engine?id=${id}&status=drive`, { method: 'PATCH' });
  return response.json();
};

export const stopEngine = async (id: number) => {
  const response = await fetch(`http://localhost:3000/engine?id=${id}&status=stopped`, { method: 'PATCH' });
  return response.json();
};
