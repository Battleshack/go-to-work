'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export function UpgradeButton() {
  const { state, dispatch } = useGame();
  const { cost, level } = state.upgrades.clickPower;
  const canAfford = state.points >= cost;

  return (
    <button
      onClick={() => dispatch({ type: 'UPGRADE_CLICK_POWER' })}
      disabled={!canAfford}
      className={`
        px-4 py-2 rounded-lg text-white font-semibold
        ${canAfford 
          ? 'bg-game-secondary hover:bg-game-secondary/90 cursor-pointer' 
          : 'bg-gray-500 cursor-not-allowed'}
        transition-colors duration-200
      `}
    >
      <div className="text-sm">Upgrade Click Power</div>
      <div className="text-xs opacity-80">
        Level {level} • Cost: {cost} points
      </div>
    </button>
  );
} 