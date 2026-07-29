"""
==========================================
PHISHGUARD AI
MODEL.PY
Deep Learning Model Handler
==========================================
"""

import os
import joblib
import numpy as np

from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences



# ==========================================
# MODEL PATHS
# ==========================================

MODEL_PATH = "model/phishing_model.keras"

TOKENIZER_PATH = "model/tokenizer.pkl"

ENCODER_PATH = "model/label_encoder.pkl"



# ==========================================
# LOAD MODEL COMPONENTS
# ==========================================

model = None

tokenizer = None

label_encoder = None



def load_model_files():

    global model
    global tokenizer
    global label_encoder


    try:

        model = load_model(

            MODEL_PATH

        )


        tokenizer = joblib.load(

            TOKENIZER_PATH

        )


        label_encoder = joblib.load(

            ENCODER_PATH

        )


        print(

            "Model loaded successfully"

        )


        return True



    except Exception as error:


        print(

            "Model loading error:",

            error

        )


        return False



# ==========================================
# URL PREPROCESSING
# ==========================================

def preprocess_url(url):

    url = str(url)

    url = url.lower()

    url = url.strip()


    return url



# ==========================================
# TEXT CONVERSION
# ==========================================

def convert_url(url):

    sequence = tokenizer.texts_to_sequences(

        [url]

    )


    padded = pad_sequences(

        sequence,

        maxlen=100,

        padding="post"

    )


    return padded

# ==========================================
# PREDICT URL
# ==========================================

def predict(url):

    if model is None:

        return {

            "success":False,

            "message":
            "Model not loaded"

        }


    try:

        processed_url = preprocess_url(

            url

        )


        input_data = convert_url(

            processed_url

        )


        prediction = model.predict(

            input_data

        )


        confidence = float(

            np.max(prediction)

        ) * 100



        result_index = int(

            prediction[0][0] >= 0.5

        )



        if label_encoder:

            result = label_encoder.inverse_transform(

                [result_index]

            )[0]

        else:

            result = (

                "Phishing"

                if result_index == 1

                else "Legitimate"

            )



        return {

            "success":True,

            "url":url,

            "prediction":result,

            "confidence":round(

                confidence,

                2

            )

        }



    except Exception as error:


        return {

            "success":False,

            "message":
            str(error)

        }



# ==========================================
# MODEL STATUS
# ==========================================

def model_status():

    return {

        "model_loaded":

        model is not None,


        "tokenizer_loaded":

        tokenizer is not None,


        "encoder_loaded":

        label_encoder is not None

    }



# ==========================================
# TEST MODEL
# ==========================================

if __name__ == "__main__":


    load_model_files()


    test_urls = [

        "https://google.com",

        "http://secure-login-update.xyz"

    ]


    for url in test_urls:


        result = predict(url)


        print(

            result

        )

# ==========================================
# AUTO LOAD MODEL
# ==========================================

load_model_files()



# ==========================================
# BATCH PREDICTION
# ==========================================

def predict_multiple(url_list):

    results = []


    for url in url_list:

        results.append(

            predict(url)

        )


    return results



# ==========================================
# URL FEATURE EXTRACTION
# ==========================================

def extract_url_features(url):

    features = {

        "length":
        len(url),


        "https":
        1 if url.startswith(
            "https"
        )
        else 0,


        "dots":
        url.count("."),


        "hyphens":
        url.count("-"),


        "digits":
        sum(

            char.isdigit()

            for char in url

        ),


        "special_chars":
        sum(

            char in "@#$%&"

            for char in url

        )

    }


    return features



# ==========================================
# COMPLETE MODEL INFORMATION
# ==========================================

def get_model_info():

    return {

        "name":
        "PhishGuard AI ANN Model",

        "type":
        "Deep Learning Neural Network",

        "status":
        model_status(),

        "features":

        [

            "URL Tokenization",

            "Pattern Analysis",

            "Deep Learning Prediction",

            "Confidence Score"

        ]

    }



# ==========================================
# SHUTDOWN CLEANUP
# ==========================================

def clear_model():

    global model

    global tokenizer

    global label_encoder


    model = None

    tokenizer = None

    label_encoder = None


    return True



# ==========================================
# READY
# ==========================================

print(

    "PhishGuard AI Model Module Loaded"

)