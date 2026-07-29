/*==========================================
  PHISHGUARD AI
  APP.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeApp();

});


/*==========================================
  INITIALIZE APPLICATION
==========================================*/

function initializeApp(){

    updateCurrentDate();

    initializeSidebar();

    initializeTheme();

    initializeTooltips();

    initializeSearch();

}


/*==========================================
  CURRENT DATE & TIME
==========================================*/

function updateCurrentDate(){

    const dateElement = document.getElementById("currentDate");

    if(!dateElement) return;

    const today = new Date();

    dateElement.textContent =
        today.toLocaleDateString("en-IN",{

            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"

        });

}


/*==========================================
  SIDEBAR TOGGLE
==========================================*/

function initializeSidebar(){

    const toggleBtn =
        document.getElementById("menuToggle");

    const sidebar =
        document.querySelector(".sidebar");

    if(!toggleBtn || !sidebar) return;

    toggleBtn.addEventListener("click",()=>{

        sidebar.classList.toggle("active");

    });

}


/*==========================================
  DARK MODE
==========================================*/

function initializeTheme(){

    const themeButton =
        document.getElementById("themeToggle");

    if(!themeButton) return;

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme==="dark"){

        document.body.classList.add("dark-mode");

    }

    themeButton.addEventListener("click",()=>{

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(

            "theme",

            document.body.classList.contains("dark-mode")
            ? "dark"
            : "light"

        );

    });

}

/*==========================================
  SEARCH FUNCTION
==========================================*/

function initializeSearch(){

    const searchInput =
        document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("keyup",function(){

        const value =
            this.value.toLowerCase();

        const rows =
            document.querySelectorAll("tbody tr");

        rows.forEach(row=>{

            const text =
                row.textContent.toLowerCase();

            row.style.display =
                text.includes(value)
                ? ""
                : "none";

        });

    });

}


/*==========================================
  LOADING SPINNER
==========================================*/

function showLoader(){

    const loader =
        document.getElementById("loader");

    if(loader){

        loader.style.display="flex";

    }

}


function hideLoader(){

    const loader =
        document.getElementById("loader");

    if(loader){

        loader.style.display="none";

    }

}


/*==========================================
  TOAST NOTIFICATION
==========================================*/

function showToast(message,type="success"){

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);


    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },300);

    },3000);

}


/*==========================================
  MODAL CONTROLS
==========================================*/

function openModal(id){

    const modal =
        document.getElementById(id);

    if(modal){

        modal.classList.add("active");

    }

}


function closeModal(id){

    const modal =
        document.getElementById(id);

    if(modal){

        modal.classList.remove("active");

    }

}


/*==========================================
  TOOLTIP PLACEHOLDER
==========================================*/

function initializeTooltips(){

    const elements =
        document.querySelectorAll("[data-tooltip]");

    elements.forEach(item=>{

        item.setAttribute(
            "title",
            item.dataset.tooltip
        );

    });

}

/*==========================================
  FORM VALIDATION
==========================================*/

function validateForm(form){

    const inputs =
        form.querySelectorAll("[required]");

    let valid = true;

    inputs.forEach(input=>{

        if(input.value.trim()===""){

            input.classList.add("input-error");

            valid = false;

        }else{

            input.classList.remove("input-error");

        }

    });

    return valid;

}


/*==========================================
  COPY TO CLIPBOARD
==========================================*/

function copyText(text){

    navigator.clipboard.writeText(text)
    .then(()=>{

        showToast(
            "Copied to clipboard",
            "success"
        );

    })
    .catch(()=>{

        showToast(
            "Copy failed",
            "error"
        );

    });

}


/*==========================================
  DOWNLOAD FILE
==========================================*/

function downloadFile(fileUrl,fileName){

    const link =
        document.createElement("a");

    link.href = fileUrl;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


/*==========================================
  LOGOUT
==========================================*/

function logout(){

    const confirmLogout =
        confirm("Do you want to logout?");

    if(!confirmLogout) return;

    localStorage.removeItem("user");

    sessionStorage.clear();

    window.location.href = "login.html";

}


/*==========================================
  WINDOW EVENTS
==========================================*/

window.addEventListener("resize",()=>{

    console.log(
        "Window resized:",
        window.innerWidth
    );

});


window.addEventListener("offline",()=>{

    showToast(
        "Internet connection lost",
        "warning"
    );

});


window.addEventListener("online",()=>{

    showToast(
        "Connection restored",
        "success"
    );

});


/*==========================================
  GLOBAL SHORTCUTS
==========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.ctrlKey && event.key==="k"){

        event.preventDefault();

        const search =
            document.getElementById("searchInput");

        if(search){

            search.focus();

        }

    }

});


/*==========================================
  GLOBAL ERROR HANDLER
==========================================*/

window.onerror = function(message){

    console.error("Application Error:",message);

    return false;

};


/*==========================================
  APP READY
==========================================*/

console.log(
    "PhishGuard AI Loaded Successfully"
);