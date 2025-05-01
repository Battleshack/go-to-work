'use client'

import React from 'react'
import { useGame } from '@/context/GameContext'

export function StatsDisplay() {
  const { state } = useGame()

  return (
    <div className="w-full flex items-end">
      {/* Career Level */}
      <div className="hud-level">
        <div className="career-level-text">Level {state.playerLevel}</div>
      </div>

      {/* Cash */}
      <div className="hud-money">
        <div className="game-subtitle text-stroke-money leading-[0.8]">
          {Math.floor(state.money).toLocaleString('no-NO', { maximumFractionDigits: 0 })} NOK
        </div>
      </div>

      {/* Points */}
      <div className="hud-points">
        <div className="game-subtitle text-stroke-points leading-[0.8]">
          {state.points.toLocaleString()} points
        </div>
      </div>

      {/* Tasks */}
      <div className="hud-tasks">
        <div className="game-subtitle text-stroke-tasks leading-[0.8]">
          {state.tasks.toLocaleString()} tasks
        </div>
      </div>
    </div>
  )
} 