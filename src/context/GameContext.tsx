'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Position, PlayerPosition, Organization, SkillGap } from '@/types/organization';
import { parseOrganizationData, parseSkillGapData, getAvailableMoves } from '@/utils/data';

interface UpgradeInfo {
  level: number;
  cost: number;
  baseEffect: number;
  unlocked: boolean;
}

interface GameState {
  points: number;
  money: number;
  tasks: number;
  clickPower: number;
  playerLevel: number;
  experience: number;
  experienceToNextLevel: number;
  position: PlayerPosition | null;
  organization: Organization | null;
  skillGaps: SkillGap[];
  availableMoves: { position: Position; cost: number }[];
  upgrades: {
    clickPower: UpgradeInfo;
    autoClicker: UpgradeInfo;
    multiplier: UpgradeInfo;
  };
}

type GameAction =
  | { type: 'ADD_POINTS'; amount: number }
  | { type: 'UPGRADE_CLICK_POWER' }
  | { type: 'GAIN_EXPERIENCE'; amount: number }
  | { type: 'UPGRADE_AUTO_CLICKER' }
  | { type: 'UPGRADE_MULTIPLIER' }
  | { type: 'AUTO_CLICK' }
  | { type: 'CHANGE_POSITION'; position: Position; cost: number }
  | { type: 'INITIALIZE_GAME_DATA'; payload: { organization: Organization; skillGaps: SkillGap[]; position: PlayerPosition; availableMoves: { position: Position; cost: number }[] } };

const initialState: GameState = {
  points: 0,
  money: 0,
  tasks: 0,
  clickPower: 1,
  playerLevel: 1,
  experience: 0,
  experienceToNextLevel: 100,
  position: null,
  organization: null,
  skillGaps: [],
  availableMoves: [],
  upgrades: {
    clickPower: {
      level: 1,
      cost: 10,
      baseEffect: 1,
      unlocked: true
    },
    autoClicker: {
      level: 0,
      cost: 50,
      baseEffect: 1,
      unlocked: false
    },
    multiplier: {
      level: 0,
      cost: 100,
      baseEffect: 2,
      unlocked: false
    }
  }
};

function calculateUpgradeCost(baseCost: number, level: number): number {
  return Math.floor(baseCost * Math.pow(1.5, level));
}

function calculateExperienceToNextLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.2, level - 1));
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

