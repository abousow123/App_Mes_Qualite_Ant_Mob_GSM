/*
 pie chart with the pourcentage in the middle
 */
function makeCircle(percentValue) {
   // $('#circle').progressCircle();

    $('#circle').progressCircle({
        nPercent: percentValue,
        showPercentText: true,
        thickness: 100,
        circleSize: 3
    });
}