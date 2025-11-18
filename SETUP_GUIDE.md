# 🚀 מדריך התקנה מהיר - Dashboard

## ✅ מה עשית עד עכשיו:

- [x] פרומפט 1: Flask App ✅

---

## 📋 מה עוד צריך לעשות:

### שלב 1: התקן תלויות

```bash
pip install -r requirements.txt
```

או אחד אחד:
```bash
pip install flask pandas numpy matplotlib ib-insync
```

---

### שלב 2: המשך עם שאר הפרומפטים

תן ל-Cursor את הפרומפטים האלה **אחד אחד**:

#### 📝 פרומפט 2: HTML Templates
(צור קבצים: base.html, index.html, add_strategy.html)

#### 📝 פרומפט 3: שאר הדפים  
(צור קבצים: strategies.html, strategy_detail.html, performance.html)

#### 📝 פרומפט 4: עדכון Strategy Manager
(עדכן קובץ קיים: src/strategies/strategy_manager.py)

#### 📝 פרומפט 5: קבצי בדיקה
(צור: test_day3.py)

---

### שלב 3: בדוק שהכל מוכן

```bash
python check_ready.py
```

**אמור לראות:**
```
✅ הכל מוכן! אפשר להריץ
```

---

### שלב 4: הרץ את Dashboard

```bash
python run_web_app.py
```

**אמור לראות:**
```
🚀 מפעיל את מערכת המסחר...
✅ כל המודולים נטענו בהצלחה!
📊 ה-Dashboard יהיה זמין ב:
   👉 http://localhost:5000
```

---

### שלב 5: פתח בדפדפן

```
http://localhost:5000
```

---

## 🐛 פתרון בעיות נפוצות:

### בעיה 1: "ModuleNotFoundError: No module named 'flask'"
**פתרון:**
```bash
pip install flask
```

### בעיה 2: "TemplateNotFound"
**פתרון:**
וודא שכל הקבצים נמצאים ב:
- `src/web/templates/base.html`
- `src/web/templates/index.html`
- וכו'

### בעיה 3: "Port 5000 already in use"
**פתרון:**
שנה את הפורט בקובץ `run_web_app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=5001)  # שנה ל-5001
```

---

## ✅ רשימת בדיקה:

- [ ] התקנתי את Flask
- [ ] התקנתי את pandas, numpy
- [ ] יצרתי את כל ה-templates
- [ ] עדכנתי את Strategy Manager
- [ ] הרצתי check_ready.py והכל ירוק
- [ ] הרצתי run_web_app.py והשרת עולה
- [ ] פתחתי את הדפדפן ורואה את Dashboard

---

## 🎯 הצעד הבא:

אחרי שכל זה עובד:
1. תצלם screenshot של Dashboard
2. תנסה להוסיף אסטרטגיה חדשה
3. תראה את הגרפים

**תעדכן אותי איך הלך! 🚀**

---

## 💡 טיפים:

1. **אם משהו לא עובד** - הרץ `check_ready.py` לראות מה חסר
2. **לעצור את השרת** - Ctrl+C בטרמינל
3. **לראות שגיאות** - תסתכל בטרמינל, יש שם הכל
4. **לרענן שינויים** - השרת עושה auto-reload, פשוט תרענן בדפדפן

---

## 📞 זקוק לעזרה?

1. העתק את השגיאה מהטרמינל
2. העתק את התוצאה של `check_ready.py`
3. שלח לי ואני אעזור!
