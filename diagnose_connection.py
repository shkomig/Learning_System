"""
בדיקת חיבור ל-IB - אבחון בעיות
"""

import sys
from pathlib import Path

# הוסף את src ל-path
sys.path.insert(0, str(Path(__file__).parent))

print("=" * 60)
print("🔍 אבחון בעיית חיבור ל-Interactive Brokers")
print("=" * 60)
print()

# שלב 1: בדיקת ספריות
print("📦 שלב 1: בודק ספריות...\n")

try:
    import ib_insync
    print(f"   ✅ ib_insync גרסה: {ib_insync.__version__}")
except ImportError as e:
    print(f"   ❌ ib_insync לא מותקן: {e}")
    print("   💡 התקן: pip install ib-insync")
    sys.exit(1)

# שלב 2: בדיקת חיבור בסיסי
print("\n🔌 שלב 2: מנסה להתחבר...\n")

from ib_insync import IB
import socket

# בדוק אם הפורט פתוח
def check_port(host, port):
    """בדוק אם פורט פתוח"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.settimeout(2)
    result = sock.connect_ex((host, port))
    sock.close()
    return result == 0

# בדוק פורטים
ports_to_check = [
    (7497, "Paper Trading"),
    (7496, "Live Trading"),
    (4001, "IB Gateway Paper"),
    (4002, "IB Gateway Live")
]

print("   בודק פורטים פתוחים:\n")
open_ports = []

for port, description in ports_to_check:
    if check_port('127.0.0.1', port):
        print(f"   ✅ פורט {port} ({description}) - פתוח")
        open_ports.append(port)
    else:
        print(f"   ❌ פורט {port} ({description}) - סגור")

if not open_ports:
    print("\n   ❌ אף פורט לא פתוח!")
    print("\n   💡 פתרון:")
    print("      1. הפעל את TWS או IB Gateway")
    print("      2. וודא שה-API מופעל בהגדרות")
    print("      3. הרץ סקריפט זה שוב")
    sys.exit(1)

print(f"\n   נמצאו {len(open_ports)} פורטים פתוחים")

# שלב 3: ניסיון התחברות לכל פורט פתוח
print("\n🔗 שלב 3: מנסה להתחבר לפורטים הפתוחים...\n")

successful_connections = []

for port in open_ports:
    print(f"   מנסה פורט {port}...")
    ib = IB()
    
    try:
        ib.connect('127.0.0.1', port, clientId=999, timeout=5)
        print(f"   ✅ חיבור הצליח לפורט {port}!")
        
        # בדוק נתוני חשבון
        try:
            accounts = ib.managedAccounts()
            print(f"      חשבונות זמינים: {accounts}")
            successful_connections.append(port)
        except Exception as e:
            print(f"      ⚠️ התחבר אבל לא ניתן לקבל נתוני חשבון: {e}")
        
        ib.disconnect()
        
    except Exception as e:
        print(f"   ❌ חיבור נכשל: {e}")

# סיכום
print("\n" + "=" * 60)
print("📊 סיכום")
print("=" * 60)

if successful_connections:
    print(f"\n✅ חיבור מוצלח לפורטים: {successful_connections}")
    print(f"\n💡 השתמש בפורט {successful_connections[0]} בהגדרות:")
    print(f"\n   IBConnector(port={successful_connections[0]})")
    
    # בדוק אם זה ib_connector.py
    connector_file = Path('src/broker/ib_connector.py')
    if connector_file.exists():
        print(f"\n📝 עדכן את הקובץ: {connector_file}")
        print(f"   שנה את הפורט ל: {successful_connections[0]}")
else:
    print("\n❌ לא הצלחנו להתחבר לאף פורט")
    print("\n💡 בדיקות נוספות:")
    print("   1. TWS → Edit → Global Configuration → API → Settings")
    print("   2. ✓ Enable ActiveX and Socket Clients")
    print("   3. ✓ Socket port: 7497 (או הפורט שבחרת)")
    print("   4. ✓ Allow connections from localhost")
    print("   5. לחץ OK והפעל מחדש את TWS")
    print("   6. הרץ סקריפט זה שוב")

print()
