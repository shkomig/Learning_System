"""
הרצת Dashboard - מערכת מסחר אוטומטית
"""

import sys
from pathlib import Path

# הוסף את src ל-path
sys.path.insert(0, str(Path(__file__).parent))

print("=" * 60)
print("🚀 מפעיל את מערכת המסחר...")
print("=" * 60)
print()

try:
    from src.web.app import app
    
    print("✅ כל המודולים נטענו בהצלחה!")
    print()
    print("📊 ה-Dashboard יהיה זמין ב:")
    print("   👉 http://localhost:5000")
    print()
    print("💡 דפים זמינים:")
    print("   • http://localhost:5000/           - דף הבית")
    print("   • http://localhost:5000/strategies - ניהול אסטרטגיות")
    print("   • http://localhost:5000/performance - ביצועים")
    print("   • http://localhost:5000/add-strategy - הוסף אסטרטגיה")
    print()
    print("⚠️  לעצירה: לחץ Ctrl+C")
    print("=" * 60)
    print()
    
    # הרץ את האפליקציה
    app.run(debug=True, host='0.0.0.0', port=5000)
    
except ImportError as e:
    print("❌ שגיאה בטעינת המודולים!")
    print(f"   {str(e)}")
    print()
    print("💡 פתרונות אפשריים:")
    print("   1. וודא ש-Flask מותקן: pip install flask")
    print("   2. וודא שכל הקבצים נוצרו בתיקייה src/web/")
    print("   3. בדוק שהמבנה נכון:")
    print("      - src/web/app.py")
    print("      - src/web/templates/")
    print()
    sys.exit(1)
    
except Exception as e:
    print(f"❌ שגיאה: {str(e)}")
    print()
    print("💡 בדוק את השגיאה למעלה ונסה שוב")
    sys.exit(1)
