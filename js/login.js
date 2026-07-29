/*==========================================
  PHISHGUARD AI
  LOGIN.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeLogin();

});


/*==========================================
  INITIALIZE LOGIN
==========================================*/

function initializeLogin(){

    initializePasswordToggle();

    initializeRememberMe();

    initializeLoginForm();

}


/*==========================================
  PASSWORD TOGGLE
==========================================*/

function initializePasswordToggle(){

    const password =
        document.getElementById("password");

    const toggle =
        document.getElementById("togglePassword");

    if(!password || !toggle) return;

    toggle.addEventListener("click",()=>{

        if(password.type==="password"){

            password.type="text";

            toggle.innerHTML="🙈";

        }

        else{

            password.type="password";

            toggle.innerHTML="👁";

        }

    });

}


/*==========================================
  REMEMBER ME
==========================================*/

function initializeRememberMe(){

    const email =
        document.getElementById("email");

    const remember =
        document.getElementById("rememberMe");

    if(localStorage.getItem("savedEmail")){

        email.value =
            localStorage.getItem("savedEmail");

        remember.checked = true;

    }

}


/*==========================================
  LOGIN FORM
==========================================*/

function initializeLoginForm(){

    const form =
        document.getElementById("loginForm");

    if(!form) return;

    form.addEventListener("submit",loginUser);

}

/*==========================================
  LOGIN USER
==========================================*/

async function loginUser(event){

    event.preventDefault();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const remember =
        document.getElementById("rememberMe");

    const button =
        document.querySelector(".login-btn");

    if(email==="" || password===""){

        showToast(

            "Please fill all fields",

            "error"

        );

        return;

    }

    button.disabled = true;

    button.textContent = "Signing In...";

    try{

        const response = await fetch("/login",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                email:email,

                password:password

            })

        });

        const result =
            await response.json();

        if(response.ok){

            if(remember.checked){

                localStorage.setItem(

                    "savedEmail",

                    email

                );

            }

            else{

                localStorage.removeItem(

                    "savedEmail"

                );

            }

            showToast(

                "Login Successful",

                "success"

            );

            setTimeout(()=>{

                window.location.href =
                    "dashboard.html";

            },1000);

        }

        else{

            showToast(

                result.message ||

                "Invalid Email or Password",

                "error"

            );

        }

    }

    catch(error){

        console.error(error);

        showToast(

            "Server connection failed",

            "error"

        );

    }

    finally{

        button.disabled = false;

        button.textContent = "Login";

    }

}

/*==========================================
  EMAIL VALIDATION
==========================================*/

function isValidEmail(email){

    const pattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


/*==========================================
  AUTO FOCUS
==========================================*/

window.addEventListener("load",()=>{

    const email =
        document.getElementById("email");

    if(email){

        email.focus();

    }

});


/*==========================================
  ENTER KEY SUPPORT
==========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.key==="Enter"){

        const form =
            document.getElementById("loginForm");

        if(form){

            form.requestSubmit();

        }

    }

});


/*==========================================
  FORGOT PASSWORD
==========================================*/

function forgotPassword(){

    window.location.href =
        "forgot-password.html";

}


/*==========================================
  CLEAR SESSION
==========================================*/

function clearSession(){

    sessionStorage.clear();

}


/*==========================================
  LOGOUT
==========================================*/

function logout(){

    clearSession();

    localStorage.removeItem("authToken");

    window.location.href = "login.html";

}


/*==========================================
  LOGIN STATUS
==========================================*/

function isLoggedIn(){

    return localStorage.getItem("authToken") !== null;

}


/*==========================================
  READY
==========================================*/

console.log(

    "Login Module Loaded Successfully"

);