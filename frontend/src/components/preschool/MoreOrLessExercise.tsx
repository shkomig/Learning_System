import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { randomInt } from '../../lib/utils';

interface MoreOrLessExerciseProps {
  onComplete: (score: number) => void;
}

export function MoreOrLessExercise({ onComplete }: MoreOrLessExerciseProps) {
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [question, setQuestion] = useState<'more' | 'less' | 'equal'>('more');
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
    const questions: Array<'more' | 'less' | 'equal'> = ['more', 'less', 'equal'];
    const q = questions[Math.floor(Math.random() * questions.length)];

    const left = randomInt(3, 8);
    const right = randomInt(3, 8);

    setLeftCount(left);
    setRightCount(right);
    setQuestion(q);
    setFeedback(null);
  };

  const handleAnswer = (side: 'left' | 'right') => {
    let isCorrect = false;

    if (question === 'more') {
      isCorrect = (side === 'left' && leftCount > rightCount) || (side === 'right' && rightCount > leftCount);
    } else if (question === 'less') {
      isCorrect = (side === 'left' && leftCount < rightCount) || (side === 'right' && rightCount < leftCount);
    } else {
      isCorrect = leftCount === rightCount;
    }

    if (isCorrect) {
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
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const questionText = {
    more: 'איפה יש יותר?',
    less: 'איפה יש פחות?',
    equal: 'האם הכמות שווה?',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-6xl w-full">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            {Array.from({ length: maxQuestions }).map((_, i) => (
              <Star key={i} className={`w-8 h-8 ${i < questionsAnswered ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
        </motion.div>

        <Card className="p-12 bg-white/90 backdrop-blur">
          <h2 className="text-5xl font-bold text-center text-red-600 mb-12">
            {questionText[question]} ⚖️
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Side */}
            <Button
              onClick={() => handleAnswer('left')}
              disabled={feedback !== null}
              variant="outline"
              className="p-12 h-auto"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                {Array.from({ length: leftCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-6xl"
                  >
                    🍎
                  </motion.div>
                ))}
              </div>
            </Button>

            {/* Right Side */}
            <Button
              onClick={() => handleAnswer('right')}
              disabled={feedback !== null}
              variant="outline"
              className="p-12 h-auto"
            >
              <div className="flex flex-wrap gap-4 justify-center">
                {Array.from({ length: rightCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="text-6xl"
                  >
                    🍊
                  </motion.div>
                ))}
              </div>
            </Button>
          </div>

          {feedback === 'correct' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
              <div className="text-8xl mb-4">🎉</div>
              <p className="text-4xl font-bold text-green-600">כל הכבוד! ⭐</p>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center">
              <div className="text-8xl mb-4">😊</div>
              <p className="text-4xl font-bold text-orange-600">נסה שוב! 💪</p>
            </motion.div>
          )}
        </Card>
      </div>
    </div>
  );
}
