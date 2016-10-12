/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// dataPoints
var dataPoints1 = [];
var dataPoints2 = [];

function startChart() {

    var chart = new CanvasJS.Chart("graphics2", {
        zoomEnabled: true,
        title: {
            text: "Signal / Batterie / Temps"
        },
        toolTip: {
            shared: true
        },
        legend: {
            verticalAlign: "top",
            horizontalAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            fontFamily: "calibri",
            fontColor: "dimGrey"
        },
        axisX: {
            title: "chart updates every 30 secs"
        },
        axisY: {
            prefix: '',
            includeZero: false
        },
        data: [{
                // dataSeries1
                type: "line",
                xValueType: "dateTime",
                showInLegend: true,
                name: "Batterie",
                dataPoints: dataPoints1
            },
            {
                // dataSeries2
                type: "line",
                xValueType: "dateTime",
                showInLegend: true,
                name: "Signal",
                dataPoints: dataPoints2
            }],
        legend:{
            cursor: "pointer",
            itemclick: function (e) {
                if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                    e.dataSeries.visible = false;
                } else {
                    e.dataSeries.visible = true;
                }
                chart.render();
            }
        }
    });


    var updateInterval = 30000;

    // initial value
    var yValue1 = getBatterieLevel();
    var yValue2 = getSignalDbm();

    var time = new Date;
//    time.setHours(9);
//    time.setMinutes(30);
//    time.setSeconds(00);
//    time.setMilliseconds(00);
    // starting at 9.30 am

    var updateChart = function (count) {
        count = count || 1;

        // count is number of times loop runs to generate random dataPoints.

        for (var i = 0; i < count; i++) {

            // add interval duration to time
            time.setTime(time.getTime() + updateInterval);

            // updating value yValue1 and yValue2.
            yValue1 = getBatterieLevel();
            yValue2 = getSignalDbm();

            // pushing the new values
            dataPoints1.push({
                x: time.getTime(),
                y: yValue1
            });
            dataPoints2.push({
                x: time.getTime(),
                y: yValue2
            });


        }

        // updating legend text with  updated with y Value
        chart.options.data[0].legendText = " Batterie " + yValue1 + "%";
        chart.options.data[1].legendText = " Signal " + yValue2 + "dB";
        chart.render();

    };

    // generates first set of dataPoints
    updateChart();

    // update chart after specified interval
    setInterval(function () {
        updateChart();
    }, updateInterval);

}