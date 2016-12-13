/*
 * Propose le service qui cree le fichier qui cree et ecris dans le
 * fichier csv puis l'envoi par mail par l'intermediaire
 * du service email,
 * il prend en argument un objet JSON des données enregistrées
 * dans la base de données ==> createCSVAndSendByMail
 *
 *  A utiliser donc comme argument dans la fonction getData, le service
 *  de récupération des données de la BD (dans database.js)
 *
 *  e.g: getData(createCSVAndSendByMail)
 */


var txtToWrite = ""; //String que sera ecrit dans le fichier CSV

/*
 *
 * @returns {nothing}
 */

function createCSVAndSendByMail(data) {
//    alert('on createCSVAndSendByMail');
    formatToCSVString(data);
    createCSVFile();
}


function createCSVFile() {
//    alert('on createCSVFile');
    window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 102, onSuccessLoadFs, onErrorLoadFs);

}


function onSuccessLoadFs(fs) {
//    alert('on onSuccessLoadFs \nfile system open: ' + fs.name);
    window.resolveLocalFileSystemURL(cordova.file.externalCacheDirectory, function (entry) {
        var currentDate = new Date();
        createFile(entry, "Captures__" + currentDate.getDate() + "_" + (currentDate.getMonth() + 1) + "_" +
                currentDate.getFullYear() + "_" + currentDate.getHours() + "h" + currentDate.getMinutes() + ".csv", false);
    });
}


function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
//    alert('on createFile');
    dirEntry.getFile(fileName, {create: true, exclusive: false}, function (fileEntry) {

        writeFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry.
//    alert('on writeFile');
    fileEntry.createWriter(function (fileWriter) {
//        alert('on CreateWriter');
        fileWriter.onwriteend = function () {
//            alert("Successful file write...");
            readFile(fileEntry);
            sendMail(fileEntry.toURL());
        };

        fileWriter.onerror = function (e) {
            alert("l'écriture dans le fichier a échoué: " + e.toString());
        };

        // create a new Blob

//        dataObj = new Blob(['' + txtToWrite], {type: 'text/plain'});
        var dataObj = newBlob(txtToWrite, 'text/plain');

//        alert('after creation new Blob');
        fileWriter.write(dataObj);
//        alert('after fileWriter.write');
    });
}

function readFile(fileEntry) {

    fileEntry.file(function (file) {
        var reader = new FileReader();

        reader.onloadend = function () {
//            alert("Successful file read: \n" + fileEntry.fullPath + "\n" + fileEntry.toURL() + "\n" + this.result);
        };

        reader.readAsText(file);

    }, onErrorReadFile);
}



/*
 * Format a JSON table into à CSV String and
 * store it to txtToWrite variable defined above.
 * Transforme un objet JSON contenant les données
 * enregistrées dans la base de données et
 * les transformes en une String au format CSV.
 * @param {JSON table} data
 * @returns {Nothing}
 */
function formatToCSVString(data) {
//    alert('on formatToCSVString');
    txtToWrite = "Horodatage,Niveau du Signal(en Db),Niveau de Batterie(Décibel),En charge,Hashkey\n";

    for (var i = 0; i < data.length; i++) {
        var enCharge = null;
        if (data[i].branchee)
            enCharge = 'Oui';
        else
            enCharge = 'Non';
        txtToWrite += data[i].horodatage + ","
                + data[i].niveau_signal + ","
                + data[i].niveau_batterie + ","
                + enCharge + ","
                + data[i].hashkey + "\n";
    }
}


function newBlob(data, datatype) {
    var out;

    try {
        out = new Blob([data], {type: datatype});
        console.debug("Blob: case 1");
//        alert('Blob: case  1');
    } catch (e) {
        window.BlobBuilder = window.BlobBuilder ||
                window.WebKitBlobBuilder ||
                window.MozBlobBuilder ||
                window.MSBlobBuilder;

        if (e.name == 'TypeError' && window.BlobBuilder) {
            var bb = new BlobBuilder();
            bb.append(data);
            out = bb.getBlob(datatype);
            console.debug("Blob: case 2");
//            alert('Blob: case  2');
        } else if (e.name == "InvalidStateError") {
            // InvalidStateError (tested on FF13 WinXP)
            out = new Blob([data], {type: datatype});
            console.debug("Blob: case 3");
//            alert('Blob: case  3');
        } else {
            // We're screwed, blob constructor unsupported entirely
            console.debug("Blob: Error");
//            alert('Blob: Error');
        }
    }
//    alert('about to return out');
    return out;
}

/*
 *
 * onErrorXXX functions
 */

function onErrorLoadFs() {
    alert('Erreur: impossible de charger le system de fichier');
}

function onErrorCreateFile() {
    alert('Erreur: impossible de créer le system de fichier');
}

function onErrorReadFile() {
    alert('Erreur: impossible de lire le fichier');
}