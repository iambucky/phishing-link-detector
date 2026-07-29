"""
==========================================
PHISHGUARD AI
ROUTES.PY
Flask API Routes
==========================================
"""

from flask import (
    Blueprint,
    request,
    jsonify
)

from auth import (
    register_user,
    login_user
)

from database import (
    save_scan,
    get_history,
    get_dashboard_stats,
    get_reports
)

from model import predict



# ==========================================
# BLUEPRINT
# ==========================================

routes = Blueprint(

    "routes",

    __name__

)



# ==========================================
# HOME ROUTE
# ==========================================

@routes.route("/")

def home():

    return jsonify({

        "project":
        "PhishGuard AI",

        "status":
        "API Running"

    })



# ==========================================
# REGISTER
# ==========================================

@routes.route(

    "/register",

    methods=["POST"]

)

def register():


    data = request.json


    result = register_user(

        data.get("name"),

        data.get("email"),

        data.get("password")

    )


    return jsonify(result)



# ==========================================
# LOGIN
# ==========================================

@routes.route(

    "/login",

    methods=["POST"]

)

def login():


    data = request.json


    result = login_user(

        data.get("email"),

        data.get("password")

    )


    return jsonify(result)

# ==========================================
# PREDICT URL
# ==========================================

@routes.route(

    "/predict",

    methods=["POST"]

)

def predict_url():


    data = request.json


    url = data.get(

        "url"

    )


    user_id = data.get(

        "user_id",

        1

    )


    if not url:

        return jsonify({

            "success":False,

            "message":
            "URL required"

        }),400



    result = predict(

        url

    )


    if result.get("success"):


        save_scan(

            user_id,

            url,

            result["prediction"],

            result["confidence"]

        )


    return jsonify(result)



# ==========================================
# SCAN HISTORY
# ==========================================

@routes.route(

    "/history/<int:user_id>",

    methods=["GET"]

)

def history(user_id):


    data = get_history(

        user_id

    )


    return jsonify({

        "success":True,

        "history":
        data

    })



# ==========================================
# DASHBOARD STATISTICS
# ==========================================

@routes.route(

    "/dashboard/stats/<int:user_id>",

    methods=["GET"]

)

def stats(user_id):


    data = get_dashboard_stats(

        user_id

    )


    return jsonify({

        "success":True,

        "stats":
        data

    })



# ==========================================
# REPORTS
# ==========================================

@routes.route(

    "/reports/<int:user_id>",

    methods=["GET"]

)

def reports(user_id):


    data = get_reports(

        user_id

    )


    return jsonify({

        "success":True,

        "reports":
        data

    })



# ==========================================
# TEST API
# ==========================================

@routes.route(

    "/test",

    methods=["GET"]

)

def test():

    return jsonify({

        "message":
        "Routes working"

    })

# ==========================================
# USER PROFILE
# ==========================================

from auth import (
    get_user_by_id,
    update_profile,
    delete_account
)



@routes.route(

    "/profile/<int:user_id>",

    methods=["GET"]

)

def profile(user_id):


    user = get_user_by_id(

        user_id

    )


    if user:

        return jsonify({

            "success":True,

            "user":
            user

        })


    return jsonify({

        "success":False,

        "message":
        "User not found"

    }),404



# ==========================================
# UPDATE PROFILE
# ==========================================

@routes.route(

    "/profile/update",

    methods=["POST"]

)

def update_user_profile():


    data = request.json


    result = update_profile(

        data.get("user_id"),

        data.get("name"),

        data.get("email")

    )


    return jsonify(result)



# ==========================================
# DELETE ACCOUNT
# ==========================================

@routes.route(

    "/profile/delete",

    methods=["POST"]

)

def remove_account():


    data = request.json


    result = delete_account(

        data.get("user_id")

    )


    return jsonify(result)



# ==========================================
# LOGOUT
# ==========================================

@routes.route(

    "/logout",

    methods=["POST"]

)

def logout():


    return jsonify({

        "success":True,

        "message":
        "Logged out successfully"

    })



# ==========================================
# NOTIFICATIONS SETTINGS
# ==========================================

@routes.route(

    "/notifications",

    methods=["POST"]

)

def notifications():


    data = request.json


    return jsonify({

        "success":True,

        "notifications":
        data

    })



# ==========================================
# SETTINGS
# ==========================================

@routes.route(

    "/settings",

    methods=["POST"]

)

def settings():


    data = request.json


    return jsonify({

        "success":True,

        "settings":
        data

    })



# ==========================================
# ERROR HANDLER
# ==========================================

@routes.errorhandler(404)

def not_found(error):

    return jsonify({

        "success":False,

        "message":
        "Route not found"

    }),404



@routes.errorhandler(500)

def server_error(error):

    return jsonify({

        "success":False,

        "message":
        "Server error"

    }),500



print(

    "PhishGuard AI Routes Loaded"

)