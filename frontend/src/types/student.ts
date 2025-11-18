export interface Student {
  id: string;
  name: string;
  email?: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
  lastLoginDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StudentProgress {
  id: string;
  studentId: string;
  exerciseId: string;
  answer: number;
  isCorrect: boolean;
  attempts: number;
  timeSpent: number;
  hintsUsed: number;
  completedAt: Date;
}

export interface StudentStats {
  totalExercises: number;
  correctAnswers: number;
  accuracy: number;
  averageTime: number;
  topicBreakdown: {
    topic: string;
    completed: number;
    accuracy: number;
  }[];
  recentProgress: StudentProgress[];
}
