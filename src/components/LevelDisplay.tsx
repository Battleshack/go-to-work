'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { LEVELS } from '@/types/levels';

export function LevelDisplay() {
  const { state } = useGame();
  const currentLevel = LEVELS[state.playerLevel];
  const nextLevel = LEVELS[state.playerLevel + 1];
  const experiencePercentage = (state.experience / state.experienceToNextLevel) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {currentLevel.title}
          </h2>
          <div className="text-sm text-gray-400">Level {state.playerLevel}</div>
        </div>
        {nextLevel && (
          <div className="text-right">
            <div className="text-sm text-gray-400">Next:</div>
            <div className="text-md text-gray-300">{nextLevel.title}</div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {currentLevel.description.map((line, index) => (
          <p key={index} className="text-gray-300 text-sm italic">
            {line}
          </p>
        ))}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Experience: {state.experience}</span>
          <span>{state.experienceToNextLevel}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-yellow-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, experiencePercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
} 