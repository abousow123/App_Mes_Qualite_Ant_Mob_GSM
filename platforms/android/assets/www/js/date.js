/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var dateStr = '';

function getDate() {
    navigator.globalization.dateToString(
            new Date(),
            function (date) {
//            alert('date: ' + date.value + '\n');
                dateStr = date.value;
            },
            function () {
//            alert('Error getting dateString\n');
                dateStr = 'Erreur';
            },
            {formatLength: 'short', selector: 'date and time'}
    );

    return dateStr;
}