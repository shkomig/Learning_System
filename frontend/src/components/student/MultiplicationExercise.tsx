import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lightbulb, X } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { CelebrationAnimation } from './CelebrationAnimation';
import type { Difficulty } from '../../types';
import { randomInt } from '../../lib/utils';

interface MultiplicationExerciseProps {
  difficulty: Difficulty;
  onComplete: (score: number, timeSpent: number) => void;
  studentLevel: number;
}

export function MultiplicationExercise({
  difficulty,
  onComplete,
}: MultiplicationExerciseProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [startTime] = useState(Date.now());
  const [showCelebration, setShowCelebration] = useState(false);

  const { playSuccess, playError, playClick } = useSound();
  const { addPoints, incrementStreak, completeExercise } = useProgress();

  const maxQuestions = difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15;

  useEffect(() => {
    generateNewProblem();
  }, [difficulty]);

  const generateNewProblem = () => {
    let max1 = 5;
    let max2 = 5;

    if (difficulty === 'easy') {
      max1 = 5; // Tables 1-5
      max2 = 10;
    } else if (difficulty === 'medium') {
      max1 = 10; // Tables 1-10
      max2 = 10;
    } else {
      max1 = 12; // Tables 1-12
      max2 = 12;
    }

    setNum1(randomInt(1, max1));
    setNum2(randomInt(1, max2));
    setUserAnswer('');
    setAttempts(0);
    setShowHint(false);
    setFeedback(null);
  };

  const correctAnswer = num1 * num2;

  const handleSubmit = () => {
    playClick();
    const answer = parseInt(userAnswer);

    if (isNaN(answer)) {
      return;
    }

    setAttempts(prev => prev + 1);

    if (answer === correctAnswer) {
      // Correct answer
      playSuccess();
      setFeedback('correct');
      setShowCelebration(true);

      // Calculate points
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 15 : 20;
      const bonusPoints = attempts === 0 ? 5 : 0;
      const totalPoints = basePoints + bonusPoints;

      addPoints(totalPoints);
      incrementStreak();
      setScore(prev => prev + totalPoints);

      setTimeout(() => {
        setShowCelebration(false);
        const newQuestionsAnswered = questionsAnswered + 1;
        setQuestionsAnswered(newQuestionsAnswered);

        if (newQuestionsAnswered >= maxQuestions) {
          // Exercise complete
          const timeSpent = Date.now() - startTime;
          completeExercise('multiplication-tables', (score / (maxQuestions * 20)) * 100);
          onComplete(score, timeSpent);
        } else {
          generateNewProblem();
        }
      }, 2000);
    } else {
      // Incorrect answer
      playError();
      setFeedback('incorrect');

      if (attempts >= 1) {
        setShowHint(true);
      }

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const handleSkip = () => {
    playClick();
    const newQuestionsAnswered = questionsAnswered + 1;
    setQuestionsAnswered(newQuestionsAnswered);

    if (newQuestionsAnswered >= maxQuestions) {
      const timeSpent = Date.now() - startTime;
      completeExercise('multiplication-tables', (score / (maxQuestions * 20)) * 100);
      onComplete(score, timeSpent);
    } else {
      generateNewProblem();
    }
  };

  // Render multiplication grid visual
  const renderGrid = () => {
    const items = [];
    for (let row = 0; row < num1; row++) {
      for (let col = 0; col < num2; col++) {
        items.push(
          <motion.div
            key={`${row}-${col}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: (row * num2 + col) * 0.05 }}
            className="w-8 h-8 bg-primary rounded-lg"
          />
        );
      }
    }

    return (
      <div
        className="grid gap-2 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${num2}, 2rem)`,
          maxWidth: 'fit-content',
        }}
      >
        {items}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5 flex items-center justify-center p-8" dir="rtl">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-text">
              שאלה {questionsAnswered + 1} מתוך {maxQuestions}
            </span>
            <span className="text-lg font-bold text-accent">
              {score} נקודות
            </span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(questionsAnswered / maxQuestions) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary to-accent"
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Main Exercise Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-12">
            {/* Problem */}
            <div className="text-center mb-8">
              <motion.div
                key={`${num1}-${num2}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-bold text-primary mb-8 flex items-center justify-center gap-6"
              >
                <span>{num1}</span>
                <X className="w-16 h-16 text-secondary" />
                <span>{num2}</span>
                <span className="text-text">=</span>
                <span className="text-accent">?</span>
              </motion.div>

              {/* Visual Grid */}
              {(num1 <= 10 && num2 <= 10) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  {renderGrid()}
                  <p className="text-text/70 mt-4 text-lg">
                    {num1} שורות × {num2} עמודות
                  </p>
                </motion.div>
              )}
            </div>

            {/* Answer Input */}
            <div className="max-w-md mx-auto mb-6">
              <Input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="הכנס תשובה..."
                className="text-center text-4xl font-bold"
                disabled={feedback === 'correct'}
              />
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 bg-secondary/10 p-6 rounded-xl border-2 border-secondary"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-secondary mb-2">רמז:</p>
                      <p className="text-text">
                        כפל זה חיבור חוזר! {num1} × {num2} זה כמו לחבר את {num1} בעצמו {num2} פעמים.
                      </p>
                      <p className="text-text mt-2">
                        לדוגמה: {num1} + {num1}
                        {num2 > 2 && ` + ${num1}`}
                        {num2 > 3 && ` + ...`} = ?
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center mb-6"
                >
                  {feedback === 'correct' ? (
                    <div className="text-6xl">✅</div>
                  ) : (
                    <div className="text-6xl">❌</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleSubmit}
                disabled={!userAnswer || feedback === 'correct'}
                size="lg"
                className="text-xl px-12"
              >
                בדוק תשובה
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                size="lg"
                disabled={feedback === 'correct'}
              >
                דלג
              </Button>
            </div>

            {/* Attempts */}
            {attempts > 0 && feedback !== 'correct' && (
              <div className="text-center mt-4 flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 text-error" />
                <span className="text-text/70">
                  ניסיון {attempts} מתוך 3
                </span>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Celebration */}
        <CelebrationAnimation
          show={showCelebration}
          message="כל הכבוד!"
          type="success"
        />
      </div>
    </div>
  );
}
