export interface LevelInfo {
  title: string;
  description: string[];
}

export const LEVELS: Record<number, LevelInfo> = {
  1: {
    title: "Intern",
    description: [
      "You don't exist in the system, but your mistakes do.",
      "Unpaid. Unnamed. Unnecessary—except for PowerPoint formatting."
    ]
  },
  2: {
    title: "Trainee",
    description: [
      "You're technically employed. That's where the benefits end.",
      "Allowed to ask questions. Not encouraged to."
    ]
  },
  3: {
    title: "Aide",
    description: [
      "You're helpful in the way a stapler is helpful.",
      "You follow instructions. You don't get invited to meetings."
    ]
  },
  4: {
    title: "Volunteer",
    description: [
      "You chose this. That's your first mistake.",
      "No pay, no title, but hey—you're \"building experience.\""
    ]
  },
  5: {
    title: "Assistant",
    description: [
      "You know your supervisor's coffee order better than your own name.",
      "You now have recurring tasks and no way out."
    ]
  },
  6: {
    title: "Senior Assistant",
    description: [
      "You've made yourself indispensable. That was a tactical error.",
      "You handle overflow, clean up messes, and train your own replacements."
    ]
  },
  7: {
    title: "Specialized Assistant",
    description: [
      "You're the only one who knows how the system works. You will not be thanked.",
      "Your niche protects you. Barely."
    ]
  },
  8: {
    title: "Executive Assistant",
    description: [
      "You manage time for people who pretend they don't have any.",
      "You see the machine from inside. You push its buttons. Carefully."
    ]
  },
  9: {
    title: "Chief Assistant",
    description: [
      "You don't just support power. You schedule it.",
      "The real decisions get made in your inbox."
    ]
  },
  10: {
    title: "Team Lead",
    description: [
      "You're responsible for output, morale, and snacks.",
      "Middle-tier authority. All-tier accountability."
    ]
  },
  11: {
    title: "Supervisor",
    description: [
      "You have direct reports and indirect control.",
      "You spend 40% of your time in meetings and 60% explaining those meetings."
    ]
  },
  12: {
    title: "Chief of Staff",
    description: [
      "You translate executive noise into tactical confusion.",
      "You run everything. No one knows. Especially not the executives."
    ]
  },
  13: {
    title: "Director",
    description: [
      "You set direction. You don't follow it.",
      "More strategic oversight, less operational pain—until budget season."
    ]
  },
  14: {
    title: "Vice President",
    description: [
      "You have a seat at the table. It's bolted to the floor.",
      "You speak in OKRs. You no longer remember how to log into things."
    ]
  },
  15: {
    title: "CEO",
    description: [
      "You are the face of the company. You are also the mask.",
      "The system serves you—until it replaces you. Endgame reached."
    ]
  }
}; 