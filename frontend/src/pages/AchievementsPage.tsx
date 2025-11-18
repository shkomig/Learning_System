import { motion } from 'framer-motion';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { AchievementBadge } from '../components/student/AchievementBadge';
import { ACHIEVEMENTS } from '../lib/constants';
import { Trophy } from 'lucide-react';

export function AchievementsPage() {
  const { achievements } = useProgress();

  // Convert stored achievements to full achievement objects
  const unlockedAchievements = achievements.map(a => ({
    ...a,
    ...ACHIEVEMENTS.find(ach => ach.id === a.id)
  }));

  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const progress = (unlockedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-16 h-16 text-accent" />
            <h1 className="text-6xl font-bold text-primary">
              ההישגים שלי
            </h1>
          </div>
          <p className="text-2xl text-text/70">
            פתחת {unlockedCount} מתוך {totalCount} הישגים ({progress.toFixed(0)}%)
          </p>
        </motion.header>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full bg-gradient-to-r from-primary to-accent"
              />
            </div>
          </Card>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-5 gap-8">
          {ACHIEVEMENTS.map((achievement, index) => {
            const unlocked = unlockedAchievements.some(a => a.id === achievement.id);
            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <AchievementBadge
                  achievement={{
                    id: achievement.id,
                    name: achievement.nameEn,
                    nameHe: achievement.nameHe,
                    description: achievement.descriptionEn,
                    descriptionHe: achievement.descriptionHe,
                    icon: achievement.icon,
                    category: achievement.category,
                    requirement: achievement.requirement,
                    unlocked,
                  }}
                  size="lg"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Motivational Message */}
        {unlockedCount === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <Card>
              <p className="text-2xl text-text/70 py-8">
                🎯 התחל לתרגל כדי לפתוח הישגים! 💪
              </p>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
