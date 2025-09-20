import type { Car } from './types';
import CarCard from './CarCard';

const GarageList: React.FC<{
  cars: Car[];
  onSelect: (id: number) => void;
  onRemove: (id: number) => void;
}> = ({ cars, onSelect, onRemove }) => {
  return (
    <div>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onSelect={() => onSelect(car.id)}
          onRemove={() => onRemove(car.id)}
        />
      ))}
    </div>
  );
};

export default GarageList;
