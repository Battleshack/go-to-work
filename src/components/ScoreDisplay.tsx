'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export function ScoreDisplay() {
  const { state } = useGame();

  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-bold text-white">
        {state.points.toLocaleString()} points
      </div>
      <div className="text-sm text-gray-300">
        {state.clickPower} points per click
      </div>
      {state.upgrades.autoClicker.level > 0 && (
        <div className="text-xs text-gray-400">
          Auto-clicking {state.upgrades.autoClicker.level} times per second
        </div>
      )}
      {state.upgrades.multiplier.level > 0 && (
        <div className="text-xs text-gray-400">
          Point multiplier: {1 + (state.upgrades.multiplier.level * state.upgrades.multiplier.baseEffect)}x
        </div>
      )}
    </div>
  );
} 