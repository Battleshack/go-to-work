'use client'

import { useGame } from '@/context/GameContext'
import { GAME_CONFIG } from '../constants/gameConfig'

interface JobListingProps {
  title: string
  description: string
  type: 'promotion' | 'lateral' | 'special' | 'training'
}

export function JobListing({ title, description, type }: JobListingProps) {
  const { state, dispatch } = useGame()

  const getTypeStyles = () => {
    switch (type) {
      case 'promotion':
        return 'game-card game-card-promotion h-[20rem]'
      case 'lateral':
      case 'special':
      case 'training':
        return 'upgrade-button h-[12rem]'
    }
  }

  const handleClick = () => {
    switch (type) {
      case 'lateral':
        // For now, we'll add a bonus amount of money for lateral moves
        const bonusAmount = Math.floor(50000 * GAME_CONFIG.LATERAL_MOVE_PAY_RAISE);
        dispatch({
          type: 'ADD_MONEY',
          payload: bonusAmount
        });
        break;
      // Other cases will be handled later
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`shrink-0 w-[17.5rem] min-w-[12rem] ${getTypeStyles()}`}
    >
      <div className="flex flex-col justify-center items-center h-full">
        <h3 className="game-text mb-2 text-center">
          {title}
        </h3>
        <p className="text-lg text-game-text text-center">
          {description}
        </p>
        {type === 'lateral' && (
          <p className="text-sm text-game-success mt-2">
            +{GAME_CONFIG.LATERAL_MOVE_PAY_RAISE * 100}% Bonus
          </p>
        )}
      </div>
    </button>
  )
} 