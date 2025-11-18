import { motion } from 'framer-motion';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressChart } from '../components/charts/ProgressChart';
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  Calendar,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Brain,
} from 'lucide-react';

export function ParentDashboard() {
  const {
    studentName,
    level,
    streak,
    exercisesCompleted,
    achievements,
  } = useProgress();

  // Mock data for charts
  const weeklyProgress = [
    { label: 'א׳', value: 75 },
    { label: 'ב׳', value: 80 },
    { label: 'ג׳', value: 65 },
    { label: 'ד׳', value: 90 },
    { label: 'ה׳', value: 85 },
    { label: 'ו׳', value: 95 },
    { label: 'ש׳', value: 70 },
  ];

  const topicAccuracy = [
    { label: 'חיבור', value: 92, color: '#4CAF50' },
    { label: 'חיסור', value: 85, color: '#2196F3' },
    { label: 'כפל', value: 78, color: '#FFC107' },
    { label: 'חילוק', value: 65, color: '#FF6B6B' },
  ];

  const recommendations = [
    {
      icon: Brain,
      title: 'המשך תרגול כפל',
      description: 'התלמיד מצטיין בחיבור וחיסור, מומלץ להמשיך תרגול בכפל',
      type: 'info',
    },
    {
      icon: Target,
      title: 'יעד שבועי',
      description: 'התלמיד קרוב להשגת 100 תרגילים השבוע (85/100)',
      type: 'success',
    },
    {
      icon: Clock,
      title: 'זמן מומלץ',
      description: 'מומלץ לתרגל 20-30 דקות ביום, 5 ימים בשבוע',
      type: 'info',
    },
  ];

  const recentActivity = [
    {
      date: 'היום 14:30',
      activity: 'השלים 10 תרגילי חיבור',
      score: 90,
      status: 'success',
    },
    {
      date: 'היום 10:15',
      activity: 'השלים 5 תרגילי כפל',
      score: 80,
      status: 'success',
    },
    {
      date: 'אתמול 16:20',
      activity: 'פתח הישג "מלך החיבור"',
      score: 100,
      status: 'achievement',
    },
    {
      date: 'אתמול 15:45',
      activity: 'השלים 8 תרגילי חיסור',
      score: 75,
      status: 'warning',
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-6xl font-bold text-primary mb-2">
                👨‍👩‍👧 דשבורד הורים
              </h1>
              <p className="text-2xl text-text/70">
                מעקב אחר התקדמות {studentName || 'התלמיד'}
              </p>
            </div>
            <Button
              onClick={() => window.print()}
              variant="outline"
              className="flex items-center gap-2"
            >
              📄 הדפס דוח
            </Button>
          </div>
        </motion.header>

        {/* Key Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
              <p className="text-4xl font-bold text-primary mb-2">{level}</p>
              <p className="text-lg text-text/70">רמה נוכחית</p>
              <div className="mt-3 text-sm text-text/60">
                עליית {Math.floor(Math.random() * 3) + 1} רמות החודש
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center">
              <BookOpen className="w-12 h-12 text-secondary mx-auto mb-3" />
              <p className="text-4xl font-bold text-secondary mb-2">
                {exercisesCompleted}
              </p>
              <p className="text-lg text-text/70">תרגילים הושלמו</p>
              <div className="mt-3 text-sm text-text/60">
                +{Math.floor(Math.random() * 20) + 10} השבוע
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center">
              <Award className="w-12 h-12 text-accent mx-auto mb-3" />
              <p className="text-4xl font-bold text-accent mb-2">
                {achievements.length}
              </p>
              <p className="text-lg text-text/70">הישגים</p>
              <div className="mt-3 text-sm text-text/60">
                {10 - achievements.length} נותרו לפתיחה
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="text-center">
              <Calendar className="w-12 h-12 text-error mx-auto mb-3" />
              <p className="text-4xl font-bold text-error mb-2">{streak}</p>
              <p className="text-lg text-text/70">ימי רצף</p>
              <div className="mt-3 text-sm text-text/60">
                שיא אישי: {Math.max(streak, Math.floor(Math.random() * 10) + 5)}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <ProgressChart
              data={weeklyProgress}
              title="📈 התקדמות שבועית"
              type="line"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ProgressChart
              data={topicAccuracy}
              title="🎯 דיוק לפי נושא"
              type="bar"
            />
          </motion.div>
        </div>

        {/* Recommendations & Activity */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
                <Brain className="w-6 h-6 text-primary" />
                המלצות אישיות
              </h2>
              <div className="space-y-4">
                {recommendations.map((rec, index) => {
                  const Icon = rec.icon;
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border-2 ${
                        rec.type === 'success'
                          ? 'border-primary bg-primary/5'
                          : 'border-secondary bg-secondary/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-text mb-1">
                            {rec.title}
                          </h3>
                          <p className="text-sm text-text/70">
                            {rec.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <h2 className="text-2xl font-bold text-text mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-secondary" />
                פעילות אחרונה
              </h2>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : activity.status === 'achievement' ? (
                        <Award className="w-6 h-6 text-accent" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-error" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-text">
                        {activity.activity}
                      </p>
                      <p className="text-xs text-text/60">{activity.date}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          activity.score >= 90
                            ? 'bg-primary text-white'
                            : activity.score >= 75
                            ? 'bg-secondary text-white'
                            : 'bg-error text-white'
                        }`}
                      >
                        {activity.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Topics Mastery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <h2 className="text-2xl font-bold text-text mb-6">
              📚 שליטה בנושאים
            </h2>
            <div className="grid md:grid-cols-7 gap-4">
              {[
                { name: 'חיבור עד 10', mastered: true, progress: 100 },
                { name: 'חיבור עד 20', mastered: true, progress: 95 },
                { name: 'חיסור עד 10', mastered: false, progress: 85 },
                { name: 'חיסור עד 20', mastered: false, progress: 70 },
                { name: 'כפל', mastered: false, progress: 45 },
                { name: 'חילוק', mastered: false, progress: 30 },
                { name: 'שברים', mastered: false, progress: 10 },
              ].map((topic, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl text-center border-2 ${
                    topic.mastered
                      ? 'border-primary bg-primary/10'
                      : 'border-text/20 bg-white'
                  }`}
                >
                  <div className="text-3xl mb-2">
                    {topic.mastered ? '✅' : '📖'}
                  </div>
                  <p className="font-bold text-sm text-text mb-2">
                    {topic.name}
                  </p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-text/70 mt-1">
                    {topic.progress}%
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
