import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { UserPlus, LogIn, User, Users } from 'lucide-react';

export function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'parent'>('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (name.trim().length < 2) {
      setError('השם חייב להכיל לפחות 2 תווים');
      return;
    }

    if (password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    if (password !== confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password, role);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהרשמה');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/10 via-background to-accent/10 flex items-center justify-center p-4" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-4">🚀</div>
          <h1 className="text-5xl font-bold text-secondary mb-2">
            הצטרף אלינו!
          </h1>
          <p className="text-xl text-text/70">
            צור חשבון והתחל ללמוד
          </p>
        </motion.div>

        {/* Register Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-8 h-8 text-secondary" />
            <h2 className="text-3xl font-bold text-text">הרשמה</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-bold text-text mb-3">
                סוג משתמש
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'student'
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-text/20 hover:border-primary/50'
                  }`}
                >
                  <User className={`w-8 h-8 mx-auto mb-2 ${role === 'student' ? 'text-primary' : 'text-text/50'}`} />
                  <p className={`font-bold ${role === 'student' ? 'text-primary' : 'text-text/70'}`}>
                    תלמיד
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('parent')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    role === 'parent'
                      ? 'border-secondary bg-secondary/10 shadow-lg'
                      : 'border-text/20 hover:border-secondary/50'
                  }`}
                >
                  <Users className={`w-8 h-8 mx-auto mb-2 ${role === 'parent' ? 'text-secondary' : 'text-text/50'}`} />
                  <p className={`font-bold ${role === 'parent' ? 'text-secondary' : 'text-text/70'}`}>
                    הורה
                  </p>
                </button>
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                שם מלא
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="יוסי כהן"
                required
                disabled={isLoading}
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                אימייל
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yossi@example.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                סיסמה
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="לפחות 6 תווים"
                required
                disabled={isLoading}
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                אימות סיסמה
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="הקלד את הסיסמה שוב"
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-error/10 border-2 border-error text-error px-4 py-3 rounded-xl"
              >
                {error}
              </motion.div>
            )}

            {/* Register Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isLoading}
              className="mt-6"
              variant="secondary"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  נרשם...
                </span>
              ) : (
                'הירשם עכשיו!'
              )}
            </Button>
          </form>
        </Card>

        {/* Login Link */}
        <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <LogIn className="w-6 h-6 text-primary" />
            <p className="text-lg text-text/70">
              כבר יש לך חשבון?
            </p>
          </div>
          <Link to="/login">
            <Button variant="primary" fullWidth>
              התחבר
            </Button>
          </Link>
        </Card>
      </motion.div>
    </div>
  );
}
