import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface SequenceExerciseProps {
  onComplete: (score: number) => void;
  maxNumber?: number;
}

export function SequenceExercise({ onComplete, maxNumber = 8 }: SequenceExerciseProps) {
  const [sequence, setSequence] = useState<(number | null)[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState(0);
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
    const startNum = randomInt(1, maxNumber - 4);
    const seq: (number | null)[] = [startNum, startNum + 1, startNum + 2, startNum + 3, startNum + 4];
    const missingIdx = randomInt(1, 3); // Don't pick first or last

    const answer = seq[missingIdx] as number;
    seq[missingIdx] = null;

    const opts = generateOptions(answer, maxNumber);

    setSequence(seq);
    setCorrectAnswer(answer);
    setOptions(opts);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  const generateOptions = (correct: number, max: number): number[] => {
    const opts = new Set<number>([correct]);

    while (opts.size < 4) {
      const num = randomInt(1, max);
      opts.add(num);
    }

    return Array.from(opts).sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (num: number) => {
    setSelectedAnswer(num);

    if (num === correctAnswer) {
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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: maxQuestions }).map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < questionsAnswered ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </motion.div>

        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-green-600 mb-12">
            מה המספר החסר? 🤔
          </h2>

          {/* Sequence */}
          <div className="flex justify-center gap-6 mb-12">
            {sequence.map((num, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0, y: -50 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`w-32 h-32 flex items-center justify-center rounded-2xl text-6xl font-bold ${
                  num === null
                    ? 'bg-yellow-200 border-4 border-dashed border-yellow-400'
                    : 'bg-blue-500 text-white'
                }`}
              >
                {num === null ? '?' : num}
              </motion.div>
            ))}
          </div>

          {/* Options */}
          <div className="grid grid-cols-4 gap-6 max-w-2xl mx-auto">
            {options.map((num, index) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                <Button
                  onClick={() => handleAnswer(num)}
                  disabled={feedback !== null}
                  variant="outline"
                  className={`w-full text-5xl py-12 ${
                    selectedAnswer === num && feedback === 'correct'
                      ? 'bg-green-500 text-white'
                      : selectedAnswer === num && feedback === 'incorrect'
                      ? 'bg-red-500 text-white'
                      : ''
                  }`}
                >
                  {num}
                </Button>
              </motion.div>
            ))}
          </div>

          {feedback === 'correct' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-8">
              <div className="text-8xl mb-4">🎯</div>
              <p className="text-4xl font-bold text-green-600">נכון! 🌟</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center mt-8">
              <div className="text-8xl mb-4">🤗</div>
              <p className="text-4xl font-bold text-orange-600">נסה שוב! 💪</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
