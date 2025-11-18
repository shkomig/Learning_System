import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { LogIn, UserPlus, Sparkles } from 'lucide-react';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'שגיאה בהתחברות');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    const guestName = prompt('מה השם שלך?', 'תלמיד חדש');
    if (guestName && guestName.trim()) {
      loginAsGuest(guestName.trim());
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4" dir="rtl">
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
          <div className="text-8xl mb-4">🎓</div>
          <h1 className="text-5xl font-bold text-primary mb-2">
            ברוכים הבאים!
          </h1>
          <p className="text-xl text-text/70">
            מערכת למידת מתמטיקה
          </p>
        </motion.div>

        {/* Login Card */}
        <Card className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <LogIn className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-bold text-text">התחברות</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-text mb-2">
                אימייל
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com"
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
                placeholder="••••••••"
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

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  מתחבר...
                </span>
              ) : (
                'התחבר'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-text/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text/70 font-bold">או</span>
            </div>
          </div>

          {/* Guest Login */}
          <Button
            onClick={handleGuestLogin}
            variant="outline"
            fullWidth
            disabled={isLoading}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            המשך כאורח
          </Button>
        </Card>

        {/* Register Link */}
        <Card className="text-center bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="flex items-center justify-center gap-2 mb-3">
            <UserPlus className="w-6 h-6 text-secondary" />
            <p className="text-lg text-text/70">
              עדיין אין לך חשבון?
            </p>
          </div>
          <Link to="/register">
            <Button variant="secondary" fullWidth>
              הירשם עכשיו!
            </Button>
          </Link>
        </Card>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-text/50">
            💡 טיפ: השתמש בכל אימייל וסיסמה לבדיקה
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
