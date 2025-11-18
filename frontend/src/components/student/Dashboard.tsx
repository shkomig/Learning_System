import { motion } from 'framer-motion';
import { useProgress } from '../../stores/progress-store';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ProgressBar } from './ProgressBar';
import { AchievementBadge } from './AchievementBadge';
import { Trophy, Zap, Target, TrendingUp } from 'lucide-react';
import { ACHIEVEMENTS, TOPICS } from '../../lib/constants';

interface DashboardProps {
  onStartExercise: (topic: string, difficulty: string) => void;
}

export function Dashboard({ onStartExercise }: DashboardProps) {
  const { 
    studentName, 
    points, 
    level, 
    streak, 
    exercisesCompleted,
    topicsMastered,
    achievements 
  } = useProgress();

  // Convert stored achievements to full achievement objects
  const unlockedAchievements = achievements.map(a => ({
    ...a,
    ...ACHIEVEMENTS.find(ach => ach.id === a.id)
  }));

  // Calculate points needed for next level
  const pointsForNextLevel = level * 100;

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-6xl font-bold text-primary mb-4">
            👋 שלום {studentName || 'תלמיד יקר'}!
          </h1>
          <p className="text-2xl text-text/70">
            בואו נמשיך ללמוד מתמטיקה היום!
          </p>
        </motion.header>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Points */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center">
              <Zap className="w-12 h-12 text-accent mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary">{points}</p>
              <p className="text-lg text-text/70">נקודות</p>
            </Card>
          </motion.div>

          {/* Level */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center">
              <Trophy className="w-12 h-12 text-secondary mx-auto mb-3" />
              <p className="text-4xl font-bold text-secondary">{level}</p>
              <p className="text-lg text-text/70">רמה</p>
            </Card>
          </motion.div>

          {/* Streak */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center">
              <Target className="w-12 h-12 text-error mx-auto mb-3" />
              <p className="text-4xl font-bold text-error">{streak}</p>
              <p className="text-lg text-text/70">ימי רצף</p>
            </Card>
          </motion.div>

          {/* Exercises Completed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary">{exercisesCompleted}</p>
              <p className="text-lg text-text/70">תרגילים</p>
            </Card>
          </motion.div>
        </div>

        {/* Level Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-2xl font-bold text-text mb-4">
              התקדמות לרמה הבאה
            </h2>
            <ProgressBar
              current={points}
              max={pointsForNextLevel}
              label={`רמה ${level}`}
              size="lg"
              color="primary"
            />
            <p className="text-sm text-text/70 mt-2">
              עוד {pointsForNextLevel - points} נקודות לרמה {level + 1}!
            </p>
          </Card>
        </motion.div>

        {/* Topics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-text mb-6">נושאי לימוד</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TOPICS.map((topic, index) => {
              const isMastered = topicsMastered.includes(topic.id);
              return (
                <motion.div
                  key={topic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Card hover className="relative overflow-hidden">
                    {isMastered && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                        ✓ שליטה
                      </div>
                    )}
                    <div className="text-center p-6">
                      <div className="text-6xl mb-4">
                        {topic.id.includes('addition') ? '➕' : 
                         topic.id.includes('subtraction') ? '➖' : '✖️'}
                      </div>
                      <h3 className="text-2xl font-bold text-text mb-2">
                        {topic.name}
                      </h3>
                      <p className="text-text/70 mb-4">
                        כיתה {topic.grade === 1 ? 'א' : 'ב'}
                      </p>
                      <Button
                        onClick={() => onStartExercise(topic.id, 'easy')}
                        variant={isMastered ? 'secondary' : 'primary'}
                        fullWidth
                      >
                        {isMastered ? 'תרגול נוסף' : 'התחל ללמוד'}
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-3xl font-bold text-text mb-6">ההישגים שלי</h2>
          <Card>
            <div className="grid grid-cols-5 gap-8 p-6">
              {ACHIEVEMENTS.map((achievement) => {
                const unlocked = unlockedAchievements.some(a => a.id === achievement.id);
                return (
                  <AchievementBadge
                    key={achievement.id}
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
                    size="md"
                  />
                );
              })}
            </div>
            {unlockedAchievements.length === 0 && (
              <p className="text-center text-text/70 py-8">
                עדיין לא פתחת הישגים. המשך לתרגל! 💪
              </p>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

