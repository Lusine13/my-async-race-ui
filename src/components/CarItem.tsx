import React from 'react';
import { CarItemProps } from '../types/carItem';

const CarItem: React.FC<CarItemProps> = ({ car }) => (
  <div className="flex items-center gap-3 border-b py-2">
    <div
      className="w-12 h-6 rounded"
      style={{ backgroundColor: car.color }}
    />
    <span>{car.name}</span>
  </div>
);

export default CarItem;
