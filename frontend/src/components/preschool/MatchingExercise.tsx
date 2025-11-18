import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface MatchingExerciseProps {
  onComplete: (score: number) => void;
  maxNumber?: number;
}

export function MatchingExercise({ onComplete, maxNumber = 8 }: MatchingExerciseProps) {
  const [targetNumber, setTargetNumber] = useState(0);
  const [options, setOptions] = useState<{ count: number; emoji: string }[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [score, setScore] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const { playSuccess, playError } = useSound();
  const { addPoints } = useProgress();

  const maxQuestions = 5;
  const emojis = ['🎈', '🎁', '⭐', '🌸', '🦋', '🍓', '🎨'];

  useEffect(() => {
    generateNewProblem();
  }, []);

  const generateNewProblem = () => {
    const target = randomInt(2, maxNumber);
    const opts = generateOptions(target, maxNumber);

    setTargetNumber(target);
    setOptions(opts);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const generateOptions = (correct: number, max: number) => {
    const counts = new Set<number>([correct]);

    while (counts.size < 3) {
      const num = randomInt(2, max);
      counts.add(num);
    }

    return Array.from(counts)
      .map((count) => ({
        count,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
      .sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (count: number) => {
    setSelectedAnswer(count);

    if (count === targetNumber) {
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
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-100 to-emerald-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: maxQuestions }).map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < questionsAnswered ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </motion.div>

        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-teal-600 mb-12">
            מצא את הקבוצה עם {targetNumber} פריטים! 🎯
          </h2>

          {/* Target Number Display */}
          <motion.div
            key={targetNumber}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-8 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-3xl">
              <p className="text-9xl font-bold text-teal-600">{targetNumber}</p>
            </div>
          </motion.div>

          {/* Options */}
          <div className="grid md:grid-cols-3 gap-8">
            {options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Button
                  onClick={() => handleAnswer(option.count)}
                  disabled={feedback !== null}
                  variant="outline"
                  className={`w-full h-full p-8 ${
                    selectedAnswer === option.count && feedback === 'correct'
                      ? 'bg-green-500 border-green-600'
                      : selectedAnswer === option.count && feedback === 'incorrect'
                      ? 'bg-red-500 border-red-600'
                      : ''
                  }`}
                >
                  <div className="flex flex-wrap gap-3 justify-center">
                    {Array.from({ length: option.count }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                        className="text-5xl"
                      >
                        {option.emoji}
                      </motion.div>
                    ))}
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>

          {feedback === 'correct' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-8">
              <div className="text-8xl mb-4">🎯</div>
              <p className="text-4xl font-bold text-green-600">פצצה! 💥</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-8">
              <div className="text-8xl mb-4">🤔</div>
              <p className="text-4xl font-bold text-orange-600">ספור שוב! 🔢</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
