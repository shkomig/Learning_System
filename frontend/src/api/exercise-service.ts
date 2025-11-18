import { api } from './client';
import type { Exercise, ExerciseResult, ExerciseResponse } from '../types';

export interface AdaptiveRecommendation {
  nextDifficulty: 'easy' | 'medium' | 'hard';
  topicsToReview: string[];
  suggestedExercises: Exercise[];
  reasoning: string;
}

/**
 * Get exercises based on student level and performance
 */
export async function getAdaptiveExercises(
  studentId: string,
  count: number = 5
): Promise<Exercise[]> {
  const response = await api.get(`/exercises/adaptive/${studentId}`, {
    params: { count },
  });
  return response.data;
}

/**
 * Submit exercise result and get feedback
 */
export async function submitExerciseResult(
  result: ExerciseResult
): Promise<ExerciseResponse> {
  const response = await api.post('/exercises/submit', result);
  return response.data;
}

/**
 * Get AI-powered hints for an exercise
 */
export async function getHint(
  exerciseId: string,
  studentId: string,
  currentAttempt: number
): Promise<string> {
  const response = await api.get(`/exercises/${exerciseId}/hint`, {
    params: { studentId, attempt: currentAttempt },
  });
  return response.data.hint;
}

/**
 * Get adaptive recommendations based on recent performance
 */
export async function getRecommendations(
  studentId: string
): Promise<AdaptiveRecommendation> {
  const response = await api.get(`/students/${studentId}/recommendations`);
  return response.data;
}

/**
 * Generate new exercises using AI
 */
export async function generateExercises(
  topic: string,
  difficulty: string,
  count: number,
  studentLevel: number
): Promise<Exercise[]> {
  const response = await api.post('/exercises/generate', {
    topic,
    difficulty,
    count,
    studentLevel,
  });
  return response.data;
}


