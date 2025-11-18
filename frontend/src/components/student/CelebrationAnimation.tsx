import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Trophy, Zap } from 'lucide-react';

interface CelebrationAnimationProps {
  show: boolean;
  message: string;
  bonus?: number;
  type?: 'success' | 'levelUp' | 'achievement';
}

export function CelebrationAnimation({ 
  show, 
  message, 
  bonus,
  type = 'success' 
}: CelebrationAnimationProps) {
  const getIcon = () => {
    switch (type) {
      case 'levelUp':
        return <Trophy className="w-32 h-32 text-accent" />;
      case 'achievement':
        return <Star className="w-32 h-32 text-accent" />;
      default:
        return <Sparkles className="w-32 h-32 text-accent" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'levelUp':
        return '🎊 עלית רמה!';
      case 'achievement':
        return '🏆 הישג חדש!';
      default:
        return '🎉 מעולה!';
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Celebration Card */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 15 
            }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
              {/* Animated Icon */}
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, -10, 0],
                  scale: [1, 1.2, 1.1, 1.2, 1.1, 1],
                }}
                transition={{ 
                  duration: 0.8,
                  ease: 'easeInOut'
                }}
                className="mx-auto mb-6"
              >
                {getIcon()}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold text-primary mb-4"
              >
                {getTitle()}
              </motion.h2>

              {/* Message */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl text-text mb-4"
              >
                {message}
              </motion.p>

              {/* Bonus Points */}
              {bonus && bonus > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  className="mt-6"
                >
                  <div className="inline-flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-full">
                    <Zap className="w-6 h-6 text-accent" />
                    <span className="text-2xl font-bold text-accent">
                      +{bonus} נקודות!
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Confetti Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      y: '50%',
                      x: `${Math.random() * 100}%`,
                      opacity: 1,
                      scale: 0
                    }}
                    animate={{ 
                      y: '-100%',
                      opacity: 0,
                      scale: [0, 1, 0.8, 0]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 2,
                      delay: Math.random() * 0.5,
                      ease: 'easeOut'
                    }}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF6B6B'][Math.floor(Math.random() * 4)]
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


