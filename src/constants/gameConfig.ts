export const GAME_CONFIG = {
  STARTING_SALARY: 100,         // Base salary in NOK
  LATERAL_MOVE_PAY_RAISE: 0.15, // 15% bonus for lateral moves
  PROMOTION_PAY_RAISE: 0.25,    // 25% raise for promotions
  SPECIAL_PROJECT_BONUS: 0.10,  // 10% bonus for special projects
  TRAINING_XP_BONUS: 0.20      // 20% extra XP from training
} as const; 