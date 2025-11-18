import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface ComparisonExerciseProps {
  onComplete: (score: number) => void;
  maxNumber?: number;
}

export function ComparisonExercise({ onComplete, maxNumber = 10 }: ComparisonExerciseProps) {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const { playSuccess, playError } = useSound();
  const { addPoints } = useProgress();

  const maxQuestions = 5;

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const n1 = randomInt(1, maxNumber);
    let n2 = randomInt(1, maxNumber);

    // Make sure numbers are different
    while (n2 === n1) {
      n2 = randomInt(1, maxNumber);
    }

    setNum1(n1);
    setNum2(n2);
    setFeedback(null);
  };

  const handleAnswer = (answer: 'greater' | 'less') => {
    const isCorrect =
      (answer === 'greater' && num1 > num2) ||
      (answer === 'less' && num1 < num2);

    if (isCorrect) {
      playSuccess();
      setFeedback('correct');
      setShowCelebration(true);
      setScore(prev => prev + 1);
      addPoints(10);

      setTimeout(() => {
        setShowCelebration(false);
        const newQuestionsAnswered = questionsAnswered + 1;
        setQuestionsAnswered(newQuestionsAnswered);

        if (newQuestionsAnswered >= maxQuestions) {
          onComplete(score + 1);
        } else {
          generateNewProblem();
        }
      }, 2000);
    } else {
      playError();
      setFeedback('incorrect');

      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
  };

  const renderVisualGroup = (count: number) => {
    return (
      <div className="flex flex-wrap gap-3 justify-center max-w-sm">
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-5xl"
          >
            {count % 2 === 0 ? '🍎' : '⭐'}
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-5xl w-full">
        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: maxQuestions }).map((_, i) => (
              <Star
                key={i}
                className={`w-8 h-8 ${
                  i < questionsAnswered
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-3xl font-bold text-purple-600">
            שאלה {questionsAnswered + 1} מתוך {maxQuestions}
          </p>
        </motion.div>

        {/* Main Card */}
        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-purple-600 mb-12">
            איזה מספר גדול יותר? 🤔
          </h2>

          {/* Numbers Comparison */}
          <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
            {/* Left Number */}
            <motion.div
              key={`left-${num1}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="text-9xl font-bold text-blue-500 mb-4">
                  {num1}
                </div>
                {renderVisualGroup(num1)}
              </div>
            </motion.div>

            {/* VS */}
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-400">VS</div>
            </div>

            {/* Right Number */}
            <motion.div
              key={`right-${num2}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <div className="mb-6">
                <div className="text-9xl font-bold text-pink-500 mb-4">
                  {num2}
                </div>
                {renderVisualGroup(num2)}
              </div>
            </motion.div>
          </div>

          {/* Answer Buttons */}
          <div className="flex gap-6 justify-center">
            <Button
              onClick={() => handleAnswer('greater')}
              disabled={feedback !== null}
              size="xl"
              className="text-3xl px-16 py-8 bg-blue-500 hover:bg-blue-600"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl">{num1}</span>
                <span>גדול יותר!</span>
              </div>
            </Button>

            <Button
              onClick={() => handleAnswer('less')}
              disabled={feedback !== null}
              size="xl"
              className="text-3xl px-16 py-8 bg-pink-500 hover:bg-pink-600"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl">{num2}</span>
                <span>גדול יותר!</span>
              </div>
            </Button>
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">🎉</div>
              <p className="text-4xl font-bold text-green-600">כל הכבוד! 👏</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">😊</div>
              <p className="text-4xl font-bold text-orange-600">נסה שוב! 💪</p>
            </motion.div>
          )}
        </Card>

        {/* Celebration */}
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="text-9xl animate-bounce">
              ⭐✨🎉✨⭐
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
