import CarSvg from '../../components/CarSvg';
import type { Car } from './types';
const CarCard: React.FC<{
  car: Car;
  onSelect: () => void;
  onRemove: () => void;
}> = ({ car, onSelect, onRemove }) => (
  <div className="bg-gray-800 rounded-lg border border-gray-700 p-4 mb-4">
    <div className="grid grid-cols-12 gap-4 items-center">
      {/* Left controls */}
      <div className="col-span-2 flex flex-col gap-2">
        <button
          onClick={onSelect}
          className={`px-3 py-1 text-xs rounded transition-colors ${
            car.selected ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          aria-label={`Select ${car.name}`}
        >
          Select
        </button>
        <button
          onClick={onRemove}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
          aria-label={`Remove ${car.name}`}
        >
          Remove
        </button>
        <div className="flex justify-center">
          <CarSvg color={car.color} />
        </div>
      </div>

      {/* Track area */}
      <div className="col-span-8">
        <div className="mb-2">
          <span className="text-white font-medium">{car.name}</span>
        </div>
        <div className="bg-gray-900 border-2 border-gray-600 rounded-lg h-16 relative overflow-hidden">
          {/* Track lines */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-0.5 bg-gray-600"></div>
          </div>
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <CarSvg color={car.color} />
          </div>
        </div>
      </div>

      {/* Finish line */}
      <div className="col-span-2 flex justify-center">
        <div className="w-12 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-repeating-linear-gradient bg-gradient-to-br from-transparent via-black/20 to-transparent bg-[length:8px_8px]"></div>
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black">
            FINISH
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CarCard;
