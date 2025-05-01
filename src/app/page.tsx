'use client';

import { ClickButton } from '@/components/ClickButton';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { UpgradeLadder } from '@/components/UpgradeLadder';
import { LevelDisplay } from '@/components/LevelDisplay';
import { PositionBrowser } from '@/components/PositionBrowser';
import { useGame } from '@/context/GameContext';

export default function Home() {
  const { state } = useGame();
  const progressPercentage = ((state.playerLevel - 1) / 14) * 100; // 14 levels (1 to 15)
  
  // Generate level indicator lines
  const levelIndicators = Array.from({ length: 14 }, (_, i) => (
    <div 
      key={i} 
      className="absolute w-full h-[1px]"
      style={{ 
        bottom: `${(i + 1) * (100 / 15)}%`,
        backgroundColor: i < (state.playerLevel - 1) ? '#0FAFC0' : '#252525',
        opacity: 0.5
      }} 
    />
  ));

  return (
    <main className="min-h-screen bg-[#DADADA] relative">
      {/* Stats Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 pt-4">
        {/* Stats Row */}
        <div className="flex items-start w-full">
          {/* Level Display and Position */}
          <div className="pl-8">
            <div className="text-[#FF521D] text-[96px] font-inter font-black leading-none tracking-[1.92px] whitespace-nowrap">
              <span>LEVEL </span>
              <span>{state.playerLevel}</span>
            </div>
            {/* Position Indicator - Compact */}
            <div className="mt-2 inline-flex bg-[#FF521D] py-2 px-4">
              <span className="font-['Impact'] text-2xl leading-tight text-black whitespace-nowrap">
                Senior Assistant
              </span>
            </div>
          </div>

          {/* Center Stats */}
          <div className="flex-1 flex justify-center gap-32">
            {/* Money */}
            <div className="text-center">
              <div className="text-[#47C97D] text-[64px] font-inter font-black whitespace-nowrap leading-none">
                $ {state.money}
              </div>
            </div>

            {/* Points */}
            <div className="text-center">
              <div className="text-[#F0F558] text-[64px] font-inter font-black whitespace-nowrap leading-none">
                {state.points} p
              </div>
            </div>
          </div>

          {/* Tasks - Right Edge */}
          <div className="pr-8">
            <div className="text-[#252525] text-[48px] font-inter font-black whitespace-nowrap leading-none">
              {state.tasks} completed tasks
            </div>
          </div>
        </div>
      </div>

      {/* Level Progress Bar */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 w-[84px] h-[600px] bg-[#DADADA] overflow-hidden">
        {levelIndicators}
        <div 
          className="absolute bottom-0 w-full bg-[#0FAFC0] transition-all duration-500" 
          style={{ height: `${progressPercentage}%` }} 
        />
        <div className="absolute top-0 w-full h-[600px] bg-[#E9E977] bg-opacity-64 shadow-[inset_0px_0px_24px_16px_#E9E977]" />
      </div>

      {/* Game Area */}
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)] mt-32">
        <ClickButton />
      </div>

      {/* Position Browser - Floating on the right */}
      <div className="fixed right-8 top-32 w-[400px]">
        <PositionBrowser />
      </div>

      {/* Upgrades - Center bottom */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <UpgradeLadder />
      </div>
    </main>
  );
} 