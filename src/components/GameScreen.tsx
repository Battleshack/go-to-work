'use client'

import { useGame } from '@/context/GameContext'
import { CareerBarometer } from './CareerBarometer'
import { CareerTitle } from './CareerTitle'
import { ClickButton } from './ClickButton'
import { JobListing } from './JobListing'
import { StatsDisplay } from './StatsDisplay'
import { LevelDisplay } from './LevelDisplay'
import { Z_INDEX } from '../constants/zIndex'

export function GameScreen() {
  const { state } = useGame()

  return (
    <div className="container mx-auto max-w-[1920px] h-screen flex flex-col p-8 gap-8" id="game-screen">
      {/* HUD (Heads-Up Display) */}
      <div className="flex-none w-full p-[10px]" id="game-hud">
        <StatsDisplay />
      </div>

      {/* Main Gameplay Area */}
      <div className="flex-1 flex gap-8 relative" id="gameplay-area">
        {/* Career Ladder - Left Panel */}
        <div className="w-1/4 min-w-[20rem] max-w-[32rem] flex flex-row gap-6 min-h-0" id="career-ladder">
          <div className="flex-none flex flex-col gap-2 h-full">
            <CareerBarometer level={state.playerLevel} />
          </div>
          <div className="flex-none">
            <CareerTitle title={state.currentPosition} />
          </div>
        </div>

        {/* Core Gameplay - Center Panel */}
        <div className="flex-1 flex flex-col min-w-0" id="core-gameplay">
          {/* Action Area */}
          <div className="flex-1 relative" id="action-area">
            <div className="absolute inset-0 flex items-center justify-center overflow-visible">
              <ClickButton />
            </div>
          </div>

          {/* Upgrades Section */}
          <div className="flex justify-center overflow-visible" id="upgrades-section">
            <div className="flex items-end gap-4">
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
        </div>

        {/* Opportunities Panel - Right Side */}
        <div 
          className="w-1/4 min-w-[20rem] max-w-[32rem] flex flex-col justify-start items-end pt-8" 
          id="opportunities-panel"
          style={{ position: 'relative', zIndex: Z_INDEX.OPPORTUNITIES }}
        >
          <div className="w-[90%]">
            <JobListing 
              title="Senior Position"
              description="This is a senior position with great benefits"
              type="promotion"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 