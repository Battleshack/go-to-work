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
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <div className="text-2xl font-bold text-white">
          {currentLevel.title}
        </div>
        <div className="text-lg text-gray-200">Level {state.playerLevel}</div>
      </div>

      <div className="w-64">
        <div className="flex justify-between text-sm text-gray-200 mb-1">
          <span>{state.experience}</span>
          <span>{state.experienceToNextLevel}</span>
        </div>
        <div className="w-full bg-game-primary/30 rounded-full h-4">
          <div
            className="bg-game-secondary h-full rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, experiencePercentage)}%` }}
          />
        </div>
      </div>
    </div>
  );
} 