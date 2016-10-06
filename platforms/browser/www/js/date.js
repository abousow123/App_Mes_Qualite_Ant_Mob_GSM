/*
 * Propose le service getDate()
 * qui retourne la date et heure courante du téléphone
 */

document.addEventListener('deviceready', runDateTimeUpdaterProcess, false);

var dateStr = '';

function getDate() {
    return dateStr;
}

function updateDateTime() {
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
}

function runDateTimeUpdaterProcess() {
    var process = setInterval(updateDateTime, 200);
}