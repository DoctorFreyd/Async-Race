import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carsAPI } from '../../api';
import ControlBar from '../../components/ControlBar';
import GarageList from './GarageList';

const GaragePage: React.FC = () => {
  const { cars, loading, error } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsAPI.getCars());
  }, []);
  console.log(cars);

  const handleSelect = (id: number) => {
    console.log('Selected Car: ', id);
  };
  const handleRemove = (id: number) => {
    console.log('Remove Car: ', id);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto">
          {/* Controler Bar */}
          <ControlBar />
          {/* State Loading */}
          {loading && <div className="text-center py-10 text-gray-300">Loading cars...</div>}
          {/* Error */}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          {/* Car List */}
          {!loading && !error && cars.length > 0 && (
            <GarageList cars={cars} onSelect={handleSelect} onRemove={handleRemove} />
          )}
          {/* Empty State */}
          {!loading && !error && cars.length === 0 && (
            <div className="text-center py-10 text-gray-400">No cars in the garage.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default GaragePage;
