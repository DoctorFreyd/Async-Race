import React from 'react';
import CarSvg from '../../components/CarSvg';
import type { Car } from './types';
import { useAppDispatch } from '../../app/hooks';
import { carsAPI } from '../../api';
import { updateRace } from './garageSlice';
const CarCard: React.FC<{
  car: Car;
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}> = ({ car, onSelect, onRemove }) => {
  const dispatch = useAppDispatch();

  const handleStart = async () => {
    dispatch(carsAPI.startEngine(car.id));
  };

  const handleStop = () => {
    dispatch(carsAPI.stopEngine(car.id));
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4">
      <div className="grid grid-cols-14 gap-4 items-center">
        {/* Left controls */}
        <div className="col-span-2 flex flex-col gap-2">
          {/* Select */}
          <button
            onClick={() => onSelect(car.id)}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              car.selected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
            aria-label={`Select ${car.name}`}
          >
            Select
          </button>
          {/* Remove */}
          <button
            onClick={() => onRemove(car.id)}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
            aria-label={`Remove ${car.name}`}
          >
            Remove
          </button>
        </div>

        {/* Engine controls */}
        <div className="col-span-2 flex flex-col gap-2">
          <button
            onClick={handleStart}
            disabled={car.race?.isMoving}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              car.race?.isMoving
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            aria-label={`Start ${car.name}`}
          >
            A
          </button>

          <button
            onClick={handleStop}
            disabled={!car.race?.isMoving}
            className={`px-3 py-1 text-xs rounded transition-colors ${
              car.race?.isMoving
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
            aria-label={`Stop ${car.name}`}
          >
            B
          </button>
        </div>

        {/* Track area */}
        <div className="col-span-8">
          <div className="mb-2">
            <span className="text-white font-medium">{car.name}</span>
          </div>
          <div className="bg-gray-900 border-2 border-gray-600 rounded-lg h-16 relative overflow-hidden">
            {/* Track line */}
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-0.5 bg-gray-600"></div>
            </div>
            {/* Car */}
            <div
              className="absolute top-1/2 left-2 transform -translate-y-1/2"
              style={{
                transform: `translateX(${car.race?.position ?? 0}px) translateY(-50%)`,
                transition: car.race?.isMoving
                  ? `transform ${car.race.durationMs}ms linear`
                  : 'none',
              }}
              onTransitionEnd={() => {
                if (car.race) {
                  dispatch(
                    updateRace({
                      id: car.id,
                      race: {
                        isMoving: false,
                        position: 0,
                        durationMs: 0,
                      },
                    }),
                  );
                }
              }}
            >
              <CarSvg color={car.color} />
            </div>
          </div>
        </div>

        {/* Finish line */}
        <div className="col-span-2 flex justify-center">
          <div className="w-12 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded relative overflow-hidden">
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black">
              FINISH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
