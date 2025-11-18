# 🎓 מערכת למידת מתמטיקה אינטראקטיבית

מערכת למידה חדשנית מבוססת AI למתמטיקה עבור תלמידי כיתות א'-ב' בישראל, המשלבת את תכנית הלימודים החדשה של משרד החינוך (תשפ"ה).

> 📚 **תיעוד מלא**: ראה [DOCS_INDEX.md](DOCS_INDEX.md) לרשימת כל המסמכים  
> 🚀 **התחלה מהירה**: [QUICK_START.md](QUICK_START.md)  
> ✅ **סטטוס**: Production Ready | Build: ✅ Success

## ✨ תכונות עיקריות

- **🎯 למידה מותאמת אישית** - AI מתאים את הקושי לרמת התלמיד בזמן אמת
- **🎮 גמיפיקציה מלאה** - נקודות, תגים (10+ badges), רמות והישגים עם אנימציות
- **🎨 UI ידידותי לילדים** - עיצוב צבעוני, אייקונים גדולים וממשק אינטואיטיבי
- **📊 דשבורד אינטראקטיבי** - מעקב מלא אחר התקדמות, נושאים ש שלטים והישגים
- **🔊 מערכת קול** - אפקטי קול מובנים (success, error, level up)
- **🌈 אנימציות Framer Motion** - חגיגות, sparkles, confetti על כל הצלחה
- **🧭 ניווט React Router** - מעבר חלק בין דפים וחוויית SPA מלאה
- **📈 Progress Bars** - סרגלי התקדמות דינמיים לכל נושא ורמה
- **🏆 מערכת הישגים** - 10 badges לפתיחה עם קריטריונים ברורים
- **♿ נגישות** - תמיכה מלאה בקוראי מסך וניווט מקלדת
- **📱 רספונסיבי** - מותאם מושלם למובייל, טאבלט ומחשב

## 🛠️ טכנולוגיות

### Frontend
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** - עיצוב מודרני
- **Framer Motion** - אנימציות חלקות
- **Zustand** - ניהול state
- **React Router** - ניווט
- **Lucide Icons** - אייקונים

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Prisma ORM** + **SQLite** - מסד נתונים
- **JWT** - אימות
- **OpenAI API** - בינה מלאכותית (אופציונלי)
- **bcrypt** - הצפנת סיסמאות

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js 18+ ו-npm
- Git

### התקנה מהירה

1. **שכפול הפרויקט**
\`\`\`bash
git clone https://github.com/shkomig/Learning_System.git
cd Learning_system
\`\`\`

2. **התקנת Backend**
\`\`\`bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run prisma:seed  # אכלוס מסד נתונים עם נתונים ראשוניים
\`\`\`

3. **התקנת Frontend**
\`\`\`bash
cd ../frontend
npm install
\`\`\`

4. **הרצה במצב פיתוח**

פתחו 2 טרמינלים:

**טרמינל 1 - Backend:**
\`\`\`bash
cd backend
npm run dev
\`\`\`

**טרמינל 2 - Frontend:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`

5. **פתחו בדפדפן**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🎮 שימוש

### דף הבית - Dashboard
- **סטטיסטיקות** - נקודות, רמה, רצף ימים, תרגילים שהושלמו
- **התקדמות לרמה הבאה** - סרגל התקדמות דינמי
- **נושאי לימוד** - בחירה מבין 7 נושאים (חיבור, חיסור, כפל)
- **הישגים** - תצוגה ויזואלית של כל ה-badges שנפתחו

### תרגילים
- **בחירת קושי** - קל (עד 10), בינוני (עד 20), קשה (עד 100)
- **ויזואליזציות** - פירות 🍎, חיות 🐶, או קוביות צבעוניות
- **מערכת רמזים** - עזרה מתקדמת אחרי 2 ניסיונות
- **פידבק מיידי** - אנימציות על הצלחה וכשלון
- **ניקוד** - 10 נקודות + 5 בונוס בניסיון ראשון

### ניווט
- **בית** - Dashboard עם כל הסטטיסטיקות
- **תרגילים** - בחירת נושא ותרגול
- **הישגים** - תצוגת כל ה-badges
- **פרופיל** - ניהול משתמש
- **הגדרות** - התאמות אישיות

### כניסה ראשונית (אופציונלי)
המערכת כוללת חשבון לדוגמה:
- **אימייל**: demo@example.com
- **סיסמה**: demo123

### מבנה הפרויקט

\`\`\`
Learning_system/
├── frontend/              # אפליקציית React
│   ├── src/
│   │   ├── components/   # רכיבי UI
│   │   ├── stores/       # Zustand stores
│   │   ├── hooks/        # Custom hooks
│   │   ├── api/          # API services
│   │   ├── types/        # TypeScript types
│   │   └── lib/          # Utilities
│   └── public/           # קבצים סטטיים
├── backend/              # שרת API
│   ├── src/
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Controllers
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Middleware
│   │   └── types/        # TypeScript types
│   └── prisma/           # Database schema
└── math-learning-system.md  # תיעוד מפורט
\`\`\`

## 📚 תכנית הלימודים

המערכת מכסה את תכנית הלימודים החדשה (תשפ"ה):

### כיתה א'
- חיבור וחיסור עד 10
- חיבור וחיסור עד 20
- זיהוי מספרים זוגיים ואי-זוגיים
- משפחות מספרים

### כיתה ב'
- חיבור וחיסור עד 100
- תחילת לימוד לוח הכפל
- שברים ראשוניים (חצי, רבע)

## 🔧 הגדרות

### Backend (.env)
\`\`\`env
DATABASE_URL="file:./dev.db"
PORT=3000
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-api-key  # אופציונלי
CORS_ORIGIN=http://localhost:5173
\`\`\`

### Frontend (.env)
\`\`\`env
VITE_API_URL=http://localhost:3000/api
\`\`\`

## 🧪 בדיקות

\`\`\`bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
\`\`\`

## 📦 בניה לפרודקשן

### Frontend
\`\`\`bash
cd frontend
npm run build
# הקבצים יהיו ב-dist/
\`\`\`

### Backend
\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

## 🎨 עיצוב

### פלטת צבעים
- **Primary** (#4CAF50) - ירוק הצלחה
- **Secondary** (#2196F3) - כחול אינטראקטיבי
- **Accent** (#FFC107) - זהב/תגמול
- **Error** (#FF6B6B) - אדום רך
- **Background** (#FFF9E6) - קרם חם
- **Text** (#37474F) - אפור כהה

## 🤝 תרומה

נשמח לקבל תרומות לפרויקט! אנא:
1. צרו Fork
2. יצרו branch חדש (\`git checkout -b feature/amazing-feature\`)
3. בצעו commit (\`git commit -m 'Add amazing feature'\`)
4. דחפו ל-branch (\`git push origin feature/amazing-feature\`)
5. פתחו Pull Request

## 📄 רישיון

MIT License - ראו LICENSE לפרטים

## 👨‍💻 יוצר

**יוסף** - [GitHub](https://github.com/shkomig)

## 📞 תמיכה

יש בעיה או שאלה? פתחו issue ב-GitHub.

## 🎯 מפת דרכים

### ✅ הושלם - MVP מלא!
- [x] **תרגילי חיבור וחיסור** - רכיבים נפרדים עם ויזואליזציות
- [x] **Dashboard אינטראקטיבי** - סטטיסטיקות, התקדמות, נושאים
- [x] **מערכת גמיפיקציה מלאה** - 10 badges, נקודות, רמות, רצפים
- [x] **React Router ו-Navigation** - 5 routes, ניווט מלא
- [x] **Progress Bars** - התקדמות דינמית לכל נושא
- [x] **Achievement Badges** - תצוגה ויזואלית של הישגים
- [x] **Celebration Animations** - sparkles, confetti, level up
- [x] **LevelUpModal** - מודל עליית רמה מרשים
- [x] **AvatarSelector** - בחירה מ-28 אווטארים
- [x] **NumberPad** - לוח מספרים אינטראקטיבי
- [x] **Toast Notifications** - התראות חכמות
- [x] **מערכת קול** - useSound hook + placeholders
- [x] **AI Adaptive Difficulty** - התאמת קושי אוטומטית
- [x] **Backend API מלא** - Auth, Students, Exercises, Progress
- [x] **Database** - 200 תרגילים, 10 achievements, seed data
- [x] **Docker Compose** - הרצה קלה של כל המערכת
- [x] **RTL Support** - תמיכה מלאה בעברית
- [x] **Documentation** - README, QUICK_START, .cursorrules

### 🚧 בפיתוח / עתידי
- [ ] תרגילי כפל וחילוק
- [ ] קבצי קול אמיתיים (כרגע placeholders)
- [ ] Parent Dashboard - דשבורד להורים
- [ ] מצב מורה (Teacher Mode)
- [ ] בדיקות אוטומטיות (Unit & E2E Tests)
- [ ] PWA Support - התקנה כאפליקציה
- [ ] אפליקציית מובייל (React Native)
- [ ] תמיכה בערבית ואנגלית
- [ ] מערכת תשלומים (Stripe)

## 🙏 תודות

- משרד החינוך על תכנית הלימודים החדשה
- הקהילה הנהדרת של React ו-TypeScript
- OpenAI על ה-API המדהים

---

**בנוי עם ❤️ עבור ילדי ישראל**

