/*
 pie chart with the pourcentage in the middle
 */
function makeCircle(percentValue) {
    (function ($) {
        $('#cercleIndicor').progressCircle({
            nPercent: percentValue,
            showPercentText: true,
            thickness: 3,
            circleSize: 100
        });
    })(jQuery);

}