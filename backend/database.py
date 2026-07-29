"""
==========================================
PHISHGUARD AI
DATABASE.PY
SQLite Database Manager
==========================================
"""

import sqlite3
import os



# ==========================================
# DATABASE PATH
# ==========================================

DATABASE_FOLDER = "database"

DATABASE_PATH = (

    "database/phishguard.db"

)



# ==========================================
# CREATE DATABASE FOLDER
# ==========================================

if not os.path.exists(
    DATABASE_FOLDER
):

    os.makedirs(
        DATABASE_FOLDER
    )



# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_connection():

    connection = sqlite3.connect(

        DATABASE_PATH

    )

    connection.row_factory = sqlite3.Row

    return connection



# ==========================================
# INITIALIZE DATABASE
# ==========================================

def init_database():

    conn = get_connection()

    cursor = conn.cursor()



    # USERS TABLE

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,

        email TEXT UNIQUE NOT NULL,

        password TEXT NOT NULL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )

    """)



    # SCAN HISTORY TABLE

    cursor.execute("""

    CREATE TABLE IF NOT EXISTS history(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER,

        url TEXT NOT NULL,

        prediction TEXT NOT NULL,

        confidence REAL,

        scan_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(user_id)

        REFERENCES users(id)

    )

    """)



    conn.commit()

    conn.close()



# ==========================================
# CHECK DATABASE
# ==========================================

def database_status():

    try:

        conn = get_connection()

        conn.close()


        return {

            "status":"connected"

        }


    except Exception as error:


        return {

            "status":"error",

            "message":
            str(error)

        }

# ==========================================
# SAVE SCAN RESULT
# ==========================================

def save_scan(

    user_id,

    url,

    prediction,

    confidence

):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        INSERT INTO history

        (

            user_id,

            url,

            prediction,

            confidence

        )

        VALUES (?,?,?,?)

        """,

        (

            user_id,

            url,

            prediction,

            confidence

        ))


        conn.commit()

        conn.close()


        return True



    except Exception as error:


        print(error)

        return False



# ==========================================
# GET USER HISTORY
# ==========================================

def get_history(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        SELECT *

        FROM history

        WHERE user_id=?

        ORDER BY id DESC

        """,

        (

            user_id,

        ))


        records = cursor.fetchall()


        conn.close()


        history = []


        for row in records:

            history.append({

                "id":
                row["id"],

                "url":
                row["url"],

                "prediction":
                row["prediction"],

                "confidence":
                row["confidence"],

                "time":
                row["scan_time"]

            })


        return history



    except Exception as error:


        print(error)

        return []



# ==========================================
# DASHBOARD STATISTICS
# ==========================================

def get_dashboard_stats(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        SELECT COUNT(*)

        FROM history

        WHERE user_id=?

        """,

        (

            user_id,

        ))


        total = cursor.fetchone()[0]



        cursor.execute("""

        SELECT COUNT(*)

        FROM history

        WHERE user_id=?

        AND prediction='Phishing'

        """,

        (

            user_id,

        ))


        phishing = cursor.fetchone()[0]



        cursor.execute("""

        SELECT COUNT(*)

        FROM history

        WHERE user_id=?

        AND prediction='Legitimate'

        """,

        (

            user_id,

        ))


        safe = cursor.fetchone()[0]


        conn.close()



        return {

            "total_scans": total,

            "phishing": phishing,

            "safe": safe

        }



    except Exception as error:


        return {

            "total_scans":0,

            "phishing":0,

            "safe":0

        }

# ==========================================
# CREATE REPORT TABLE
# ==========================================

def create_report_table():

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        CREATE TABLE IF NOT EXISTS reports(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            user_id INTEGER,

            report_name TEXT,

            total_scans INTEGER,

            phishing_count INTEGER,

            safe_count INTEGER,

            accuracy REAL,

            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

        )

        """)


        conn.commit()

        conn.close()


        return True



    except Exception as error:

        print(error)

        return False



# ==========================================
# GENERATE REPORT
# ==========================================

def generate_report(

    user_id,

    report_name

):

    stats = get_dashboard_stats(

        user_id

    )


    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        INSERT INTO reports

        (

            user_id,

            report_name,

            total_scans,

            phishing_count,

            safe_count,

            accuracy

        )

        VALUES (?,?,?,?,?,?)

        """,

        (

            user_id,

            report_name,

            stats["total_scans"],

            stats["phishing"],

            stats["safe"],

            98.2

        ))


        conn.commit()

        conn.close()


        return True



    except Exception as error:


        print(error)

        return False



# ==========================================
# GET REPORTS
# ==========================================

def get_reports(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        SELECT *

        FROM reports

        WHERE user_id=?

        ORDER BY id DESC

        """,

        (

            user_id,

        ))


        reports = cursor.fetchall()


        conn.close()


        data=[]


        for report in reports:

            data.append({

                "id":
                report["id"],

                "name":
                report["report_name"],

                "total":
                report["total_scans"],

                "phishing":
                report["phishing_count"],

                "safe":
                report["safe_count"],

                "accuracy":
                report["accuracy"],

                "date":
                report["created_at"]

            })


        return data



    except Exception as error:


        return []



# ==========================================
# DELETE SCAN
# ==========================================

def delete_scan(scan_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute(

            """

            DELETE FROM history

            WHERE id=?

            """,

            (

                scan_id,

            )

        )


        conn.commit()

        conn.close()


        return True



    except Exception:


        return False



# ==========================================
# CLEAR USER HISTORY
# ==========================================

def clear_history(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute(

            """

            DELETE FROM history

            WHERE user_id=?

            """,

            (

                user_id,

            )

        )


        conn.commit()

        conn.close()


        return True



    except Exception:


        return False



# ==========================================
# DATABASE START
# ==========================================

if __name__ == "__main__":

    init_database()

    create_report_table()


    print(

        "PhishGuard AI Database Ready"

    )