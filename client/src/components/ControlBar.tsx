import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { carsAPI } from '../api';
import { winnersAPI } from '../api';
import toast from 'react-hot-toast';
import { selectCar } from '../features/garage/garageSlice';
import { type Car } from '../features/garage/types';
import { type RaceResult } from '../features/winners/types';

interface ControlBarProps {}

const DEFAULT_COLOR = '#ffffff';
const ALERT_ENTER_NAME = 'Please enter a car name';
const ALERT_SELECT_CAR = 'Please select a car to update';

const ControlBar: React.FC<ControlBarProps> = () => {
  const [carName, setCarName] = useState<string>('');
  const [carColor, setCarColor] = useState<string>(DEFAULT_COLOR);
  const dispatch = useAppDispatch();
  const { cars } = useAppSelector((state) => state.garage);
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);

  const resetForm = () => {
    setCarName('');
    setCarColor(DEFAULT_COLOR);
  };

  const handleCreate = async (): Promise<void> => {
    if (!carName.trim()) return alert(ALERT_ENTER_NAME);

    try {
      const newCar = await dispatch(carsAPI.createCar({ name: carName, color: carColor })).unwrap();
      dispatch(selectCar(newCar.id));
      resetForm();
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleUpdate = async (): Promise<void> => {
    if (!selectedCarId) return alert(ALERT_SELECT_CAR);
    if (!carName.trim()) return alert(ALERT_ENTER_NAME);

    try {
      await dispatch(
        carsAPI.updateCar({ id: selectedCarId, name: carName, color: carColor }),
      ).unwrap();
      resetForm();
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleGenerate = async (): Promise<void> => {
    const toastId = toast.loading('Generating the Cars...');
    try {
      await dispatch(carsAPI.createRandomCars(100)).unwrap();
      await dispatch(carsAPI.getCars({ page: 1, limit: 7 })).unwrap();

      const { cars } = useAppSelector((state) => state.garage);
      if (cars.length > 0) dispatch(selectCar(cars[0].id));

      toast.success('Generated 100 cars!', { id: toastId });
    } catch (err) {
      toast.error('Error generating cars', { id: toastId });
    }
  };
  const handleRace = async () => {
    try {
      const raceResults = await Promise.all(
        cars.map(async (car: Car) => {
          const { velocity, distance } = await dispatch(carsAPI.startEngine(car.id)).unwrap();
          const time = distance / velocity;
          return { id: car.id, name: car.name, time };
        }),
      );

      const winner: RaceResult = raceResults.reduce<RaceResult>(
        (prev: RaceResult, curr: RaceResult) => (curr.time < prev.time ? curr : prev),
        raceResults[0],
      );

      await dispatch(
        winnersAPI.createWinner({
          id: winner.id,
          name: winner.name,
          wins: 1,
          bestTime: winner.time,
        }),
      ).unwrap();
      toast.success('Race completed!');
    } catch (error) {
      toast.error('Race failed');
    }
  };
  const handleReset = async () => {
    try {
      const resetPromises = cars.map((car: Car) => dispatch(carsAPI.stopEngine(car.id)).unwrap());
      await Promise.allSettled(resetPromises);
    } catch {
      toast.error('Reset failed');
    }
  };
  return (
    <section className="bg-gray-900/80 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-6">
        {/* Input field */}
        <div className="flex items-center gap-2">
          <label htmlFor="car-name" className="text-sm font-medium text-gray-200">
            Car Name:
          </label>
          <input
            id="car-name"
            type="text"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            placeholder="Enter car name"
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Color picker */}
        <div className="flex items-center gap-2">
          <label htmlFor="car-color" className="text-sm font-medium text-gray-200">
            Color:
          </label>
          <input
            id="car-color"
            type="color"
            value={carColor}
            onChange={(e) => setCarColor(e.target.value)}
            className="w-10 h-10 rounded-md border border-gray-500 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow transition"
          >
            Create
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg shadow transition"
          >
            Update
          </button>
          <button
            onClick={handleGenerate}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg shadow transition"
          >
            Generate
          </button>
          <button
            onClick={handleRace}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition"
          >
            Race
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg shadow transition"
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default ControlBar;
