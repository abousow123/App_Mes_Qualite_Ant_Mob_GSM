/* 
 * Propose les services pour :
 * récuper le niveau de batterie en pourcentage (0-100) --> getBatterieLevel()
 * récuper l'état de la batterie (en charge (true) ou non (false)) --> isisBatteriePlugged()
 */

document.addEventListener('deviceready', setBatterieStatusListener, false);

var batterieStatus = null;

function setBatterieStatusListener() {
    window.addEventListener("batterystatus", onStatusChanged, false);
}

function onStatusChanged(info) {
//   alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged);
    batterieStatus = info;
}

function getBatterieLevel() {
    return batterieStatus.level;
}

function isBatteriePlugged() {
    return batterieStatus.isPlugged;
}
