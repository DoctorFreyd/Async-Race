import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carsAPI } from '../../api';
import ControlBar from '../../components/ControlBar';
import GarageList from './GarageList';
import { ThreeDot } from 'react-loading-indicators';
import { selectCar } from './garageSlice';

const GaragePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error, selectedCarId } = useAppSelector((state) => state.garage);

  useEffect(() => {
    dispatch(carsAPI.getCars());
  }, [dispatch]);

  const handleSelect = (id: number) => {
    dispatch(selectCar(id));
  };

  const handleRemove = (id: number) => {
    dispatch(carsAPI.deleteCar(id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <ControlBar />
        {loading && (
          <div className="flex justify-center items-center py-10">
            <ThreeDot variant="bounce" color="#003f85" size="medium" />
          </div>
        )}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}
        {!loading && !error && cars.length > 0 && (
          <GarageList
            cars={cars.map((car) => ({ ...car, selected: car.id === selectedCarId }))}
            onSelect={handleSelect}
            onRemove={handleRemove}
          />
        )}
        {!loading && !error && cars.length === 0 && (
          <div className="text-center py-10 text-gray-400">No cars in the garage.</div>
        )}
      </div>
    </div>
  );
};

export default GaragePage;
