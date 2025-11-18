/**
 * Application constants
 */

export const MAX_ATTEMPTS = 3;
export const POINTS_PER_CORRECT = 10;
export const FIRST_TRY_BONUS = 5;
export const STREAK_BONUS = 2;
export const DAILY_LOGIN_BONUS = 20;
export const LEVEL_COMPLETION_BONUS = 50;
export const ACHIEVEMENT_BONUS = 50;

export const DIFFICULTY_RANGES = {
  easy: { max: 10 },
  medium: { max: 20 },
  hard: { max: 100 },
} as const;

export const AVATARS = [
  '👧', '👦', '🧒', '👶',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
  '🐻', '🐼', '🐨', '🐯', '🦁', '🐮',
  '🐷', '🐸', '🐵', '🐔', '🐧', '🐦',
  '🦄', '🐲', '🦖', '🐳', '🐬', '🐙',
] as const;

export const PRESCHOOL_TOPICS = [
  { id: 'comparison', name: 'גדול או קטן?', nameEn: 'Bigger or Smaller', emoji: '🔢', color: 'from-blue-400 to-purple-400' },
  { id: 'counting', name: 'ספירה', nameEn: 'Counting', emoji: '🔢', color: 'from-green-400 to-teal-400' },
  { id: 'recognition', name: 'זיהוי מספרים', nameEn: 'Number Recognition', emoji: '🎯', color: 'from-purple-400 to-pink-400' },
  { id: 'sequence', name: 'מספר חסר', nameEn: 'Missing Number', emoji: '🧩', color: 'from-yellow-400 to-orange-400' },
  { id: 'moreorless', name: 'יותר או פחות', nameEn: 'More or Less', emoji: '⚖️', color: 'from-red-400 to-pink-400' },
  { id: 'matching', name: 'התאמות', nameEn: 'Matching', emoji: '🎨', color: 'from-cyan-400 to-blue-400' },
] as const;

export const TOPICS = [
  { id: 'addition-10', name: 'חיבור עד 10', nameEn: 'Addition up to 10', grade: 1 },
  { id: 'addition-20', name: 'חיבור עד 20', nameEn: 'Addition up to 20', grade: 1 },
  { id: 'subtraction-10', name: 'חיסור עד 10', nameEn: 'Subtraction up to 10', grade: 1 },
  { id: 'subtraction-20', name: 'חיסור עד 20', nameEn: 'Subtraction up to 20', grade: 1 },
  { id: 'addition-100', name: 'חיבור עד 100', nameEn: 'Addition up to 100', grade: 2 },
  { id: 'subtraction-100', name: 'חיסור עד 100', nameEn: 'Subtraction up to 100', grade: 2 },
  { id: 'multiplication-tables', name: 'לוח הכפל', nameEn: 'Multiplication tables', grade: 2 },
] as const;

export const ACHIEVEMENTS = [
  {
    id: 'first-steps',
    nameHe: 'צעדים ראשונים',
    nameEn: 'First Steps',
    descriptionHe: 'השלמת תרגיל ראשון',
    descriptionEn: 'Complete your first exercise',
    icon: '👣',
    category: 'explorer',
    requirement: 1,
  },
  {
    id: 'perfect-ten',
    nameHe: 'עשר מושלם',
    nameEn: 'Perfect Ten',
    descriptionHe: '10 תרגילים נכונים ברצף',
    descriptionEn: '10 correct exercises in a row',
    icon: '🔥',
    category: 'streak',
    requirement: 10,
  },
  {
    id: 'speed-demon',
    nameHe: 'מהיר כברק',
    nameEn: 'Speed Demon',
    descriptionHe: 'השלמת 10 תרגילים מתחת לזמן',
    descriptionEn: 'Complete 10 exercises under time limit',
    icon: '⚡',
    category: 'speed',
    requirement: 10,
  },
  {
    id: 'addition-master',
    nameHe: 'מלך החיבור',
    nameEn: 'Addition Master',
    descriptionHe: '50 תרגילי חיבור נכונים',
    descriptionEn: '50 correct addition exercises',
    icon: '➕',
    category: 'topic_mastery',
    requirement: 50,
  },
  {
    id: 'subtraction-master',
    nameHe: 'מלך החיסור',
    nameEn: 'Subtraction Master',
    descriptionHe: '50 תרגילי חיסור נכונים',
    descriptionEn: '50 correct subtraction exercises',
    icon: '➖',
    category: 'topic_mastery',
    requirement: 50,
  },
  {
    id: 'week-warrior',
    nameHe: 'לוחם השבוע',
    nameEn: 'Week Warrior',
    descriptionHe: '7 ימים רצופים של תרגול',
    descriptionEn: '7 consecutive days of practice',
    icon: '🏆',
    category: 'streak',
    requirement: 7,
  },
  {
    id: 'hint-helper',
    nameHe: 'עוזר חכם',
    nameEn: 'Smart Helper',
    descriptionHe: 'השתמשת ברמזים בצורה חכמה',
    descriptionEn: 'Used hints wisely',
    icon: '💡',
    category: 'helper',
    requirement: 1,
  },
  {
    id: 'explorer',
    nameHe: 'חוקר',
    nameEn: 'Explorer',
    descriptionHe: 'ניסית את כל הנושאים',
    descriptionEn: 'Tried all topics',
    icon: '🗺️',
    category: 'explorer',
    requirement: 7,
  },
  {
    id: 'century-club',
    nameHe: 'מועדון המאה',
    nameEn: 'Century Club',
    descriptionHe: '100 תרגילים הושלמו',
    descriptionEn: '100 exercises completed',
    icon: '💯',
    category: 'topic_mastery',
    requirement: 100,
  },
  {
    id: 'perfect-score',
    nameHe: 'ציון מושלם',
    nameEn: 'Perfect Score',
    descriptionHe: '5 תרגילים ברצף בניסיון ראשון',
    descriptionEn: '5 exercises in a row on first try',
    icon: '⭐',
    category: 'speed',
    requirement: 5,
  },
] as const;


