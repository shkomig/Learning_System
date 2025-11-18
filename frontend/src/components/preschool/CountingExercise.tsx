import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface CountingExerciseProps {
  onComplete: (score: number) => void;
  maxNumber?: number;
}

export function CountingExercise({ onComplete, maxNumber = 10 }: CountingExerciseProps) {
  const [count, setCount] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [emoji, setEmoji] = useState('🍎');

  const { playSuccess, playError } = useSound();
  const { addPoints } = useProgress();

  const maxQuestions = 5;
  const emojis = ['🍎', '🍌', '🍓', '🐶', '🐱', '⭐', '🎈', '🎁', '🌸', '🦋'];

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const newCount = randomInt(1, maxNumber);
    const newEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    setCount(newCount);
    setEmoji(newEmoji);
    setUserAnswer(null);
    setFeedback(null);
  };

  const handleNumberClick = (num: number) => {
    setUserAnswer(num);

    if (num === count) {
      playSuccess();
      setFeedback('correct');
      setScore(prev => prev + 1);
      addPoints(10);

      setTimeout(() => {
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
        setUserAnswer(null);
        setFeedback(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-6xl w-full">
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
        </motion.div>

        {/* Main Card */}
        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-blue-600 mb-12">
            כמה {emoji} יש? 🤔
          </h2>

          {/* Visual Display */}
          <div className="mb-12 min-h-[300px] flex items-center justify-center">
            <div className="grid grid-cols-5 gap-6 max-w-3xl">
              {Array.from({ length: count }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    delay: i * 0.15,
                    type: 'spring',
                    stiffness: 200,
                  }}
                  className="text-7xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Number Options */}
          <div className="grid grid-cols-5 gap-4 max-w-2xl mx-auto">
            {Array.from({ length: Math.min(maxNumber, 10) }, (_, i) => i + 1).map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num)}
                disabled={feedback !== null}
                variant={userAnswer === num ? 'primary' : 'outline'}
                className={`text-4xl py-8 transition-all ${
                  userAnswer === num && feedback === 'correct'
                    ? 'bg-green-500 border-green-600'
                    : userAnswer === num && feedback === 'incorrect'
                    ? 'bg-red-500 border-red-600'
                    : ''
                }`}
              >
                {num}
              </Button>
            ))}
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">🎉</div>
              <p className="text-4xl font-bold text-green-600">מעולה! 🌟</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">💪</div>
              <p className="text-4xl font-bold text-orange-600">ספור שוב! 😊</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
