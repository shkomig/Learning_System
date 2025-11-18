export type AchievementCategory = 
  | 'topic_mastery' 
  | 'streak' 
  | 'speed' 
  | 'helper' 
  | 'explorer';

export interface Achievement {
  id: string;
  name: string;
  nameHe: string;
  description: string;
  descriptionHe: string;
  icon: string;
  category: AchievementCategory;
  requirement: number;
  earnedAt?: Date;
  unlocked: boolean;
}

export interface Badge {
  id: string;
  achievementId: string;
  studentId: string;
  unlockedAt: Date;
  displayed: boolean;
}


