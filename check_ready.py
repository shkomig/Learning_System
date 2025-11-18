"""
בדיקה מהירה - האם הכל מוכן להרצה?
"""

import sys
from pathlib import Path

def check_file_exists(filepath, description):
    """בדוק אם קובץ קיים"""
    if Path(filepath).exists():
        print(f"   ✅ {description}")
        return True
    else:
        print(f"   ❌ {description} - חסר!")
        return False

def check_dependencies():
    """בדוק תלויות"""
    print("\n🔍 בודק תלויות Python...\n")
    
    dependencies = {
        'flask': 'Flask',
        'pandas': 'Pandas',
        'numpy': 'NumPy'
    }
    
    all_ok = True
    for module, name in dependencies.items():
        try:
            __import__(module)
            print(f"   ✅ {name} מותקן")
        except ImportError:
            print(f"   ❌ {name} חסר! התקן עם: pip install {module}")
            all_ok = False
    
    return all_ok

def main():
    print("=" * 60)
    print("🔍 בדיקה מהירה - מערכת מסחר")
    print("=" * 60)
    
    all_checks_passed = True
    
    # בדוק קבצים חיוניים
    print("\n📁 בודק קבצים...\n")
    
    files_to_check = [
        ('src/web/app.py', 'Flask App'),
        ('src/analytics/performance_tracker.py', 'Performance Tracker'),
        ('src/analytics/strategy_analyzer.py', 'Strategy Analyzer'),
        ('src/learning/pattern_detector.py', 'Pattern Detector'),
        ('src/learning/recommendation_engine.py', 'Recommendation Engine'),
        ('src/strategies/strategy_manager.py', 'Strategy Manager'),
    ]
    
    for filepath, description in files_to_check:
        if not check_file_exists(filepath, description):
            all_checks_passed = False
    
    # בדוק תיקיות templates
    print("\n📁 בודק תיקיות...\n")
    
    dirs_to_check = [
        ('src/web/templates', 'Templates'),
        ('strategies_custom', 'Custom Strategies'),
    ]
    
    for dirpath, description in dirs_to_check:
        if Path(dirpath).exists():
            print(f"   ✅ {description}")
        else:
            print(f"   ⚠️  {description} - לא קיים (ייווצר אוטומטית)")
    
    # בדוק תלויות
    if not check_dependencies():
        all_checks_passed = False
    
    # סיכום
    print("\n" + "=" * 60)
    if all_checks_passed:
        print("✅ הכל מוכן! אפשר להריץ:")
        print("=" * 60)
        print("\n   python run_web_app.py")
        print("\n   ואז פתח בדפדפן: http://localhost:5000")
        print()
    else:
        print("⚠️  יש בעיות שצריך לתקן")
        print("=" * 60)
        print("\n💡 פעולות נדרשות:")
        print("   1. תקן את הקבצים החסרים")
        print("   2. התקן את התלויות החסרות")
        print("   3. הרץ שוב: python check_ready.py")
        print()

if __name__ == "__main__":
    main()
