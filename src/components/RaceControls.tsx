import React from 'react';
import { RaceControlsProps } from '../types/raceControls';

const RaceControls: React.FC<RaceControlsProps> = ({
  onStartRace,
  onResetRace,
  onGenerateCars,
}) => (
  <div className="flex flex-wrap gap-3 mb-6">
    <button
      onClick={onStartRace}
      className="bg-green-600 text-white px-3 py-1 rounded"
    >
      Start Race
    </button>
    <button
      onClick={onResetRace}
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Reset Race
    </button>
    <button
      onClick={onGenerateCars}
      className="bg-gray-600 text-white px-3 py-1 rounded"
    >
      Generate 100 Cars
    </button>
  </div>
);

export default RaceControls;

