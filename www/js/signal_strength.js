/* 
 * Propose le service pour 
 * récuper la valeur de la puissance du signal (-110 à -50) en décibel (Dbm)  --> getSignalDbm()
 */

var signalDbm = 0;

function getSignalDbm() {
    
    window.SignalStrength.dbm(
            function (measuredDbm) {
                signalDbm = measuredDbm;
            });

    return signalDbm;
}


