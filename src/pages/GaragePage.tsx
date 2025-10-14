import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Col, Row, Space, message, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { fetchCars, removeCarAsync, generateCars, updateCarAsync } from '../store/garageSlice';
import { Car } from '../types/car';
import RaceControls from '../components/RaceControls';
import Pagination from '../components/Pagination';
import CarForm from '../components/CarForm';
import './GaragePage.css';

const GaragePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error } = useAppSelector(state => state.garage);

  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 7;

  const carRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const carTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingColor, setEditingColor] = useState('#ffffff');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const totalPages = Math.ceil(cars.length / carsPerPage) || 1;
  const startIndex = (currentPage - 1) * carsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + carsPerPage);

  const handleStartCar = async (car: Car) => {
    const carDiv = carRefs.current[car.id];
    if (!carDiv) return;

    try {
      const trackDiv = carDiv.parentElement;
      if (!trackDiv) return;
      
      const trackWidth = trackDiv.clientWidth;
      const finishOffset = 50 + carDiv.offsetWidth; 
      const distance = trackWidth - finishOffset;
      
      const time = Math.random() * 3000 + 2000;

      carDiv.classList.add('moving');
      carDiv.style.transition = `transform ${time}ms linear`;
      carDiv.style.transform = `translateX(${distance}px)`;
      
      carTimers.current[car.id] = setTimeout(() => {
        carDiv.classList.remove('moving');
        message.success(`${car.name} finished the race!`);
        // TODO: Save winner here later
      }, time);
    } catch (err) {
      carDiv.style.transition = '';
      carDiv.style.transform = `translateX(0)`;
      carDiv.classList.remove('moving');
      message.error(`${car.name} failed to start`);
    }
  };

  const handleStopCar = (car: Car) => {
    const carDiv = carRefs.current[car.id];
    if (!carDiv) return;

    clearTimeout(carTimers.current[car.id]);
    carDiv.style.transition = '';
    carDiv.style.transform = `translateX(0)`;
    carDiv.classList.remove('moving');
  };

  const handleStartRace = async () => {
    message.info('🏁 Race started!');
    for (const car of currentCars) {
      await handleStartCar(car);
    }
  };

  const handleResetRace = () => {
    message.info('Race reset!');
    currentCars.forEach(car => handleStopCar(car));
  };

  
  const handleRemoveCar = (id: number) => dispatch(removeCarAsync(id));
  const handleGenerateCars = () => dispatch(generateCars());

  const handleUpdateCar = (id: number) => {
    if (!editingName.trim()) {
      message.error('Car name cannot be empty');
      return;
    }
    dispatch(updateCarAsync({ id, car: { name: editingName, color: editingColor } }));
    setEditingCarId(null);
  };

  
  return (
    <div className="p-4">
      <h1 className="garage-title">
        <span className="garage-glow">🏁 Garage</span>
      </h1>

      <CarForm />

      <div className="controls-wrapper">
        <RaceControls
          onStartRace={handleStartRace}
          onResetRace={handleResetRace}
          onGenerateCars={handleGenerateCars}
        />
      </div>

      {loading && <p>Loading cars...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mt-4">
        {currentCars.length > 0 ? (
          currentCars.map(car => (
            <Card key={car.id} size="small" className="race-card">
              <div className="race-track">
                <div className="start-line" />
                <div className="finish-line" />

                <Row align="middle" gutter={16}>
                  <Col>
                    <Space direction="vertical">
                      <Space>
                        <Button danger onClick={() => handleRemoveCar(car.id)}>Delete</Button>

                        {editingCarId === car.id ? (
                          <>
                            <Button type="primary" onClick={() => handleUpdateCar(car.id)}>Save</Button>
                            <Button onClick={() => setEditingCarId(null)}>Cancel</Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => {
                              setEditingCarId(car.id);
                              setEditingName(car.name);
                              setEditingColor(car.color);
                            }}
                          >
                            Edit
                          </Button>
                        )}
                      </Space>

                      <Space>
                        <Button type="primary" onClick={() => handleStartCar(car)}>Start</Button>
                        <Button onClick={() => handleStopCar(car)}>Stop</Button>
                      </Space>
                    </Space>
                  </Col>

                  <Col flex="auto">
                    {editingCarId === car.id ? (
                      <Space>
                        <Input
                          value={editingName}
                          onChange={e => setEditingName(e.target.value)}
                          placeholder="Car name"
                        />
                        <input
                          type="color"
                          value={editingColor}
                          onChange={e => setEditingColor(e.target.value)}
                        />
                      </Space>
                    ) : (
                      <div
                        ref={el => { carRefs.current[car.id] = el; }}
                        className="car"
                        style={{ backgroundColor: car.color }}
                      >
                        {car.name}
                      </div>
                    )}
                  </Col>
                </Row>
              </div>
            </Card>
          ))
        ) : (
          !loading && <p className="text-gray-500 italic">No Cars</p>
        )}
      </div>

      <div className="pagination-wrapper">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => {
            if (page > 0 && page <= totalPages) setCurrentPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default GaragePage;
