import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export async function getStudent(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        level: true,
        points: true,
        streak: true,
        lastLoginDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }

    res.json(student);
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: 'Failed to get student' });
  }
}

export async function updateStudent(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { name, avatar, level, points, streak } = req.body;

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
        ...(level !== undefined && { level }),
        ...(points !== undefined && { points }),
        ...(streak !== undefined && { streak }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        level: true,
        points: true,
        streak: true,
        lastLoginDate: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json(student);
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
}

export async function getStudentProgress(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const progress = await prisma.studentProgress.findMany({
      where: { studentId: id },
      include: {
        exercise: true,
      },
      orderBy: { completedAt: 'desc' },
      take: 100,
    });

    const stats = {
      exercisesCompleted: progress.length,
      correctAnswers: progress.filter((p) => p.isCorrect).length,
      averageScore: progress.length > 0
        ? (progress.filter((p) => p.isCorrect).length / progress.length) * 100
        : 0,
      totalTimeSpent: progress.reduce((sum, p) => sum + p.timeSpent, 0),
      topicsMastered: [...new Set(
        progress
          .filter((p) => p.isCorrect)
          .map((p) => p.exercise.topic)
      )],
    };

    res.json(stats);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Failed to get progress' });
  }
}

export async function getStudentStats(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [todayCount, weekCount, monthCount, allProgress] = await Promise.all([
      prisma.studentProgress.count({
        where: {
          studentId: id,
          completedAt: { gte: todayStart },
        },
      }),
      prisma.studentProgress.count({
        where: {
          studentId: id,
          completedAt: { gte: weekStart },
        },
      }),
      prisma.studentProgress.count({
        where: {
          studentId: id,
          completedAt: { gte: monthStart },
        },
      }),
      prisma.studentProgress.findMany({
        where: { studentId: id },
        include: { exercise: true },
      }),
    ]);

    // Calculate topic performance
    const topicPerformance = new Map<string, { correct: number; total: number }>();
    allProgress.forEach((p) => {
      const topic = p.exercise.topic;
      if (!topicPerformance.has(topic)) {
        topicPerformance.set(topic, { correct: 0, total: 0 });
      }
      const stats = topicPerformance.get(topic)!;
      stats.total++;
      if (p.isCorrect) stats.correct++;
    });

    const favoriteTopics = Array.from(topicPerformance.entries())
      .filter(([_, stats]) => stats.correct / stats.total >= 0.8)
      .map(([topic]) => topic);

    const strugglingTopics = Array.from(topicPerformance.entries())
      .filter(([_, stats]) => stats.correct / stats.total < 0.5 && stats.total >= 5)
      .map(([topic]) => topic);

    const student = await prisma.student.findUnique({
      where: { id },
      select: { streak: true },
    });

    res.json({
      todayExercises: todayCount,
      weekExercises: weekCount,
      monthExercises: monthCount,
      bestStreak: student?.streak || 0,
      favoriteTopics,
      strugglingTopics,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
}


