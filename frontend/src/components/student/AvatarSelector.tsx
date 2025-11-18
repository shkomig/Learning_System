import { motion } from 'framer-motion';
import { useProgress } from '../../stores/progress-store';
import { AVATARS } from '../../lib/constants';
import { Card } from '../common/Card';

interface AvatarSelectorProps {
  onSelect?: (avatar: string) => void;
}

export function AvatarSelector({ onSelect }: AvatarSelectorProps) {
  const { currentAvatar, changeAvatar } = useProgress();

  const handleSelect = (avatar: string) => {
    changeAvatar(avatar);
    onSelect?.(avatar);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-text mb-6 text-center">
        בחר את האווטאר שלך! 👤
      </h2>
      
      <div className="grid grid-cols-7 gap-4 mb-6">
        {AVATARS.map((avatar, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSelect(avatar)}
            className={`
              w-16 h-16 rounded-full text-4xl
              flex items-center justify-center
              transition-all duration-200
              ${currentAvatar === avatar 
                ? 'ring-4 ring-primary bg-primary/10 shadow-lg' 
                : 'hover:bg-gray-100 hover:shadow-md'
              }
            `}
            aria-label={`בחר אווטאר ${avatar}`}
          >
            {avatar}
          </motion.button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-text/70 mb-4">
          האווטאר הנוכחי שלך:
        </p>
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl shadow-xl">
          {currentAvatar}
        </div>
      </div>
    </Card>
  );
}

