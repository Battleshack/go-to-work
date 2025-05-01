'use client'

import { useGame } from '@/context/GameContext'
import { CareerBarometer } from './CareerBarometer'
import { CareerTitle } from './CareerTitle'
import { GameButton } from './GameButton'
import { JobListing } from './JobListing'
import { StatsDisplay } from './StatsDisplay'

export function GameScreen() {
  const { state } = useGame()

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Top Section */}
      <div className="flex justify-between items-start p-4 h-[7.25rem]">
        <StatsDisplay />
      </div>

      {/* Middle Section */}
      <div className="flex flex-1 gap-4 p-4">
        {/* Left Panel */}
        <div className="w-[32rem] flex gap-6">
          <CareerBarometer level={state.playerLevel} />
          <CareerTitle title={state.currentPosition} />
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex items-center justify-center">
          <GameButton />
        </div>

        {/* Right Panel */}
        <div className="w-[32rem] flex justify-end items-center">
          <JobListing 
            title="Senior Position"
            description="This is a senior position with great benefits"
            type="promotion"
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center gap-4 p-4 h-[16rem]">
        <JobListing 
          title="Lateral Move"
          description="Similar level, different department"
          type="lateral"
        />
        <JobListing 
          title="Special Project"
          description="Temporary assignment with bonus potential"
          type="special"
        />
        <JobListing 
          title="Training Opportunity"
          description="Learn new skills for future advancement"
          type="training"
        />
      </div>
    </div>
  )
} 