"""
==========================================
PHISHGUARD AI
AUTH.PY
User Authentication Module
==========================================
"""


import sqlite3

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

from datetime import datetime



DATABASE = "database/phishguard.db"



# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_connection():

    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    return conn



# ==========================================
# REGISTER USER
# ==========================================

def register_user(
    name,
    email,
    password
):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        hashed_password = (

            generate_password_hash(
                password
            )

        )


        cursor.execute("""

        INSERT INTO users

        (
        name,
        email,
        password,
        created_at
        )

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


        return {

            "success":True,

            "message":
            "User registered successfully"

        }


    except sqlite3.IntegrityError:


        return {

            "success":False,

            "message":
            "Email already exists"

        }


    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }

/*==========================================
  LOGIN USER
==========================================*/

def login_user(

    email,

    password

):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute(

            """

            SELECT *

            FROM users

            WHERE email=?

            """,

            (email,)

        )


        user = cursor.fetchone()


        conn.close()



        if not user:

            return {

                "success":False,

                "message":
                "User not found"

            }



        if check_password_hash(

            user["password"],

            password

        ):


            return {

                "success":True,

                "message":
                "Login successful",

                "user":{

                    "id":
                    user["id"],

                    "name":
                    user["name"],

                    "email":
                    user["email"]

                }

            }



        return {

            "success":False,

            "message":
            "Incorrect password"

        }



    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }



# ==========================================
# GET USER BY ID
# ==========================================

def get_user_by_id(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute(

            """

            SELECT id,name,email,created_at

            FROM users

            WHERE id=?

            """,

            (user_id,)

        )


        user = cursor.fetchone()


        conn.close()


        if user:

            return dict(user)


        return None



    except Exception:


        return None



# ==========================================
# CHECK EMAIL EXISTS
# ==========================================

def email_exists(email):

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(

        """

        SELECT id

        FROM users

        WHERE email=?

        """,

        (email,)

    )


    result = cursor.fetchone()


    conn.close()


    return result is not None



# ==========================================
# UPDATE PASSWORD
# ==========================================

def update_password(

    email,

    new_password

):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        hashed = generate_password_hash(

            new_password

        )


        cursor.execute(

            """

            UPDATE users

            SET password=?

            WHERE email=?

            """,

            (

                hashed,

                email

            )

        )


        conn.commit()

        conn.close()


        return {

            "success":True,

            "message":
            "Password updated"

        }


    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }

# ==========================================
# UPDATE USER PROFILE
# ==========================================

def update_profile(

    user_id,

    name,

    email

):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute("""

        UPDATE users

        SET name=?,

            email=?

        WHERE id=?

        """,

        (

            name,

            email,

            user_id

        ))


        conn.commit()

        conn.close()


        return {

            "success":True,

            "message":
            "Profile updated successfully"

        }


    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }



# ==========================================
# DELETE USER ACCOUNT
# ==========================================

def delete_account(user_id):

    try:

        conn = get_connection()

        cursor = conn.cursor()


        cursor.execute(

            """

            DELETE FROM history

            WHERE user_id=?

            """,

            (user_id,)

        )


        cursor.execute(

            """

            DELETE FROM users

            WHERE id=?

            """,

            (user_id,)

        )


        conn.commit()

        conn.close()


        return {

            "success":True,

            "message":
            "Account deleted"

        }



    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }



# ==========================================
# AUTH STATUS
# ==========================================

def check_auth(user_id):

    user = get_user_by_id(

        user_id

    )


    if user:

        return {

            "authenticated":True,

            "user":user

        }


    return {

        "authenticated":False

    }



# ==========================================
# TEST AUTH MODULE
# ==========================================

if __name__ == "__main__":


    print(

        "PhishGuard AI Auth Module Ready"

    )