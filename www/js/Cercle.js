/*
 pie chart with the pourcentage in the middle
 the type is solidgauge it display a circle ,
 */

var processUpdate;
var updateCircleInterval = 120000;

var greenColor = "#009000";
var orangeColor = "#FBA625";
var redColor = "#E01021";
var pageBackground = "#F9F9F9";

var colorToSet = greenColor;
var percent = 50;



function startUpdatingCircle() {
    processUpdate = setInterval(function () {
        getData(setUpCircleParamAndDraw);
    }, updateCircleInterval);
}

function stopUpdatingCircle() {
    clearInterval(processUpdate);
}

function setUpCircleParamAndDraw(data) {
    var sumSignal = 0;
    var qualityPercent = 0;

    for (var i = 0; i < data.length; i++) {
        sumSignal = sumSignal + data[i].niveau_signal;
    }

    qualityPercent = Math.round(getSignalQualityPercent(sumSignal, data.length));

    if (qualityPercent > 80) {
        colorToSet = greenColor;
    } else if (qualityPercent >= 60) {
        colorToSet = orangeColor;
    } else {
        colorToSet = redColor;
    }

    percent = qualityPercent;

    drawCircle();

}

function getSignalQualityPercent(totalsignal, nbLinesSaved) {
    var moyenne;
    var percent;
    var minValueOfSignal = -110;
    var maxValueOfSignal = -48;

    moyenne = totalsignal / nbLinesSaved;
    percent = (moyenne - minValueOfSignal) * 100 / (maxValueOfSignal - minValueOfSignal);

    return percent;
}

function drawCircle() {
    clearCircleDiv();
    $('#circle').circleDiagram({
        "percent": percent + "%",
        "size": "80",
        "borderWidth": "17",
        "bgFill": "#e2e2e2",
        "frFill": colorToSet,
        "textSize": "40",
        "textColor": colorToSet
    });
}

function clearCircleDiv() {
    divCircle.innerHTML = "";
}