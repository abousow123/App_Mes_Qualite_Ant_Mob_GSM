/*
 * Propose le service pour
 * récuper la valeur de la puissance du signal (-110 à -50) en décibel (Dbm)  --> getSignalDbm()
 */

document.addEventListener('deviceready', runSignalStrengthUpdater, false);

var signalDbm = -3;

function getSignalDbm() {
    if (signalDbm > -48) //unable to find a value for now.
        return getSignalDbm();
    else if (signalDbm < -110) //Revert back to dbm.
        return (signalDbm + 113) / 2;
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

