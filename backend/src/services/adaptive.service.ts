/**
 * Adaptive Learning Service
 * Calculates next difficulty level based on student performance
 */

const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const;
type Difficulty = typeof DIFFICULTY_LEVELS[number];

/**
 * Calculate the next difficulty level based on recent performance
 * Target: 70-80% success rate
 */
export function calculateNextDifficulty(
  currentDifficulty: string,
  recentScores: number[],
  timeSpent: number[]
): Difficulty {
  if (recentScores.length === 0) {
    return 'easy';
  }

  const avgScore = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  const avgTime = timeSpent.reduce((a, b) => a + b, 0) / timeSpent.length;

  const currentIndex = DIFFICULTY_LEVELS.indexOf(currentDifficulty as Difficulty);
  
  // If performing very well (>85%) and fast (<30 seconds), increase difficulty
  if (avgScore > 0.85 && avgTime < 30000 && currentIndex < DIFFICULTY_LEVELS.length - 1) {
    return DIFFICULTY_LEVELS[currentIndex + 1];
  }
  
  // If struggling (<65%), decrease difficulty
  if (avgScore < 0.65 && currentIndex > 0) {
    return DIFFICULTY_LEVELS[currentIndex - 1];
  }
  
  // Otherwise, maintain current level
  return currentDifficulty as Difficulty;
}

/**
 * Calculate mastery level (0-5) for a topic
 * Used for spaced repetition scheduling
 */
export function calculateMasteryLevel(
  correctAnswers: number,
  totalAttempts: number
): number {
  if (totalAttempts === 0) return 0;
  
  const successRate = correctAnswers / totalAttempts;
  
  if (successRate >= 0.95 && totalAttempts >= 20) return 5;
  if (successRate >= 0.90 && totalAttempts >= 15) return 4;
  if (successRate >= 0.80 && totalAttempts >= 10) return 3;
  if (successRate >= 0.70 && totalAttempts >= 5) return 2;
  if (successRate >= 0.60) return 1;
  
  return 0;
}

/**
 * Schedule next review date using spaced repetition (SM-2 algorithm simplified)
 */
export function scheduleNextReview(
  masteryLevel: number,
  lastReviewDate: Date
): Date {
  const intervals = [1, 3, 7, 14, 30]; // days
  const days = intervals[Math.min(masteryLevel, intervals.length - 1)];
  
  const nextReview = new Date(lastReviewDate);
  nextReview.setDate(nextReview.getDate() + days);
  
  return nextReview;
}

/**
 * Determine if a hint should be offered based on attempts
 */
export function shouldOfferHint(attempts: number, timeSpent: number): boolean {
  // Offer hint after 2 failed attempts or after struggling for > 60 seconds
  return attempts >= 2 || timeSpent > 60000;
}


