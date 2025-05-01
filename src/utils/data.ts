import { Organization, SkillGap, Position, Department, Division, calculateMovementCost } from '@/types/organization';

function calculatePositionLevel(divisionIndex: number, departmentIndex: number, positionIndex: number): number {
  // Base level calculation:
  // - Higher division index means more prestigious division (0-2 levels)
  // - Higher department index means more senior department (0-3 levels)
  // - Position index affects seniority within department (1-10 levels)
  const divisionBonus = Math.floor(divisionIndex * 2);
  const departmentBonus = Math.floor(departmentIndex * 1.5);
  const baseLevel = Math.floor(positionIndex * 2) + 1;
  
  // Combine all factors and ensure it stays within 1-15 range
  return Math.min(Math.max(baseLevel + divisionBonus + departmentBonus, 1), 15);
}

export function parseOrganizationData(data: any): Organization {
  const divisions: Division[] = [];
  
  // Process the Executive Branch which contains all divisions
  Object.entries(data['Executive Branch'].children).forEach(([divisionName, divisionData]: [string, any], divisionIndex: number) => {
    const division: Division = {
      id: divisionName.toLowerCase().replace(/\s+/g, '-'),
      name: divisionName,
      description: `${divisionName} Division`,
      departments: []
    };

    // Process departments within the division
    Object.entries(divisionData.children).forEach(([deptName, deptData]: [string, any], departmentIndex: number) => {
      const department: Department = {
        id: deptName.toLowerCase().replace(/\s+/g, '-'),
        name: deptName,
        description: `${deptName} Department in ${divisionName} Division`,
        division: divisionName,
        positions: []
      };

      // Process sections and teams to create positions
      let positionIndex = 0;
      Object.entries(deptData.children).forEach(([sectionName, sectionData]: [string, any]) => {
        Object.entries(sectionData.children).forEach(([teamName, _]: [string, any]) => {
          const position: Position = {
            id: teamName.toLowerCase().replace(/\s+/g, '-'),
            title: teamName,
            level: calculatePositionLevel(divisionIndex, departmentIndex, positionIndex),
            baseSalary: 50000 + (calculatePositionLevel(divisionIndex, departmentIndex, positionIndex) * 10000), // Salary scales with level
            department: deptName,
            division: divisionName,
            requiredSkills: [teamName] // Each position requires its own skill
          };
          department.positions.push(position);
          positionIndex++;
        });
      });

      division.departments.push(department);
    });

    divisions.push(division);
  });

  return { divisions };
}

export function parseSkillGapData(csvContent: string): SkillGap[] {
  const lines = csvContent.trim().split('\n');
  const skills = lines[0].split(',').slice(1).map(s => s.trim()); // First row contains skill names
  const gaps: SkillGap[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const fromSkill = values[0].trim();
    
    for (let j = 1; j < values.length; j++) {
      const toSkill = skills[j - 1];
      const difficulty = parseInt(values[j]);
      
      if (!isNaN(difficulty)) {
        gaps.push({
          fromSkill,
          toSkill,
          difficulty,
          timeToLearn: difficulty * 7 // Placeholder: each difficulty point equals one week
        });
      }
    }
  }

  return gaps;
}

// Helper function to get all available positions
export function getAllPositions(org: Organization) {
  return org.divisions.flatMap(div => 
    div.departments.flatMap(dept => 
      dept.positions
    )
  );
}

// Helper function to get available moves from a position
export function getAvailableMoves(
  currentPosition: Position,
  org: Organization,
  skillGaps: SkillGap[]
): { position: Position; cost: number }[] {
  const allPositions = getAllPositions(org);
  const moves = allPositions
    .filter(pos => pos.id !== currentPosition.id) // Can't move to same position
    .map(pos => ({
      position: pos,
      cost: calculateMovementCost(currentPosition, pos, skillGaps)
    }))
    .sort((a, b) => a.cost - b.cost); // Sort by cost ascending

  return moves;
} 