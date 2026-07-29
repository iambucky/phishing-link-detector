/*==========================================
  PHISHGUARD AI
  CHARTS.JS
==========================================*/

"use strict";

/*==========================================
  CHART INITIALIZATION
==========================================*/

document.addEventListener("DOMContentLoaded",()=>{

    initializeCharts();

});


function initializeCharts(){

    loadDetectionChart();

    loadTrafficChart();

    loadPredictionChart();

}


/*==========================================
  DETECTION BAR CHART
==========================================*/

function loadDetectionChart(){

    const canvas =
        document.getElementById("detectionChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"bar",

        data:{

            labels:[
                "Safe",
                "Phishing",
                "Suspicious"
            ],

            datasets:[{

                label:"Detected URLs",

                data:[762,486,91],

                backgroundColor:[

                    "#22c55e",
                    "#ef4444",
                    "#f59e0b"

                ],

                borderRadius:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}


/*==========================================
  TRAFFIC LINE CHART
==========================================*/

function loadTrafficChart(){

    const canvas =
        document.getElementById("trafficChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"line",

        data:{

            labels:[

                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
                "Sun"

            ],

            datasets:[{

                label:"Scans",

                data:[

                    120,
                    160,
                    145,
                    210,
                    240,
                    180,
                    260

                ],

                borderColor:"#2563eb",

                backgroundColor:
                "rgba(37,99,235,.15)",

                fill:true,

                tension:.4

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}

/*==========================================
  PREDICTION PIE CHART
==========================================*/

function loadPredictionChart(){

    const canvas =
        document.getElementById("predictionChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"pie",

        data:{

            labels:[

                "Safe",
                "Phishing"

            ],

            datasets:[{

                data:[762,486],

                backgroundColor:[

                    "#22c55e",
                    "#ef4444"

                ],

                hoverOffset:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}


/*==========================================
  MODEL ACCURACY CHART
==========================================*/

function loadAccuracyChart(){

    const canvas =
        document.getElementById("accuracyChart");

    if(!canvas) return;

    new Chart(canvas,{

        type:"doughnut",

        data:{

            labels:[

                "Accuracy",
                "Remaining"

            ],

            datasets:[{

                data:[98.2,1.8],

                backgroundColor:[

                    "#2563eb",
                    "#e5e7eb"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            cutout:"70%",

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}


/*==========================================
  REFRESH ALL CHARTS
==========================================*/

function refreshCharts(){

    loadDetectionChart();

    loadTrafficChart();

    loadPredictionChart();

    loadAccuracyChart();

}


/*==========================================
  UPDATE CHART DATA
==========================================*/

function updateChart(chart,newData){

    if(!chart) return;

    chart.data.datasets[0].data = newData;

    chart.update();

}

/*==========================================
  EXPORT CHART AS IMAGE
==========================================*/

function exportChart(chartId,fileName){

    const canvas =
        document.getElementById(chartId);

    if(!canvas) return;

    const image =
        canvas.toDataURL("image/png");

    const link =
        document.createElement("a");

    link.href = image;

    link.download = fileName;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

}


/*==========================================
  DESTROY CHART INSTANCE
==========================================*/

function destroyChart(chart){

    if(chart){

        chart.destroy();

    }

}


/*==========================================
  WINDOW RESIZE
==========================================*/

window.addEventListener("resize",()=>{

    Chart.instances.forEach(chart=>{

        chart.resize();

    });

});


/*==========================================
  AUTO REFRESH
==========================================*/

setInterval(()=>{

    console.log("Refreshing charts...");

},60000);


/*==========================================
  CHART COLORS
==========================================*/

const chartColors={

    primary:"#2563eb",

    success:"#22c55e",

    danger:"#ef4444",

    warning:"#f59e0b",

    info:"#06b6d4",

    dark:"#1f2937",

    light:"#e5e7eb"

};


/*==========================================
  CHART OPTIONS
==========================================*/

const defaultChartOptions={

    responsive:true,

    maintainAspectRatio:false,

    animation:{

        duration:1000

    },

    plugins:{

        legend:{

            labels:{

                color:"#374151"

            }

        }

    }

};


/*==========================================
  APPLICATION READY
==========================================*/

console.log(

    "Charts Loaded Successfully"

);

