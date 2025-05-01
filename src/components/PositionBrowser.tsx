'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Position } from '@/types/organization';

export function PositionBrowser() {
  const { state, dispatch } = useGame();
  const { position, availableMoves, points } = state;

  if (!position) {
    return <div>Loading position data...</div>;
  }

  const handlePositionChange = (newPosition: Position, cost: number) => {
    dispatch({
      type: 'CHANGE_POSITION',
      position: newPosition,
      cost
    });
  };

  return (
    <div>
      {/* Current Position */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Current Position</h3>
        <div className="inline-block bg-red-100 border border-red-300 px-3 py-2 rounded">
          {position.currentPosition.title}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <div>Division: {position.currentPosition.division}</div>
          <div>Department: {position.currentPosition.department}</div>
          <div>Salary: ${position.salary.toLocaleString()}</div>
          <div>Years: {position.yearsInPosition}</div>
        </div>
      </div>

      {/* Available Positions */}
      <h3 className="text-lg font-bold mb-3">Available Positions</h3>
      <div className="space-y-4">
        {availableMoves.map(({ position: newPosition, cost }) => (
          <div
            key={newPosition.id}
            className="bg-yellow-100 border border-yellow-300 p-4 rounded shadow-lg transform hover:-rotate-1 transition-transform"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-lg">{newPosition.title}</h4>
                <p className="text-sm text-gray-600">
                  {newPosition.division} - {newPosition.department}
                </p>
                <p className="text-sm font-semibold">
                  Salary: ${newPosition.baseSalary.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handlePositionChange(newPosition, cost)}
                disabled={points < cost}
                className={`px-4 py-2 rounded text-sm border-2 border-double ${
                  points >= cost
                    ? 'bg-red-500 text-white hover:bg-red-600 border-black'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400'
                }`}
              >
                Move
                <div className="text-xs">
                  Cost: {cost.toLocaleString()} points
                </div>
              </button>
            </div>

            <div className="mt-3">
              <h5 className="text-sm font-semibold">Required Skills:</h5>
              <ul className="list-disc list-inside">
                {newPosition.requiredSkills.map((skill) => (
                  <li
                    key={skill}
                    className={`text-sm ${
                      position.acquiredSkills.includes(skill)
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 