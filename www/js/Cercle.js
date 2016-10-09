/*
 pie chart with the pourcentage in the middle
 */
function makeCircle() {
    $(function () {

        var gaugeOptions = {
            chart: {
                type: 'solidgauge'
            },
            title: null,
            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            tooltip: {
                enabled: false
            },
            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#DF5353'], // red
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B'] // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickAmount: 2,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                }
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            }
        };

        // The speed gauge
        $('#cercleIndicor').highcharts(Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: 'signal level'
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                    name: 'signal level',
                    data: [80],
                    dataLabels: {
                        format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                                '<span style="font-size:12px;color:silver">Dbm</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' Dbm'
                    }
                }]
        }));
        // Speed
        var chart = $('#cercleIndicor').highcharts(),
                point;
        if (chart) {
            point = chart.series[0].points[0];
            point.update(Math.round((getSignalDbm() * (-1)) * (100 / 110)));
        }
    });
}