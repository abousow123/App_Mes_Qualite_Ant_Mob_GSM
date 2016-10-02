/* 
 * Propose les services pour :
 * récuper le code GSM du réseau ==> getGSMCode()
 * récuper le nom de l'opérateur de l'utilisateur ==> getgetCarrierName()
 */

document.addEventListener('deviceready', getSimInfo, false);

function getSimInfo() {
    window.plugins.sim.getSimInfo(getSimInfoOnSucces, getSimInfoOnError);
}

var gsmCode = "N/A";
var carrierName = "N/A";

function getSimInfoOnSucces() {
    console.log(result);
    gsmCode = result.mnc;
    carrierName = result.carrierName;    
}

function getSimInfoOnError() {
    gsmCode = "N/A";
    carrierName = "N/A";
}

function getGSMCode() {
    return gsmCode;
}

function getCarrierName() {
    return carrierName;
}