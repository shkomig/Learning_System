import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Lightbulb } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Difficulty, ExerciseProblem, VisualType } from '../../types';
import { randomInt } from '../../lib/utils';
import { DIFFICULTY_RANGES } from '../../lib/constants';

interface SubtractionExerciseProps {
  difficulty: Difficulty;
  onComplete: (score: number, timeSpent: number) => void;
  studentLevel: number;
}

export function SubtractionExercise({
  difficulty,
  onComplete,
}: SubtractionExerciseProps) {
  const [problem, setProblem] = useState<ExerciseProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [startTime] = useState(Date.now());

  const { playSuccess, playError, playClick } = useSound();
  const { addPoints, incrementStreak } = useProgress();

  useEffect(() => {
    const newProblem = generateProblem(difficulty);
    setProblem(newProblem);
  }, [difficulty]);

  const generateProblem = (diff: Difficulty): ExerciseProblem => {
    const max = DIFFICULTY_RANGES[diff].max;
    const answer = randomInt(0, max - 1);
    const num2 = randomInt(1, Math.min(answer + 1, max - answer));
    const num1 = answer + num2;

    const visuals: VisualType[] = ['fruits', 'animals', 'blocks'];
    const visual = visuals[Math.floor(Math.random() * visuals.length)];

    return {
      num1,
      num2,
      correctAnswer: answer,
      visual,
    };
  };

  const handleSubmit = () => {
    if (!problem || !userAnswer) return;

    playClick();
    const answer = parseInt(userAnswer);
    setAttempts((prev) => prev + 1);

    if (answer === problem.correctAnswer) {
      setFeedback('correct');
      playSuccess();

      const timeSpent = Date.now() - startTime;
      const basePoints = 10;
      const bonusPoints = attempts === 0 ? 5 : 0;
      const totalPoints = basePoints + bonusPoints;

      addPoints(totalPoints);
      incrementStreak();

      setTimeout(() => {
        onComplete(totalPoints, timeSpent);
      }, 2000);
    } else {
      setFeedback('incorrect');
      playError();
      setUserAnswer('');

      if (attempts >= 1) {
        setShowHint(true);
      }

      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!problem) return <LoadingSpinner text="מכין תרגיל..." />;

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text flex items-center gap-2">
            <Heart className="text-error" fill="currentColor" />
            בואו נחסר מספרים!
          </h1>
          <Button
            onClick={() => setShowHint(true)}
            variant="secondary"
            size="md"
          >
            <Lightbulb className="w-5 h-5 inline mr-2" />
            רמז
          </Button>
        </div>

        {/* Exercise Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          {/* Math Equation */}
          <div className="text-center text-5xl font-bold text-text mb-8">
            {problem.num1} - {problem.num2} = ?
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-accent/20 rounded-2xl p-6 mb-8"
              >
                <p className="text-xl text-center">
                  💡 יש לך {problem.num1} פריטים. אם תסיר {problem.num2}, כמה ישאר?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Answer Input */}
          <div className="flex justify-center mb-8">
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              max={99}
              min={0}
              autoFocus
              className="w-32 h-32 text-6xl"
              placeholder="?"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer}
              variant="primary"
              size="xl"
            >
              בדיקה ✓
            </Button>
          </div>
        </motion.div>

        {/* Feedback Overlays */}
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="fixed inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-32 h-32 text-accent mx-auto mb-4" />
                </motion.div>
                <h2 className="text-5xl font-bold text-primary mb-4">
                  מעולה! 🎉
                </h2>
                <p className="text-3xl text-text">
                  התשובה שלך נכונה!
                </p>
                {attempts === 0 && (
                  <p className="text-2xl text-accent mt-4 font-bold">
                    +5 נקודות בונוס! 🌟
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white border-4 border-error rounded-2xl shadow-lg p-6 z-50"
            >
              <p className="text-2xl text-center">
                אופס! נסה שוב 💪
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


