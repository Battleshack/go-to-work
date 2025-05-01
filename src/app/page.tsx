'use client';

import { useGame } from '@/context/GameContext';
import { GameScreen } from '@/components/GameScreen';

export default function Home() {
  return (
    <div className="container mx-auto max-w-[1920px] h-[1080px]">
      <GameScreen />
    </div>
  );
} 