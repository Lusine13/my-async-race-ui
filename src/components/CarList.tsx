import React from 'react';
import CarItem from './CarItem';
import { CarListProps } from '../types/carList';

const CarList: React.FC<CarListProps> = ({ cars }) => {
  if (cars.length === 0) {
    return <p className="text-gray-500 italic">No Cars</p>;
  }

  return (
    <div className="space-y-2">
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;

