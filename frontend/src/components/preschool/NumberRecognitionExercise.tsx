import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface NumberRecognitionExerciseProps {
  onComplete: (score: number) => void;
  maxNumber?: number;
}

export function NumberRecognitionExercise({
  onComplete,
  maxNumber = 10,
}: NumberRecognitionExerciseProps) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const { playSuccess, playError } = useSound();
  const { addPoints } = useProgress();

  const maxQuestions = 5;

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const target = randomInt(1, maxNumber);
    const opts = generateOptions(target, maxNumber);

    setTargetNumber(target);
    setOptions(opts);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const generateOptions = (correctAnswer: number, max: number): number[] => {
    const opts = new Set<number>([correctAnswer]);

    while (opts.size < 4) {
      const num = randomInt(1, max);
      opts.add(num);
    }

    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (num: number) => {
    setSelectedAnswer(num);

    if (num === targetNumber) {
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
        setSelectedAnswer(null);
        setFeedback(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-4" dir="rtl">
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
        </motion.div>

        {/* Main Card */}
        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-purple-600 mb-12">
            מצא את המספר 🔍
          </h2>

          {/* Target Number */}
          <motion.div
            key={targetNumber}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-12 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl shadow-2xl">
              <p className="text-9xl font-bold text-purple-600">{targetNumber}</p>
            </div>
          </motion.div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            {options.map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => handleAnswer(num)}
                  disabled={feedback !== null}
                  variant="outline"
                  className={`w-full text-8xl py-16 transition-all ${
                    selectedAnswer === num && feedback === 'correct'
                      ? 'bg-green-500 border-green-600 text-white scale-110'
                      : selectedAnswer === num && feedback === 'incorrect'
                      ? 'bg-red-500 border-red-600 text-white scale-90'
                      : 'hover:scale-105'
                  }`}
                >
                  {num}
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Feedback */}
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">⭐</div>
              <p className="text-4xl font-bold text-green-600">יפה מאוד! 🎉</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-8"
            >
              <div className="text-8xl mb-4">🤔</div>
              <p className="text-4xl font-bold text-orange-600">נסה שוב! 💪</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
