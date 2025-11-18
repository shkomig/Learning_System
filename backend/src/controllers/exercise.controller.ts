import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { calculateNextDifficulty } from '../services/adaptive.service';
import { generateHint } from '../services/ai.service';

const prisma = new PrismaClient();

export async function getAdaptiveExercises(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { studentId } = req.params;
    const count = parseInt(req.query.count as string) || 5;

    // Get recent performance
    const recentProgress = await prisma.studentProgress.findMany({
      where: { studentId },
      orderBy: { completedAt: 'desc' },
      take: 10,
      include: { exercise: true },
    });

    // Calculate difficulty
    const scores = recentProgress.map((p) => (p.isCorrect ? 1 : 0));
    const times = recentProgress.map((p) => p.timeSpent);
    const currentDifficulty = recentProgress[0]?.exercise.difficulty || 'easy';
    
    const nextDifficulty = calculateNextDifficulty(
      currentDifficulty,
      scores,
      times
    );

    // Get exercises
    const exercises = await prisma.exercise.findMany({
      where: { difficulty: nextDifficulty },
      take: count,
      orderBy: { createdAt: 'desc' },
    });

    // Parse hints from JSON string
    const exercisesWithParsedHints = exercises.map((ex) => ({
      ...ex,
      hints: JSON.parse(ex.hints),
    }));

    res.json(exercisesWithParsedHints);
  } catch (error) {
    console.error('Get adaptive exercises error:', error);
    res.status(500).json({ error: 'Failed to get exercises' });
  }
}

export async function submitExercise(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { exerciseId, studentId, answer, attempts, timeSpent, hintsUsed } = req.body;

    // Get exercise
    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    const isCorrect = answer === exercise.answer;

    // Save progress
    await prisma.studentProgress.create({
      data: {
        studentId,
        exerciseId,
        answer,
        isCorrect,
        attempts,
        timeSpent,
        hintsUsed,
      },
    });

    // Calculate points
    const basePoints = 10;
    const firstTryBonus = attempts === 1 ? 5 : 0;
    const speedBonus = timeSpent < 10000 ? 2 : 0; // Under 10 seconds
    const pointsEarned = isCorrect ? basePoints + firstTryBonus + speedBonus : 0;

    // Update student points
    if (isCorrect) {
      await prisma.student.update({
        where: { id: studentId },
        data: {
          points: { increment: pointsEarned },
        },
      });
    }

    // Get next exercise
    const nextExercise = await prisma.exercise.findFirst({
      where: {
        type: exercise.type,
        difficulty: exercise.difficulty,
        id: { not: exerciseId },
      },
    });

    const feedback = isCorrect
      ? attempts === 1
        ? 'מעולה! תשובה נכונה בניסיון הראשון! 🌟'
        : 'נכון! המשיכו כך! 👍'
      : 'לא נורא, נסה שוב! 💪';

    res.json({
      pointsEarned,
      feedback,
      nextExercise: nextExercise ? {
        ...nextExercise,
        hints: JSON.parse(nextExercise.hints),
      } : null,
    });
  } catch (error) {
    console.error('Submit exercise error:', error);
    res.status(500).json({ error: 'Failed to submit exercise' });
  }
}

export async function getHint(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { exerciseId } = req.params;
    const { studentId, attempt } = req.query;

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      res.status(404).json({ error: 'Exercise not found' });
      return;
    }

    const hints = JSON.parse(exercise.hints);
    const attemptNum = parseInt(attempt as string) || 0;
    
    // Get appropriate hint based on attempt
    let hint: string;
    if (attemptNum < hints.length) {
      hint = hints[attemptNum];
    } else {
      // If we've run out of predefined hints, try AI generation
      hint = await generateHint(exercise, attemptNum);
    }

    res.json({ hint });
  } catch (error) {
    console.error('Get hint error:', error);
    res.status(500).json({ error: 'Failed to get hint' });
  }
}

export async function generateExercises(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { topic, difficulty, count, studentLevel } = req.body;

    // For now, just return random exercises from the database
    const exercises = await prisma.exercise.findMany({
      where: {
        topic,
        difficulty,
      },
      take: count || 5,
    });

    const exercisesWithParsedHints = exercises.map((ex) => ({
      ...ex,
      hints: JSON.parse(ex.hints),
    }));

    res.json(exercisesWithParsedHints);
  } catch (error) {
    console.error('Generate exercises error:', error);
    res.status(500).json({ error: 'Failed to generate exercises' });
  }
}

export async function getRecommendations(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { studentId } = req.params;

    // Get recent progress
    const recentProgress = await prisma.studentProgress.findMany({
      where: { studentId },
      orderBy: { completedAt: 'desc' },
      take: 20,
      include: { exercise: true },
    });

    // Calculate scores
    const scores = recentProgress.map((p) => (p.isCorrect ? 1 : 0));
    const times = recentProgress.map((p) => p.timeSpent);
    const currentDifficulty = recentProgress[0]?.exercise.difficulty || 'easy';

    const nextDifficulty = calculateNextDifficulty(currentDifficulty, scores, times);

    // Find topics to review
    const topicPerformance = new Map<string, number[]>();
    recentProgress.forEach((p) => {
      const topic = p.exercise.topic;
      if (!topicPerformance.has(topic)) {
        topicPerformance.set(topic, []);
      }
      topicPerformance.get(topic)!.push(p.isCorrect ? 1 : 0);
    });

    const topicsToReview = Array.from(topicPerformance.entries())
      .filter(([_, scores]) => {
        const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
        return avg < 0.7;
      })
      .map(([topic]) => topic);

    // Get suggested exercises
    const suggestedExercises = await prisma.exercise.findMany({
      where: {
        OR: [
          { difficulty: nextDifficulty },
          { topic: { in: topicsToReview } },
        ],
      },
      take: 5,
    });

    res.json({
      nextDifficulty,
      topicsToReview,
      suggestedExercises: suggestedExercises.map((ex) => ({
        ...ex,
        hints: JSON.parse(ex.hints),
      })),
      reasoning: `Based on your recent performance, we recommend ${nextDifficulty} exercises${topicsToReview.length > 0 ? ` and reviewing ${topicsToReview.join(', ')}` : ''}.`,
    });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
}


