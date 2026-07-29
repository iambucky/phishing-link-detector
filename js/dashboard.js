/*==========================================
  PHISHGUARD AI
  DASHBOARD.JS
==========================================*/

"use strict";

/*==========================================
  DASHBOARD READY
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeDashboard();

});


function initializeDashboard(){

    loadDashboardStats();

    loadRecentActivity();

    initializeQuickActions();

    updateWelcomeMessage();

}


/*==========================================
  DASHBOARD STATISTICS
==========================================*/

function loadDashboardStats(){

    setCardValue("totalScans","1248");

    setCardValue("safeUrls","762");

    setCardValue("phishingUrls","486");

    setCardValue("accuracy","98.2%");

}


function setCardValue(id,value){

    const element =
        document.getElementById(id);

    if(element){

        element.textContent = value;

    }

}


/*==========================================
  WELCOME MESSAGE
==========================================*/

function updateWelcomeMessage(){

    const message =
        document.getElementById("welcomeMessage");

    if(!message) return;

    const hour =
        new Date().getHours();

    let greeting = "Welcome";

    if(hour < 12){

        greeting = "Good Morning";

    }

    else if(hour < 18){

        greeting = "Good Afternoon";

    }

    else{

        greeting = "Good Evening";

    }

    message.textContent =
        greeting + ", Admin";

}


/*==========================================
  QUICK ACTION BUTTONS
==========================================*/

function initializeQuickActions(){

    const buttons =
        document.querySelectorAll(".quick-action");

    buttons.forEach(button=>{

        button.addEventListener("click",()=>{

            console.log(
                "Action:",
                button.dataset.action
            );

        });

    });

}

/*==========================================
  RECENT ACTIVITY
==========================================*/

function loadRecentActivity(){

    const activityList =
        document.getElementById("recentActivity");

    if(!activityList) return;

    activityList.innerHTML = `

        <li>✅ New phishing URL detected.</li>

        <li>✅ Daily report generated.</li>

        <li>✅ Scanner model updated.</li>

        <li>✅ User exported analytics report.</li>

    `;

}


/*==========================================
  LIVE SCAN COUNTER
==========================================*/

let liveScans = 1248;

function startLiveCounter(){

    const counter =
        document.getElementById("liveScans");

    if(!counter) return;

    setInterval(()=>{

        liveScans++;

        counter.textContent = liveScans;

    },15000);

}


/*==========================================
  ANIMATED COUNTERS
==========================================*/

function animateCounter(id,target){

    const element =
        document.getElementById(id);

    if(!element) return;

    let current = 0;

    const interval = setInterval(()=>{

        current += Math.ceil(target/50);

        if(current >= target){

            current = target;

            clearInterval(interval);

        }

        element.textContent = current;

    },30);

}


/*==========================================
  DASHBOARD REFRESH
==========================================*/

function refreshDashboard(){

    loadDashboardStats();

    loadRecentActivity();

    console.log(

        "Dashboard Refreshed"

    );

}


/*==========================================
  PROGRESS BAR
==========================================*/

function updateProgress(id,value){

    const progress =
        document.getElementById(id);

    if(!progress) return;

    progress.style.width =
        value + "%";

    progress.textContent =
        value + "%";

}


/*==========================================
  INITIALIZE COMPONENTS
==========================================*/

startLiveCounter();

animateCounter("totalScans",1248);

animateCounter("safeUrls",762);

animateCounter("phishingUrls",486);

updateProgress("accuracyBar",98.2);

/*==========================================
  UPDATE RECENT SCAN TABLE
==========================================*/

function addRecentScan(url,result,confidence){

    const table =
        document.getElementById("recentScans");

    if(!table) return;

    const row =
        document.createElement("tr");

    row.innerHTML = `

        <td>${new Date().toLocaleDateString()}</td>

        <td>${url}</td>

        <td>${result}</td>

        <td>${confidence}%</td>

        <td>

            <span class="badge ${
                result==="Phishing"
                ? "badge-danger"
                : "badge-success"
            }">

                ${result}

            </span>

        </td>

    `;

    table.prepend(row);

}


/*==========================================
  EXPORT DASHBOARD DATA
==========================================*/

function exportDashboardData(){

    showToast(

        "Dashboard exported successfully",

        "success"

    );

}


/*==========================================
  UPDATE NOTIFICATION BADGE
==========================================*/

function updateNotificationBadge(count){

    const badge =
        document.getElementById("notificationCount");

    if(!badge) return;

    badge.textContent = count;

    badge.style.display =
        count > 0
        ? "inline-flex"
        : "none";

}


/*==========================================
  AUTO REFRESH
==========================================*/

setInterval(()=>{

    refreshDashboard();

},300000);


/*==========================================
  DASHBOARD SHORTCUTS
==========================================*/

document.addEventListener("keydown",(event)=>{

    if(event.altKey && event.key==="r"){

        refreshDashboard();

    }

});


/*==========================================
  DASHBOARD READY
==========================================*/

console.log(

    "Dashboard Ready"

);