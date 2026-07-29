/*==========================================
  PHISHGUARD AI
  SETTINGS.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeSettings();

});


/*==========================================
  INITIALIZE SETTINGS
==========================================*/

function initializeSettings(){

    loadSettings();

    initializeTheme();

    initializeForm();

}


/*==========================================
  LOAD SETTINGS
==========================================*/

function loadSettings(){

    const language =
        localStorage.getItem("language");

    const theme =
        localStorage.getItem("theme");

    if(language){

        const langSelect =
            document.getElementById("language");

        if(langSelect){

            langSelect.value = language;

        }

    }

    if(theme){

        const themeSelect =
            document.getElementById("theme");

        if(themeSelect){

            themeSelect.value = theme;

        }

    }

}


/*==========================================
  SETTINGS FORM
==========================================*/

function initializeForm(){

    const form =
        document.getElementById("settingsForm");

    if(!form) return;

    form.addEventListener(

        "submit",

        saveSettings

    );

}


/*==========================================
  THEME PREVIEW
==========================================*/

function initializeTheme(){

    const selector =
        document.getElementById("theme");

    if(!selector) return;

    selector.addEventListener("change",()=>{

        if(selector.value==="Dark"){

            document.body.classList.add("dark-mode");

        }

        else{

            document.body.classList.remove("dark-mode");

        }

    });

}

/*==========================================
  SAVE SETTINGS
==========================================*/

function saveSettings(event){

    event.preventDefault();

    const language =
        document.getElementById("language")?.value;

    const theme =
        document.getElementById("theme")?.value;

    const timezone =
        document.getElementById("timezone")?.value;

    if(language){

        localStorage.setItem(

            "language",

            language

        );

    }

    if(theme){

        localStorage.setItem(

            "theme",

            theme

        );

    }

    if(timezone){

        localStorage.setItem(

            "timezone",

            timezone

        );

    }

    showToast(

        "Settings saved successfully",

        "success"

    );

}


/*==========================================
  RESET SETTINGS
==========================================*/

function resetSettings(){

    localStorage.removeItem("language");

    localStorage.removeItem("theme");

    localStorage.removeItem("timezone");

    location.reload();

}


/*==========================================
  NOTIFICATION SETTINGS
==========================================*/

function saveNotifications(){

    const email =

        document.getElementById(

            "emailNotification"

        )?.checked;

    const sms =

        document.getElementById(

            "smsNotification"

        )?.checked;

    localStorage.setItem(

        "emailNotification",

        email

    );

    localStorage.setItem(

        "smsNotification",

        sms

    );

}


/*==========================================
  SECURITY SETTINGS
==========================================*/

function saveSecurity(){

    const twoFactor =

        document.getElementById(

            "twoFactor"

        )?.checked;

    localStorage.setItem(

        "twoFactor",

        twoFactor

    );

}


/*==========================================
  AUTO SAVE
==========================================*/

document

.querySelectorAll(

    ".settings-form input,.settings-form select"

)

.forEach(item=>{

    item.addEventListener(

        "change",

        ()=>{

            console.log(

                "Setting Changed"

            );

        }

    );

});

/*==========================================
  EXPORT SETTINGS
==========================================*/

function exportSettings(){

    const settings = {

        language:
        localStorage.getItem("language"),

        theme:
        localStorage.getItem("theme"),

        timezone:
        localStorage.getItem("timezone"),

        emailNotification:
        localStorage.getItem("emailNotification"),

        smsNotification:
        localStorage.getItem("smsNotification"),

        twoFactor:
        localStorage.getItem("twoFactor")

    };

    const blob = new Blob(

        [

            JSON.stringify(

                settings,

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
        "settings.json";

    link.click();

}


/*==========================================
  RESTORE DEFAULT SETTINGS
==========================================*/

function restoreDefaults(){

    localStorage.clear();

    showToast(

        "Default settings restored",

        "success"

    );

    setTimeout(()=>{

        location.reload();

    },1000);

}


/*==========================================
  CLEAR APPLICATION CACHE
==========================================*/

function clearApplicationCache(){

    if("caches" in window){

        caches.keys().then(keys=>{

            keys.forEach(key=>{

                caches.delete(key);

            });

        });

    }

    showToast(

        "Application cache cleared",

        "success"

    );

}


/*==========================================
  SETTINGS SHORTCUT
==========================================*/

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.ctrlKey &&

            event.key==="s"

        ){

            event.preventDefault();

            const form =

                document.getElementById(

                    "settingsForm"

                );

            if(form){

                form.requestSubmit();

            }

        }

    }

);


/*==========================================
  VALIDATION
==========================================*/

function validateSettings(){

    return true;

}


/*==========================================
  READY
==========================================*/

console.log(

    "Settings Module Loaded Successfully"

);