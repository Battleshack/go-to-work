'use client'

import { useGame } from '@/context/GameContext'

export function GameButton() {
  const { addPoints } = useGame()

  return (
    <button
      onClick={() => addPoints(1)}
      className="game-button w-[26rem] h-[10rem]"
    >
      <span className="game-text">WORK</span>
    </button>
  )
} 