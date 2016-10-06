/*
 just trace two graphics  one for battry status and anther for signal
 */
function traceCourbe(tabBattry, tabSignal) {
    $(function () {
        $('#graphics').highcharts({
            chart: {
                type: 'area'
            },
            title: {
                text: 'Battrie & signal'
            },
            xAxis: {
            },
            credits: {
                enabled: false
            },
            yAxis: {
                title: {
                    text: 'niveaux'
                }
            },
            series: [{
                    name: 'niveau signal',
                    data: tabBattry
                }, {
                    name: 'niveau battrie',
                    data: tabSignal
                }]
        });
    });
}
