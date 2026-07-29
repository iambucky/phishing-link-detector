"""
==========================================
PHISHGUARD AI
SCANNER.PY
URL Scanner Module
==========================================
"""


import re

from model import predict



# ==========================================
# URL VALIDATION
# ==========================================

def validate_url(url):

    pattern = (

        r"^(https?://)?"

        r"([\w-]+\.)+"

        r"[\w-]{2,}"

        r"(/.*)?$"

    )


    return re.match(

        pattern,

        url

    ) is not None



# ==========================================
# URL CLEANING
# ==========================================

def clean_url(url):

    url = url.strip()

    url = url.lower()


    return url



# ==========================================
# SCAN URL
# ==========================================

def scan_url(url):


    if not url:


        return {

            "success":False,

            "message":
            "URL is empty"

        }



    url = clean_url(url)



    if not validate_url(url):


        return {

            "success":False,

            "message":
            "Invalid URL"

        }



    result = predict(

        url

    )



    return result

# ==========================================
# RISK LEVEL CALCULATION
# ==========================================

def calculate_risk(confidence, prediction):


    if prediction == "Phishing":


        if confidence >= 90:

            return "High Risk"


        elif confidence >= 60:

            return "Medium Risk"


        else:

            return "Low Risk"



    else:


        if confidence >= 90:

            return "Safe"


        return "Moderate"



# ==========================================
# URL FEATURE EXTRACTION
# ==========================================

def extract_features(url):


    features = {


        "url_length":

        len(url),



        "has_https":

        1 if url.startswith(
            "https"
        )

        else 0,



        "dots":

        url.count("."),



        "hyphens":

        url.count("-"),



        "slashes":

        url.count("/"),



        "digits":

        sum(

            char.isdigit()

            for char in url

        ),



        "special_characters":

        sum(

            char in "@#$%&=?"

            for char in url

        )

    }


    return features



# ==========================================
# COMPLETE SCAN REPORT
# ==========================================

def generate_scan_report(url):


    result = scan_url(

        url

    )


    if not result.get("success"):


        return result



    risk = calculate_risk(

        result["confidence"],

        result["prediction"]

    )


    features = extract_features(

        url

    )


    return {

        "success":True,


        "url":

        url,


        "prediction":

        result["prediction"],


        "confidence":

        result["confidence"],


        "risk_level":

        risk,


        "features":

        features

    }



# ==========================================
# API PREDICTION FUNCTION
# ==========================================

def predict_url(url):


    return generate_scan_report(

        url

    )

# ==========================================
# SUSPICIOUS KEYWORDS CHECK
# ==========================================

def check_suspicious_keywords(url):

    keywords = [

        "login",

        "verify",

        "verification",

        "secure",

        "update",

        "account",

        "password",

        "bank",

        "payment",

        "confirm",

        "free",

        "gift",

        "winner"

    ]


    found = []


    for word in keywords:


        if word in url.lower():

            found.append(word)



    return found



# ==========================================
# BLACKLIST CHECK
# ==========================================

def blacklist_check(url):


    blacklist = [

        "malicious-site.com",

        "fake-login.xyz",

        "phishing-test.com"

    ]


    domain_found = False


    for site in blacklist:


        if site in url:


            domain_found = True



    return domain_found



# ==========================================
# BATCH SCAN
# ==========================================

def scan_multiple_urls(urls):


    results = []


    for url in urls:


        results.append(

            generate_scan_report(

                url

            )

        )


    return results



# ==========================================
# SCANNER STATUS
# ==========================================

def scanner_status():


    return {

        "scanner":

        "active",


        "module":

        "PhishGuard AI URL Scanner",


        "features":

        [

            "Deep Learning Prediction",

            "URL Feature Analysis",

            "Risk Assessment",

            "Keyword Detection"

        ]

    }



# ==========================================
# FINAL SCANNER TEST
# ==========================================

if __name__ == "__main__":


    test_url = (

        "http://secure-login-update.xyz"

    )


    result = generate_scan_report(

        test_url

    )


    print(result)