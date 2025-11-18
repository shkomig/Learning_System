import { motion } from 'framer-motion';
import { useProgress } from '../stores/progress-store';
import { Card } from '../components/common/Card';
import { Trophy, Medal, Star, TrendingUp, Award } from 'lucide-react';

export function LeaderboardPage() {
  const { studentName, points, level, exercisesCompleted } = useProgress();

  // Mock leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: 'נועה כהן',
      avatar: '👧',
      points: 2580,
      level: 12,
      exercises: 245,
      trend: 'up',
    },
    {
      rank: 2,
      name: 'יוסי לוי',
      avatar: '👦',
      points: 2350,
      level: 11,
      exercises: 230,
      trend: 'up',
    },
    {
      rank: 3,
      name: 'שרה מזרחי',
      avatar: '🧒',
      points: 2100,
      level: 10,
      exercises: 210,
      trend: 'down',
    },
    {
      rank: 4,
      name: studentName || 'אתה',
      avatar: '🎓',
      points,
      level,
      exercises: exercisesCompleted,
      trend: 'up',
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: 'דני אבני',
      avatar: '🐻',
      points: 1750,
      level: 9,
      exercises: 175,
      trend: 'same',
    },
    {
      rank: 6,
      name: 'מיכל דוד',
      avatar: '🦊',
      points: 1620,
      level: 8,
      exercises: 160,
      trend: 'up',
    },
    {
      rank: 7,
      name: 'אריאל שרון',
      avatar: '🐶',
      points: 1480,
      level: 8,
      exercises: 148,
      trend: 'down',
    },
    {
      rank: 8,
      name: 'תמר גולן',
      avatar: '🐱',
      points: 1350,
      level: 7,
      exercises: 135,
      trend: 'up',
    },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-8 h-8 text-accent" />;
      case 2:
        return <Medal className="w-8 h-8 text-gray-400" />;
      case 3:
        return <Medal className="w-8 h-8 text-orange-600" />;
      default:
        return <span className="text-xl font-bold text-text/70">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-primary" />;
      case 'down':
        return <TrendingUp className="w-5 h-5 text-error rotate-180" />;
      default:
        return <span className="text-text/50">-</span>;
    }
  };

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="text-8xl mb-4">🏆</div>
          <h1 className="text-6xl font-bold text-primary mb-4">
            טבלת המובילים
          </h1>
          <p className="text-2xl text-text/70">
            התחרה עם תלמידים אחרים והגיע לפסגה!
          </p>
        </motion.header>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {leaderboard.slice(0, 3).map((player, index) => {
            const heights = ['h-72', 'h-64', 'h-56'];
            const delays = [0.2, 0.1, 0.3];

            return (
              <motion.div
                key={player.rank}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delays[index] }}
                className={index === 0 ? 'md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}
              >
                <Card className={`${heights[index]} flex flex-col items-center justify-center relative overflow-hidden`}>
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />

                  {/* Rank */}
                  <div className="absolute top-4 left-4 z-10">
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="relative z-10 text-7xl mb-4">
                    {player.avatar}
                  </div>

                  {/* Name */}
                  <h3 className="relative z-10 text-2xl font-bold text-text mb-2">
                    {player.name}
                  </h3>

                  {/* Points */}
                  <div className="relative z-10 text-4xl font-bold text-primary mb-2">
                    {player.points}
                  </div>
                  <p className="relative z-10 text-sm text-text/70 mb-4">נקודות</p>

                  {/* Stats */}
                  <div className="relative z-10 flex gap-4 text-center">
                    <div>
                      <p className="text-lg font-bold text-secondary">{player.level}</p>
                      <p className="text-xs text-text/70">רמה</p>
                    </div>
                    <div className="border-l-2 border-text/20"></div>
                    <div>
                      <p className="text-lg font-bold text-accent">{player.exercises}</p>
                      <p className="text-xs text-text/70">תרגילים</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2 className="text-3xl font-bold text-text mb-6 flex items-center gap-3">
              <Star className="w-8 h-8 text-accent" />
              דירוג מלא
            </h2>

            <div className="space-y-3">
              {leaderboard.map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    player.isCurrentUser
                      ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border-2 border-primary shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                    {player.avatar}
                  </div>

                  {/* Name */}
                  <div className="flex-grow">
                    <h3 className={`font-bold text-lg ${player.isCurrentUser ? 'text-primary' : 'text-text'}`}>
                      {player.name}
                      {player.isCurrentUser && (
                        <span className="mr-2 px-2 py-1 bg-primary text-white text-xs rounded-full">
                          זה אתה!
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-text/70">
                      רמה {player.level} • {player.exercises} תרגילים
                    </p>
                  </div>

                  {/* Trend */}
                  <div className="flex-shrink-0">
                    {getTrendIcon(player.trend)}
                  </div>

                  {/* Points */}
                  <div className="flex-shrink-0 text-left">
                    <p className="text-2xl font-bold text-primary">
                      {player.points}
                    </p>
                    <p className="text-xs text-text/70">נקודות</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Weekly Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-2 border-accent">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Award className="w-16 h-16 text-accent" />
                <div>
                  <h3 className="text-2xl font-bold text-text mb-2">
                    🎯 אתגר השבוע
                  </h3>
                  <p className="text-lg text-text/70">
                    השלם 50 תרגילים השבוע וקבל 200 נקודות בונוס!
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-accent mb-1">
                  {exercisesCompleted}/<span className="text-2xl">50</span>
                </p>
                <p className="text-sm text-text/70">תרגילים השבוע</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 h-4 bg-white/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(exercisesCompleted / 50) * 100}%` }}
                transition={{ duration: 1, delay: 1.2 }}
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
              />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
