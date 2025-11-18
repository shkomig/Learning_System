import { motion } from 'framer-motion';
import type { Achievement } from '../../types';

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
}

export function AchievementBadge({ achievement, size = 'md' }: AchievementBadgeProps) {
  const sizeStyles = {
    sm: 'w-16 h-16 text-2xl',
    md: 'w-24 h-24 text-4xl',
    lg: 'w-32 h-32 text-6xl',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${sizeStyles[size]} cursor-pointer`}
      title={achievement.descriptionHe}
    >
      {/* Badge Circle */}
      <div className={`
        ${sizeStyles[size]}
        rounded-full
        ${achievement.unlocked 
          ? 'bg-gradient-to-br from-accent to-primary shadow-lg' 
          : 'bg-gray-300 opacity-40'
        }
        flex items-center justify-center
        border-4 border-white
        transition-all duration-200
      `}>
        <span className={achievement.unlocked ? '' : 'grayscale'}>
          {achievement.icon}
        </span>
      </div>

      {/* Locked Overlay */}
      {!achievement.unlocked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl">🔒</span>
        </div>
      )}

      {/* Badge Name */}
      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <p className="text-xs font-semibold text-text text-center">
          {achievement.nameHe}
        </p>
      </div>
    </motion.div>
  );
}


