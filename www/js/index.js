/*
 *
 * Ce fichier est notre "Controller" il fera le lien entre Le model (la logique) et le view (vue).
 * Aucun service ne doit être créé ici mais plutot être utiliser ici pour toucher au vue.
 * Tous les bouttons, labels (si je peut le dire comme ça) etc doivent être relié à un variable ici.
 * Par ex : var btnXXX = document.getElementById("idXXX")
 * Il ne faut pas utiliser de <<document.getElementById("idXXX")>> dans une fonction
 * mais plutôt la variable (ex: btnXXX ou labelXXX) pour eviter des erreurs et un code confus.
 * Et pour chaque btnXXX creer un btnXXXAction() qui sera la fonction exécuter
 * quant le bouton est cliqué...
 *
 * Je vous prie donc de respecter ce qui a été écrit en dessus. Cela permettra à chacun
 * de comprendre le code quand une convention est respecté et la modification du code
 * sera beaucoup plus facile.
 */

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'

    onDeviceReady: function () {
//        alert('index on device ready');
        btncollecterDonnees.addEventListener("click", btncollecterDonneesAction);
        btnArreterReprendre.addEventListener("click", btnArreterReprendreAction);
        btnAnnulerCollecte.addEventListener("click", btnAnnulerCollecteAction);
        btnExporterCollecte.addEventListener("click", btnExporterCollecteAction);

        setTimeout(function () {
            //@pape :ajout
            displayDeviceAndSimInfo();

            //Delete all data when starting
            doDeleteAll();
            //call once for printing the view of graphics
            // call take the values and make the graphics
            traceCourbe(tabBattry, tabSignal);
//            make courbe just where device is ready
//            retraceCourbe();

        }, 100);
    }
};
app.initialize();


/********************************* Déclaration de variable **************************************/

/********** Page 1 ***********/
var labelMarque = document.getElementById("marque");
var labelModel = document.getElementById("model");
var labelSerial = document.getElementById("serial");
var labelGSMCode = document.getElementById("gsm");
var labelCarrierName = document.getElementById("carrierName");
var btncollecterDonnees = document.getElementById("btnCollecterDonnees");


/********** Page 2 ***********/
var btnArreterReprendre = document.getElementById("btnStartPauseCollecte");
var btnAnnulerCollecte = document.getElementById("btnAnnulerCollecte");
var btnExporterCollecte = document.getElementById("btnExpCollecte");
var labelSignalBatterieStatus = document.getElementById("idSignalText");

/********** Variables non view (juste pour garder des valeurs) *************/
var status = 'on';
var processWritting = null;
var processForCourbe = null;
var processCircle = null;
//pour garder les donnees dans des array pour signal et le battry
var tabBattry = [];
var tabSignal = [];

/********************************* Déclaration des fonctions **************************************/

//Affiche les informations du téléphone et de la carte sim à la premiere page
function displayDeviceAndSimInfo() {
    labelMarque.innerHTML = "" + getDeviceMarque();
    labelModel.innerHTML = "" + getDeviceModel();
    labelSerial.innerHTML = "" + getDeviceSerial();
    labelCarrierName.innerHTML = "" + getCarrierName();
    labelGSMCode.innerHTML = "" + getGSMCode();
}

function btncollecterDonneesAction() {
    $.mobile.changePage("#idMonitoringPage", {transition: "slide"});
    retraceCourbe();
    startChart();
}

function btnArreterReprendreAction() {
    if (status === 'off') {
        status = 'on';
        btnArreterReprendre.innerHTML = "Arrêter";
        labelSignalBatterieStatus.innerHTML = 'starting...';
        repeatPrintingSigAndBat();
        retraceCourbe();
        repeatCircle();
    } else {
        stopPrintingSignalAndBatterie();
        stopRetraceCourbe();
        stopCircle();
        status = 'off';
        btnArreterReprendre.innerHTML = "Reprendre";
        labelSignalBatterieStatus.innerHTML = labelSignalBatterieStatus.innerHTML + '<br><br><hr><font color="Blue">' + 'pause</font><hr>';
    }
}

function btnAnnulerCollecteAction() {
    stopPrintingSignalAndBatterie();
    //stop the caller function of printing circle
    stopRetraceCourbe();
    clearCourbes();
    stopCircle();
    status = 'off';
    btnArreterReprendre.innerHTML = "Commencer";
    labelSignalBatterieStatus.innerHTML = '';
}

function btnExporterCollecteAction() {
//    alert('clicked');
    getData(createCSVAndSendByMail);
}

//Répète l'affichage du niveau du signal et de l'état de la batterie toutes les 5000 millisecondes
function repeatPrintingSigAndBat() {
    processWritting = setInterval(printSignalAndBatterie, 5000);
}
//Affiche le niveau du signal et l'état de la batterie actuels
function printSignalAndBatterie() {

    var isPlugged = "N/A";

    if (isBatteriePlugged())
        isPlugged = 'oui';
    else
        isPlugged = 'non';
    labelSignalBatterieStatus.innerHTML = 'signal en dBm: ' + getSignalDbm() + '<br>' +
            ' batterie: ' + getBatterieLevel() + '%<br>' +
            ' branchée: ' + isPlugged + '<br>' +
            ' date: ' + getDate();

}
//Stop l'affichage du niveau du signal et de l'état de la batterie
function stopPrintingSignalAndBatterie() {
    clearInterval(processWritting);
}

// this funcfunction  is for the periode call tratraceCourbe on graphics.js file
// every 30 second;
function retraceCourbe() {
    getValuesForCharts();
    processForCourbe = setInterval(getValuesForCharts, 30000);
}

//Stop of the repeat call tratraceCourben function
function stopRetraceCourbe() {
    clearInterval(processForCourbe);
}

// function for the real color to print in the <p> element
//function getColor(dms) {
//    //TODO:
//    switch (dms) {
//
//    }
//}
// to get the values for the arrays and call the fucntion traceCourbe()
function getValuesForCharts() {
    var curentdateTime = getDate();
    var signalDbm = getSignalDbm();
    var batterieLevel = getBatterieLevel();
    var batterieEnChargeInt = isBatteriePluggedInteger();
    var hashkey = "" + curentdateTime + signalDbm + batterieLevel + batterieEnChargeInt;


    // add the battry level value
    tabBattry.push(batterieLevel);
    // -118 ----> -48 good it's mean the signal is perfect
    // add the signaldB value
    tabSignal.push(signalDbm);

    //Draw chart
    traceCourbe(tabBattry, tabSignal);

    //Update DB (insert value on DB)
    doInsertOnDB(curentdateTime, signalDbm, batterieLevel, batterieEnChargeInt, hashkey);
}
//this function gonna call every 5s the printer circle function on cercle.js
function repeatCircle() {
    //show the element view and call the printer cercle function
    $('#cercleIndicor').show();
    processCircle = setInterval(makeCircle(), 5000);
}
function stopCircle() {
    //clear interval set and hide the element view
    clearInterval(processCircle);
    $('#cercleIndicor').hide();
}

function clearCourbes() {
    tabBattry = [];
    tabSignal = [];
    getValuesForCharts();
}