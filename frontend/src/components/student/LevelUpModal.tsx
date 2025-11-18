import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap } from 'lucide-react';
import { Button } from '../common/Button';

interface LevelUpModalProps {
  isOpen: boolean;
  newLevel: number;
  onClose: () => void;
}

export function LevelUpModal({ isOpen, newLevel, onClose }: LevelUpModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 20 
            }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl shadow-2xl p-2 max-w-md w-full">
              <div className="bg-white rounded-2xl p-8 text-center">
                {/* Animated Trophy */}
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    scale: [1, 1.2, 1.1, 1.2, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="mx-auto mb-6"
                >
                  <Trophy className="w-32 h-32 text-accent mx-auto" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl font-bold text-primary mb-4"
                >
                  🎊 עלית רמה!
                </motion.h2>

                {/* New Level */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="mb-6"
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full shadow-lg">
                    <Star className="w-8 h-8" fill="currentColor" />
                    <span className="text-4xl font-bold">רמה {newLevel}</span>
                    <Star className="w-8 h-8" fill="currentColor" />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-2xl text-text mb-6"
                >
                  כל הכבוד! המשך כך! 💪
                </motion.p>

                {/* Bonus Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="bg-accent/20 rounded-2xl p-4 mb-6"
                >
                  <div className="flex items-center justify-center gap-2 text-lg">
                    <Zap className="w-6 h-6 text-accent" />
                    <span className="font-medium">תרגילים חדשים נפתחו!</span>
                  </div>
                </motion.div>

                {/* Close Button */}
                <Button
                  onClick={onClose}
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  המשך ללמוד! 🚀
                </Button>

                {/* Confetti */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  {[...Array(30)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        y: '0%',
                        x: `${Math.random() * 100}%`,
                        opacity: 1,
                        scale: 0
                      }}
                      animate={{ 
                        y: '120%',
                        opacity: 0,
                        scale: [0, 1, 0.8, 0],
                        rotate: Math.random() * 360
                      }}
                      transition={{ 
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 0.5,
                        ease: 'easeOut',
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      className="absolute w-3 h-3"
                      style={{
                        backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF6B6B'][Math.floor(Math.random() * 4)],
                        borderRadius: Math.random() > 0.5 ? '50%' : '0%'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


