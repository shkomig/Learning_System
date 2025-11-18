import { motion } from 'framer-motion';
import { useSettings } from '../stores/settings-store';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Settings, Volume2, VolumeX, Music, Globe, Target } from 'lucide-react';

export function SettingsPage() {
  const {
    soundEnabled,
    musicEnabled,
    volume,
    language,
    difficulty,
    toggleSound,
    toggleMusic,
    setVolume,
    setLanguage,
    setDifficulty,
    reset: resetSettings,
  } = useSettings();

  const { reset: resetProgress } = useProgress();

  const handleResetAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל ההתקדמות? פעולה זו בלתי הפיכה!')) {
      resetProgress();
      resetSettings();
      alert('כל הנתונים אופסו בהצלחה!');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Settings className="w-16 h-16 text-secondary" />
            <h1 className="text-6xl font-bold text-primary">
              הגדרות
            </h1>
          </div>
          <p className="text-2xl text-text/70">
            התאם את המערכת לצרכים שלך
          </p>
        </motion.header>

        {/* Sound Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card>
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <Volume2 className="w-6 h-6" />
              הגדרות קול
            </h2>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {soundEnabled ? (
                  <Volume2 className="w-6 h-6 text-primary" />
                ) : (
                  <VolumeX className="w-6 h-6 text-text/50" />
                )}
                <span className="text-lg">אפקטי קול</span>
              </div>
              <Button
                onClick={toggleSound}
                variant={soundEnabled ? 'primary' : 'outline'}
                size="sm"
              >
                {soundEnabled ? 'מופעל' : 'כבוי'}
              </Button>
            </div>

            {/* Music Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Music className="w-6 h-6 text-secondary" />
                <span className="text-lg">מוזיקת רקע</span>
              </div>
              <Button
                onClick={toggleMusic}
                variant={musicEnabled ? 'primary' : 'outline'}
                size="sm"
              >
                {musicEnabled ? 'מופעל' : 'כבוי'}
              </Button>
            </div>

            {/* Volume Slider */}
            <div className="mb-4">
              <label className="text-lg text-text mb-2 block">
                עוצמת קול: {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #4CAF50 0%, #4CAF50 ${volume * 100}%, #d1d5db ${volume * 100}%, #d1d5db 100%)`,
                }}
              />
            </div>
          </Card>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card>
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6" />
              שפה
            </h2>
            <div className="flex gap-4">
              <Button
                onClick={() => setLanguage('he')}
                variant={language === 'he' ? 'primary' : 'outline'}
                fullWidth
              >
                עברית 🇮🇱
              </Button>
              <Button
                onClick={() => setLanguage('en')}
                variant={language === 'en' ? 'primary' : 'outline'}
                fullWidth
              >
                English 🇺🇸
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Difficulty Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
              <Target className="w-6 h-6" />
              רמת קושי
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => setDifficulty('auto')}
                variant={difficulty === 'auto' ? 'primary' : 'outline'}
              >
                🤖 אוטומטי
              </Button>
              <Button
                onClick={() => setDifficulty('easy')}
                variant={difficulty === 'easy' ? 'primary' : 'outline'}
              >
                😊 קל
              </Button>
              <Button
                onClick={() => setDifficulty('medium')}
                variant={difficulty === 'medium' ? 'primary' : 'outline'}
              >
                🎯 בינוני
              </Button>
              <Button
                onClick={() => setDifficulty('hard')}
                variant={difficulty === 'hard' ? 'primary' : 'outline'}
              >
                🔥 קשה
              </Button>
            </div>
            {difficulty === 'auto' && (
              <p className="text-sm text-text/70 mt-4">
                המערכת תתאים את הקושי אוטומטית על פי הביצועים שלך
              </p>
            )}
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-2 border-error">
            <h2 className="text-2xl font-bold text-error mb-4">
              ⚠️ איפוס נתונים
            </h2>
            <p className="text-text/70 mb-4">
              פעולה זו תמחק את כל ההתקדמות שלך, כולל נקודות, רמות, הישגים וסטטיסטיקות.
              פעולה זו בלתי הפיכה!
            </p>
            <Button
              onClick={handleResetAll}
              variant="outline"
              className="border-error text-error hover:bg-error hover:text-white"
            >
              איפוס כל הנתונים
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
