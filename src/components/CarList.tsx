import React from 'react';
import CarItem from './CarItem';
import { Car } from '../types/car';
import { useAppSelector } from '../hooks/reduxHooks';

const CarList: React.FC = () => {
  const cars = useAppSelector((state) => state.garage.cars);

  if (cars.length === 0) {
    return <p className="text-gray-500 italic">No Cars</p>;
  }

  return (
    <div className="space-y-2">
      {cars.map((car: Car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
