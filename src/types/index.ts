export type LanguageMode = 'darija' | 'french' | 'arabic' | 'english';

export type Currency = 'MAD' | 'USD';

export interface Blueprint {
  id: string;
  title: string;
  titleDarija: string;
  category: 'ecommerce' | 'freelance' | 'agency' | 'content' | 'local' | 'tech-nocode';
  minCapital: number; // in MAD (DH)
  timeRequired: string;
  deviceRequired: 'smartphone' | 'laptop' | 'either';
  potentialMonthlyIncomeMAD: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  summaryDarija: string;
  image?: string;
  keySteps: {
    title: string;
    description: string;
  }[];
  moroccanToolsAndPartners: string[];
  firstWeekAction: string;
  commonMistakes: string[];
}

export interface UserAuditInput {
  timePerDay: '1-2h' | '3-4h' | 'full-time';
  startingCapitalMAD: number;
  device: 'smartphone-only' | 'laptop-available';
  skillInterest: 'sales-social' | 'video-design' | 'writing-languages' | 'tech-nocode' | 'sourcing-trading';
  incomeGoalMAD: number;
  languagePreference: LanguageMode;
}

export interface OutreachPitch {
  id: string;
  service: string;
  targetNiche: string;
  channel: 'instagram' | 'whatsapp' | 'email';
  language: LanguageMode;
  variantA: string;
  variantB: string;
  followUp: string;
}

export interface HustleLog {
  id: string;
  date: string;
  type: 'outreach' | 'call' | 'closed-deal' | 'content-published';
  note: string;
  amountMAD?: number;
  status: 'pending' | 'completed';
}
