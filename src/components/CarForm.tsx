import React, { useState, useEffect } from 'react';
import { Input, Button, Space } from 'antd';
import { useAppDispatch } from '../hooks/reduxHooks';
import { addCarAsync, updateCarAsync } from '../store/garageSlice';
import { CarFormProps} from '../types/carForm';

const CarForm: React.FC<CarFormProps> = ({ editingCar, onFinishEdit }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    if (editingCar) {
      setName(editingCar.name);
      setColor(editingCar.color);
    }
  }, [editingCar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCar) {
      dispatch(updateCarAsync({ id: editingCar.id, car: { name, color } }));
      onFinishEdit?.();
    } else {
      dispatch(addCarAsync({ name, color }));
    }
    setName('');
    setColor('#000000');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 items-center mb-4">
      <Space>
        <Input
          type="text"
          value={name}
          placeholder="Car name"
          onChange={(e) => setName(e.target.value)}
          style={{ width: 200 }}
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ width: 40, height: 40 }}
        />
        <Button type="primary" htmlType="submit">
          {editingCar ? 'Save' : 'Create'}
        </Button>
      </Space>
    </form>
  );
};

export default CarForm;
