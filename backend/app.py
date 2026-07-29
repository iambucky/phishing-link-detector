"""
==========================================
PHISHGUARD AI
APP.PY
Flask Backend
Deep Learning Phishing Detection
==========================================
"""


from flask import (
    Flask,
    request,
    jsonify
)

from flask_cors import CORS

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

import sqlite3
from datetime import datetime

from scanner import predict_url



# ==========================================
# APP CONFIG
# ==========================================

app = Flask(__name__)

CORS(app)



DATABASE = "database/phishguard.db"



# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db():

    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    return conn



# ==========================================
# CREATE TABLES
# ==========================================

def init_database():

    conn = get_db()

    cursor = conn.cursor()


    cursor.execute("""

    CREATE TABLE IF NOT EXISTS users(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT,

        email TEXT UNIQUE,

        password TEXT,

        created_at TEXT

    )

    """)


    cursor.execute("""

    CREATE TABLE IF NOT EXISTS history(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        user_id INTEGER,

        url TEXT,

        prediction TEXT,

        confidence REAL,

        scan_time TEXT

    )

    """)


    conn.commit()

    conn.close()



# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():

    return jsonify({

        "name":
        "PhishGuard AI",

        "status":
        "Backend Running"

    })



# ==========================================
# REGISTER API
# ==========================================

@app.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.json


    name = data.get("name")

    email = data.get("email")

    password = data.get("password")


    hashed_password = generate_password_hash(
        password
    )


    try:

        conn = get_db()

        cursor = conn.cursor()


        cursor.execute("""

        INSERT INTO users

        (name,email,password,created_at)

        VALUES (?,?,?,?)

        """,

        (

            name,

            email,

            hashed_password,

            datetime.now()

        ))


        conn.commit()

        conn.close()


        return jsonify({

            "success":True,

            "message":
            "Registration successful"

        })


    except Exception as error:


        return jsonify({

            "success":False,

            "message":
            str(error)

        }),400

/*==========================================
  LOGIN API
==========================================*/

@app.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.json

    email = data.get("email")

    password = data.get("password")


    conn = get_db()

    cursor = conn.cursor()


    cursor.execute(

        "SELECT * FROM users WHERE email=?",

        (email,)

    )


    user = cursor.fetchone()


    conn.close()


    if user and check_password_hash(

        user["password"],

        password

    ):


        return jsonify({

            "success": True,

            "message":
            "Login successful",

            "user_id":
            user["id"],

            "name":
            user["name"]

        })


    return jsonify({

        "success":False,

        "message":
        "Invalid email or password"

    }),401



# ==========================================
# PREDICT API
# ==========================================

@app.route(
    "/predict",
    methods=["POST"]
)
def predict():


    data = request.json


    url = data.get("url")

    user_id = data.get("user_id",1)



    if not url:

        return jsonify({

            "success":False,

            "message":
            "URL required"

        }),400



    result = predict_url(url)



    if result.get("success"):


        conn = get_db()

        cursor = conn.cursor()


        cursor.execute("""

        INSERT INTO history

        (

        user_id,

        url,

        prediction,

        confidence,

        scan_time

        )

        VALUES (?,?,?,?,?)

        """,

        (

            user_id,

            url,

            result["prediction"],

            result["confidence"],

            datetime.now()

        ))


        conn.commit()

        conn.close()



    return jsonify(result)



# ==========================================
# SCAN HISTORY API
# ==========================================

@app.route(
    "/history/<int:user_id>"
)
def history(user_id):


    conn = get_db()

    cursor = conn.cursor()


    cursor.execute("""

    SELECT *

    FROM history

    WHERE user_id=?

    ORDER BY id DESC

    """,

    (user_id,))


    data = cursor.fetchall()


    conn.close()



    history_data = []


    for row in data:

        history_data.append({

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


    return jsonify({

        "success":True,

        "history":
        history_data

    })

# ==========================================
# DASHBOARD STATISTICS API
# ==========================================

@app.route(
    "/dashboard/stats/<int:user_id>"
)
def dashboard_stats(user_id):

    conn = get_db()

    cursor = conn.cursor()


    cursor.execute("""

    SELECT COUNT(*) 
    FROM history
    WHERE user_id=?

    """,

    (user_id,))


    total_scans = cursor.fetchone()[0]



    cursor.execute("""

    SELECT COUNT(*)

    FROM history

    WHERE user_id=?

    AND prediction='Phishing'

    """,

    (user_id,))


    phishing_count = cursor.fetchone()[0]



    cursor.execute("""

    SELECT COUNT(*)

    FROM history

    WHERE user_id=?

    AND prediction='Legitimate'

    """,

    (user_id,))


    safe_count = cursor.fetchone()[0]


    conn.close()



    return jsonify({

        "success":True,

        "total_scans":
        total_scans,

        "phishing":
        phishing_count,

        "safe":
        safe_count

    })



# ==========================================
# REPORTS API
# ==========================================

@app.route(
    "/reports/<int:user_id>"
)
def reports(user_id):

    conn = get_db()

    cursor = conn.cursor()


    cursor.execute("""

    SELECT *

    FROM history

    WHERE user_id=?

    ORDER BY scan_time DESC

    """,

    (user_id,))


    rows = cursor.fetchall()


    conn.close()


    reports=[]


    for row in rows:

        reports.append({

            "url":
            row["url"],

            "result":
            row["prediction"],

            "confidence":
            row["confidence"],

            "date":
            row["scan_time"]

        })


    return jsonify({

        "success":True,

        "reports":
        reports

    })



# ==========================================
# MODEL HEALTH CHECK
# ==========================================

@app.route("/health")
def health_check():

    return jsonify({

        "server":
        "running",

        "model":
        "loaded",

        "timestamp":
        str(datetime.now())

    })



# ==========================================
# ERROR HANDLING
# ==========================================

@app.errorhandler(404)
def page_not_found(error):

    return jsonify({

        "success":False,

        "message":
        "API endpoint not found"

    }),404



@app.errorhandler(500)
def server_error(error):

    return jsonify({

        "success":False,

        "message":
        "Internal server error"

    }),500



# ==========================================
# START SERVER
# ==========================================

if __name__ == "__main__":

    init_database()

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )