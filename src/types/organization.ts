export interface Position {
  id: string;
  title: string;
  level: number;  // 1-15 corresponding to our level system
  baseSalary: number;
  department: string;
  division: string;
  requiredSkills: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  division: string;
  positions: Position[];
}

export interface Division {
  id: string;
  name: string;
  description: string;
  departments: Department[];
}

export interface Organization {
  divisions: Division[];
}

export interface SkillGap {
  fromSkill: string;
  toSkill: string;
  difficulty: number;  // 1-10, representing how hard it is to transition
  timeToLearn: number; // in days
}

export interface PlayerPosition {
  position: Position;
  timeInPosition: number;
}

// Movement cost calculation
export function calculateMovementCost(
  from: Position,
  to: Position,
  skillGaps: SkillGap[]
): number {
  // Base cost is the level difference
  let cost = Math.abs(to.level - from.level) * 100;
  
  // Add skill gap costs
  for (const requiredSkill of to.requiredSkills) {
    if (!from.requiredSkills.includes(requiredSkill)) {
      const gap = skillGaps.find(
        g => g.fromSkill === from.requiredSkills[0] && g.toSkill === requiredSkill
      );
      if (gap) {
        cost += gap.difficulty * 50;
      }
    }
  }
  
  return cost;
} 