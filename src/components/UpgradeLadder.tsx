'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

interface UpgradeButtonProps {
  name: string;
  description: string;
  cost: number;
  level: number;
  unlocked: boolean;
  canAfford: boolean;
  onClick: () => void;
}

function UpgradeButton({ name, description, cost, level, unlocked, canAfford, onClick }: UpgradeButtonProps) {
  if (!unlocked) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg opacity-50">
        <div className="text-gray-400">???</div>
        <div className="text-xs text-gray-500">Unlock at higher level</div>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={!canAfford}
      className={`
        w-full p-4 rounded-lg text-left transition-all duration-200
        ${canAfford 
          ? 'bg-game-secondary hover:bg-game-secondary/90 cursor-pointer' 
          : 'bg-gray-700 cursor-not-allowed'}
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-xs opacity-80">{description}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">Level {level}</div>
          <div className="text-xs opacity-80">Cost: {cost}</div>
        </div>
      </div>
    </button>
  );
}

export function UpgradeLadder() {
  const { state, dispatch } = useGame();

  return (
    <div>
      <h2 className="text-xl font-bold text-white mb-4 text-center">Upgrades</h2>
      <div className="flex gap-4">
        <UpgradeButton
          name="Click Power"
          description={`+${state.upgrades.clickPower.baseEffect} points per click`}
          cost={state.upgrades.clickPower.cost}
          level={state.upgrades.clickPower.level}
          unlocked={state.upgrades.clickPower.unlocked}
          canAfford={state.points >= state.upgrades.clickPower.cost}
          onClick={() => dispatch({ type: 'UPGRADE_CLICK_POWER' })}
        />

        <UpgradeButton
          name="Auto Clicker"
          description={`Clicks automatically every second (Level 3+)`}
          cost={state.upgrades.autoClicker.cost}
          level={state.upgrades.autoClicker.level}
          unlocked={state.upgrades.autoClicker.unlocked}
          canAfford={state.points >= state.upgrades.autoClicker.cost}
          onClick={() => dispatch({ type: 'UPGRADE_AUTO_CLICKER' })}
        />

        <UpgradeButton
          name="Point Multiplier"
          description={`Multiplies all points gained by ${state.upgrades.multiplier.baseEffect} (Level 5+)`}
          cost={state.upgrades.multiplier.cost}
          level={state.upgrades.multiplier.level}
          unlocked={state.upgrades.multiplier.unlocked}
          canAfford={state.points >= state.upgrades.multiplier.cost}
          onClick={() => dispatch({ type: 'UPGRADE_MULTIPLIER' })}
        />
      </div>
    </div>
  );
} 