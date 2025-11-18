export type ExerciseType = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type VisualType = 'fruits' | 'animals' | 'blocks';

export interface ExerciseProblem {
  num1: number;
  num2: number;
  correctAnswer: number;
  visual: VisualType;
}

export interface Exercise {
  id: string;
  type: ExerciseType;
  difficulty: Difficulty;
  topic: string;
  problem: ExerciseProblem;
  hints: string[];
  createdAt?: Date;
}

export interface ExerciseResult {
  exerciseId: string;
  studentId: string;
  answer: number;
  isCorrect: boolean;
  attempts: number;
  timeSpent: number;
  hintsUsed: number;
  completedAt: Date;
}

export interface ExerciseResponse {
  pointsEarned: number;
  feedback: string;
  nextExercise?: Exercise;
}


