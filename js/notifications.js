/*==========================================
  PHISHGUARD AI
  NOTIFICATIONS.JS
==========================================*/

"use strict";

/*==========================================
  DOM READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeNotifications();

});


/*==========================================
  INITIALIZE
==========================================*/

function initializeNotifications(){

    loadNotifications();

    initializeFilters();

    initializeActions();

}


/*==========================================
  LOAD NOTIFICATIONS
==========================================*/

function loadNotifications(){

    const list =
        document.getElementById("notificationList");

    if(!list) return;

    console.log(

        "Notifications Loaded"

    );

}


/*==========================================
  FILTER BUTTONS
==========================================*/

function initializeFilters(){

    const buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            buttons.forEach(btn=>

                btn.classList.remove("active")

            );

            button.classList.add("active");

            filterNotifications(

                button.dataset.filter

            );

        });

    });

}


/*==========================================
  FILTER FUNCTION
==========================================*/

function filterNotifications(type){

    const items =
        document.querySelectorAll(

            ".notification-item"

        );

    items.forEach(item=>{

        if(

            type==="all" ||

            item.dataset.type===type

        ){

            item.style.display="flex";

        }

        else{

            item.style.display="none";

        }

    });

}

/*==========================================
  MARK AS READ
==========================================*/

function markAsRead(element){

    element.classList.remove("unread");

    element.classList.add("read");

    updateNotificationCount();

    showToast(

        "Notification marked as read",

        "success"

    );

}


/*==========================================
  DELETE NOTIFICATION
==========================================*/

function deleteNotification(button){

    const notification =

        button.closest(".notification-item");

    if(!notification) return;

    notification.remove();

    updateNotificationCount();

    showToast(

        "Notification deleted",

        "success"

    );

}


/*==========================================
  CLEAR ALL
==========================================*/

function clearAllNotifications(){

    const notifications =

        document.querySelectorAll(

            ".notification-item"

        );

    notifications.forEach(item=>{

        item.remove();

    });

    updateNotificationCount();

    showToast(

        "All notifications cleared",

        "success"

    );

}


/*==========================================
  UPDATE COUNTER
==========================================*/

function updateNotificationCount(){

    const badge =

        document.getElementById(

            "notificationCount"

        );

    if(!badge) return;

    const unread =

        document.querySelectorAll(

            ".notification-item.unread"

        ).length;

    badge.textContent = unread;

    badge.style.display =

        unread > 0

        ? "inline-flex"

        : "none";

}


/*==========================================
  ADD NEW NOTIFICATION
==========================================*/

function addNotification(

    title,

    message,

    type="info"

){

    const list =

        document.getElementById(

            "notificationList"

        );

    if(!list) return;

    const item =

        document.createElement("div");

    item.className =

        `notification-item unread`;

    item.dataset.type = type;

    item.innerHTML = `

        <div class="notification-content">

            <h3>${title}</h3>

            <p>${message}</p>

            <small>

                Just now

            </small>

        </div>

    `;

    list.prepend(item);

    updateNotificationCount();

}

/*==========================================
  AUTO REFRESH
==========================================*/

setInterval(()=>{

    console.log(

        "Checking for new notifications..."

    );

},60000);


/*==========================================
  BROWSER PERMISSION
==========================================*/

function requestNotificationPermission(){

    if(!("Notification" in window)) return;

    if(Notification.permission==="default"){

        Notification.requestPermission();

    }

}


/*==========================================
  DESKTOP NOTIFICATION
==========================================*/

function showDesktopNotification(

    title,

    message

){

    if(Notification.permission!=="granted")

        return;

    new Notification(title,{

        body:message,

        icon:"assets/images/logo.png"

    });

}


/*==========================================
  INITIALIZE ACTIONS
==========================================*/

function initializeActions(){

    const clearBtn =

        document.getElementById(

            "clearNotifications"

        );

    if(clearBtn){

        clearBtn.addEventListener(

            "click",

            clearAllNotifications

        );

    }

}


/*==========================================
  SHORTCUT
==========================================*/

document.addEventListener(

    "keydown",

    event=>{

        if(

            event.altKey &&

            event.key==="n"

        ){

            updateNotificationCount();

        }

    }

);


/*==========================================
  STARTUP
==========================================*/

requestNotificationPermission();

updateNotificationCount();


/*==========================================
  READY
==========================================*/

console.log(

    "Notifications Module Ready"

);