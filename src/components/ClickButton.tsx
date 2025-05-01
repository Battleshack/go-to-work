'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { GAME_CONFIG } from '../constants/gameConfig';

export function ClickButton() {
  const { state, dispatch } = useGame();

  const handleClick = () => {
    // Calculate points gained
    const baseEffect = state.upgrades.multiplier.baseEffect ?? 0.5;
    const multiplier = 1 + (state.upgrades.multiplier.level * baseEffect);
    const clickPower = (state.upgrades.clickPower.level + 1) * (state.upgrades.clickPower.baseEffect ?? 1);
    const pointsGained = clickPower * multiplier;
    
    // Add points
    dispatch({
      type: 'ADD_POINTS',
      payload: pointsGained
    });

    // Add task completion
    dispatch({ type: 'ADD_TASK' });

    // Calculate and add money earned
    const startingSalary = GAME_CONFIG.STARTING_SALARY;
    const moneyEarned = startingSalary + ((startingSalary * (state.playerLevel / 15)) * state.playerLevel);
    dispatch({
      type: 'ADD_MONEY',
      payload: moneyEarned
    });

    // Add experience
    dispatch({
      type: 'GAIN_EXPERIENCE',
      amount: Math.floor(pointsGained * 0.1)
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-[26rem] h-[10.375rem] flex justify-center items-center px-8 py-4 rounded-2xl border-4 border-[#252525] bg-[#FFECC3] text-[#252525] font-black text-[4rem] hover:bg-[#FFE4B0] active:transform active:scale-95 transition-all"
    >
      WORK
    </button>
  );
} 