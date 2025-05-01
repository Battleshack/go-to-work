'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Organization, Position, calculateMovementCost } from '@/types/organization';

interface OrganizationChartProps {
  organization: Organization;
  skillGaps: any[]; // We'll type this properly when you provide the CSV
}

export function OrganizationChart({ organization, skillGaps }: OrganizationChartProps) {
  const { state } = useGame();
  const [selectedDivision, setSelectedDivision] = React.useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = React.useState<string | null>(null);
  const [hoveredPosition, setHoveredPosition] = React.useState<Position | null>(null);

  const renderPosition = (position: Position) => {
    const isAvailable = position.level <= state.playerLevel;
    const movementCost = hoveredPosition && calculateMovementCost(hoveredPosition, position, skillGaps);

    return (
      <div
        key={position.id}
        className={`
          p-4 rounded-lg border-2 transition-all duration-200
          ${isAvailable 
            ? 'border-game-secondary cursor-pointer hover:bg-game-secondary/10' 
            : 'border-gray-700 opacity-50 cursor-not-allowed'}
        `}
        onMouseEnter={() => setHoveredPosition(position)}
        onMouseLeave={() => setHoveredPosition(null)}
      >
        <div className="font-semibold text-white">{position.title}</div>
        <div className="text-sm text-gray-400">Level {position.level}</div>
        <div className="text-xs text-gray-500">
          Base Salary: ${position.baseSalary.toLocaleString()}
        </div>
        {hoveredPosition && hoveredPosition.id !== position.id && (
          <div className="mt-2 text-xs">
            <div className="text-yellow-400">
              Cost to Move: {movementCost?.toLocaleString()} points
            </div>
            <div className="text-gray-400">
              Required Skills: {position.requiredSkills.join(', ')}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDepartment = (departmentId: string, positions: Position[]) => {
    const department = organization.divisions
      .flatMap(d => d.departments)
      .find(d => d.id === departmentId);

    if (!department) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">{department.name}</h3>
        <p className="text-sm text-gray-400">{department.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {positions.map(renderPosition)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {organization.divisions.map(division => (
          <button
            key={division.id}
            onClick={() => setSelectedDivision(division.id)}
            className={`
              px-4 py-2 rounded-lg whitespace-nowrap
              ${selectedDivision === division.id 
                ? 'bg-game-primary text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
            `}
          >
            {division.name}
          </button>
        ))}
      </div>

      {selectedDivision && (
        <div className="space-y-8">
          {organization.divisions
            .find(d => d.id === selectedDivision)
            ?.departments.map(dept => renderDepartment(dept.id, dept.positions))}
        </div>
      )}
    </div>
  );
} 