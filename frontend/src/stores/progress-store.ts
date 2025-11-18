import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Achievement } from '../types';

interface ProgressState {
  // Student data
  studentId: string | null;
  studentName: string;
  level: number;
  points: number;
  streak: number;
  lastLoginDate: Date | null;

  // Progress tracking
  exercisesCompleted: number;
  topicsMastered: string[];
  achievements: Achievement[];
  currentAvatar: string;

  // Actions
  setStudent: (id: string, name: string) => void;
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeExercise: (topic: string, score: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  changeAvatar: (avatar: string) => void;
  levelUp: () => void;
  reset: () => void;
}

const initialState = {
  studentId: null,
  studentName: '',
  level: 1,
  points: 0,
  streak: 0,
  lastLoginDate: null,
  exercisesCompleted: 0,
  topicsMastered: [],
  achievements: [],
  currentAvatar: '👧',
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      ...initialState,

      setStudent: (id, name) =>
        set({
          studentId: id,
          studentName: name,
          lastLoginDate: new Date(),
        }),

      addPoints: (points) =>
        set((state) => {
          const newPoints = state.points + points;
          const pointsForNextLevel = state.level * 100;

          // Check if level up
          if (newPoints >= pointsForNextLevel) {
            return {
              points: newPoints,
              level: state.level + 1,
            };
          }

          return { points: newPoints };
        }),

      incrementStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastLogin = state.lastLoginDate
            ? new Date(state.lastLoginDate).toDateString()
            : null;

          // Check if this is a consecutive day
          if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const isConsecutive = lastLogin === yesterday.toDateString();

            return {
              streak: isConsecutive ? state.streak + 1 : 1,
              lastLoginDate: new Date(),
            };
          }

          return { lastLoginDate: new Date() };
        }),

      resetStreak: () => set({ streak: 0 }),

      completeExercise: (topic, score) =>
        set((state) => {
          const newCompleted = state.exercisesCompleted + 1;
          const masteredTopics = [...state.topicsMastered];

          // Check if topic should be marked as mastered
          if (score >= 80 && !masteredTopics.includes(topic)) {
            masteredTopics.push(topic);
          }

          return {
            exercisesCompleted: newCompleted,
            topicsMastered: masteredTopics,
          };
        }),

      unlockAchievement: (achievement) =>
        set((state) => {
          // Prevent duplicates
          if (state.achievements.some((a) => a.id === achievement.id)) {
            return state;
          }

          return {
            achievements: [...state.achievements, { ...achievement, unlocked: true }],
            points: state.points + 50, // Bonus points for achievement
          };
        }),

      changeAvatar: (avatar) => set({ currentAvatar: avatar }),

      levelUp: () =>
        set((state) => ({
          level: state.level + 1,
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'student-progress',
    }
  )
);

