import React, { useState } from 'react';
import CarForm from '../components/CarForm';
import RaceControls from '../components/RaceControls';
import CarList from '../components/CarList';
import Pagination from '../components/Pagination';
import { Car } from '../types/car';

const Garage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([
    { id: 1, name: 'Tesla Model S', color: '#ff0000' },
    { id: 2, name: 'Ford Mustang', color: '#0000ff' },
  ]);
  const [currentPage, setCurrentPage] = useState(1);

  const carsPerPage = 7;
  const totalPages = Math.ceil(cars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  const handleCreateCar = (name: string, color: string) => {
    const newCar = { id: Date.now(), name, color };
    setCars((prev) => [...prev, newCar]);
  };

  const handleStartRace = () => console.log('Race started');
  const handleResetRace = () => console.log('Race reset');
  const handleGenerateCars = () => console.log('Generate 100 random cars');

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Garage</h1>

      <CarForm onSubmit={handleCreateCar} />
      <RaceControls
        onStartRace={handleStartRace}
        onResetRace={handleResetRace}
        onGenerateCars={handleGenerateCars}
      />

      <CarList cars={currentCars} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages || 1}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Garage;
export {};
