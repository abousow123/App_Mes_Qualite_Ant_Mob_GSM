/* 
 * Propose le service getDate() 
 * qui retourne la date et heure courante du téléphone
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