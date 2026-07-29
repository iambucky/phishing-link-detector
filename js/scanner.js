
/*==========================================
  PHISHGUARD AI
  SCANNER.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeScanner();

});


/*==========================================
  INITIALIZE SCANNER
==========================================*/

function initializeScanner(){

    const form =
        document.getElementById("scannerForm");

    if(form){

        form.addEventListener(

            "submit",

            scanURL

        );

    }

}


/*==========================================
  SCAN URL
==========================================*/

async function scanURL(event){

    event.preventDefault();

    const input =
        document.getElementById("url");

    const button =
        document.querySelector(".primary-btn");

    if(!input) return;

    const url =
        input.value.trim();

    if(url===""){

        showToast(

            "Please enter a URL",

            "error"

        );

        return;

    }

    button.disabled = true;

    button.textContent = "Scanning...";

    showLoader();

    try{

        const response =
            await fetch("/predict",{

                method:"POST",

                headers:{

                    "Content-Type":
                    "application/json"

                },

                body:JSON.stringify({

                    url:url

                })

            });

        const result =
            await response.json();

        displayResult(result);

    }

    catch(error){

        console.error(error);

        showToast(

            "Server Error",

            "error"

        );

    }

    finally{

        hideLoader();

        button.disabled = false;

        button.textContent =

            "Scan URL";

    }

}

/*==========================================
  DISPLAY RESULT
==========================================*/

function displayResult(result){

    const prediction =
        document.getElementById("predictionResult");

    const message =
        document.getElementById("predictionMessage");

    const confidence =
        document.getElementById("confidenceScore");

    const risk =
        document.getElementById("riskLevel");

    if(!prediction) return;

    if(result.success){

        prediction.textContent =
            result.prediction;

        confidence.textContent =
            result.confidence + "%";

        if(result.prediction==="Phishing"){

            prediction.style.color =
                "#dc2626";

            message.textContent =
                "Warning! This URL appears to be malicious.";

            risk.textContent =
                "High Risk";

            risk.className =
                "badge badge-danger";

        }

        else{

            prediction.style.color =
                "#16a34a";

            message.textContent =
                "This URL appears to be safe.";

            risk.textContent =
                "Low Risk";

            risk.className =
                "badge badge-success";

        }

        updateFeatureTable(result);

        addRecentScan(

            result.url,

            result.prediction,

            result.confidence

        );

        showToast(

            "Scan Completed",

            "success"

        );

    }

    else{

        prediction.textContent =
            "Error";

        message.textContent =
            result.message;

        showToast(

            result.message,

            "error"

        );

    }

}


/*==========================================
  UPDATE FEATURE TABLE
==========================================*/

function updateFeatureTable(result){

    const length =
        document.getElementById("urlLength");

    const https =
        document.getElementById("httpsStatus");

    const special =
        document.getElementById("specialChars");

    const keywords =
        document.getElementById("keywords");

    const scanTime =
        document.getElementById("scanTime");

    if(length){

        length.textContent =
            result.url.length;

    }

    if(https){

        https.textContent =

            result.url.startsWith("https")

            ? "Yes"

            : "No";

    }

    if(special){

        special.textContent =

            (result.url.match(/[!@#$%^&*]/g)||[])

            .length;

    }

    if(keywords){

        keywords.textContent =

            "Analyzed";

    }

    if(scanTime){

        scanTime.textContent =

            new Date()

            .toLocaleTimeString();

    }

}

/*==========================================
  URL VALIDATION
==========================================*/

function isValidURL(url){

    try{

        new URL(url);

        return true;

    }

    catch(error){

        return false;

    }

}


/*==========================================
  RESET SCANNER
==========================================*/

function resetScanner(){

    const form =
        document.getElementById("scannerForm");

    if(form){

        form.reset();

    }

    const prediction =
        document.getElementById("predictionResult");

    const message =
        document.getElementById("predictionMessage");

    const confidence =
        document.getElementById("confidenceScore");

    const risk =
        document.getElementById("riskLevel");

    if(prediction){

        prediction.textContent =
            "Waiting for Scan...";

    }

    if(message){

        message.textContent =
            "Enter a URL to begin analysis.";

    }

    if(confidence){

        confidence.textContent = "0%";

    }

    if(risk){

        risk.textContent = "Unknown";

        risk.className = "badge badge-info";

    }

}


/*==========================================
  COPY URL
==========================================*/

function copyScannedURL(){

    const input =
        document.getElementById("url");

    if(!input) return;

    navigator.clipboard.writeText(

        input.value

    );

    showToast(

        "URL copied successfully",

        "success"

    );

}


/*==========================================
  EXPORT RESULT
==========================================*/

function exportScanResult(){

    const result = {

        url:

        document.getElementById("url")?.value,

        prediction:

        document.getElementById("predictionResult")?.textContent,

        confidence:

        document.getElementById("confidenceScore")?.textContent,

        scannedAt:

        new Date().toLocaleString()

    };

    const blob =

        new Blob(

            [

                JSON.stringify(

                    result,

                    null,

                    4

                )

            ],

            {

                type:"application/json"

            }

        );

    const link =

        document.createElement("a");

    link.href =

        URL.createObjectURL(blob);

    link.download =

        "scan_result.json";

    link.click();

}


/*==========================================
  KEYBOARD SHORTCUT
==========================================*/

document.addEventListener("keydown",event=>{

    if(

        event.ctrlKey &&

        event.key==="Enter"

    ){

        const form =

            document.getElementById(

                "scannerForm"

            );

        if(form){

            form.requestSubmit();

        }

    }

});


/*==========================================
  READY
==========================================*/

console.log(

    "Scanner Module Loaded Successfully"

);