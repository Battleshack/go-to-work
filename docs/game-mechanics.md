# Game Mechanics

## Player Stats

### Core Stats
- Level: Player's current progression level
- Money: Total amount earned through completing tasks
- Points: Points earned through various activities
- Tasks Completed: Total number of tasks the player has finished

### Task Rewards
When a player completes a task, they receive:
1. Task Counter: +1 to tasks completed
2. Money: Calculated using the formula:
   ```
   earnings = starting_salary + ((starting_salary * (current_level / 15)) * current_level)
   ```
3. Statpoint: 1 point (type may vary depending on task)

## Task System
Tasks are the primary way to earn stats and progress in the game. Different tasks may award different types of statpoints, allowing for varied progression paths.

### Current Implementation Notes
- Money shown represents total earnings (not yearly salary)
- Future plans include adding income stats tracking 