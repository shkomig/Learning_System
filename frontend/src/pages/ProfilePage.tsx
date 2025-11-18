import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { AvatarSelector } from '../components/student/AvatarSelector';
import { User, Award, TrendingUp, Calendar } from 'lucide-react';

export function ProfilePage() {
  const {
    studentName,
    level,
    points,
    streak,
    exercisesCompleted,
    topicsMastered,
    achievements,
    currentAvatar,
    setStudent,
    changeAvatar,
  } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  const handleSaveName = () => {
    if (tempName.trim()) {
      setStudent(Date.now().toString(), tempName);
      setIsEditing(false);
    }
  };

  const handleAvatarSelect = (avatar: string) => {
    changeAvatar(avatar);
    setShowAvatarSelector(false);
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
          <h1 className="text-6xl font-bold text-primary mb-4">
            הפרופיל שלי
          </h1>
        </motion.header>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <div className="flex flex-col items-center p-8">
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-8xl cursor-pointer mb-6"
                onClick={() => setShowAvatarSelector(true)}
              >
                {currentAvatar}
              </motion.div>

              {/* Name */}
              <div className="w-full max-w-md mb-6">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Input
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="הכנס שם"
                      className="text-center text-2xl"
                    />
                    <Button onClick={handleSaveName} size="sm">
                      שמור
                    </Button>
                    <Button
                      onClick={() => {
                        setTempName(studentName);
                        setIsEditing(false);
                      }}
                      variant="outline"
                      size="sm"
                    >
                      ביטול
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <User className="w-6 h-6 text-text/70" />
                    <h2 className="text-3xl font-bold text-text">
                      {studentName || 'תלמיד יקר'}
                    </h2>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="ghost"
                      size="sm"
                    >
                      ערוך
                    </Button>
                  </div>
                )}
              </div>

              {/* Level Badge */}
              <div className="bg-gradient-to-r from-accent to-secondary text-white px-8 py-3 rounded-full text-2xl font-bold">
                רמה {level}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <div className="flex items-center gap-4 p-6">
                <TrendingUp className="w-12 h-12 text-primary" />
                <div>
                  <p className="text-4xl font-bold text-primary">{points}</p>
                  <p className="text-lg text-text/70">נקודות כוללות</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <div className="flex items-center gap-4 p-6">
                <Calendar className="w-12 h-12 text-error" />
                <div>
                  <p className="text-4xl font-bold text-error">{streak}</p>
                  <p className="text-lg text-text/70">ימי רצף</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center gap-4 p-6">
                <Award className="w-12 h-12 text-secondary" />
                <div>
                  <p className="text-4xl font-bold text-secondary">{achievements.length}</p>
                  <p className="text-lg text-text/70">הישגים</p>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <div className="flex items-center gap-4 p-6">
                <TrendingUp className="w-12 h-12 text-accent" />
                <div>
                  <p className="text-4xl font-bold text-accent">{exercisesCompleted}</p>
                  <p className="text-lg text-text/70">תרגילים הושלמו</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Topics Mastered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <h3 className="text-2xl font-bold text-text mb-4">נושאים בשליטה</h3>
            {topicsMastered.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {topicsMastered.map((topic) => (
                  <div
                    key={topic}
                    className="bg-primary text-white px-4 py-2 rounded-full font-semibold"
                  >
                    ✓ {topic}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-text/70">עדיין לא השגת שליטה בנושאים. המשך לתרגל!</p>
            )}
          </Card>
        </motion.div>

        {/* Avatar Selector Modal */}
        {showAvatarSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-background rounded-2xl p-8 max-w-2xl"
            >
              <h3 className="text-3xl font-bold text-text mb-6 text-center">
                בחר אווטאר
              </h3>
              <AvatarSelector
                onSelect={handleAvatarSelect}
              />
              <Button
                onClick={() => setShowAvatarSelector(false)}
                variant="outline"
                fullWidth
                className="mt-6"
              >
                סגור
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
