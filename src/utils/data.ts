import { Organization, SkillGap, Position, Department, Division, calculateMovementCost } from '@/types/organization';

export function parseOrganizationData(data: any): Organization {
  const divisions: Division[] = [];
  
  // Process the Executive Branch which contains all divisions
  Object.entries(data['Executive Branch'].children).forEach(([divisionName, divisionData]: [string, any]) => {
    const division: Division = {
      id: divisionName.toLowerCase().replace(/\s+/g, '-'),
      name: divisionName,
      description: `${divisionName} Division`,
      departments: []
    };

    // Process departments within the division
    Object.entries(divisionData.children).forEach(([deptName, deptData]: [string, any]) => {
      const department: Department = {
        id: deptName.toLowerCase().replace(/\s+/g, '-'),
        name: deptName,
        description: `${deptName} Department in ${divisionName} Division`,
        division: divisionName,
        positions: []
      };

      // Process sections and teams to create positions
      Object.entries(deptData.children).forEach(([sectionName, sectionData]: [string, any]) => {
        Object.entries(sectionData.children).forEach(([teamName, _]: [string, any]) => {
          const position: Position = {
            id: teamName.toLowerCase().replace(/\s+/g, '-'),
            title: teamName,
            level: Math.floor(Math.random() * 5) + 1, // Placeholder: assign levels 1-5 randomly
            baseSalary: 50000 + (Math.random() * 50000), // Placeholder: random salary between 50k-100k
            department: deptName,
            division: divisionName,
            requiredSkills: [teamName] // Each position requires its own skill
          };
          department.positions.push(position);
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