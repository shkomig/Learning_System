import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { TOPICS } from '../lib/constants';
import { BookOpen, TrendingUp } from 'lucide-react';

interface ExercisesPageProps {
  onStartExercise: (topic: string, difficulty: string) => void;
}

export function ExercisesPage({ onStartExercise }: ExercisesPageProps) {
  const { topicsMastered, level } = useProgress();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handleStartExercise = (difficulty: string) => {
    if (selectedTopic) {
      onStartExercise(selectedTopic, difficulty);
    }
  };

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
            <BookOpen className="w-16 h-16 text-primary" />
            <h1 className="text-6xl font-bold text-primary">
              תרגילים
            </h1>
          </div>
          <p className="text-2xl text-text/70">
            בחר נושא ורמת קושי כדי להתחיל
          </p>
        </motion.header>

        {!selectedTopic ? (
          /* Topic Selection */
          <div>
            <h2 className="text-3xl font-bold text-text mb-6">בחר נושא ללימוד</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {TOPICS.map((topic, index) => {
                const isMastered = topicsMastered.includes(topic.id);
                const isLocked = topic.grade === 2 && level < 5; // Lock grade 2 topics for low levels

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card hover={!isLocked} className={`relative overflow-hidden ${isLocked ? 'opacity-50' : ''}`}>
                      {isMastered && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                          ✓ שליטה
                        </div>
                      )}
                      {isLocked && (
                        <div className="absolute top-4 right-4 bg-text/50 text-white px-3 py-1 rounded-full text-sm font-bold">
                          🔒 נעול
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
                          onClick={() => !isLocked && setSelectedTopic(topic.id)}
                          variant={isMastered ? 'secondary' : 'primary'}
                          fullWidth
                          disabled={isLocked}
                        >
                          {isLocked ? 'דרוש רמה 5' : isMastered ? 'תרגול נוסף' : 'התחל ללמוד'}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Difficulty Selection */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Button
              onClick={() => setSelectedTopic(null)}
              variant="ghost"
              className="mb-6"
            >
              ← חזור לבחירת נושא
            </Button>

            <Card>
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">
                  {selectedTopic.includes('addition') ? '➕' :
                   selectedTopic.includes('subtraction') ? '➖' : '✖️'}
                </div>
                <h2 className="text-4xl font-bold text-text mb-2">
                  {TOPICS.find(t => t.id === selectedTopic)?.name}
                </h2>
                <p className="text-xl text-text/70">
                  בחר רמת קושי
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Easy */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card hover className="cursor-pointer" onClick={() => handleStartExercise('easy')}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">😊</div>
                      <h3 className="text-3xl font-bold text-primary mb-2">קל</h3>
                      <p className="text-text/70 mb-4">
                        {selectedTopic.includes('100') ? 'עד 50' : 'עד 10'}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">10 נקודות</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Medium */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card hover className="cursor-pointer" onClick={() => handleStartExercise('medium')}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🎯</div>
                      <h3 className="text-3xl font-bold text-secondary mb-2">בינוני</h3>
                      <p className="text-text/70 mb-4">
                        {selectedTopic.includes('100') ? 'עד 100' : 'עד 20'}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">15 נקודות</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* Hard */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card hover className="cursor-pointer" onClick={() => handleStartExercise('hard')}>
                    <div className="text-center p-8">
                      <div className="text-6xl mb-4">🔥</div>
                      <h3 className="text-3xl font-bold text-error mb-2">קשה</h3>
                      <p className="text-text/70 mb-4">
                        {selectedTopic.includes('100') ? 'עד 100+' : 'עד 20+'}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-accent">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-bold">20 נקודות</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
