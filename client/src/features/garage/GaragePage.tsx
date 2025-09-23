import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carsAPI } from '../../api';
import ControlBar from '../../components/ControlBar';
import GarageList from './GarageList';
import { ThreeDot } from 'react-loading-indicators';
const GaragePage: React.FC = () => {
  const { cars, loading, error } = useAppSelector((state) => state.garage);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsAPI.getCars());
  }, []);
  console.log(cars, 'get all cars');

  const handleSelect = (id: number) => {
    setSelectedCarId(id);
    console.log('handleSelect:', id);
  };
  const handleRemove = (id: number) => {
    dispatch(carsAPI.deleteCar(id));
    console.log('Remove Car: ', id);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-5xl mx-auto">
          {/* Controler Bar */}
          <ControlBar selectedCarId={selectedCarId} />
          {/* State Loading */}
          {loading && (
            <div className="flex justify-center items-center py-10">
              <ThreeDot
                variant="bounce"
                color="#003f85"
                size="medium"
                text="loading"
                textColor=""
              />
            </div>
          )}
          {/* Error */}
          {error && <div className="text-center py-10 text-red-500">{error}</div>}
          {/* Car List */}
          {!loading && !error && cars.length > 0 && (
            <div>
              <GarageList cars={cars} onSelect={handleSelect} onRemove={handleRemove} />
            </div>
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
