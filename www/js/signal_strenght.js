/* 
 * Propose le service pour 
 * récuper la valeur de la puissance du signal (-110 à -50) en décibel (Dbm)  --> getSignalDbm()
 */


function getSignalDbm() {
    var signalDbm = null;

    window.SignalStrength.dbm(
            function (measuredDbm) {
                signalDbm = measuredDbm;
            });

    return signalDbm;
}


