'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export function ScoreDisplay() {
  const { state } = useGame();
  
  // Calculate click power from upgrades
  const baseClickPower = (state.upgrades.clickPower.level + 1) * (state.upgrades.clickPower.baseEffect ?? 1);
  const multiplier = 1 + (state.upgrades.multiplier.level * (state.upgrades.multiplier.baseEffect ?? 0.5));
  const clickPower = baseClickPower * multiplier;

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white">
        {state.points.toLocaleString()} points
      </div>
      <div className="text-sm text-gray-300">
        {clickPower.toFixed(1)} points per click
      </div>
      {state.upgrades.autoClicker.level > 0 && (
        <div className="text-xs text-gray-400">
          +{state.upgrades.autoClicker.level} points/sec from auto-clicker
        </div>
      )}
      <div className="text-sm text-green-400">
        ${state.money.toLocaleString()}
      </div>
      <div className="text-xs text-blue-300">
        Level {state.playerLevel} ({state.experience}/{state.experienceToNextLevel} XP)
      </div>
      <div className="text-xs text-purple-300">
        Tasks completed: {state.tasks}
      </div>
    </div>
  );
} 