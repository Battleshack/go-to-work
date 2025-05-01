'use client'

import { useGame } from '@/context/GameContext'

export function StatsDisplay() {
  const { state } = useGame()

  return (
    <div className="flex justify-between items-end w-full h-[116px]">
      {/* Career Level */}
      <div className="flex flex-col justify-end">
        <div className="flex items-baseline">
          <span className="career-level-text mr-4">LEVEL</span>
          <span className="career-level-value">{state.playerLevel}</span>
        </div>
      </div>

      {/* Cash */}
      <div className="flex flex-col justify-end">
        <div className="game-subtitle text-stroke-money leading-[0.8]">
          $ {state.money.toLocaleString()}
        </div>
      </div>

      {/* Points */}
      <div className="flex flex-col justify-end">
        <div className="game-subtitle text-stroke-points leading-[0.8]">
          {state.points.toLocaleString()} p
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-col justify-end">
        <div className="game-subtitle text-stroke-tasks leading-[0.8]">
          {state.tasks} tasks
        </div>
      </div>
    </div>
  )
} 