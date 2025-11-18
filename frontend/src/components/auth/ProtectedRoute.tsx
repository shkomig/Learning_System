import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../common/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: 'student' | 'parent' | 'teacher';
}

export function ProtectedRoute({ children, requireRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-xl text-text/70">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireRole && user?.role !== requireRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8" dir="rtl">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🚫</div>
          <h1 className="text-4xl font-bold text-error mb-4">
            אין לך הרשאה
          </h1>
          <p className="text-xl text-text/70 mb-6">
            דף זה מיועד ל{requireRole === 'parent' ? 'הורים' : 'תלמידים'} בלבד
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold"
          >
            חזור אחורה
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
