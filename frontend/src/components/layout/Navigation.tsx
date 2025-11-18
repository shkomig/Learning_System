import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Trophy, Settings, User, LogOut, Award, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useProgress } from '../../stores/progress-store';
import { Button } from '../common/Button';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { points, level, currentAvatar } = useProgress();

  const navItems = [
    { path: '/', icon: Home, label: 'בית' },
    { path: '/exercises', icon: BookOpen, label: 'תרגילים' },
    { path: '/leaderboard', icon: Award, label: 'טבלת מובילים' },
    { path: '/achievements', icon: Trophy, label: 'הישגים' },
    { path: '/profile', icon: User, label: 'פרופיל' },
    { path: '/settings', icon: Settings, label: 'הגדרות' },
  ];

  // Add parent dashboard if user is parent
  if (user?.role === 'parent') {
    navItems.splice(1, 0, { path: '/parent', icon: Users, label: 'דשבורד הורים' });
  }

  const handleLogout = () => {
    if (window.confirm('האם אתה בטוח שברצונך להתנתק?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="text-4xl">🎓</span>
            <div>
              <h1 className="text-xl font-bold text-primary">מתמטיקה מהנה</h1>
              <p className="text-sm text-text/70">למידה אינטראקטיבית</p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl
                    transition-all duration-200
                    ${isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'text-text hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center gap-4">
            {/* Stats */}
            <div className="text-right">
              <p className="text-sm font-semibold text-text">
                {user?.name || 'תלמיד'}
              </p>
              <p className="text-xs text-text/70">
                רמה {level} • {points} נקודות
              </p>
            </div>

            {/* Avatar */}
            <Link to="/profile">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform">
                {currentAvatar}
              </div>
            </Link>

            {/* Logout Button */}
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">התנתק</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
