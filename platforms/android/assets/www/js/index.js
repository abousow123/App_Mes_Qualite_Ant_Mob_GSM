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

        btncollecterDonnees.addEventListener("click", btncollecterDonneesAction);
        btnArreterReprendre.addEventListener("click", btnArreterReprendreAction);
        btnAnnulerCollecte.addEventListener("click", btnAnnulerCollecteAction);
        btnExporterCollecte.addEventListener("click", btnExporterCollecteAction);

        //@pape :ajout 
        displayDeviceAndSimInfo();
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
var status = 'off';
var processWritting = null;




/********************************* Déclaration des fonctions **************************************/

//Affiche les informations du téléphone et de la carte sim à la premiere page
function displayDeviceAndSimInfo() {
    labelMarque.innerHTML = "" + getDeviceMarque();
    labelModel.innerHTML = "" + getDeviceModel();
    labelSerial.innerHTML = "" + getDeviceModel();
    labelCarrierName.innerHTML = "" + getCarrierName();
    labelGSMCode.innerHTML = "" + getGSMCode();
}

function btncollecterDonneesAction() {
    $.mobile.changePage("#idMonitoringPage", {transition: "slide"});
}

function btnArreterReprendreAction() {
    if (status == 'off') {
        status = 'on';
        btnArreterReprendre.innerHTML = "Arrêter";
        labelSignalBatterieStatus.innerHTML = labelSignalBatterieStatus.innerHTML + '<br>' + 'starting...';
        repeatPrintingSigAndBat();
    } else {
        stopPrintingSignalAndBatterie();
        status = 'off';
        btnArreterReprendre.innerHTML = "Reprendre";
        labelSignalBatterieStatus.innerHTML = labelSignalBatterieStatus.innerHTML + '<br><br><hr><font color="Blue">' + 'pause</font><hr>';
    }
}

function btnAnnulerCollecteAction() {
    stopPrintingSignalAndBatterie();
    status = 'off';
    btnArreterReprendre.innerHTML = "Commencer";
    labelSignalBatterieStatus.innerHTML = '';
}

function btnExporterCollecteAction() {
//    TODO
//    $("#popupBtnAnnuler").popup("open");
//    setTimeout(function () {
//        $("#popupBtnAnnuler").popup("close");
//    }, 3000);

    createTmpFile();
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
    labelSignalBatterieStatus.innerHTML = labelSignalBatterieStatus.innerHTML + '<br><br>'
            + 'signal en dBm: ' + getSignalDbm() + '<br>'
            + ' batterie: ' + getBatterieLevel() + '%<br>'
            + ' branchée: ' + isPlugged + '<br>'
            + ' date: ' + getDate();
}

//Stop l'affichage du niveau du signal et de l'état de la batterie
function stopPrintingSignalAndBatterie() {
    clearInterval(processWritting);
}
