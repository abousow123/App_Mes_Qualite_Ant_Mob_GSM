/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function traceCourbe(tabBattry,tabSignal){
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
