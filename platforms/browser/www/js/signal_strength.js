/*
 * Propose le service pour
 * récuper la valeur de la puissance du signal (-110 à -50) en décibel (Dbm)  --> getSignalDbm()
 */

document.addEventListener('deviceready', runSignalStrengthUpdater, false);

var signalDbm = -3;

function getSignalDbm() {
    return signalDbm;
}

function runSignalStrengthUpdater() {
    updateSignalStrength();
    var process = setInterval(updateSignalStrength, 1500);
}

function updateSignalStrength() {
    window.SignalStrength.dbm(
            function (measuredDbm) {
                signalDbm = measuredDbm;
            });
}

