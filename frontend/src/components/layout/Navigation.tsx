import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, Settings, User } from 'lucide-react';
import { useProgress } from '../../stores/progress-store';

export function Navigation() {
  const location = useLocation();
  const { points, level, currentAvatar } = useProgress();

  const navItems = [
    { path: '/', icon: Home, label: 'בית' },
    { path: '/exercises', icon: BookOpen, label: 'תרגילים' },
    { path: '/achievements', icon: Trophy, label: 'הישגים' },
    { path: '/profile', icon: User, label: 'פרופיל' },
    { path: '/settings', icon: Settings, label: 'הגדרות' },
  ];

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

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-text">רמה {level}</p>
              <p className="text-xs text-text/70">{points} נקודות</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
              {currentAvatar}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}


