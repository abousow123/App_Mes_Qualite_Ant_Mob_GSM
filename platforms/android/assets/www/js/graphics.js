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
                text: 'Batterie & signal'
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
                    name: 'Signal(dB)',
                    data: tabSignal
                }, {
                    name: 'Batterie(%)',
                    data: tabBattry
                }]
        });
    });
}
