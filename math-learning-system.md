# מערכת למידת מתמטיקה אינטראקטיבית - Cursor Prompt

## 📋 תוכן עניינים
1. [סקירה כללית](#סקירה-כללית)
2. [מחקר ותכנית לימודים](#מחקר-ותכנית-לימודים)
3. [אסטרטגיות למידה עם AI](#אסטרטגיות-למידה-עם-ai)
4. [הפרומפט המקיף ל-Cursor](#הפרומפט-המקיף-ל-cursor)
5. [ארכיטקטורה טכנית](#ארכיטקטורה-טכנית)
6. [דוגמאות קוד](#דוגמאות-קוד)
7. [מפת דרכים לפיתוח](#מפת-דרכים-לפיתוח)

---

## 🎯 סקירה כללית

### מטרת המערכת
מערכת למידה חדשנית מבוססת AI למתמטיקה עבור תלמידי כיתות א'-ב' בישראל, המשלבת את תכנית הלימודים החדשה של משרד החינוך (תשפ"ה) עם טכנולוגיות AI מתקדמות של 2025.

### עקרונות מנחים
- **התאמה אישית**: המערכת מתאימה עצמה לרמת התלמיד בזמן אמת
- **אינטראקטיביות**: למידה דרך משחק, אנימציות וחוויות ויזואליות
- **פשטות**: ממשק פשוט ואינטואיטיבי מתאים לילדים בגילאי 6-8
- **חוויית משתמש מצוינת**: עיצוב צבעוני, דמויות מקסימות ופידבק מיידי
- **מבוסס נתונים**: מעקב אחר התקדמות ומתן המלצות מותאמות

---

## 📚 מחקר ותכנית לימודים

### תכנית הלימודים החדשה (תשפ"ה)

#### כיתה א' - נושאים עיקריים

**1. מספרים טבעיים (עד 100)**
- הכרת מספרים 1-20 (קריאה, כתיבה, ספירה)
- הרחבה למספרים עד 100
- זיהוי מספרים זוגיים ואי-זוגיים
- מספרים סידוריים
- השוואת מספרים (<, >, =)
- ערך מקומי (יחידות ועשרות)

**2. פעולות חשבון**
- חיבור וחיסור עד 10
- חיבור וחיסור עד 20
- עובדות חיבור בסיסיות (משפחות מספרים)
- פתרון בעיות מילוליות פשוטות
- הכרת משמעות פעולות החיבור והחיסור

**3. גיאומטריה ומדידות**
- זיהוי צורות גיאומטריות בסיסיות (עיגול, משולש, ריבוע, מלבן)
- קריאת שעון (שעות עגולות)
- מדידת אורך בסנטימטרים (היכרות ראשונית)
- השוואת גדלים (ארוך/קצר, גבוה/נמוך)

**4. מושגים נוספים**
- דפוסים וחוקיות
- ציר מספרים
- עבודה עם טבלאות פשוטות

#### כיתה ב' - נושאים עיקריים

**1. מספרים טבעיים (עד 1000)**
- מספרים עד 100 - העמקה
- הרחבה למספרים עד 1000
- ערך מקומי (יחידות, עשרות, מאות)
- קריאה וכתיבה של מספרים תלת-ספרתיים
- השוואה וסידור מספרים

**2. פעולות חשבון מתקדמות**
- חיבור וחיסור עד 100 (עם ובלי שבירת עשרת)
- חיבור וחיסור במאונך
- היכרות עם כפל וחילוק (עד 20-30)
- תחילת לימוד לוח הכפל
- בעיות מילוליות מורכבות יותר

**3. שברים ראשוניים**
- היכרות עם חצי ורבע
- פעולות בסיסיות עם שברים פשוטים

**4. גיאומטריה ומדידות מתקדמות**
- מדידת זמן (חצי שעה, רבע שעה, דקות)
- מדידת שטח (ריבועים)
- דיאגרמת עמודות
- המשך עבודה עם טבלאות

### עקרונות התכנית החדשה
- **איזון בין שטף חישובי להבנה מעמיקה**
- **קידום שיח מתמטי** - הסברת חשיבה והצדקת פתרונות
- **פיתוח חשיבה ביקורתית ויצירתית**
- **התאמה למאה ה-21** - שילוב טכנולוגיה וחשיבה חישובית

---

## 🤖 אסטרטגיות למידה עם AI

### למידה מותאמת אישית (Adaptive Learning)

**מה זה?**
מערכת שמתאימה את תוכן הלמידה, הקצב והקושי לכל תלמיד בנפרד על בסיס ביצועיו.

**יישום במערכת שלנו:**
- **הערכה ראשונית**: מבחן קצר קצר לזיהוי רמת התלמיד
- **התאמה דינמית**: המערכת משנה קושי לפי הצלחות וכשלונות
- **מסלולי למידה מרובים**: תלמידים חזקים מקבלים אתגרים, תלמידים מתקשים מקבלים תרגול נוסף
- **פידבק מיידי**: תיקון טעויות בזמן אמת עם הסברים

### טכניקות למידה מבוססות מחקר

#### 1. Spaced Repetition (חזרה מרווחת)
- חזרה על חומר במרווחי זמן אופטימליים
- מניעת שכחה ושיפור זיכרון ארוך טווח

#### 2. Interleaved Practice (תרגול משולב)
- ערבוב נושאים שונים במקום תרגול נושא אחד
- שיפור היכולת להבחין בין טכניקות שונות

#### 3. Retrieval Practice (תרגול שליפה)
- בדיקות ותרגול פעיל במקום קריאה פסיבית
- חיזוק הזיכרון והלמידה

#### 4. Concrete Examples (דוגמאות קונקרטיות)
- שימוש בדוגמאות מהחיים האמיתיים
- חיבור בין מושגים מופשטים למציאות

### עקרונות גמיפיקציה (Gamification)

#### אלמנטים מרכזיים:
1. **נקודות (Points)**: תגמול על כל תרגיל נכון
2. **תגים (Badges)**: הישגים מיוחדים (למשל: "מלך החיבור", "כוכב החיסור")
3. **רמות (Levels)**: התקדמות ברמות קושי
4. **לוח מובילים (Leaderboard)**: תחרות ידידותית (אופציונלי)
5. **סרגל התקדמות**: הצגה ויזואלית של המסע הלימודי
6. **אווטרים**: התאמה אישית של דמות
7. **סיפורים אינטראקטיביים**: מסע עם דמויות מקסימות

#### עקרונות חשובים:
- **איזון**: לא להצית תחרותיות יתר
- **חיוביות**: דגש על הצלחות ולא כשלונות
- **גיוון**: מספר סוגי תגמולים

### UX/UI לילדים - עקרונות עיצוב

#### חוקי זהב:
1. **פשטות**: עיצוב נקי, לא עמוס
2. **כפתורים גדולים**: קלים למגע (מינימום 44x44 פיקסלים)
3. **צבעים בהירים**: פלטה צבעונית ועליזה (לא גוועתיים!)
4. **אייקונים ברורים**: סמלים מזהים בקלות
5. **פונטים קריאים**: גדולים, ברורים, ללא serif
6. **אנימציות**: תגובות ויזואליות לפעולות
7. **משוב אודיטיבי**: צלילים חיוביים
8. **התמצאות**: ניווט פשוט וברור
9. **חוסר תלות בקריאה**: סמכות על תמונות וסמלים
10. **בטיחות**: ללא פרסומות או קישורים חיצוניים

#### פלטת צבעים מומלצת:
- **ראשי**: #4CAF50 (ירוק) - הצלחה
- **משני**: #2196F3 (כחול) - אינטראקציה
- **תשומת לב**: #FFC107 (צהוב/זהב) - תגמולים
- **שגיאה**: #FF6B6B (אדום רך) - טעות
- **רקע**: #FFF9E6 (קרם חם)
- **טקסט**: #37474F (אפור כהה)

---

## 🚀 הפרומפט המקיף ל-Cursor

### קובץ .cursorrules

צור קובץ בשם `.cursorrules` בתיקיית הפרויקט:

```markdown
# Math Learning System - Cursor AI Rules

## Project Overview
Interactive AI-powered math learning platform for Israeli students in grades 1-2, following the new 2025 curriculum (תשפ"ה).

## Role
You are an expert full-stack developer specializing in educational technology, with deep understanding of:
- Modern React development (React 19+ with TypeScript)
- AI/ML integration for personalized learning
- Child-friendly UX/UI design
- Israeli education system and Hebrew language
- Gamification in education
- Accessibility standards (WCAG 2.1 AA)

## Technical Stack
- **Frontend**: React 19+ with TypeScript, Vite
- **Styling**: Tailwind CSS v4 (utility-first, responsive)
- **State Management**: Zustand (lightweight, simple)
- **Forms**: React Hook Form with Zod validation
- **Animation**: Framer Motion (smooth, performant)
- **Icons**: Lucide React (consistent, modern)
- **Testing**: Vitest + React Testing Library
- **AI Integration**: OpenAI API / Anthropic Claude API
- **Backend**: Node.js + Express (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with secure httpOnly cookies
- **Payment Integration**: (Future) - Structure ready

## Code Standards

### TypeScript
- Use TypeScript for ALL code
- Prefer `interface` over `type` for object shapes
- Use strict mode: `"strict": true`
- Explicit return types for functions
- Avoid `any` - use `unknown` when type is uncertain

### React
- Functional components only
- Custom hooks for reusable logic (prefix with `use`)
- Props interfaces clearly defined
- Use composition over inheritance
- Proper error boundaries

### File Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── student/          # Student-facing components
│   ├── teacher/          # Teacher dashboard components
│   └── layout/           # Layout components
├── features/
│   ├── exercises/        # Exercise system
│   ├── progress/         # Progress tracking
│   ├── gamification/     # Badges, points, levels
│   └── adaptive/         # AI adaptive learning
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & helpers
├── stores/               # Zustand stores
├── types/                # TypeScript types
├── api/                  # API client functions
└── assets/              # Images, sounds, fonts
```

### Naming Conventions
- **Components**: PascalCase (e.g., `MathExercise.tsx`)
- **Files**: kebab-case (e.g., `use-student-progress.ts`)
- **Variables**: camelCase (e.g., `studentScore`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ATTEMPTS`)
- **Interfaces**: PascalCase with 'I' prefix optional (e.g., `StudentData`)

## Coding Guidelines

### DO ✅
- Write clean, self-documenting code
- Add JSDoc comments for complex functions
- Use early returns to reduce nesting
- Implement proper error handling with try-catch
- Write unit tests for business logic
- Use semantic HTML (`<button>`, `<nav>`, not `<div>`)
- Make components accessible (ARIA labels, keyboard nav)
- Optimize images (WebP format, lazy loading)
- Use Tailwind's utility classes consistently
- Create custom Tailwind classes for repetitive patterns
- Implement proper loading states
- Add proper TypeScript types for API responses
- Use React.memo() for expensive components
- Implement proper form validation
- Add Hebrew RTL support: `dir="rtl"` and `lang="he"`

### DON'T ❌
- Don't use inline styles (use Tailwind)
- Don't duplicate code - extract to components/hooks
- Don't ignore TypeScript errors
- Don't use `console.log` in production (use proper logger)
- Don't fetch data in components - use custom hooks
- Don't hardcode text - use i18n (future-ready)
- Don't ignore error cases
- Don't create overly complex components - split them
- Don't use local storage for sensitive data
- Don't make UI inaccessible to keyboard users

## Design Principles for Child-Friendly UI

### Visual Design
- Large, tappable buttons (min 60x60px for mobile)
- Bright, cheerful colors (see color palette)
- Rounded corners everywhere (Tailwind: `rounded-2xl`, `rounded-3xl`)
- Clear visual hierarchy
- Minimal text - prefer icons and images
- Consistent spacing (Tailwind spacing scale)
- Smooth animations (Framer Motion)
- Loading states with playful animations

### Interaction Design
- Immediate visual feedback on every action
- Sound effects for success/error (optional toggle)
- Celebration animations for achievements
- Clear progress indicators
- Simple, one-step actions when possible
- Undo functionality where appropriate
- Prevent accidental actions (confirm important steps)

### Color Palette (Tailwind Config)
```javascript
colors: {
  primary: '#4CAF50',      // Success green
  secondary: '#2196F3',    // Interactive blue
  accent: '#FFC107',       // Gold/reward yellow
  error: '#FF6B6B',        // Soft red
  background: '#FFF9E6',   // Warm cream
  text: '#37474F',         // Dark gray
}
```

## AI Integration Guidelines

### Adaptive Learning System
- Track student performance in real-time
- Adjust difficulty based on success rate (70-80% target)
- Provide hints before showing answers
- Use spaced repetition for mastery
- Implement mastery-based progression (80% accuracy to advance)

### AI Prompt Structure
When generating exercises or feedback, use this structure:
```typescript
interface AIPromptContext {
  studentLevel: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  recentPerformance: number[]; // Last 10 scores
  strugglingConcepts: string[];
  language: 'he'; // Hebrew
}
```

### Exercise Generation
- Create 3 difficulty variants for each exercise
- Include visual aids (images, manipulatives)
- Add worked examples for new concepts
- Provide immediate, constructive feedback
- Generate hints progressively (not all at once)

## Gamification Implementation

### Points System
- Correct answer: +10 points
- First try bonus: +5 points
- Streak bonus: +2 per consecutive correct
- Daily login: +20 points
- Level completion: +50 points

### Badge Categories
1. **Topic Mastery**: Complete 20 exercises in a topic
2. **Streak Master**: 7 days of consistent practice
3. **Speed Demon**: Complete 10 exercises under time limit
4. **Helper**: Use hints wisely (not too many)
5. **Explorer**: Try all topics

### Level Progression
- Start at Level 1 (foundations)
- Require 80% mastery to unlock next level
- Each level unlocks new avatars/themes

## Database Schema Principles

### Core Tables
- `students`: User accounts (name, avatar, level, points)
- `exercises`: Math problems with metadata
- `student_progress`: Individual exercise attempts
- `achievements`: Badges earned
- `learning_paths`: Adaptive sequences
- `sessions`: Login/activity tracking

### Privacy & Security
- Hash passwords with bcrypt (12 rounds)
- Never store sensitive data in plain text
- Implement GDPR-compliant data handling
- Parent/teacher can view but not edit student data
- Audit logs for data access

## Testing Strategy

### Unit Tests (Vitest)
- Test business logic functions
- Test custom hooks
- Test utility functions
- Aim for 80%+ coverage

### Component Tests (React Testing Library)
- Test user interactions
- Test accessibility
- Test error states
- Test loading states

### E2E Tests (Playwright - future)
- Test critical user flows
- Test responsive design
- Test cross-browser compatibility

## Performance Optimization

### Bundle Size
- Code splitting by route
- Lazy load heavy components
- Tree-shake unused code
- Compress images (WebP, AVIF)

### Runtime Performance
- Use React.memo() judiciously
- Virtualize long lists (react-window)
- Debounce/throttle frequent operations
- Optimize re-renders (useMemo, useCallback)

### Loading Strategy
- Show skeleton screens during load
- Prefetch next likely exercise
- Cache common API responses
- Implement service worker (PWA - future)

## Deployment Checklist

### Before Deploying
- [ ] All tests pass
- [ ] TypeScript compiles without errors
- [ ] Bundle size is reasonable (<500KB initial)
- [ ] Lighthouse score >90 on all metrics
- [ ] Accessibility audit passes
- [ ] Hebrew RTL works correctly
- [ ] Images are optimized
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (privacy-focused)
- [ ] Environment variables set
- [ ] Database migrations applied
- [ ] Security headers configured

## Development Workflow

### Git Workflow
- Branch naming: `feature/description`, `fix/description`
- Commit messages: Clear, descriptive (conventional commits)
- Pull requests: Include description, screenshots
- Code review required before merge

### When Creating New Features
1. **Plan**: Write a brief spec in comments
2. **Types**: Define TypeScript interfaces first
3. **Component**: Build UI component
4. **Logic**: Implement business logic
5. **Tests**: Write tests
6. **Integration**: Connect to backend/AI
7. **Review**: Self-review, refactor
8. **Document**: Add comments, update README

## Hebrew Language Considerations

### RTL Support
- Set `dir="rtl"` on root element
- Use Tailwind RTL utilities
- Test layout in RTL mode
- Use logical properties (e.g., `start`/`end` not `left`/`right`)

### Content
- All student-facing content in Hebrew
- Age-appropriate vocabulary (grades 1-2)
- Clear, simple instructions
- Phonetic spelling hints for young readers

## AI Assistant Instructions

When I ask you to build features:
1. **Understand Context**: Review existing code first
2. **Ask Clarifying Questions**: If requirements are unclear
3. **Provide Options**: Suggest 2-3 approaches when relevant
4. **Explain Decisions**: Comment why you chose certain patterns
5. **Think About Edge Cases**: Handle errors, empty states, etc.
6. **Be Consistent**: Follow patterns in existing codebase
7. **Optimize**: Write efficient, maintainable code
8. **Test Coverage**: Include basic tests or test suggestions
9. **Accessibility**: Always consider a11y
10. **Hebrew First**: Remember this is for Hebrew-speaking children

## Example Prompt for AI
```
Create an interactive addition exercise component for Grade 1.

Requirements:
- Visual representation with cute animated objects (fruits/animals)
- Random numbers 1-10
- Drag-and-drop interaction OR number pad input
- Immediate feedback (celebration for correct, encouragement for wrong)
- Hint button (show one object at a time)
- Sound effects toggle
- Track attempt count
- Award points on success
- Hebrew text throughout
- Fully accessible (keyboard, screen reader)

Technical:
- TypeScript React component
- Framer Motion animations
- Zustand store for state
- Props: difficulty, onComplete, studentLevel
- Responsive design (mobile-first)
```

## Notes for Future Development

### Payment Integration (Phase 2)
- Structure data models to support subscriptions
- Design tiered pricing (free/premium)
- Prepare for Stripe/PayPal integration
- Parent dashboard for billing management

### Multi-Language Support (Phase 3)
- Implement i18n framework (react-i18next)
- Extract all strings to translation files
- Design language switcher UI

### Teacher Dashboard (Phase 2)
- Student progress overview
- Assign specific exercises
- Generate reports
- Parent communication tools

## Resources & Documentation

### Internal Docs
- `@docs/architecture.md` - System architecture
- `@docs/api-reference.md` - API endpoints
- `@docs/components.md` - Component library
- `@docs/curriculum.md` - Israeli curriculum mapping

### External References
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Zustand: https://zustand.docs.pmnd.rs
- Israeli Ministry of Education: https://pop.education.gov.il

## Final Notes

Remember: We're building an educational tool that will impact children's learning journey. 

**Priorities:**
1. **Child Experience**: Fun, engaging, encouraging
2. **Educational Value**: Aligned with curriculum, promotes learning
3. **Accessibility**: Everyone can use it
4. **Performance**: Fast, smooth, responsive
5. **Maintainability**: Clean code for future developers
6. **Security**: Protect children's data

When in doubt, ask: "Will this make a 6-year-old smile and learn?"
```

---

## 💻 ארכיטקטורה טכנית

### מבנה המערכת

```
┌─────────────────────────────────────────────┐
│           Frontend (React + TS)            │
│  ┌─────────────────────────────────────┐   │
│  │  Student Interface (Hebrew RTL)     │   │
│  │  - Exercise System                  │   │
│  │  - Gamification UI                  │   │
│  │  - Progress Dashboard               │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    │
                    │ HTTPS / WebSocket
                    ▼
┌─────────────────────────────────────────────┐
│          Backend API (Node.js)             │
│  ┌─────────────────────────────────────┐   │
│  │  RESTful API + Real-time Updates   │   │
│  │  - Authentication (JWT)             │   │
│  │  - Exercise Management              │   │
│  │  - Progress Tracking                │   │
│  │  - Analytics                        │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
┌──────────────────┐   ┌───────────────────┐
│  PostgreSQL DB   │   │   AI Services     │
│  - Student Data  │   │  - OpenAI API     │
│  - Exercises     │   │  - Claude API     │
│  - Progress      │   │  - Adaptive Engine│
│  - Achievements  │   │  - Content Gen    │
└──────────────────┘   └───────────────────┘
```

### תהליכי AI מרכזיים

#### 1. Adaptive Difficulty Algorithm
```typescript
function calculateNextDifficulty(
  currentLevel: number,
  recentScores: number[],
  timeSpent: number[]
): number {
  const avgScore = mean(recentScores);
  const avgTime = mean(timeSpent);
  
  // Target 75% success rate
  if (avgScore > 0.85 && avgTime < 30000) {
    return currentLevel + 1; // Increase difficulty
  } else if (avgScore < 0.65) {
    return currentLevel - 1; // Decrease difficulty
  }
  
  return currentLevel; // Stay at current level
}
```

#### 2. Spaced Repetition Scheduler
```typescript
function scheduleNextReview(
  masteryLevel: number,
  lastReview: Date
): Date {
  // SM-2 Algorithm simplified
  const intervals = [1, 3, 7, 14, 30]; // days
  const daysSince = daysBetween(lastReview, new Date());
  const nextInterval = intervals[masteryLevel] || 30;
  
  return addDays(new Date(), nextInterval);
}
```

---

## 📝 דוגמאות קוד

### 1. מבנה Component - תרגיל חיבור אינטראקטיבי

```typescript
// src/components/student/exercises/AdditionExercise.tsx

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from '@/hooks/use-sound';
import { useProgress } from '@/stores/progress-store';
import { Sparkles, Heart } from 'lucide-react';

interface AdditionExerciseProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onComplete: (score: number, timeSpent: number) => void;
  studentLevel: number;
}

interface ExerciseProblem {
  num1: number;
  num2: number;
  correctAnswer: number;
  visual: 'fruits' | 'animals' | 'blocks';
}

export const AdditionExercise: React.FC<AdditionExerciseProps> = ({
  difficulty,
  onComplete,
  studentLevel,
}) => {
  // State
  const [problem, setProblem] = useState<ExerciseProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [startTime] = useState(Date.now());

  // Hooks
  const { playSuccess, playError, playClick } = useSound();
  const { addPoints, incrementStreak } = useProgress();

  // Generate problem based on difficulty
  useEffect(() => {
    const newProblem = generateProblem(difficulty, studentLevel);
    setProblem(newProblem);
  }, [difficulty, studentLevel]);

  // Generate problem function
  const generateProblem = (
    diff: string,
    level: number
  ): ExerciseProblem => {
    const ranges = {
      easy: { max: 5 },
      medium: { max: 10 },
      hard: { max: 20 },
    };

    const max = ranges[diff as keyof typeof ranges].max;
    const num1 = Math.floor(Math.random() * max) + 1;
    const num2 = Math.floor(Math.random() * (max - num1)) + 1;

    const visuals = ['fruits', 'animals', 'blocks'] as const;
    const visual = visuals[Math.floor(Math.random() * visuals.length)];

    return {
      num1,
      num2,
      correctAnswer: num1 + num2,
      visual,
    };
  };

  // Check answer
  const handleSubmit = () => {
    if (!problem || !userAnswer) return;

    playClick();
    const answer = parseInt(userAnswer);
    setAttempts((prev) => prev + 1);

    if (answer === problem.correctAnswer) {
      // Correct answer!
      setFeedback('correct');
      playSuccess();

      // Calculate score
      const timeSpent = Date.now() - startTime;
      const basePoints = 10;
      const bonusPoints = attempts === 0 ? 5 : 0; // First try bonus
      const totalPoints = basePoints + bonusPoints;

      // Update progress
      addPoints(totalPoints);
      incrementStreak();

      // Show celebration, then move to next
      setTimeout(() => {
        onComplete(totalPoints, timeSpent);
      }, 2000);
    } else {
      // Incorrect answer
      setFeedback('incorrect');
      playError();
      setUserAnswer('');

      // Auto-show hint after 2 wrong attempts
      if (attempts >= 1) {
        setShowHint(true);
      }

      // Reset feedback after animation
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  // Render visual representation
  const renderVisuals = () => {
    if (!problem) return null;

    const VisualComponent = {
      fruits: FruitVisual,
      animals: AnimalVisual,
      blocks: BlockVisual,
    }[problem.visual];

    return (
      <div className="flex gap-8 items-center justify-center mb-8">
        <VisualComponent count={problem.num1} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-primary"
        >
          +
        </motion.div>
        <VisualComponent count={problem.num2} />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-primary"
        >
          =
        </motion.div>
        <div className="w-32 h-32 border-4 border-dashed border-primary rounded-2xl flex items-center justify-center">
          <span className="text-5xl">?</span>
        </div>
      </div>
    );
  };

  if (!problem) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-background p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-text flex items-center gap-2">
            <Heart className="text-error" fill="currentColor" />
            בואו נחבר מספרים!
          </h1>
          <button
            onClick={() => setShowHint(true)}
            className="px-6 py-3 bg-secondary text-white rounded-2xl hover:bg-secondary/90 transition-colors"
            aria-label="קבל רמז"
          >
            💡 רמז
          </button>
        </div>

        {/* Visual representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-8 mb-8"
        >
          {renderVisuals()}

          {/* Math equation */}
          <div className="text-center text-5xl font-bold text-text mb-8">
            {problem.num1} + {problem.num2} = ?
          </div>

          {/* Hint */}
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-accent/20 rounded-2xl p-6 mb-8"
              >
                <p className="text-xl text-center">
                  ספרו יחד את כל החפצים. כמה יש בסך הכל? 🤔
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Number pad */}
          <div className="flex justify-center gap-4">
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-32 h-32 text-6xl text-center border-4 border-primary rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/50"
              max={99}
              min={0}
              autoFocus
              aria-label="הקלידו את התשובה"
            />
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="px-12 py-6 bg-primary text-white text-2xl font-bold rounded-3xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              בדיקה ✓
            </motion.button>
          </div>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback === 'correct' && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="fixed inset-0 flex items-center justify-center bg-primary/20 backdrop-blur-sm z-50"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-32 h-32 text-accent mx-auto mb-4" />
                </motion.div>
                <h2 className="text-5xl font-bold text-primary mb-4">
                  מעולה! 🎉
                </h2>
                <p className="text-3xl text-text">
                  התשובה שלך נכונה!
                </p>
                {attempts === 0 && (
                  <p className="text-2xl text-accent mt-4 font-bold">
                    +5 נקודות בונוס! 🌟
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {feedback === 'incorrect' && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              exit={{ opacity: 0 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white border-4 border-error rounded-2xl shadow-lg p-6 z-50"
            >
              <p className="text-2xl text-center">
                אופס! נסה שוב 💪
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Visual components
const FruitVisual: React.FC<{ count: number }> = ({ count }) => {
  const fruits = ['🍎', '🍊', '🍌', '🍇', '🍓'];
  const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];

  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-xs">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1 }}
          className="text-6xl"
        >
          {randomFruit}
        </motion.div>
      ))}
    </div>
  );
};

const AnimalVisual: React.FC<{ count: number }> = ({ count }) => {
  const animals = ['🐶', '🐱', '🐭', '🐰', '🐻'];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];

  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-xs">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          className="text-6xl"
        >
          {randomAnimal}
        </motion.div>
      ))}
    </div>
  );
};

const BlockVisual: React.FC<{ count: number }> = ({ count }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center max-w-xs">
      {Array.from({ length: count }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg shadow-md"
        />
      ))}
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
    />
  </div>
);
```

### 2. Zustand Store - ניהול התקדמות

```typescript
// src/stores/progress-store.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: Date;
}

interface ProgressState {
  // Student data
  studentId: string | null;
  studentName: string;
  level: number;
  points: number;
  streak: number;
  lastLoginDate: Date | null;

  // Progress tracking
  exercisesCompleted: number;
  topicsmastered: string[];
  achievements: Achievement[];
  currentAvatar: string;

  // Actions
  setStudent: (id: string, name: string) => void;
  addPoints: (points: number) => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  completeExercise: (topic: string, score: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  changeAvatar: (avatar: string) => void;
  levelUp: () => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Initial state
      studentId: null,
      studentName: '',
      level: 1,
      points: 0,
      streak: 0,
      lastLoginDate: null,
      exercisesCompleted: 0,
      topicsmastered: [],
      achievements: [],
      currentAvatar: '👧',

      // Actions
      setStudent: (id, name) =>
        set({
          studentId: id,
          studentName: name,
          lastLoginDate: new Date(),
        }),

      addPoints: (points) =>
        set((state) => {
          const newPoints = state.points + points;
          const pointsForNextLevel = state.level * 100;

          // Check if level up
          if (newPoints >= pointsForNextLevel) {
            return {
              points: newPoints,
              level: state.level + 1,
            };
          }

          return { points: newPoints };
        }),

      incrementStreak: () =>
        set((state) => {
          const today = new Date().toDateString();
          const lastLogin = state.lastLoginDate
            ? new Date(state.lastLoginDate).toDateString()
            : null;

          // Check if this is a consecutive day
          if (lastLogin !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const isConsecutive = lastLogin === yesterday.toDateString();

            return {
              streak: isConsecutive ? state.streak + 1 : 1,
              lastLoginDate: new Date(),
            };
          }

          return state;
        }),

      resetStreak: () => set({ streak: 0 }),

      completeExercise: (topic, score) =>
        set((state) => {
          const newCompleted = state.exercisesCompleted + 1;
          const masteredTopics = [...state.topicsmastered];

          // Check if topic should be marked as mastered (20 exercises with >80% avg)
          // (This is simplified - in real app, track per-topic stats)
          if (score >= 80 && !masteredTopics.includes(topic)) {
            masteredTopics.push(topic);
          }

          return {
            exercisesCompleted: newCompleted,
            topicsmastered: masteredTopics,
          };
        }),

      unlockAchievement: (achievement) =>
        set((state) => {
          // Prevent duplicates
          if (state.achievements.some((a) => a.id === achievement.id)) {
            return state;
          }

          return {
            achievements: [...state.achievements, achievement],
            points: state.points + 50, // Bonus points for achievement
          };
        }),

      changeAvatar: (avatar) => set({ currentAvatar: avatar }),

      levelUp: () =>
        set((state) => ({
          level: state.level + 1,
          points: 0, // Reset points or carry over?
        })),
    }),
    {
      name: 'student-progress',
      // Only persist essential data
      partialize: (state) => ({
        studentId: state.studentId,
        studentName: state.studentName,
        level: state.level,
        points: state.points,
        streak: state.streak,
        lastLoginDate: state.lastLoginDate,
        achievements: state.achievements,
        currentAvatar: state.currentAvatar,
      }),
    }
  )
);
```

### 3. API Integration - Exercise Service

```typescript
// src/api/exercise-service.ts

import { api } from './client';

export interface Exercise {
  id: string;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division';
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  problem: {
    num1: number;
    num2: number;
    operation: string;
  };
  correctAnswer: number;
  hints: string[];
  visualType: 'fruits' | 'animals' | 'blocks';
}

export interface ExerciseResult {
  exerciseId: string;
  studentId: string;
  answer: number;
  isCorrect: boolean;
  attempts: number;
  timeSpent: number; // milliseconds
  hintsUsed: number;
}

export interface AdaptiveRecommendation {
  nextDifficulty: 'easy' | 'medium' | 'hard';
  topicsToReview: string[];
  suggestedExercises: Exercise[];
  reasoning: string;
}

// Get exercises based on student level and performance
export async function getAdaptiveExercises(
  studentId: string,
  count: number = 5
): Promise<Exercise[]> {
  const response = await api.get(`/exercises/adaptive/${studentId}`, {
    params: { count },
  });
  return response.data;
}

// Submit exercise result and get feedback
export async function submitExerciseResult(
  result: ExerciseResult
): Promise<{
  pointsEarned: number;
  feedback: string;
  nextExercise: Exercise;
}> {
  const response = await api.post('/exercises/submit', result);
  return response.data;
}

// Get AI-powered hints for an exercise
export async function getHint(
  exerciseId: string,
  studentId: string,
  currentAttempt: number
): Promise<string> {
  const response = await api.get(`/exercises/${exerciseId}/hint`, {
    params: { studentId, attempt: currentAttempt },
  });
  return response.data.hint;
}

// Get adaptive recommendations based on recent performance
export async function getRecommendations(
  studentId: string
): Promise<AdaptiveRecommendation> {
  const response = await api.get(`/students/${studentId}/recommendations`);
  return response.data;
}

// Generate new exercises using AI
export async function generateExercises(
  topic: string,
  difficulty: string,
  count: number,
  studentLevel: number
): Promise<Exercise[]> {
  const response = await api.post('/exercises/generate', {
    topic,
    difficulty,
    count,
    studentLevel,
  });
  return response.data;
}
```

### 4. Custom Hook - Sound Effects

```typescript
// src/hooks/use-sound.ts

import { useRef, useCallback } from 'react';
import { useSettings } from '@/stores/settings-store';

// Sound effect URLs (preload in production)
const SOUNDS = {
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  click: '/sounds/click.mp3',
  levelUp: '/sounds/level-up.mp3',
  achievement: '/sounds/achievement.mp3',
};

export function useSound() {
  const { soundEnabled } = useSettings();
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Initialize audio elements
  const getAudio = useCallback((key: keyof typeof SOUNDS) => {
    if (!audioRefs.current.has(key)) {
      const audio = new Audio(SOUNDS[key]);
      audio.preload = 'auto';
      audio.volume = 0.5;
      audioRefs.current.set(key, audio);
    }
    return audioRefs.current.get(key)!;
  }, []);

  const playSound = useCallback(
    (key: keyof typeof SOUNDS) => {
      if (!soundEnabled) return;

      const audio = getAudio(key);
      audio.currentTime = 0; // Reset to start
      audio.play().catch((err) => {
        console.warn('Sound play failed:', err);
      });
    },
    [soundEnabled, getAudio]
  );

  return {
    playSuccess: () => playSound('success'),
    playError: () => playSound('error'),
    playClick: () => playSound('click'),
    playLevelUp: () => playSound('levelUp'),
    playAchievement: () => playSound('achievement'),
  };
}
```

### 5. Tailwind Configuration

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        accent: '#FFC107',
        error: '#FF6B6B',
        background: '#FFF9E6',
        text: '#37474F',
      },
      fontFamily: {
        sans: ['Rubik', 'Assistant', 'sans-serif'], // Hebrew-friendly fonts
      },
      fontSize: {
        'display-1': ['4rem', { lineHeight: '1.2' }],
        'display-2': ['3rem', { lineHeight: '1.3' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        wiggle: 'wiggle 0.5s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-in',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
```

---

## 🗺️ מפת דרכים לפיתוח

### Phase 1: MVP - Core Learning System (חודשים 1-2)

**שבוע 1-2: הקמת תשתית**
- [ ] Setup Vite + React + TypeScript project
- [ ] Configure Tailwind CSS with custom theme
- [ ] Setup ESLint, Prettier, TypeScript strict mode
- [ ] Create basic folder structure
- [ ] Setup Zustand stores
- [ ] Implement routing (React Router)
- [ ] Create design system (buttons, inputs, cards)
- [ ] Setup Framer Motion
- [ ] Hebrew RTL support

**שבוע 3-4: מערכת תרגילים בסיסית**
- [ ] Addition exercises (Grade 1)
- [ ] Subtraction exercises (Grade 1)
- [ ] Visual representations (fruits, animals, blocks)
- [ ] Number pad input
- [ ] Immediate feedback system
- [ ] Sound effects
- [ ] Loading states and error handling
- [ ] Mobile responsive design

**שבוע 5-6: גמיפיקציה בסיסית**
- [ ] Points system
- [ ] Level progression
- [ ] Avatar selection
- [ ] Progress dashboard
- [ ] Celebration animations
- [ ] Daily streak tracker

**שבוע 7-8: Backend & Database**
- [ ] Setup Node.js + Express
- [ ] PostgreSQL database
- [ ] Prisma ORM setup
- [ ] Authentication (JWT)
- [ ] Student CRUD operations
- [ ] Exercise storage & retrieval
- [ ] Progress tracking API
- [ ] Basic analytics

### Phase 2: AI & Personalization (חודשים 3-4)

**שבוע 9-10: AI Integration**
- [ ] OpenAI/Claude API integration
- [ ] Adaptive difficulty algorithm
- [ ] Exercise generation system
- [ ] Personalized hints
- [ ] Performance analysis
- [ ] Learning path recommendations

**שבוע 11-12: Extended Gamification**
- [ ] Badge system (15+ badges)
- [ ] Achievement notifications
- [ ] Leaderboards (optional)
- [ ] Unlockable avatars
- [ ] Reward animations
- [ ] Weekly challenges

**שבוע 13-14: Content Expansion**
- [ ] Grade 2 exercises (numbers to 100)
- [ ] Multiplication introduction
- [ ] Word problems
- [ ] Pattern recognition
- [ ] Geometry basics
- [ ] Time concepts

**שבוע 15-16: Parent Dashboard**
- [ ] Parent authentication
- [ ] Progress overview
- [ ] Detailed reports
- [ ] Activity timeline
- [ ] Strengths/weaknesses analysis
- [ ] Printable worksheets

### Phase 3: Advanced Features (חודשים 5-6)

**שבוע 17-18: Spaced Repetition**
- [ ] Review scheduler
- [ ] Mastery tracking
- [ ] Smart review recommendations
- [ ] Retention analytics

**שבוע 19-20: Social Features**
- [ ] Multiple student profiles
- [ ] Friendly competitions
- [ ] Share achievements
- [ ] Collaborate challenges

**שבוע 21-22: Payment Integration**
- [ ] Stripe/PayPal integration
- [ ] Subscription tiers (Free/Premium)
- [ ] Billing dashboard
- [ ] Trial period management
- [ ] Invoice generation

**שבוע 23-24: Polish & Optimization**
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Comprehensive testing
- [ ] Bug fixes
- [ ] Documentation
- [ ] Deploy to production

### Future Enhancements

**Phase 4: Advanced AI Features**
- Real-time tutoring chatbot
- Speech recognition for verbal answers
- Handwriting recognition
- Emotion detection (struggling vs. engaged)
- Predictive analytics for teachers

**Phase 5: Content Expansion**
- Grades 3-6
- Science & Reading comprehension
- Multi-language support (English, Arabic)
- Offline mode (PWA)

**Phase 6: Ecosystem**
- Teacher tools (lesson plans, assessments)
- School administration panel
- Integration with school systems
- API for third-party apps
- Mobile apps (iOS, Android)

---

## 📊 Key Metrics & Success Indicators

### Student Engagement
- **Daily Active Users (DAU)**
- **Session Duration**: Target 15-20 minutes
- **Completion Rate**: >80% finish started exercises
- **Return Rate**: >60% return next day

### Learning Outcomes
- **Mastery Rate**: >75% achieve mastery in topics
- **Improvement Rate**: Track score improvement over time
- **Time to Mastery**: Average time to complete topic
- **Error Patterns**: Identify common struggles

### Gamification Effectiveness
- **Badge Collection**: Average badges per student
- **Streak Maintenance**: Average streak length
- **Points Accumulation**: Engagement indicator
- **Avatar Changes**: Feature usage metric

### Technical Performance
- **Page Load Time**: <2 seconds
- **API Response Time**: <200ms average
- **Error Rate**: <1%
- **Uptime**: >99.5%

---

## 🔒 Security & Privacy Considerations

### Data Protection (GDPR Compliant)
- **Minimal Data Collection**: Only essential student info
- **Parental Consent**: Required for students under 13
- **Data Encryption**: All data encrypted at rest and in transit
- **Access Controls**: Role-based permissions
- **Audit Logs**: Track all data access
- **Right to Deletion**: Easy account deletion

### Child Safety
- **No Ads**: Zero advertising to protect children
- **Content Moderation**: All content reviewed
- **Safe Environment**: No external links or chat
- **Privacy by Design**: COPPA compliant
- **Anonymous Usage**: Can use without personal info

### Technical Security
- **HTTPS Only**: Enforce secure connections
- **CORS Policies**: Proper API protection
- **Rate Limiting**: Prevent abuse
- **Input Validation**: Prevent injection attacks
- **Regular Security Audits**: Quarterly reviews

---

## 🎓 Pedagogical Principles

### Based on Research

**1. Concrete → Pictorial → Abstract (CPA)**
- Start with manipulables (visual objects)
- Progress to pictures and diagrams
- Finally, abstract numbers and symbols

**2. Scaffolding**
- Provide support when introducing new concepts
- Gradually remove support as mastery develops
- Always available hints for struggling students

**3. Immediate Feedback**
- Correct answers: Positive reinforcement
- Incorrect answers: Constructive guidance, not punishment
- Show the correct process, not just the answer

**4. Growth Mindset**
- Praise effort, not just results
- Frame mistakes as learning opportunities
- Celebrate progress, not perfection

**5. Active Learning**
- Students interact, not just watch
- Multiple solution paths encouraged
- Exploration and discovery emphasized

**6. Differentiation**
- Adaptive difficulty for all levels
- Multiple representation types
- Flexible pacing

---

## 📞 Support & Maintenance

### User Support
- **In-app Help**: Context-sensitive tips
- **FAQ Section**: Common questions
- **Tutorial Videos**: How to use features
- **Email Support**: support@mathlearning.co.il
- **Parent Guides**: Printable PDF guides

### Technical Maintenance
- **Daily Backups**: Automated database backups
- **Monitoring**: 24/7 uptime monitoring
- **Error Tracking**: Sentry for error logs
- **Performance Monitoring**: Lighthouse CI
- **Regular Updates**: Bi-weekly feature releases

---

## 🚀 Getting Started with Cursor

### Initial Setup

1. **Create new project folder**
2. **Copy `.cursorrules` file** into project root
3. **Open in Cursor IDE**
4. **Use this prompt:**

```
Create the initial project structure for the Math Learning System.

Initialize a Vite + React + TypeScript project with:
- Tailwind CSS v4 configured with our custom theme
- Folder structure as specified in .cursorrules
- Zustand stores setup
- React Router for navigation
- Framer Motion for animations
- Basic design system components (Button, Card, Input)
- Hebrew RTL support

Make sure everything compiles and runs successfully.
```

### Example Development Prompts

**Creating an Exercise Component:**
```
Create a subtraction exercise component for Grade 1.

Requirements:
- Visual representation with cute animals
- Numbers 1-10
- Touch-friendly number pad
- Immediate feedback with animations
- Hints after 2 wrong attempts
- Hebrew text throughout
- Award points on success
- Track attempts and time

Use TypeScript, Framer Motion, and follow the design system.
```

**Building the Dashboard:**
```
Create a student progress dashboard showing:
- Current level and points
- Today's streak
- Recent achievements (badges)
- Progress bars for each topic
- Suggested next exercise
- Avatar customization button

Design should be colorful, engaging, and mobile-responsive.
Use the Zustand progress store and follow RTL layout.
```

**AI Integration:**
```
Implement the adaptive difficulty algorithm.

Create a function that:
- Takes recent exercise scores (array of percentages)
- Takes time spent on each exercise
- Returns recommended difficulty level
- Target: 70-80% success rate
- Adjusts based on both accuracy and speed

Include TypeScript types and unit tests.
```

---

## 🎨 Design Assets Needed

### Illustrations
- Welcome screen character (friendly robot/animal)
- Achievement badges (15+ unique designs)
- Avatar options (20+ choices)
- Loading animations
- Empty states
- Error screens

### Icons
- Math operations (+, -, ×, ÷)
- Topic icons (numbers, shapes, time, etc.)
- Navigation icons
- Action icons (hint, check, next, etc.)

### Sounds
- Success chime
- Error sound (gentle, not harsh)
- Click/tap sound
- Level up fanfare
- Achievement unlock
- Background music (optional, toggle)

### Fonts
- **Primary**: Rubik (Hebrew + English support)
- **Secondary**: Assistant
- Both available on Google Fonts

---

## 📚 Additional Resources

### Israeli Education
- Ministry of Education: https://pop.education.gov.il
- New Curriculum Details: [תכנית לימודים חדשה](https://pop.education.gov.il/tchumey_daat/matmatika/yesodi/oraat-math/new-curriculum/)

### AI & Education
- Adaptive Learning Research: https://www.sciencedirect.com/journal/computers-and-education-artificial-intelligence
- AI in K-12 Education: https://hunt-institute.org/resources/

### UX for Children
- Nielsen Norman Group - Kids UX: https://www.nngroup.com/topic/children/
- COPPA Compliance: https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule

### Technical
- React Docs: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Zustand: https://zustand.docs.pmnd.rs

---

## ✅ Final Checklist Before Launch

### Functionality
- [ ] All core exercises working
- [ ] Adaptive difficulty functioning
- [ ] Points and badges awarding correctly
- [ ] Progress saving and loading
- [ ] All animations smooth
- [ ] Sound effects toggle working
- [ ] Mobile responsive on all screens
- [ ] Hebrew RTL perfect throughout

### Quality
- [ ] Zero console errors/warnings
- [ ] TypeScript compiling without issues
- [ ] All tests passing (80%+ coverage)
- [ ] Lighthouse score >90
- [ ] Accessibility audit passed
- [ ] Cross-browser tested (Chrome, Safari, Firefox)
- [ ] Performance optimized (bundle < 500KB)

### Content
- [ ] Minimum 50 exercises per topic
- [ ] All text in proper Hebrew
- [ ] Age-appropriate content
- [ ] Curriculum-aligned
- [ ] Hints for all exercises
- [ ] Visuals attractive and clear

### Legal & Compliance
- [ ] Privacy policy published
- [ ] Terms of service published
- [ ] COPPA compliant
- [ ] GDPR compliant
- [ ] Israeli data protection laws followed
- [ ] Parental consent flow implemented

### Infrastructure
- [ ] Production server configured
- [ ] Domain registered and DNS setup
- [ ] SSL certificate installed
- [ ] Database backups scheduled
- [ ] Monitoring configured
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] CDN for static assets

---

## 💡 Tips for Success

1. **Start Small**: Build one exercise type perfectly before expanding
2. **User Test Early**: Get real kids (age 6-8) to test ASAP
3. **Iterate Based on Data**: Watch analytics, adjust based on actual usage
4. **Keep It Simple**: Every added feature should serve the learning goal
5. **Prioritize Fun**: If it's not engaging, kids won't learn
6. **Respect Privacy**: Parents trust you with their children
7. **Mobile First**: Most usage will be on tablets/phones
8. **Performance Matters**: Slow = frustration = abandoned
9. **Accessibility Always**: Every child deserves access
10. **Celebrate Progress**: Make students feel good about learning

---

## 🤝 Team Roles (when scaling)

### Core Team
- **Product Manager**: Vision, roadmap, priorities
- **UX/UI Designer**: Child-friendly interfaces
- **Frontend Developer**: React/TypeScript expert
- **Backend Developer**: Node.js/PostgreSQL
- **AI Engineer**: Adaptive learning algorithms
- **QA Engineer**: Testing, bug hunting
- **Content Creator**: Exercise development
- **Education Consultant**: Curriculum alignment

### Support Team
- **Customer Support**: Help parents/teachers
- **Marketing**: Reach target audience
- **Sales**: School partnerships
- **Data Analyst**: Usage insights
- **DevOps**: Infrastructure management

---

## 📈 Business Model (Future)

### Free Tier
- 10 exercises per day
- Basic progress tracking
- 5 avatar options
- Standard difficulty

### Premium Tier (₪29.90/month)
- Unlimited exercises
- AI adaptive learning
- Detailed progress reports
- 20+ avatar options
- Printable worksheets
- Priority support
- Multiple student profiles

### School/Teacher Plans
- Classroom management
- Teacher dashboard
- Student groups
- Curriculum planning tools
- Bulk pricing

---

**הצלחה רבה בבניית המערכת! זכרו: אנחנו בונים משהו שישפיע על חינוכם של ילדים. 🌟**