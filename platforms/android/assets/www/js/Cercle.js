/*
 pie chart with the pourcentage in the middle
 the type is solidgauge it display a circle ,
 */
function makeCircle() {
    $(function () {

        var gaugeOptions = {
            chart: {
                type: 'solidgauge' //the chart type
            },
            title: null,
            pane: {
                center: ['50%', '65%'], // with and heigth of the container graphics and i'm make some change for the correction
                size: '100%', // and this one too
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
                enabled: true // for seeing toast info of the level
            },
            // the value axis
            yAxis: {
                stops: [// diplay colors
                    [0.1, 'red'],
                    [0.5, 'yellow'],
                    [0.9, 'green']
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
                                '<span style="font-size:12px;color:silver">Percent</span></div>'
                    },
                    tooltip: {
                        valueSuffix: ' %'// percent personnalise of the Toast
                    }
                }]
        }));
        // Speed

        // instence of a new chart variable declared at the top
        var chart = $('#cercleIndicor').highcharts(),
                point;
        if (chart) {
            point = chart.series[0].points[0];
            point.update(Math.round((getSignalDbm() + 118) * (100 / 118)));
        }
    });
}