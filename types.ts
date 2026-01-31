
export enum Language {
  HINDI = 'hi-IN',
  ENGLISH = 'en-US',
  MARATHI = 'mr-IN',
  BENGALI = 'bn-IN',
  TELUGU = 'te-IN',
  PUNJABI = 'pa-IN'
}

export interface Choice {
  id: string;
  label: Record<string, string>;
  keywords: string[];
  impact: {
    debt: number;
    savings: number;
    stress: number;
    xp: number; // New field for gamification
    description: Record<string, string>;
  };
  consequences: Array<{
    period: Record<string, string>;
    amount: number;
    stress: number;
    note: Record<string, string>;
  }>;
}

export interface Episode {
  id: string;
  title: Record<string, string>;
  scenario: Record<string, string>;
  narrative: Record<string, string>;
  initialStats: {
    cash: number;
    debt: number;
    stress: number;
  };
  choices: Choice[];
}

export interface UserProfile {
  name: string;
  age: string;
  occupation: string;
  language: Language;
}

export interface UserStats {
  debtSeeking: number;
  savingsMindset: number;
  resilienceScore: number;
  xp: number;       // Leveling progress
  level: number;    // User rank
  badges: string[]; // Earned achievements
}
