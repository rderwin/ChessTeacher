export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "milestone" | "theme-mastery" | "streak" | "rating" | "special";
}

export const ACHIEVEMENTS: AchievementDef[] = [
  // --- Milestones ---
  {
    id: "first-puzzle",
    name: "First Step",
    description: "Solve your first puzzle",
    icon: "\u{1F331}",
    category: "milestone",
  },
  {
    id: "10-puzzles",
    name: "Getting Started",
    description: "Solve 10 puzzles",
    icon: "\u{1F4A1}",
    category: "milestone",
  },
  {
    id: "50-puzzles",
    name: "Puzzle Enthusiast",
    description: "Solve 50 puzzles",
    icon: "\u{1F9E9}",
    category: "milestone",
  },
  {
    id: "100-puzzles",
    name: "Century",
    description: "Solve 100 puzzles",
    icon: "\u{1F4AF}",
    category: "milestone",
  },
  {
    id: "500-puzzles",
    name: "Puzzle Warrior",
    description: "Solve 500 puzzles",
    icon: "\u{2694}\uFE0F",
    category: "milestone",
  },
  {
    id: "1000-puzzles",
    name: "Grandmaster Solver",
    description: "Solve 1000 puzzles",
    icon: "\u{1F451}",
    category: "milestone",
  },

  // --- Theme Mastery ---
  {
    id: "fork-master",
    name: "Fork Master",
    description: "Solve 50 fork puzzles",
    icon: "\u{1F374}",
    category: "theme-mastery",
  },
  {
    id: "pin-expert",
    name: "Pin Expert",
    description: "Solve 30 pin puzzles",
    icon: "\u{1F4CC}",
    category: "theme-mastery",
  },
  {
    id: "back-rank-expert",
    name: "Back Rank Expert",
    description: "Solve 25 back rank mate puzzles",
    icon: "\u{1F3F0}",
    category: "theme-mastery",
  },
  {
    id: "mate-specialist",
    name: "Mate Specialist",
    description: "Solve 50 checkmate puzzles",
    icon: "\u{265A}",
    category: "theme-mastery",
  },
  {
    id: "skewer-savant",
    name: "Skewer Savant",
    description: "Solve 20 skewer puzzles",
    icon: "\u{1F3AF}",
    category: "theme-mastery",
  },
  {
    id: "discovery-expert",
    name: "Discovery Expert",
    description: "Solve 20 discovered attack puzzles",
    icon: "\u{1F52D}",
    category: "theme-mastery",
  },

  // --- Streak ---
  {
    id: "streak-5",
    name: "Hot Streak",
    description: "Solve 5 puzzles in a row",
    icon: "\u{1F525}",
    category: "streak",
  },
  {
    id: "streak-10",
    name: "On Fire",
    description: "Solve 10 puzzles in a row",
    icon: "\u{1F31F}",
    category: "streak",
  },
  {
    id: "streak-20",
    name: "Unstoppable",
    description: "Solve 20 puzzles in a row",
    icon: "\u{26A1}",
    category: "streak",
  },
  {
    id: "daily-7",
    name: "Weekly Warrior",
    description: "Practice 7 days in a row",
    icon: "\u{1F4C5}",
    category: "streak",
  },
  {
    id: "daily-30",
    name: "Monthly Master",
    description: "Practice 30 days in a row",
    icon: "\u{1F3C6}",
    category: "streak",
  },

  // --- Rating ---
  {
    id: "rating-1000",
    name: "Four Digits",
    description: "Reach a puzzle rating of 1000",
    icon: "\u{1F396}\uFE0F",
    category: "rating",
  },
  {
    id: "rating-1200",
    name: "Rising Star",
    description: "Reach a puzzle rating of 1200",
    icon: "\u{2B50}",
    category: "rating",
  },
  {
    id: "rating-1400",
    name: "Intermediate",
    description: "Reach a puzzle rating of 1400",
    icon: "\u{1F31F}",
    category: "rating",
  },
  {
    id: "rating-1600",
    name: "Advanced",
    description: "Reach a puzzle rating of 1600",
    icon: "\u{1F308}",
    category: "rating",
  },
  {
    id: "rating-1800",
    name: "Expert",
    description: "Reach a puzzle rating of 1800",
    icon: "\u{1F48E}",
    category: "rating",
  },
  {
    id: "rating-2000",
    name: "Master",
    description: "Reach a puzzle rating of 2000",
    icon: "\u{1F451}",
    category: "rating",
  },

  // --- Special ---
  {
    id: "perfect-set",
    name: "Perfect Set",
    description: "Complete a puzzle set with no mistakes",
    icon: "\u{2728}",
    category: "special",
  },
  {
    id: "speed-demon",
    name: "Speed Demon",
    description: "Solve a puzzle in under 5 seconds",
    icon: "\u{26A1}",
    category: "special",
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Solve a puzzle between midnight and 5am",
    icon: "\u{1F989}",
    category: "special",
  },
];

export function getAchievement(id: string): AchievementDef | undefined {
  return ACHIEVEMENTS.find((a) => a.id === id);
}
