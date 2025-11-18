import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { AdditionExercise } from './components/student/AdditionExercise';
import { SubtractionExercise } from './components/student/SubtractionExercise';
import { Dashboard } from './components/student/Dashboard';
import { Navigation } from './components/layout/Navigation';
import { useProgress } from './stores/progress-store';
import type { Difficulty } from './types';

function App() {
  const [currentExercise, setCurrentExercise] = useState<{
    type: string;
    difficulty: Difficulty;
  } | null>(null);
  const navigate = useNavigate();
  const { level } = useProgress();

  const handleStartExercise = (topic: string, difficulty: string) => {
    setCurrentExercise({
      type: topic,
      difficulty: difficulty as Difficulty,
    });
  };

  const handleCompleteExercise = (score: number, timeSpent: number) => {
    console.log('Exercise completed:', { score, timeSpent });
    setCurrentExercise(null);
    navigate('/');
  };

  // If in exercise mode, show exercise
  if (currentExercise) {
    // Check if it's a subtraction exercise
    if (currentExercise.type.includes('subtraction')) {
      return (
        <SubtractionExercise
          difficulty={currentExercise.difficulty}
          onComplete={handleCompleteExercise}
          studentLevel={level}
        />
      );
    }
    
    // Default to addition exercise
    return (
      <AdditionExercise
        difficulty={currentExercise.difficulty}
        onComplete={handleCompleteExercise}
        studentLevel={level}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      <Routes>
        <Route 
          path="/" 
          element={<Dashboard onStartExercise={handleStartExercise} />} 
        />
        <Route 
          path="/exercises" 
          element={<Dashboard onStartExercise={handleStartExercise} />} 
        />
        <Route 
          path="/achievements" 
          element={<Dashboard onStartExercise={handleStartExercise} />} 
        />
        <Route 
          path="/profile" 
          element={<Dashboard onStartExercise={handleStartExercise} />} 
        />
        <Route 
          path="/settings" 
          element={<Dashboard onStartExercise={handleStartExercise} />} 
        />
      </Routes>
    </div>
  );
}

export default App;
