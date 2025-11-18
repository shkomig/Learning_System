import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const achievements = [
  {
    name: 'first-steps',
    nameHe: 'צעדים ראשונים',
    description: 'Complete your first exercise',
    descriptionHe: 'השלמת תרגיל ראשון',
    icon: '👣',
    category: 'explorer',
    requirement: 1,
  },
  {
    name: 'perfect-ten',
    nameHe: 'עשר מושלם',
    description: '10 correct exercises in a row',
    descriptionHe: '10 תרגילים נכונים ברצף',
    icon: '🔥',
    category: 'streak',
    requirement: 10,
  },
  {
    name: 'speed-demon',
    nameHe: 'מהיר כברק',
    description: 'Complete 10 exercises under time limit',
    descriptionHe: 'השלמת 10 תרגילים מתחת לזמן',
    icon: '⚡',
    category: 'speed',
    requirement: 10,
  },
  {
    name: 'addition-master',
    nameHe: 'מלך החיבור',
    description: '50 correct addition exercises',
    descriptionHe: '50 תרגילי חיבור נכונים',
    icon: '➕',
    category: 'topic_mastery',
    requirement: 50,
  },
  {
    name: 'subtraction-master',
    nameHe: 'מלך החיסור',
    description: '50 correct subtraction exercises',
    descriptionHe: '50 תרגילי חיסור נכונים',
    icon: '➖',
    category: 'topic_mastery',
    requirement: 50,
  },
  {
    name: 'week-warrior',
    nameHe: 'לוחם השבוע',
    description: '7 consecutive days of practice',
    descriptionHe: '7 ימים רצופים של תרגול',
    icon: '🏆',
    category: 'streak',
    requirement: 7,
  },
  {
    name: 'hint-helper',
    nameHe: 'עוזר חכם',
    description: 'Used hints wisely',
    descriptionHe: 'השתמשת ברמזים בצורה חכמה',
    icon: '💡',
    category: 'helper',
    requirement: 1,
  },
  {
    name: 'explorer',
    nameHe: 'חוקר',
    description: 'Tried all topics',
    descriptionHe: 'ניסית את כל הנושאים',
    icon: '🗺️',
    category: 'explorer',
    requirement: 7,
  },
  {
    name: 'century-club',
    nameHe: 'מועדון המאה',
    description: '100 exercises completed',
    descriptionHe: '100 תרגילים הושלמו',
    icon: '💯',
    category: 'topic_mastery',
    requirement: 100,
  },
  {
    name: 'perfect-score',
    nameHe: 'ציון מושלם',
    description: '5 exercises in a row on first try',
    descriptionHe: '5 תרגילים ברצף בניסיון ראשון',
    icon: '⭐',
    category: 'speed',
    requirement: 5,
  },
];

function generateExercises() {
  const exercises = [];
  const visuals = ['fruits', 'animals', 'blocks'];

  // Addition - Easy (1-10)
  for (let i = 0; i < 50; i++) {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * (10 - num1)) + 1;
    exercises.push({
      type: 'addition',
      difficulty: 'easy',
      topic: 'addition-10',
      num1,
      num2,
      answer: num1 + num2,
      visualType: visuals[Math.floor(Math.random() * visuals.length)],
      hints: JSON.stringify([
        `נסה לספור ${num1} פריטים ועוד ${num2} פריטים`,
        `התחל מ-${num1} והוסף ${num2}`,
        `התשובה היא ${num1 + num2}`,
      ]),
    });
  }

  // Addition - Medium (1-20)
  for (let i = 0; i < 50; i++) {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * (20 - num1)) + 1;
    exercises.push({
      type: 'addition',
      difficulty: 'medium',
      topic: 'addition-20',
      num1,
      num2,
      answer: num1 + num2,
      visualType: visuals[Math.floor(Math.random() * visuals.length)],
      hints: JSON.stringify([
        `פרק את ${num2} למספרים קטנים יותר`,
        `התחל מ-${num1} והוסף ${num2}`,
        `התשובה היא ${num1 + num2}`,
      ]),
    });
  }

  // Subtraction - Easy (1-10)
  for (let i = 0; i < 50; i++) {
    const answer = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * answer) + 1;
    const num1 = answer + num2;
    exercises.push({
      type: 'subtraction',
      difficulty: 'easy',
      topic: 'subtraction-10',
      num1,
      num2,
      answer,
      visualType: visuals[Math.floor(Math.random() * visuals.length)],
      hints: JSON.stringify([
        `יש לך ${num1} פריטים, תסיר ${num2}`,
        `${num1} פחות ${num2} זה...`,
        `התשובה היא ${answer}`,
      ]),
    });
  }

  // Subtraction - Medium (1-20)
  for (let i = 0; i < 50; i++) {
    const answer = Math.floor(Math.random() * 20);
    const num2 = Math.floor(Math.random() * Math.min(answer, 20)) + 1;
    const num1 = answer + num2;
    exercises.push({
      type: 'subtraction',
      difficulty: 'medium',
      topic: 'subtraction-20',
      num1,
      num2,
      answer,
      visualType: visuals[Math.floor(Math.random() * visuals.length)],
      hints: JSON.stringify([
        `התחל מ-${num1} וספור אחורה ${num2} צעדים`,
        `${num1} - ${num2} = ?`,
        `התשובה היא ${answer}`,
      ]),
    });
  }

  return exercises;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data
  console.log('🧹 Cleaning database...');
  await prisma.badge.deleteMany();
  await prisma.studentProgress.deleteMany();
  await prisma.session.deleteMany();
  await prisma.student.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.achievement.deleteMany();

  // Create achievements
  console.log('🏆 Creating achievements...');
  for (const achievement of achievements) {
    await prisma.achievement.create({ data: achievement });
  }

  // Create exercises
  console.log('📝 Creating exercises...');
  const exercises = generateExercises();
  for (const exercise of exercises) {
    await prisma.exercise.create({ data: exercise });
  }

  // Create demo student
  console.log('👤 Creating demo student...');
  const bcrypt = await import('bcrypt');
  const hashedPassword = await bcrypt.hash('demo123', 10);
  
  await prisma.student.create({
    data: {
      name: 'תלמיד לדוגמה',
      email: 'demo@example.com',
      password: hashedPassword,
      avatar: '👧',
      level: 1,
      points: 0,
      streak: 0,
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log(`   - ${achievements.length} achievements created`);
  console.log(`   - ${exercises.length} exercises created`);
  console.log('   - 1 demo student created (email: demo@example.com, password: demo123)');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


