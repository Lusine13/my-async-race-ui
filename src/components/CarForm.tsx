import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addCar } from '../store/garageSlice';
import { CarFormProps } from '../types/carForm';
import { Car } from '../types/car';

const CarForm: React.FC<Partial<CarFormProps>> = ({
  buttonLabel = 'Create',
  initialName = '',
  initialColor = '#000000',
}) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(initialName);
  const [color, setColor] = useState(initialColor);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCar: Car = {
      id: Date.now(),
      name,
      color,
    };

    dispatch(addCar(newCar));

    setName('');
    setColor('#000000');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap gap-2 items-center mb-4"
    >
      <input
        type="text"
        value={name}
        placeholder="Car name"
        onChange={(e) => setName(e.target.value)}
        className="border p-1 rounded"
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-10 h-10 cursor-pointer"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default CarForm;
