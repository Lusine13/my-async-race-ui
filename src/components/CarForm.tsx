import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addCarAsync } from '../store/garageSlice';


const CarForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(
      addCarAsync({
        name,
        color,
      })
    );

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
        Create
      </button>
    </form>
  );
};

export default CarForm;
