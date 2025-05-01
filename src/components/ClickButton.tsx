'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export function ClickButton() {
  const { state, dispatch } = useGame();

  const handleClick = () => {
    const multiplier = 1 + (state.upgrades.multiplier.level * state.upgrades.multiplier.baseEffect);
    const pointsGained = state.clickPower * multiplier;
    dispatch({
      type: 'ADD_POINTS',
      amount: pointsGained
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