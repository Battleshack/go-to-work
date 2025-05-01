'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect, Dispatch } from 'react';
import { Position, PlayerPosition, Organization, SkillGap } from '@/types/organization';
import { parseOrganizationData, parseSkillGapData, getAvailableMoves } from '@/utils/data';

interface UpgradeInfo {
  level: number;
  cost: number;
  unlocked: boolean;
}

interface GameState {
  playerLevel: number;
  money: number;
  points: number;
  tasks: number;
  experience: number;
  experienceToNextLevel: number;
  currentPosition: string;
  organization: Organization | null;
  skillGaps: SkillGap[] | null;
  playerPosition: PlayerPosition | null;
  upgrades: {
    autoClicker: UpgradeInfo;
    multiplier: UpgradeInfo;
  };
}

type GameAction =
  | { type: 'ADD_POINTS'; payload: number }
  | { type: 'ADD_MONEY'; payload: number }
  | { type: 'ADD_TASK' }
  | { type: 'LEVEL_UP' }
  | { type: 'SET_POSITION'; payload: string }
  | { type: 'CHANGE_POSITION'; position: Position; cost: number }
  | { type: 'GAIN_EXPERIENCE'; amount: number }
  | { type: 'SET_ORGANIZATION'; payload: Organization }
  | { type: 'SET_SKILL_GAPS'; payload: SkillGap[] }
  | { type: 'UPGRADE_CLICK_POWER' };

const initialState: GameState = {
  playerLevel: 1,
  money: 0,
  points: 0,
  tasks: 0,
  experience: 0,
  experienceToNextLevel: 100,
  currentPosition: 'Trainee',
  organization: null,
  skillGaps: null,
  playerPosition: null,
  upgrades: {
    autoClicker: {
      level: 0,
      cost: 100,
      unlocked: false
    },
    multiplier: {
      level: 0,
      cost: 500,
      unlocked: false
    }
  }
};

function calculateExperienceToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_POINTS':
      return {
        ...state,
        points: state.points + action.payload
      };
    case 'ADD_MONEY':
      return {
        ...state,
        money: state.money + action.payload
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: state.tasks + 1
      };
    case 'LEVEL_UP':
      const newLevel = state.playerLevel + 1;
      return {
        ...state,
        playerLevel: newLevel,
        experienceToNextLevel: calculateExperienceToNextLevel(newLevel)
      };
    case 'SET_POSITION':
      return {
        ...state,
        currentPosition: action.payload
      };
    case 'CHANGE_POSITION':
      if (state.points >= action.cost && state.organization && state.skillGaps) {
        return {
          ...state,
          points: state.points - action.cost,
          playerPosition: {
            position: action.position,
            timeInPosition: 0
          }
        };
      }
      return state;
    case 'GAIN_EXPERIENCE':
      const experience = state.experience + action.amount;
      let playerLevel = state.playerLevel;
      let experienceToNextLevel = state.experienceToNextLevel;
      let upgrades = { ...state.upgrades };

      // Level up check
      if (experience >= state.experienceToNextLevel) {
        playerLevel++;
        experienceToNextLevel = calculateExperienceToNextLevel(playerLevel);
        
        // Unlock upgrades based on level
        if (playerLevel >= 3 && !upgrades.autoClicker.unlocked) {
          upgrades.autoClicker.unlocked = true;
        }
        if (playerLevel >= 5 && !upgrades.multiplier.unlocked) {
          upgrades.multiplier.unlocked = true;
        }
      }

      return {
        ...state,
        experience,
        playerLevel,
        experienceToNextLevel,
        upgrades
      };
    case 'UPGRADE_CLICK_POWER':
      const upgrade = state.upgrades.multiplier;
      if (state.money >= upgrade.cost) {
        return {
          ...state,
          money: state.money - upgrade.cost,
          upgrades: {
            ...state.upgrades,
            multiplier: {
              ...upgrade,
              level: upgrade.level + 1,
              cost: Math.floor(upgrade.cost * 1.5)
            }
          }
        };
      }
      return state;
    case 'SET_ORGANIZATION':
      return {
        ...state,
        organization: action.payload
      };
    case 'SET_SKILL_GAPS':
      return {
        ...state,
        skillGaps: action.payload
      };
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: Dispatch<GameAction>;
  addPoints: (amount: number) => void;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load organization and skill gap data
  useEffect(() => {
    const loadData = async () => {
      try {
        const orgResponse = await fetch('/data/organization.json');
        if (!orgResponse.ok) {
          throw new Error(`Failed to load organization data: ${orgResponse.statusText}`);
        }
        const orgData = await orgResponse.json();
        dispatch({ type: 'SET_ORGANIZATION', payload: parseOrganizationData(orgData) });

        const skillGapsResponse = await fetch('/data/skill-gap.csv');
        if (!skillGapsResponse.ok) {
          throw new Error(`Failed to load skill gaps data: ${skillGapsResponse.statusText}`);
        }
        const skillGapsText = await skillGapsResponse.text();
        dispatch({ type: 'SET_SKILL_GAPS', payload: parseSkillGapData(skillGapsText) });
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    };
    loadData();
  }, []);

  // Auto-clicker effect
  useEffect(() => {
    if (state.upgrades.autoClicker.level > 0) {
      const interval = setInterval(() => {
        const pointsPerSecond = state.upgrades.autoClicker.level;
        dispatch({ type: 'GAIN_EXPERIENCE', amount: pointsPerSecond });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [state.upgrades.autoClicker.level]);

  const addPoints = (amount: number) => {
    dispatch({ type: 'ADD_POINTS', payload: amount });
    
    // Add money based on level (more money per click at higher levels)
    const moneyPerPoint = state.playerLevel * 10;
    dispatch({ type: 'ADD_MONEY', payload: amount * moneyPerPoint });
    
    // Add task completion
    dispatch({ type: 'ADD_TASK' });
    
    // Add experience
    const expGain = Math.floor(amount * 0.1);
    dispatch({ type: 'GAIN_EXPERIENCE', amount: expGain });
  };

  return (
    <GameContext.Provider value={{ state, dispatch, addPoints }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 