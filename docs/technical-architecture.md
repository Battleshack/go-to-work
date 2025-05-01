# Technical Architecture

## Technology Stack
- Next.js - React framework for the frontend
- TypeScript - For type safety and better development experience
- Tailwind CSS - For styling and UI components
- Context API - For state management

## Core Components

### Game Context
The game state is managed through React Context (`GameContext.tsx`), which handles:
- Player state management
- Game actions and reducers
- Upgrade system logic
- Experience and level progression
- Organization and skill gap data loading

### State Management
The game state includes:
```typescript
interface GameState {
  playerLevel: number
  money: number
  salary: number
  points: number
  tasks: number
  experience: number
  experienceToNextLevel: number
  currentPosition: string
  organization: Organization | null
  skillGaps: SkillGap[] | null
  playerPosition: PlayerPosition | null
  upgrades: {
    clickPower: UpgradeInfo
    autoClicker: UpgradeInfo
    multiplier: UpgradeInfo
  }
}
```

### Key Components
1. **GameScreen** (`GameScreen.tsx`)
   - Main game interface container
   - Manages layout and component composition

2. **StatsDisplay** (`StatsDisplay.tsx`)
   - Displays player statistics
   - Shows level, salary, points, and tasks

3. **JobListing** (`JobListing.tsx`)
   - Handles job position displays
   - Manages position transitions and salary updates

4. **LevelDisplay** (`LevelDisplay.tsx`)
   - Shows current and next level information
   - Displays experience progress

## Styling System
The game uses a comprehensive Tailwind CSS configuration with:
- Custom color schemes
- Consistent spacing and sizing
- Custom component classes
- Responsive design considerations

## Game Configuration
Core game settings are defined in `gameConfig.ts`:
```typescript
const GAME_CONFIG = {
  LATERAL_MOVE_PAY_RAISE: 0.10, // 10% pay raise
  INITIAL_MONEY: 50000,
  INITIAL_POINTS: 0,
  INITIAL_LEVEL: 1,
  INITIAL_TASKS: 0
}
``` 