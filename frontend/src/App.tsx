import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AdditionExercise } from './components/student/AdditionExercise';
import { SubtractionExercise } from './components/student/SubtractionExercise';
import { MultiplicationExercise } from './components/student/MultiplicationExercise';
import { Dashboard } from './components/student/Dashboard';
import { Navigation } from './components/layout/Navigation';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ParentDashboard } from './pages/ParentDashboard';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';
import { useProgress } from './stores/progress-store';
import type { Difficulty } from './types';

function App() {
  const [currentExercise, setCurrentExercise] = useState<{
    type: string;
    difficulty: Difficulty;
  } | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
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

  // If in exercise mode, show exercise (only when authenticated)
  if (isAuthenticated && currentExercise) {
    // Check exercise type
    if (currentExercise.type.includes('subtraction')) {
      return (
        <SubtractionExercise
          difficulty={currentExercise.difficulty}
          onComplete={handleCompleteExercise}
          studentLevel={level}
        />
      );
    }

    if (currentExercise.type.includes('multiplication')) {
      return (
        <MultiplicationExercise
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
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />}
      />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background" dir="rtl">
              <Navigation />
              <Routes>
                <Route
                  path="/"
                  element={<Dashboard onStartExercise={handleStartExercise} />}
                />
                <Route
                  path="/exercises"
                  element={<ExercisesPage onStartExercise={handleStartExercise} />}
                />
                <Route
                  path="/achievements"
                  element={<AchievementsPage />}
                />
                <Route
                  path="/profile"
                  element={<ProfilePage />}
                />
                <Route
                  path="/settings"
                  element={<SettingsPage />}
                />
                <Route
                  path="/leaderboard"
                  element={<LeaderboardPage />}
                />
                <Route
                  path="/parent"
                  element={<ParentDashboard />}
                />
              </Routes>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
