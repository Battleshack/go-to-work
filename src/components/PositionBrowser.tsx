'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Position, Organization } from '@/types/organization';

interface AvailableMove {
  position: Position;
  cost: number;
}

export function PositionBrowser() {
  const { state, dispatch } = useGame();
  const { currentPosition, playerPosition, organization, points } = state;

  if (!organization) {
    return <div>Loading organization data...</div>;
  }

  // Get all positions from all departments in all divisions
  const allPositions = organization.divisions.flatMap(division => 
    division.departments.flatMap(dept => dept.positions)
  );

  // Get available moves based on current position
  const availableMoves: AvailableMove[] = allPositions.filter(pos => 
    pos.title !== currentPosition && 
    (playerPosition?.timeInPosition ?? 0) >= 1 // Require at least 1 year in position
  ).map(pos => ({
    position: pos,
    cost: 100 // Base cost for now, can be adjusted based on level difference etc.
  }));

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
          {currentPosition}
        </div>
        <div className="mt-2 text-sm text-gray-600">
          <div>Time in Position: {playerPosition?.timeInPosition ?? 0} years</div>
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
          </div>
        ))}
      </div>
    </div>
  );
} 