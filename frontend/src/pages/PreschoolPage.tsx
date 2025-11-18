import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ComparisonExercise } from '../components/preschool/ComparisonExercise';
import { CountingExercise } from '../components/preschool/CountingExercise';
import { NumberRecognitionExercise } from '../components/preschool/NumberRecognitionExercise';
import { SequenceExercise } from '../components/preschool/SequenceExercise';
import { MoreOrLessExercise } from '../components/preschool/MoreOrLessExercise';
import { MatchingExercise } from '../components/preschool/MatchingExercise';
import { useProgress } from '../stores/progress-store';
import { Star, Home } from 'lucide-react';

type ExerciseType =
  | 'comparison'
  | 'counting'
  | 'recognition'
  | 'sequence'
  | 'moreorless'
  | 'matching'
  | null;

export function PreschoolPage() {
  const [currentExercise, setCurrentExercise] = useState<ExerciseType>(null);
  const [totalStars, setTotalStars] = useState(0);
  const navigate = useNavigate();
  const { addPoints, studentName } = useProgress();

  const exercises = [
    {
      id: 'comparison' as ExerciseType,
      name: 'גדול או קטן?',
      nameEn: 'Bigger or Smaller',
      description: 'למד לזהות מספרים גדולים וקטנים',
      emoji: '🔢',
      color: 'from-blue-400 to-purple-400',
    },
    {
      id: 'counting' as ExerciseType,
      name: 'ספירה',
      nameEn: 'Counting',
      description: 'ספור כמה פריטים יש',
      emoji: '🔢',
      color: 'from-green-400 to-teal-400',
    },
    {
      id: 'recognition' as ExerciseType,
      name: 'זיהוי מספרים',
      nameEn: 'Number Recognition',
      description: 'מצא את המספר הנכון',
      emoji: '🎯',
      color: 'from-purple-400 to-pink-400',
    },
    {
      id: 'sequence' as ExerciseType,
      name: 'מספר חסר',
      nameEn: 'Missing Number',
      description: 'מה המספר החסר ברצף?',
      emoji: '🧩',
      color: 'from-yellow-400 to-orange-400',
    },
    {
      id: 'moreorless' as ExerciseType,
      name: 'יותר או פחות',
      nameEn: 'More or Less',
      description: 'למד על כמויות',
      emoji: '⚖️',
      color: 'from-red-400 to-pink-400',
    },
    {
      id: 'matching' as ExerciseType,
      name: 'התאמות',
      nameEn: 'Matching',
      description: 'התאם מספר לכמות',
      emoji: '🎨',
      color: 'from-cyan-400 to-blue-400',
    },
  ];

  const handleExerciseComplete = (score: number) => {
    setTotalStars(prev => prev + score);
    addPoints(score * 10);
    setCurrentExercise(null);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // If exercise is selected, show it
  if (currentExercise) {
    switch (currentExercise) {
      case 'comparison':
        return <ComparisonExercise onComplete={handleExerciseComplete} />;
      case 'counting':
        return <CountingExercise onComplete={handleExerciseComplete} />;
      case 'recognition':
        return <NumberRecognitionExercise onComplete={handleExerciseComplete} />;
      case 'sequence':
        return <SequenceExercise onComplete={handleExerciseComplete} />;
      case 'moreorless':
        return <MoreOrLessExercise onComplete={handleExerciseComplete} />;
      case 'matching':
        return <MatchingExercise onComplete={handleExerciseComplete} />;
      default:
        return null;
    }
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-between mb-6">
            <Button
              onClick={handleBackToHome}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Home className="w-6 h-6" />
              חזור לבית
            </Button>

            <div className="flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-lg">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              <span className="text-3xl font-bold text-purple-600">{totalStars}</span>
              <span className="text-xl text-text/70">כוכבים</span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-8xl mb-6"
          >
            🎓✨
          </motion.div>

          <h1 className="text-7xl font-bold text-purple-600 mb-4">
            שלום {studentName || 'חביבי'}! 👋
          </h1>
          <p className="text-3xl text-text/70">
            בואו נלמד מספרים ביחד! 🎉
          </p>
        </motion.header>

        {/* Exercise Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                hover
                onClick={() => setCurrentExercise(exercise.id)}
                className="cursor-pointer h-full"
              >
                <div className="text-center p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${exercise.color} flex items-center justify-center text-7xl shadow-2xl`}
                  >
                    {exercise.emoji}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-3xl font-bold text-text mb-3">
                    {exercise.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xl text-text/70 mb-6">
                    {exercise.description}
                  </p>

                  {/* Button */}
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    className="text-2xl py-6"
                  >
                    בואו נתחיל! 🚀
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Encouragement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-yellow-200 to-orange-200">
            <div className="p-8">
              <p className="text-3xl font-bold text-purple-600 mb-2">
                💪 אתה יכול! אתה חכם! 🌟
              </p>
              <p className="text-xl text-text/70">
                כל תרגיל שאתה משלים יעזור לך להיות מוכן לכיתה א'!
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
