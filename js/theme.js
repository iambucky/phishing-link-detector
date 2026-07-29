/*==========================================
  PHISHGUARD AI
  THEME.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeTheme();

});


/*==========================================
  INITIALIZE THEME
==========================================*/

function initializeTheme(){

    loadSavedTheme();

    initializeThemeToggle();

}


/*==========================================
  LOAD SAVED THEME
==========================================*/

function loadSavedTheme(){

    const savedTheme =

        localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add(

            "dark-mode"

        );

    }

    else{

        document.body.classList.remove(

            "dark-mode"

        );

    }

}


/*==========================================
  THEME TOGGLE
==========================================*/

function initializeThemeToggle(){

    const button =

        document.getElementById(

            "themeToggle"

        );

    if(!button) return;

    button.addEventListener(

        "click",

        toggleTheme

    );

}


/*==========================================
  TOGGLE THEME
==========================================*/

function toggleTheme(){

    document.body.classList.toggle(

        "dark-mode"

    );

    const isDark =

        document.body.classList.contains(

            "dark-mode"

        );

    localStorage.setItem(

        "theme",

        isDark

        ? "dark"

        : "light"

    );

}

/*==========================================
  UPDATE THEME ICON
==========================================*/

function updateThemeIcon(){

    const icon =
        document.getElementById("themeIcon");

    if(!icon) return;

    const darkMode =
        document.body.classList.contains(
            "dark-mode"
        );

    icon.textContent =
        darkMode ? "☀️" : "🌙";

}


/*==========================================
  SYSTEM THEME
==========================================*/

function applySystemTheme(){

    const mediaQuery =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

    if(

        !localStorage.getItem("theme")

    ){

        if(mediaQuery.matches){

            document.body.classList.add(
                "dark-mode"
            );

        }

        else{

            document.body.classList.remove(
                "dark-mode"
            );

        }

        updateThemeIcon();

    }

}


/*==========================================
  APPLY ACCENT COLOR
==========================================*/

function applyAccentColor(){

    const color =
        localStorage.getItem("accentColor");

    if(color){

        document.documentElement
            .style.setProperty(

                "--primary-color",

                color

            );

    }

}


/*==========================================
  SAVE ACCENT COLOR
==========================================*/

function saveAccentColor(color){

    localStorage.setItem(

        "accentColor",

        color

    );

    applyAccentColor();

}


/*==========================================
  THEME ANIMATION
==========================================*/

function animateThemeChange(){

    document.body.classList.add(

        "theme-transition"

    );

    setTimeout(()=>{

        document.body.classList.remove(

            "theme-transition"

        );

    },300);

}

/*==========================================
  RESET THEME
==========================================*/

function resetTheme(){

    localStorage.removeItem("theme");

    localStorage.removeItem("accentColor");

    document.body.classList.remove("dark-mode");

    document.documentElement.style.removeProperty(

        "--primary-color"

    );

    updateThemeIcon();

}


/*==========================================
  SYSTEM THEME LISTENER
==========================================*/

const mediaQuery =

    window.matchMedia(

        "(prefers-color-scheme: dark)"

    );

mediaQuery.addEventListener(

    "change",

    event=>{

        if(

            !localStorage.getItem("theme")

        ){

            if(event.matches){

                document.body.classList.add(

                    "dark-mode"

                );

            }

            else{

                document.body.classList.remove(

                    "dark-mode"

                );

            }

            updateThemeIcon();

        }

    }

);


/*==========================================
  KEYBOARD SHORTCUT
==========================================*/

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.altKey &&

            event.key==="t"

        ){

            toggleTheme();

        }

    }

);


/*==========================================
  APPLY SAVED PREFERENCES
==========================================*/

window.addEventListener(

    "load",

    ()=>{

        applySystemTheme();

        applyAccentColor();

        updateThemeIcon();

    }

);


/*==========================================
  READY
==========================================*/

console.log(

    "Theme Module Loaded Successfully"

);