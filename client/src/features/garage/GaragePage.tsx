import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { carsAPI } from '../../api';

const GaragePage: React.FC = () => {
  const { cars, loading, error } = useAppSelector((state) => state.garage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(carsAPI.getCars());
  }, []);
  console.log(cars);
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline text-yellow-500">Garage Page!</h1>
        {loading && <h1 className="text-3xl font-bold underline text-yellow-500">Loading...</h1>}
        {error && <h1 className="text-3xl font-bold underline text-red-500"> Error:{error}</h1>}
        {cars.map((item) => (
          <div key={item.id}>
            <h1 className="text-3xl font-bold underline text-blue-700">The Car</h1>
            <h1 className="text-3xl font-bold underline text-blue-400"> Name: {item.name}</h1>
            <h1 className="text-3xl font-bold underline text-blue-400"> Color: {item.color}</h1>
          </div>
        ))}
      </div>
    </>
  );
};

export default GaragePage;
