import React, { useState, useEffect } from 'react';
import CarForm from '../components/CarForm';
import RaceControls from '../components/RaceControls';
import Pagination from '../components/Pagination';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { fetchCars, removeCarAsync } from '../store/garageSlice';
import { Car } from '../types/car';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector((state) => state.garage);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const totalPages = Math.ceil(cars.length / carsPerPage) || 1;
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  const handleStartRace = () => console.log('Race started');
  const handleResetRace = () => console.log('Race reset');
  const handleGenerateCars = () => console.log('Generate 100 random cars');
  const handleRemoveCar = (id: number) => dispatch(removeCarAsync(id));

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Garage</h1>

      <CarForm />

      <RaceControls
        onStartRace={handleStartRace}
        onResetRace={handleResetRace}
        onGenerateCars={handleGenerateCars}
      />

      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-2 mt-4">
        {currentCars.length > 0 ? (
          currentCars.map((car: Car) => (
            <div key={car.id} className="border-b pb-2 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-6 rounded"
                  style={{ backgroundColor: car.color }}
                />
                <span>{car.name}</span>
              </div>
              <button
                onClick={() => handleRemoveCar(car.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          !loading && <p className="text-gray-500 italic">No Cars</p>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          if (page > 0 && page <= totalPages) setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Garage;
