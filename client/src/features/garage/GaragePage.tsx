import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carsAPI } from '../../api';
import ControlBar from '../../components/ControlBar';
import GarageList from './GarageList';
import { ThreeDot } from 'react-loading-indicators';
import { selectCar, garageSlice } from './garageSlice';
import type { Car } from './types';

const GaragePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { cars, loading, error, selectedCarId, page, limit, totalCount } = useAppSelector(
    (state) => state.garage,
  );

  const totalPages = Math.ceil(totalCount / limit);

  useEffect(() => {
    dispatch(carsAPI.getCars({ page, limit }));
  }, [dispatch, page, limit]);

  const handleSelect = (id: number) => {
    dispatch(selectCar(id));
  };

  const handleRemove = async (id: number) => {
    try {
      await dispatch(carsAPI.deleteCar(id)).unwrap();
      if (cars.length === 1 && page > 1) {
        dispatch(garageSlice.actions.setPage(page - 1));
        await dispatch(carsAPI.getCars({ page: page - 1, limit })).unwrap();
      } else {
        await dispatch(carsAPI.getCars({ page, limit })).unwrap();
      }
    } catch {}
  };

  const handlePrev = () => {
    if (page > 1) dispatch(garageSlice.actions.setPage(page - 1));
  };

  const handleNext = () => {
    if (page < totalPages) dispatch(garageSlice.actions.setPage(page + 1));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 bg-gray-900/80 backdrop-blur-md">
      <div className="w-full max-w-5xl px-4">
        <ControlBar />

        {loading && (
          <div className="flex justify-center items-center py-10">
            <ThreeDot variant="bounce" color="#003f85" size="medium" />
          </div>
        )}

        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {!loading && !error && cars.length > 0 && (
          <>
            <GarageList
              cars={cars.map((car: Car) => ({ ...car, selected: car.id === selectedCarId }))}
              onSelect={handleSelect}
              onRemove={handleRemove}
            />

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md font-medium ${
                  page === 1
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Prev
              </button>

              <span className="text-gray-200 font-medium">
                Page {page} / {totalPages}
              </span>

              <button
                onClick={handleNext}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md font-medium ${
                  page === totalPages
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {!loading && !error && cars.length === 0 && (
          <div className="text-center py-10 text-gray-400">No cars in the garage.</div>
        )}
      </div>
    </div>
  );
};

export default GaragePage;