function gameReducer(state: GameState, action: GameAction): GameState {
  console.log('GameReducer:', { action, currentState: state });

  switch (action.type) {
    case 'ADD_POINTS': {
      const points = state.points + action.amount;
      const tasks = state.tasks + 1;
      const money = state.money + 100; // 100 NOK per task
      const experience = state.experience + Math.floor(action.amount * 0.1);
      let playerLevel = state.playerLevel;
      let experienceToNextLevel = state.experienceToNextLevel;
      let upgrades = { ...state.upgrades };

      // Level up check
      if (experience >= state.experienceToNextLevel) {
        playerLevel++;
        experienceToNextLevel = calculateExperienceToNextLevel(playerLevel);
        console.log('Level Up:', { 
          from: state.playerLevel, 
          to: playerLevel, 
          newExpRequired: experienceToNextLevel 
        });
        
        // Unlock upgrades based on level
        if (playerLevel >= 3 && !upgrades.autoClicker.unlocked) {
          upgrades.autoClicker.unlocked = true;
          console.log('Unlocked Auto Clicker at level 3');
        }
        if (playerLevel >= 5 && !upgrades.multiplier.unlocked) {
          upgrades.multiplier.unlocked = true;
          console.log('Unlocked Multiplier at level 5');
        }
      }

      const newState = {
        ...state,
        points,
        tasks,
        money,
        experience,
        playerLevel,
        experienceToNextLevel,
        upgrades
      };

      console.log('New State after ADD_POINTS:', { 
        pointsGained: action.amount,
        expGained: Math.floor(action.amount * 0.1),
        totalPoints: points,
        totalTasks: tasks,
        totalMoney: money
      });

      return newState;
    }

    case 'CHANGE_POSITION': {
      if (state.points >= action.cost && state.organization && state.skillGaps) {
        console.log('Changing position:', {
          from: state.position?.currentPosition.title,
          to: action.position.title,
          cost: action.cost
        });
        
        const newPosition: PlayerPosition = {
          currentPosition: action.position,
          salary: action.position.baseSalary,
          yearsInPosition: 0,
          acquiredSkills: [
            ...(state.position?.acquiredSkills || []),
            ...action.position.requiredSkills
          ]
        };

        // Calculate new available moves from the new position
        const newAvailableMoves = getAvailableMoves(
          action.position,
          state.organization,
          state.skillGaps
        );

        return {
          ...state,
          points: state.points - action.cost,
          position: newPosition,
          availableMoves: newAvailableMoves
        };
      }
      console.log('Cannot afford position change:', {
        cost: action.cost,
        currentPoints: state.points
      });
      return state;
    }

    case 'UPGRADE_CLICK_POWER': {
      const upgradeCost = state.upgrades.clickPower.cost;
      if (state.points >= upgradeCost) {
        const newLevel = state.upgrades.clickPower.level + 1;
        console.log('Upgrading Click Power:', {
          from: state.clickPower,
          to: state.clickPower + state.upgrades.clickPower.baseEffect,
          cost: upgradeCost,
          newLevel
        });
        return {
          ...state,
          points: state.points - upgradeCost,
          clickPower: state.clickPower + state.upgrades.clickPower.baseEffect,
          upgrades: {
            ...state.upgrades,
            clickPower: {
              ...state.upgrades.clickPower,
              level: newLevel,
              cost: calculateUpgradeCost(10, newLevel)
            }
          }
        };
      }
      console.log('Cannot afford Click Power upgrade:', {
        cost: upgradeCost,
        currentPoints: state.points
      });
      return state;
    }

    case 'UPGRADE_AUTO_CLICKER': {
      const upgradeCost = state.upgrades.autoClicker.cost;
      if (state.points >= upgradeCost && state.upgrades.autoClicker.unlocked) {
        const newLevel = state.upgrades.autoClicker.level + 1;
        console.log('Upgrading Auto Clicker:', {
          from: state.upgrades.autoClicker.level,
          to: newLevel,
          cost: upgradeCost
        });
        return {
          ...state,
          points: state.points - upgradeCost,
          upgrades: {
            ...state.upgrades,
            autoClicker: {
              ...state.upgrades.autoClicker,
              level: newLevel,
              cost: calculateUpgradeCost(50, newLevel)
            }
          }
        };
      }
      console.log('Cannot upgrade Auto Clicker:', {
        unlocked: state.upgrades.autoClicker.unlocked,
        cost: upgradeCost,
        currentPoints: state.points
      });
      return state;
    }

    case 'UPGRADE_MULTIPLIER': {
      const upgradeCost = state.upgrades.multiplier.cost;
      if (state.points >= upgradeCost && state.upgrades.multiplier.unlocked) {
        const newLevel = state.upgrades.multiplier.level + 1;
        console.log('Upgrading Multiplier:', {
          from: state.upgrades.multiplier.level,
          to: newLevel,
          cost: upgradeCost
        });
        return {
          ...state,
          points: state.points - upgradeCost,
          upgrades: {
            ...state.upgrades,
            multiplier: {
              ...state.upgrades.multiplier,
              level: newLevel,
              cost: calculateUpgradeCost(100, newLevel)
            }
          }
        };
      }
      console.log('Cannot upgrade Multiplier:', {
        unlocked: state.upgrades.multiplier.unlocked,
        cost: upgradeCost,
        currentPoints: state.points
      });
      return state;
    }

    case 'AUTO_CLICK': {
      if (state.upgrades.autoClicker.level > 0) {
        const autoClickPower = state.clickPower * state.upgrades.autoClicker.level;
        const multiplier = 1 + (state.upgrades.multiplier.level * state.upgrades.multiplier.baseEffect);
        const pointsGained = autoClickPower * multiplier;
        console.log('Auto Click:', {
          autoClickPower,
          multiplier,
          pointsGained
        });
        return {
          ...state,
          points: state.points + pointsGained
        };
      }
      return state;
    }

    case 'INITIALIZE_GAME_DATA': {
      const { organization, skillGaps, position, availableMoves } = action.payload;
      return {
        ...state,
        organization,
        skillGaps,
        position,
        availableMoves,
        upgrades: {
          ...state.upgrades,
          clickPower: {
            ...state.upgrades.clickPower,
            level: 1,
            cost: 10,
            baseEffect: 1,
            unlocked: true
          },
          autoClicker: {
            ...state.upgrades.autoClicker,
            level: 0,
            cost: 50,
            baseEffect: 1,
            unlocked: false
          },
          multiplier: {
            ...state.upgrades.multiplier,
            level: 0,
            cost: 100,
            baseEffect: 2,
            unlocked: false
          }
        }
      };
    }

    default:
      return state;
  }
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load organization and skill gap data
  useEffect(() => {
    const loadGameData = async () => {
      try {
        // Load organization data
        const orgResponse = await fetch('/data/organization.json');
        const orgData = await orgResponse.json();
        const organization = parseOrganizationData(orgData);

        // Load skill gap data
        const skillGapResponse = await fetch('/data/skill-gap.csv');
        const skillGapText = await skillGapResponse.text();
        const skillGaps = parseSkillGapData(skillGapText);

        // Set initial position to an entry-level position
        const entryPosition = organization.divisions[0].departments[0].positions[0];
        const initialPosition: PlayerPosition = {
          currentPosition: entryPosition,
          salary: entryPosition.baseSalary,
          yearsInPosition: 0,
          acquiredSkills: [...entryPosition.requiredSkills]
        };

        // Calculate initial available moves
        const availableMoves = getAvailableMoves(entryPosition, organization, skillGaps);

        // Update state with loaded data
        dispatch({
          type: 'INITIALIZE_GAME_DATA',
          payload: {
            organization,
            skillGaps,
            position: initialPosition,
            availableMoves
          }
        });
      } catch (error) {
        console.error('Error loading game data:', error);
      }
    };

    loadGameData();
  }, []);

  useEffect(() => {
    console.log('GameProvider mounted');
    return () => console.log('GameProvider unmounted');
  }, []);

  useEffect(() => {
    if (state.upgrades.autoClicker.level > 0) {
      console.log('Setting up auto-clicker interval');
      const interval = setInterval(() => {
        dispatch({ type: 'AUTO_CLICK' });
      }, 1000);
      return () => {
        console.log('Cleaning up auto-clicker interval');
        clearInterval(interval);
      };
    }
  }, [state.upgrades.autoClicker.level]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    console.error('useGame must be used within a GameProvider');
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 