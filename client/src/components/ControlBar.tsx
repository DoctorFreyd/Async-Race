import React from 'react';

const ControlBar: React.FC = () => {
  return (
    <section className="bg-gray-900/80 backdrop-blur-md p-5 rounded-2xl border border-gray-700 shadow-lg max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-6">
        {/* Поле ввода имени */}
        <div className="flex items-center gap-2">
          <label htmlFor="car-name" className="text-sm font-medium text-gray-200">
            Car Name:
          </label>
          <input
            id="car-name"
            type="text"
            placeholder="Enter car name"
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Выбор цвета */}
        <div className="flex items-center gap-2">
          <label htmlFor="car-color" className="text-sm font-medium text-gray-200">
            Color:
          </label>
          <input
            id="car-color"
            type="color"
            className="w-10 h-10 rounded-md border border-gray-500 cursor-pointer"
          />
        </div>

        {/* Кнопки управления */}
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow transition">
            Create
          </button>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg shadow transition">
            Update
          </button>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg shadow transition">
            Generate
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow transition">
            Race
          </button>
          <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg shadow transition">
            Reset
          </button>
        </div>
      </div>
    </section>
  );
};

export default ControlBar;
